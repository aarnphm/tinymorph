---
id: scratch
aliases:
  - dump
tags:
  - evergreen
author: aarnphm
comments: false
date: 2024-09-18
title: Scratchpad
---
Idea:
- Interface => stream activations <=
Dictionary learning: https://transformer-circuits.pub/2023/monosemantic-features/index.html

Training SAEs for finding attention activation: 
- https://github.com/EleutherAI/sae
- https://github.com/jbloomAus/SAELens
	- Probably can use this as reference, but probably `torch.distributed` and `transformers.Trainer` should be more than enough

on GPT-2: https://github.com/openai/sparse_autoencoder and [paper](https://cdn.openai.com/papers/sparse-autoencoders.pdf)
- lens into viewing random activations

https://lstmvis.vizhub.ai/ => LSTM vis
https://github.com/TransformerLensOrg/TransformerLens

Attribute al
- What does it captures features?

> How do we steer? based on features or token-based?

> Alignment on human representations?

> features rep? Correctness w/ models internal representation

> Accurate mappings based on human and machine features?

> Context: reduction in third space

representation based on users text (build features)

Use SAE to steerable generations

User feedbacks

actionable steering based on attention-based models