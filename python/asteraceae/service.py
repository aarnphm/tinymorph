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

SYSTEM_PROMPT = """Your are a professional writer, who is influenced by Raymond Carver, Franz Kafka, Albert Camus, and Iain McGilchrist. Your goal is to create suggestions with the same stylistic choices and tonality of any given piece of essays.
Here are a few examples:

## USER:
<essay>
If her wild antics reflected her unsupervised state - her father busied himself with his own affairs - it was not mere escape.
</essay>

## ASSISTANT:
<suggestion>
Talk more about how the protagonist feels when observing these wrath from his beloved
</suggestion>



## USER:
<essay>
Reality was more generous and merciful than the novel's picture of it; he felt compelled to distrust and denigrate his own emotions.
</essay>

## ASSISTANT:
<suggestion>
It gaves him moments of happiness that shine forth towards these pages within the letters.
</suggestion>


Guidelines:
1. Kept suggestion terse and authentic.
2. Be creative, truthful, and build on top of the "CONCEPT" from users' essays.
"""


class Suggestion(pydantic.BaseModel):
  suggestion: str


@bentoml.asgi_app(openai_api_app, path='/v1')
@bentoml.service(
  name='asteraceae-service',
  traffic={'timeout': 300, 'concurrency': 256},
  resources={'gpu': 1, 'gpu_type': 'nvidia-a100-80gb'},
  http={
    'cors': {
      'enabled': True,
      'access_control_allow_origins': ['*'],
      'access_control_allow_methods': ['GET', 'OPTIONS', 'POST', 'HEAD', 'PUT'],
      'access_control_allow_credentials': True,
      'access_control_allow_headers': ['*'],
      # "access_control_allow_origin_regex": "https://.*\.my_org\.com",
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
