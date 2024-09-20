import torch, safetensors, pathlib, argparse
import huggingface_hub as hf_hub, safetensors as st
from nnsight import LanguageModel
from sae import Sae


def load_model(name: str, /, *, trust_remote_code: bool = False) -> LanguageModel:
  model = LanguageModel(
    name, device_map='auto', trust_remote_code=trust_remote_code, low_cpu_mem_usage=True, torch_dtype=torch.float16
  )
  model.requires_grad_(False)
  return model


def main():
  parser = argparse.ArgumentParser()
  parser.add_argument('--feature', type=int, default=6689)  # index for: Logic
  parser.add_argument('--scale', type=int, default=20)
  parser.add_argument('--max_new_tokens', type=int, default=40)
  parser.add_argument('--num_return_sequences', type=int, default=10)

  args = parser.parse_args()
  prompt = """
<start_of_turn>user
Finish the following sentence given by the users:

X is easy, but it is impossible to be logical to bitter end. It is considered truth if one
<end_of_turn>
<start_of_turn>model
"""

  LM = load_model('google/gemma-2b-it', trust_remote_code=True)
  w_dec = load_sae('jbloom/Gemma-2b-IT-Residual-Stream-SAEs', 'gemma_2b_it_blocks.12.hook_resid_post_16384')
  positions = [i for i, a in enumerate(LM.tokenizer.encode(prompt)) if LM.tokenizer.decode([a]) == 'X']

  with LM.generate(
    prompt,
    do_sample=True,
    scan=False,
    validate=False,
    max_new_tokens=args.max_new_tokens,
    num_return_sequences=args.num_return_sequences,
  ) as gen:
    vector = w_dec[[args.feature]]
    vector = vector / vector.norm()
    vector = vector * args.scale
    for position in positions:
      LM.model.layers[2].output[0][:, position] = vector
    out = gen.generator.output.save()
  for i, l in enumerate(LM.tokenizer.batch_decode(out)):
    print(f'{i + 1}.', repr(l.partition(prompt)[2].partition('<eos>')[0]))
