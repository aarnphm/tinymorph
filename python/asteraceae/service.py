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
MODEL_ID = 'meta-llama/Meta-Llama-3.1-8B-Instruct'


@bentoml.mount_asgi_app(openai_api_app, path='/v1')
@bentoml.service(
  name='asteraceae-service',
  traffic={'timeout': 300, 'concurrency': 256},
  resources={'gpu': 1, 'gpu_type': 'nvidia-a100-80gb'},
)
class Engine:
  def __init__(self):
    from vllm import AsyncEngineArgs, AsyncLLMEngine
    from vllm.entrypoints.openai.api_server import init_app_state
    import vllm.entrypoints.openai.api_server as vllm_api_server

    OPENAI_ENDPOINTS = [
      ['/chat/completions', vllm_api_server.create_chat_completion, ['POST']],
      ['/completions', vllm_api_server.create_completion, ['POST']],
      ['/models', vllm_api_server.show_available_models, ['GET']],
    ]
    for route, endpoint, methods in OPENAI_ENDPOINTS:
      openai_api_app.add_api_route(path=route, endpoint=endpoint, methods=methods, include_in_schema=True)

    ENGINE_ARGS = AsyncEngineArgs(model=MODEL_ID, max_model_len=MAX_TOKENS, enable_prefix_caching=True)
    self.engine = AsyncLLMEngine.from_engine_args(ENGINE_ARGS)
    logger.info('vLLM service initialized with model: %s', MODEL_ID)

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
    args.disable_log_stats = False
    args.return_tokens_as_token_ids = False
    args.enable_auto_tool_choice = False
    args.enable_tool_call_parser = True
    args.tool_call_parser = "llama3_json"
    args.enable_prompt_tokens_details = False

    vllm_api_server.init_app_state(self.engine, model_config, openai_api_app.state, args)
