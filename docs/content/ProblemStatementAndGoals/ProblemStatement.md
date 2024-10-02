---
id: ProblemStatement
tags:
  - meta
author: aarnphm
date: "2024-09-16"
title: Problem Statement and Goals
---

See also: [[Checklists/ProbState-Checklist|checklist]] and
[[ProblemStatementAndGoals/ProblemStatement#Revision|this document revision]]

## Problem

<p class="quotes">
  <i>To know the world one must construct it.</i> -- Pavese
</p>

In 1972 Alan Kay [@AlanKay1972, 11] conceptualised the Dynabook, a portable device that empower
users of all ages to explore and learn. More than just a portable computer, the Dynabook was envisioned as a dynamic, interactive medium for
learning, creation, and self-expression, that could adapt to users' increasing skills and need.

As we progress into the $21^{\text{st}}$ century, software has become comoditised, serving as the engine of transformations that transcend every corner of our life.
Simultaneously, we've seen exponential growth in machine learning (ML) systems' capabilities, mainly through the general push of large language models (LLMs) into the mainstream.
As these systems exihibit emergent properties of intelligence, how should we craft interfaces that promote
[[glossary#agency|agency]] and encourage a sense of personalisation through interactions, rather than providing a tool for automation?

Imagine you are an engineer who pursues creative writing as a hobby. You often curate topics and ideas from discussion on social media,
then categorise them into themes for your arguments. There are plethora of tools
out there that you can use to assist you with these tasks. For those inclined towards more adventurous endeavours, such as running customized
models to meet specific requirements, you might find yourself in the land of _auto-regressive models_: GPTs and friends.

[[glossary#auto-regressive model|Auto-regressive models]] excels at surfacing machines' internal representation of the world through a simple interface: given
a blob of text, the model will generate a contiguous piece of text that it predicts as the most probable tokens.
For example, if you give it a Wikipedia article, the model should produce text consistent with the remainder of said article.

This heuristic lays the foundation to the proliferation of conversational user interfaces (CUIs), which is obvious
given that chat is a thin wrapper around text modality. Yet, CUIs often prove frustrating when dealing with tasks that require
larger sets of information (think of support portals, orders forms, etc.). Additionally,
for tasks that require frequent information retrieval (research, travel planning, etc.), CUIs are suboptimal as they
compel users to unecessarily maintain information in their working memory (for no reason).

Given these challenges, `tinymorph` seeks to explore alternative interfaces for text generations models to extend our
cognitive abilities. This means developing spatial and visual interfaces that allow for non-linear exploration of
information and ideas, through writing.

## Inputs and Outputs

Inputs from users' perspective:

1. User starts with writing about a topic of their choice (e.g. essay on growth.)
2. User's personal preferences for tonality and writing styles.
3. External information sources related to topic at hand.
4. Context of the topic as well as desired goals.
5. Optionally a personalized system prompt to setup the model.

Outputs from `tinymorph`:

1. A text-based [[glossary#inlay hints]] suggestions from models
2. left-to-right (LTR) sequential panel to get users feedback on [[glossary#manual steering]]
3. An optional panel allowing users to choose certain [[glossary#features]] to play with possible generations of their text
4. Additional panel for [[glossary#hyperparameter tuning]] for generation intervention

## Stakeholders

Possible stakeholders include:

1. End users: Writers, students, researchers, content creators, creative professionals who write.
2. Developers and practioners: engineers and ML researchers interested in exploring new interaction paradigms for large
   language models
3. Educators, Edtech companies: companies developing ML-powered learning tools to help students and educators
4. Open source community: developers and researchers interested in contributing to open source projects, given that
   `tinymorph` is open-source and licensed under Apache 2.0.

## Environment

The following encapsulates both hardware and software environment for `tinymorph`:

### hardware.

- For local [[glossary#inference]], GPUs will be preferred for faster [[glossary#time-to-first-tokens]] over CPUs.
- For users' own hosted inference server, it will requires to have internet connection for running inference.
- `tinymorph` is a text editor, therefore it would be able to run on any modern computer regardless of operating system.

### software.

- Cross-platform support
- A series of [[glossary#sparse autoencoders|SAEs]] will be trained and used for feature steering.
- Support for offline inference (users can run LLMs locally).
- Minimal dependencies with intuitive UIs to demonstrate `tinymorph`'s capabilities.

## Goals

- A [_file-over-app_](https://stephango.com/file-over-app) web-based text editor.
- User feedback-loop for steering built into the editor UX.
- Efficent attention caching for feature steering.
- Functional SAEs for guided steering.
- OpenAI-compatible API for LLM server.

## Stretch Goals

- local inference.
- integrations with different device forms (tablets, e-readers).
- Cross-platform GUI.

## Challenge Level and Extras

Challenge level for `tinymorph` is advanced, since the project is exploring what is possible to build AI-native
interfaces. It involves the field of [[glossary#mechanistic interpretability]], which is a relatively new field in alignment
research that involves a lot of domain knowledge into the inner working of transformers circuits.

Extras that we wish to pursue: Design Thinking, Research.

Reasoning:

1. Design Thinking: `tinymorph` will explore new interactions for writing, which means design thinking is required for
   us to prototype on ideas.
2. Research: The field of mechanistic interpretability is considered relatively new, in which there are exciting
   research happening. We will explore this to understand how we can utilise manual editing activations rather than driving the model through a system prompt.

---

## Appendix

[^ref]

### Reflection

<div class="reflection-container">

<div class="users">
  <a class="name" href="https://github.com/aarnphm">Aaron</a>
</div>

<div class="blob">

Writing this document helps me structure my thoughts surrounding the problem
definition and somewhat confirm an intuition I have towards this problem. Interfaces for personal computing are
supposed to be open-ended to surprise ourselves with new ways to create, therefore, I think it is important for me to
write down these thoughts. At the end of the day, writing is a form of lossiness as mutation, turning a "net into a line".

The main pain point I have during writing the problem statement includes declaring the scope for hardware and software
requirements. We did have an internal discussion whether to build a GUI text-editor or refer to a web-based one. After
a quick discussion, we decided that given everyone expertise and preference with the web, our main focus for capstone would be a
web-based interface.

We did consult with our supervisor to limit down the scope for both the UX work as well as potential avenue for ML research.
We established a clear boundaries for UX components we would develop that supplement the core ML work we are going to
do (which is mechanistic interpretability).

</div>

</div>

<!-- 1. What went well while writing this deliverable? -->
<!-- 2. What pain points did you experience during this deliverable, and how did you resolve them? -->
<!-- 3. How did you and your team adjust the scope of your goals to ensure they are suitable for a Capstone project (not overly ambitious but also of appropriate complexity for a senior design project)? -->

### Revision

| Date          | Revision | Change                        |
| ------------- | -------- | ----------------------------- |
| Sept. 16 2024 | 0.0      | Initial skafolding            |
| Sept. 19 2024 | 0.1      | Problem Statement definitions |
