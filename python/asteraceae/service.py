# /// script
# requires-python = ">=3.11"
# dependencies = [
#     "bentoml",
#     "vllm>=0.7.0",
# ]
# ///
from __future__ import annotations
import uuid, logging
import bentoml, fastapi, pydantic

from argparse import Namespace
from typing import AsyncGenerator
from annotated_types import Ge, Le
from typing_extensions import Annotated

logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)

openai_api_app = fastapi.FastAPI()

MAX_TOKENS = 8192
MODEL_ID = 'deepseek-ai/DeepSeek-R1-Distill-Qwen-14B'

SYSTEM_PROMPT = """You are a professional writing assistant influenced by the styles of Raymond Carver, Franz Kafka, Albert Camus, Iain McGilchrist, and Ian McEwan. Your task is to provide suggestions to improve a user's writing by offering concise, meaningful additions that match the stylistic choices and tonality of the given essay excerpt.

Please follow these steps to generate a suggestion:

1. Analyze the excerpt, paying close attention to its style, tone, and central concept.
2. Consider how Raymond Carver or Ian McEwan might approach expanding or enhancing the excerpt.
3. Formulate a suggestion that builds upon the existing concept while maintaining a terse and authentic voice.
4. Ensure your suggestion adds depth to the writing without drastically changing its original intent.

Before providing your final suggestion, wrap your analysis in <thought_process> tags. In this section:
- List key stylistic elements and themes present in the excerpt
- Identify specific influences from the mentioned authors
- Brainstorm potential areas for improvement
- Consider how each improvement aligns with the original style and tone

This will help ensure a thorough interpretation of the excerpt and a well-crafted suggestion. It's OK for this section to be quite long.

Guidelines for your suggestion:
1. Keep it concise and authentic, typically one to two sentences.
2. Focus on enhancing emotional depth, vivid imagery, or character insight.
3. Maintain the overall tone and style of the original excerpt.
4. Build upon the central concept or theme present in the excerpt.

After your analysis, provide your final suggestion in <suggestion> tags.

Example output structure:

<thinking>
[Your detailed analysis of the excerpt, considering style, tone, and concept]
</thinking>

<suggestion>
[Your concise, meaningful suggestion to improve the writing]
</suggestion>

Please proceed with your analysis and suggestion for the given essay excerpt."""


class Suggestion(pydantic.BaseModel):
  suggestion: str


@bentoml.asgi_app(openai_api_app, path='/v1')
@bentoml.service(
  name='asteraceae-service',
  traffic={'timeout': 300, 'concurrency': 128},
  resources={'gpu': 1, 'gpu_type': 'nvidia-a100-80gb'},
  http={
    'cors': {
      'enabled': True,
      'access_control_allow_origins': ['*'],
      'access_control_allow_methods': ['GET', 'OPTIONS', 'POST', 'HEAD', 'PUT'],
      'access_control_allow_credentials': True,
      'access_control_allow_headers': ['*'],
      'access_control_max_age': 1200,
      'access_control_expose_headers': ['Content-Length'],
    }
  },
  envs=[{'name': 'HF_TOKEN'}],
  image=bentoml.images.PythonImage(python_version='3.11'),
)
class Engine:
  model_ref = bentoml.models.HuggingFaceModel(MODEL_ID, exclude=['*.pth'])

  def __init__(self):
    from transformers import AutoTokenizer
    from vllm import AsyncEngineArgs, AsyncLLMEngine
    import vllm.entrypoints.openai.api_server as vllm_api_server

    ENGINE_ARGS = AsyncEngineArgs(model=self.model_ref, max_model_len=MAX_TOKENS, enable_prefix_caching=True)
    self.engine = AsyncLLMEngine.from_engine_args(ENGINE_ARGS)
    self.tokenizer = AutoTokenizer.from_pretrained(self.model_ref)
    OPENAI_ENDPOINTS = [
      ['/chat/completions', vllm_api_server.create_chat_completion, ['POST']],
      ['/completions', vllm_api_server.create_completion, ['POST']],
      ['/models', vllm_api_server.show_available_models, ['GET']],
    ]
    for route, endpoint, methods in OPENAI_ENDPOINTS:
      openai_api_app.add_api_route(path=route, endpoint=endpoint, methods=methods)

    model_config = self.engine.engine.get_model_config()
    args = Namespace()
    args.model = MODEL_ID
    args.disable_log_requests = True
    args.max_log_len = 1000
    args.response_role = 'assistant'
    args.served_model_name = None
    args.chat_template = None
    args.lora_modules = None
    args.prompt_adapters = None
    args.request_logger = None
    args.disable_log_stats = True
    args.return_tokens_as_token_ids = False
    args.enable_tool_call_parser = True
    args.enable_auto_tool_choice = True
    args.tool_call_parser = 'llama3_json'
    args.enable_prompt_tokens_details = False
    args.guided_decoding_backend = 'xgrammar'

    vllm_api_server.init_app_state(self.engine, model_config, openai_api_app.state, args)

  @bentoml.api
  async def suggests(
    self,
    essay: str,
    num_suggestions: Annotated[int, Ge(1), Le(10)] = 5,
    temperature: Annotated[float, Ge(0.5), Le(0.7)] = 0.6,
    max_tokens: Annotated[int, Ge(128), Le(MAX_TOKENS)] = MAX_TOKENS,
  ) -> AsyncGenerator[str, None]:
    from vllm.sampling_params import GuidedDecodingParams, SamplingParams

    # NOTE: we set delta=2 for now to simulate "randomness"
    Output = pydantic.create_model(
      'Output',
      __module__=Suggestion.__module__,
      __base__=pydantic.BaseModel,
      suggestions=(pydantic.conlist(Suggestion, min_length=num_suggestions-2, max_length=num_suggestions), ...),
    )
    SAMPLING_PARAM = SamplingParams(
      max_tokens=max_tokens,
      skip_special_tokens=True,
      temperature=temperature,
      guided_decoding=GuidedDecodingParams(json=Output.model_json_schema(), backend='xgrammar'),
    )
    messages = [{'role': 'system', 'content': SYSTEM_PROMPT}, {'role': 'user', 'content': essay}]

    prompt = self.tokenizer.apply_chat_template(messages, tokenize=False, add_generation_prompt=True)
    stream = await self.engine.add_request(uuid.uuid4().hex, prompt, SAMPLING_PARAM)

    cursor = 0
    async for request_output in stream:
      text = request_output.outputs[0].text
      yield text[cursor:]
      cursor = len(text)


if __name__ == '__main__':
  Engine.serve_http(port=3000)
