---
id: scratch
aliases:
  - dump
  - scratch
tags:
  - evergreen
author: aarnphm
comments: false
date: "2024-09-18"
title: Scratchpad
---

Idea

- Interface => stream activations <= SAE to guide generations

Dictionary learning: https://transformer-circuits.pub/2023/monosemantic-features/index.html
=> motivation to prove SAE results in interpretable features

https://transformer-circuits.pub/2024/scaling-monosemanticity/

## training SAEs

for finding attention activation.

Anthropic's report on [training SAEs](https://transformer-circuits.pub/2024/april-update/index.html#training-saes)

- https://github.com/EleutherAI/sae
- https://github.com/jbloomAus/SAELens
  - use as reference, but probably `torch.distributed` and `transformers.Trainer` should be more than enough

on GPT-2: [github](https://github.com/openai/sparse_autoencoder) and [paper](https://cdn.openai.com/papers/sparse-autoencoders.pdf)

- lens into viewing random activations

https://lstmvis.vizhub.ai/ => LSTM vis
https://github.com/TransformerLensOrg/TransformerLens

Attribute allocation?

> [!question]
> How should we steer?
>
> - Think of using SAEs => iterate better prompt
>
> Features composition for guided steering
>
> features rep? Correctness w/ models internal representation
>
> Accurate mappings based on human and machine features?
>
> Context: reduction in third space of model representations

representation based on users text (build features)

Use SAE to steerable generations[^1] <= User feedbacks

> [!IMPORTANT] problem statement.
> actionable steering for attention-based models

## self-explanation

_Excerpt from [Self-explaining SAE features](https://www.alignmentforum.org/posts/8ev6coxChSWcxCDy8/self-explaining-sae-features)_

- Idea: replace residual stream on X with decoder direction times a given scale, called ==self-explanation==
- auto-interp: use a larger LLM to spot patterns in max activating examples (See Neuronpedia's auto-interp)

A variant of activation patching

See also: [SelfE](https://arxiv.org/abs/2403.10949) or [Patchscope](https://arxiv.org/abs/2401.06102)

> [!important]
> align with auto-interp[^2] as the current standard for SAE feature interpretation.

### self-similarity

measure cosine similarity between the 16th layer residual stream of last prompt tokens and original SAE feature.

### entropy

based on predicted distribution of the answer's first token.

The distribution is represented as $P(t_n | t_{1 \dots n-1})$. Since we will insert SAE feature direction into one of
the prompt token, the distribution becomes $P(t_n | t_{1 \dots n-1}, f)$ where $f$ is the SAE feature index..

Note that entropy decreases as the mutual information between random variable representing the feature and first answer
token increases.

### composite

ranks the optimal scale in the top-3 list for a much larger percentage of cases.

$$
\text{composite}(x) = \alpha \cdot \text{self-similarity}(x) + (1 - \alpha) \cdot \text{entropy}(x)
$$

[^1]: Linus' talk on interface for latent space exploration [site](https://thesephist.com/posts/latent/) or [yt](https://www.youtube.com/watch?v=bPSq7oAd6-o&ab_channel=SouthParkCommons)

[^2]: [Language models can explain neurons in language models](https://openaipublic.blob.core.windows.net/neuron-explainer/paper/index.html)

[^3]: [mwatkins's earlier exploration](https://www.lesswrong.com/posts/c6uTNm5erRrmyJvvD/mapping-the-semantic-void-strange-goings-on-in-gpt-embedding)
