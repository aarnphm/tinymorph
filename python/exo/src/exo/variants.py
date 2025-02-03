from __future__ import annotations


# NOTE: This file has to be extremely light and can be called multiple times.
def register():
  """out-of-tree registration for intervention with SAEs."""
  from vllm import ModelRegistry
  from exo.llama_sae import LlamaSAEForCausalLM

  ModelRegistry.register_model('llama', LlamaSAEForCausalLM)
