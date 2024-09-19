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