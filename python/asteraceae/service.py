# /// script
# requires-python = ">=3.11"
# dependencies = [
#     "bentoml",
#     "vllm>=0.7.0",
# ]
# ///
from __future__ import annotations
import uuid, io, logging, os, traceback, functools, typing
import bentoml, fastapi, pydantic, yaml

from argparse import Namespace
from typing import AsyncGenerator, Literal, Optional, Union, Sequence
from annotated_types import Ge, Le
from typing_extensions import Annotated

logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)

openai_api_app = fastapi.FastAPI()

MAX_TOKENS = 4096
MODEL_ID = 'meta-llama/Llama-3.1-8B-Instruct'

SYSTEM_PROMPT= """Your are a proficient writer. Your goal is to create note suggestions for any given text that share similar stylistic choices and tonality as Frank Kafka. YOU MUST RETURN VALID JSON, with schema '{{"suggestion": string, "relevance": float}}'. ONLY RETURN JSON and RETURN AT MOST {num_suggestion} SUGGESTIONS. Kept suggestion terse and authentic. YOU SHOULD ALWAYS RETURN the LIST OF SUGGESTIONS."""

PROMPT_TEMPLATE = """<|begin_of_text|><|start_header_id|>system<|end_header_id|>

{system_prompt}<|eot_id|><|start_header_id|>user<|end_header_id|>

{user_prompt}<|eot_id|><|start_header_id|>assistant<|end_header_id|>

"""


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
  })
class Engine:
  def __init__(self):
    from transformers import AutoTokenizer
    from vllm import AsyncEngineArgs, AsyncLLMEngine
    from vllm.entrypoints.openai.api_server import init_app_state
    import vllm.entrypoints.openai.api_server as vllm_api_server

    ENGINE_ARGS = AsyncEngineArgs(model=MODEL_ID, max_model_len=MAX_TOKENS, enable_prefix_caching=True)
    self.engine = AsyncLLMEngine.from_engine_args(ENGINE_ARGS)
    self.tokenizer = AutoTokenizer.from_pretrained(MODEL_ID)

    OPENAI_ENDPOINTS = [
        ["/chat/completions", vllm_api_server.create_chat_completion, ["POST"]],
        ["/completions", vllm_api_server.create_completion, ["POST"]],
        ["/models", vllm_api_server.show_available_models, ["GET"]],
    ]

    for route, endpoint, methods in OPENAI_ENDPOINTS: openai_api_app.add_api_route( path=route, endpoint=endpoint, methods=methods,)

    model_config = self.engine.engine.get_model_config()
    args = Namespace()
    args.model = MODEL_ID
    args.disable_log_requests = True
    args.max_log_len = 1000
    args.response_role = "assistant"
    args.served_model_name = None
    args.chat_template = None
    args.lora_modules = None
    args.prompt_adapters = None
    args.request_logger = None
    args.disable_log_stats = True
    args.return_tokens_as_token_ids = False
    args.enable_tool_call_parser = True
    args.enable_auto_tool_choice = True
    args.tool_call_parser = "llama3_json"
    args.enable_prompt_tokens_details = False

    vllm_api_server.init_app_state( self.engine, model_config, openai_api_app.state, args)

  @bentoml.api
  async def suggests(self, essay: str, num_suggestions: Annotated[int, Le(10)] = 5, max_tokens: Annotated[int, Ge(128), Le(MAX_TOKENS)] = MAX_TOKENS) -> AsyncGenerator[str, None]:
    from vllm import SamplingParams

    SAMPLING_PARAM = SamplingParams(max_tokens=max_tokens, skip_special_tokens=True)
    messages = [
    {"role": "system", "content": SYSTEM_PROMPT.format(num_suggestion=num_suggestions)},
    {"role": "user", "content": essay}]

    prompt = self.tokenizer.apply_chat_template(
        messages,
        tokenize=False,
        add_generation_prompt=True,
    )
    stream = await self.engine.add_request(uuid.uuid4().hex, prompt, SAMPLING_PARAM)

    cursor = 0
    async for request_output in stream:
      text = request_output.outputs[0].text
      yield text[cursor:]
      cursor = len(text)

if __name__ == "__main__": Engine.serve_http(port=3000)
