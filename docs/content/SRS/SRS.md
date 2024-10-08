---
id: SRS
tags:
  - meta
author: aarnphm,waleedmalik7,nebrask,lucas-lizhiwei
date: "2024-09-16"
description: "Software Requirements Specification for tinymorph: LLM-steering text editor"
title: Software Requirements Specification
---

See also: [[Checklists/SRS-Checklist|checklist]],
[[SRS/SRS#Revision|this document revision]], and [[ProblemStatementAndGoals/ProblemStatement|problem statement]]

_The following Software Requirements Specification for `tinymorph` is using [Volere Requirements Specification template](https://www.volere.org/templates/volere-requirements-specification-template/)_

## 1. Purpose of the Project

![[ProblemStatementAndGoals/ProblemStatement#Problem|Problem Statement]]

### 1.1 User Business

- Offering system (business concept)
- help creative writing artifacts
- business data

Service you are providing?

> [!important] UB-1
>
> Potential paid features

Rationale: The core of `tinymorph` will remain for free of use, but for more advanced features such as hosting, custom
SAEs training based on your writing, then the team can offer supports at a given price tag.

### 1.2 Goals of the Project

covers both of functional and non-functional requirements

- usuable for unversed

See also [[ProblemStatementAndGoals/ProblemStatement#Goals|comprehensive lists]]

> [!IMPORTANT] G-1
>
> A [_file-over-app_](https://stephango.com/file-over-app) web-based text editor.

Rationale: "The files you create are more important than the tools you use to create them. Apps are ephemeral, but your files have a chance to last." - Steph Ango

> [!IMPORTANT] G-2
>
> User feedback-loop for manual steering through planning

Rationale: For interfaces to help users with planning, feedback-loop are important for users to understand the effectiveness of generations.

> [!important] G-3
>
> Efficient activation caching for feature steering.

Rationale: Generating similarly composed features vectors everytime might not be efficient. Thus, designing a caching
mechanism for certain [[glossary#KV cache block]] of generated activations is worth investigating to improve overall generations
speed.

> [!important] G-4
>
> Functional SAEs for guided steering.

Rationale: We must train [[glossary#sparse autoencoders]] that is suitable for creative writing. See also [[SRS/SRS#18. Open Issues|OI-2]]

> [!important] G-5
>
> OpenAI-compatible API for LLM server.

Rationale: OpenAI's API definition has been widely adopted in the industry for deploying LLMs. Given `tinymorph` will
run SAEs in addition with a base models, OpenAI-compatible server is a must for future integrations with upstream
tooling.

> [!important] G-6
>
> External goals

can mention this =>

![[DevelopmentPlan/DevelopmentPlan#External Goals|Goals]]

## 2. Stakeholders

### 2.1 Client

[Insert your content here.]

### 2.2 Customer

[Insert your content here.]

### 2.3 Other Stakeholders

[Insert your content here.]

### 2.4 Hands-On Users of the Project

[Insert your content here.]

### 2.5 Personas

[Insert your content here.]

### 2.6 Priorities Assigned to Users

[Insert your content here.]

### 2.7 User Participation

[Insert your content here.]

### 2.8 Maintenance Users and Service Technicians

[Insert your content here.]

## 3. Mandated Constraints

### 3.1 Solution Constraints

[Insert your content here.]

### 3.2 Implementation Environment of the Current System

[Insert your content here.]

### 3.3 Partner or Collaborative Applications

[Insert your content here.]

### 3.4 Off-the-Shelf Software

[Insert your content here.]

### 3.5 Anticipated Workplace Environment

[Insert your content here.]

### 3.6 Schedule Constraints

[Insert your content here.]

### 3.7 Budget Constraints

[Insert your content here.]

### 3.8 Enterprise Constraints

[Insert your content here.]

## 4. Naming Conventions and Terminology

![[glossary]]

## 5. Relevant Facts And Assumptions

### 5.1 Relevant Facts

[Insert your content here.]

### 5.2 Business Rules

[Insert your content here.]

### 5.3 Assumptions

[Insert your content here.]

## 6. The Scope of the Work

### 6.1 The Current Situation

[Insert your content here.]

### 6.2 The Context of the Work

[Insert your content here.]

### 6.3 Work Partitioning

[Insert your content here.]

### 6.4 Specifying a Business Use Case (BUC)

[Insert your content here.]

## 7. Business Data Model and Data Dictionary

### 7.1 Business Data Model

[Insert your content here.]

### 7.2 Data Dictionary

[Insert your content here.]

## 8. The Scope of the Product

### 8.1 Product Boundary

[Insert your content here.]

### 8.2 Product Use Case Table

[Insert your content here.]

### 8.3 Individual Product Use Cases (PUC's)

[Insert your content here.]

## 9. Functional Requirements

### 9.1 Functional Requirements

[Insert your content here.]

## 10. Look and Feel Requirements

### 10.1 Appearance Requirements

[Insert your content here.]

### 10.2 Style Requirements

[Insert your content here.]

## 11. Usability and Humanity Requirements

### 11.1 Ease of Use Requirements

[Insert your content here.]

### 11.2 Personalization and Internationalization Requirements

[Insert your content here.]

### 11.3 Learning Requirements

[Insert your content here.]

### 11.4 Understandability and Politeness Requirements

[Insert your content here.]

### 11.5 Accessibility Requirements

[Insert your content here.]

## 12. Performance Requirements

### 12.1 Speed and Latency Requirements

[Insert your content here.]

### 12.2 Safety-Critical Requirements

[Insert your content here.]

### 12.3 Precision or Accuracy Requirements

[Insert your content here.]

### 12.4 Robustness or Fault-Tolerance Requirements

[Insert your content here.]

### 12.5 Capacity Requirements

[Insert your content here.]

### 12.6 Scalability or Extensibility Requirements

[Insert your content here.]

### 12.7 Longevity Requirements

[Insert your content here.]

## 13. Operational and Environmental Requirements

### 13.1 Expected Physical Environment

[Insert your content here.]

### 13.2 Wider Environment Requirements

[Insert your content here.]

### 13.3 Requirements for Interfacing with Adjacent Systems

[Insert your content here.]

### 13.4 Productization Requirements

[Insert your content here.]

### 13.5 Release Requirements

[Insert your content here.]

## 14. Maintainability and Support Requirements

### 14.1 Maintenance Requirements

[Insert your content here.]

### 14.2 Supportability Requirements

[Insert your content here.]

### 14.3 Adaptability Requirements

[Insert your content here.]

## 15. Security Requirements

### 15.1 Access Requirements

[Insert your content here.]

### 15.2 Integrity Requirements

[Insert your content here.]

### 15.3 Privacy Requirements

[Insert your content here.]

### 15.4 Audit Requirements

[Insert your content here.]

### 15.5 Immunity Requirements

[Insert your content here.]

## 16. Cultural Requirements

### 16.1 Cultural Requirements

[Insert your content here.]

## 17. Compliance Requirements

### 17.1 Legal Requirements

[Insert your content here.]

### 17.2 Standards Compliance Requirements

[Insert your content here.]

## 18. Open Issues

> [!question] OI-1
>
> How should we compose correct features matrix to ensure correct steering?

Rationale: We can train intepreter networks to extract human-readable activations layers (referred as "features")
[@cunningham2023interim] [@templeton2024scaling], but features alone won't offer too much value for end users
(engineers, writers).

`tinymorph` then must be able to compose multiple activations that represents certain tonality,
in which a auto-interp pipeline [@juang2024autointerp] should be implemented to guide base models to generate in
certain direction.

> [!question] OI-2
>
> What datasets one should use to train [[glossary#sparse autoencoders|SAEs]]?

Rationale: [@goodfire2024research] demonstrated [LMSys-1M chat datasets](https://huggingface.co/datasets/lmsys/lmsys-chat-1m) are great fit to train SAE for chat application
specifically. For the interface for planning ideas a more general datasets that contains more essays, paragraphs might
be more beneficial.

> [!question] OI-3
>
> For a planning interface, what if we add tool use (such as web-search) to enhance correctness in generations?

Rationale: RAG-infused pipeline [@lewis2021retrievalaugmentedgenerationknowledgeintensivenlp] has been widely adopted
in industry-related workflows to reduce LLM hallucination. For steering specifically, this might be useful given the
additional context for online blog posts to influence certain direction writers want to formulate their ideas.

> [!question] OI-3
>
> Effectiveness against fine-tuned models?

Rationale: Fine-tuned models are a distilled version of the base models that is trained to perform generations in
a given format/text. Methods such as [[glossary#low-rank adapters|LoRA]] has been proven to be useful for steering
generations purely through prompt. The questions remains whether intuitively having SAEs to steer generations at the
activation level would prove to be more useful than specifically fine-tuned models.

> [!question] OI-4
>
> [file-over-app](https://stephango.com/file-over-app) philosophy for building a text editor?

Rationale: The end goal is to build a text editor, which means we are building on top of the notion of "files". We
rarely have to think about files nowadays in our daily tasks, yet we are still operating with them on a daily basis:
Photos stored on your iPhone., music catalog saved in Spotify, knowledge pages in Notion etc. The industry seemingly to
replace this primitive with something stored "on the cloud". I do think there are arguments to be made to give back
this heuristic back to the users, if we are thinking about building digital artifacts that will last long after we are
gone. Additionally, it will greatly simplify any internal logics.

> [!question] OI-5
>
> Inference performance for server deployment versus on-device?

Rationale: For the past year, the need for efficient inference to run these language models has been top priorities for
companies to deploy these models in production. Framework such as vLLM [@kwon2023efficient], lmdeploy [@2023lmdeploy]
offers different trade-off for running efficient inference on server. Given `tinymorph` will offer a web interface, how
should we evaluate given frameworks to use in conjunction with trained SAEs. Additionally, for on-device inference, we
must also investigate how one can run the models locally.

## 19. Off-the-Shelf Solutions

### 19.1 Ready-Made Products

[Insert your content here.]

### 19.2 Reusable Components

[Insert your content here.]

### 19.3 Products That Can Be Copied

[Insert your content here.]

## 20. New Problems

### 20.1 Effects on the Current Environment

> [!IMPORTANT] EoCE-1
>
> Workflow updates for writers

Rationale: `tinymorph` will introduce an alternative way to plan and write essays.

> [!IMPORTANT] EoCE-2
>
> Real-time collaboration

Rationale: `tinymorph` can provide real-time feedback on certain planning steps, which could influence how users
approach one's writing.

### 20.2 Effects on the Installed Systems

> [!IMPORTANT] EoIS-1
>
> Performance impacts

Rationale: `tinymorph` will introduce additional computation for steering generations, which could uses additional
resources from users' local machine. This means it might requires more modern computers to run the application
efficiently.

> [!IMPORTANT] EoIS-2
>
> Storage considerations

Rationale: `tinymorph` follows "file-over-app" philosophy, meaning certain folders structures for users files must be
adhere to in order for applications to function correctly.

### 20.3 Potential User Problems

> [!IMPORTANT] PUP-1
>
> Learning curve

Rationale: For text editors, users might have a higher learning curve to setup their vault and file structure
accordingly.

> [!IMPORTANT] PUP-2
>
> Integration from existing tools

Rationale: Changing ones' behaviour is hard, which means users might find a hard time to integrate `tinymorph` into
their existing writing workflow.

### 20.4 Limitations in the Anticipated Implementation Environment That May Inhibit the New Product

> [!IMPORTANT] LAIETMINP-1
>
> Browser support and accessibility

Rationale: Given we will ship the web-based version of `tinymorph` first, all version of chromium might not have
support for certain file API. Additionally, different browser engine have different accessibility support, which might
interfere with usability.

> [!IMPORTANT] LAIETMINP-2
>
> On-device inference

Rationale: If users wish to run models on-device, they might not have the sufficient hardware to perform given tasks.
Additionally, setting up local inference might be proven to be challenging for the unversed.

### 20.5 Follow-Up Problems

> [!IMPORTANT] FUP-1
>
> Over-reliance on suggestion

Rationale: Advanced agents workflow for planning might increase a risk of homogenization in writing styles. as [Ted
Chiang commented on ChatGPT](https://www.newyorker.com/tech/annals-of-technology/chatgpt-is-a-blurry-jpeg-of-the-web):

> The more that text generated by large language models gets published on the Web, the
> more the Web becomes a blurrier version of itself
> […]
> Repeatedly resaving a jpeg creates more compression artifacts, because more information is lost every time.

> [!IMPORTANT] FUP-2
>
> Disruption in flow

Rationale: constant suggestion prompt might prove to be annoying to writers' flow and concentration.

> [!IMPORTANT] FUP-3
>
> Feature overloading

Rationale: The setup/UX might be too complex, potentially too intimidating for users who might prefer the simplicity of
CUIs.

## 21. Tasks

See also [[DevelopmentPlan/DevelopmentPlan|Development Plan]] for an up-to-date development cycle as well as project
planning.

For a more unstructured brain dump for potential exploration avenue see [[Scratch|ideas]].

## 22. Migration to the New Product

### 22.1 Requirements for Migration to the New Product

[Insert your content here.]

### 22.2 Data That Has to be Modified or Translated for the New System

[Insert your content here.]

## 23. Costs

[Insert your content here.]

## 24. User Documentation and Training

### 24.1 User Documentation Requirements

[Insert your content here.]

### 24.2 Training Requirements

[Insert your content here.]

## 25. Waiting Room

[Insert your content here.]

## 26. Ideas for Solution

[Insert your content here.]

---

## Appendix

[^ref]

### Reflection

<!-- 1. What went well while writing this deliverable? -->
<!-- 2. What pain points did you experience during this deliverable, and how did you resolve them? -->
<!-- 3. How many of your requirements were inspired by speaking to your client(s) or their proxies (e.g. your peers, stakeholders, potential users)? -->
<!-- 4. Which of the courses you have taken, or are currently taking, will help your team to be successful with your capstone project. -->
<!-- 5. What knowledge and skills will the team collectively need to acquire to successfully complete this capstone project? Examples of possible knowledge to acquire include domain specific knowledge from the domain of your application, or software engineering knowledge, mechatronics knowledge or computer science knowledge. Skills may be related to technology, or writing, or presentation, or team management, etc. You should look to identify at least one item for each team member. -->
<!-- 6. For each of the knowledge areas and skills identified in the previous question, what are at least two approaches to acquiring the knowledge or mastering the skill? Of the identified approaches, which will each team member pursue, and why did they make this choice? -->

<div class="reflection-container">

<div class="users">
  <a class="name" href="https://github.com/aarnphm">Aaron</a>
</div>

<div class="blob">

</div>

</div>

<br/>

<div class="reflection-container">

<div class="users">
  <a class="name" href="https://github.com/nebrask">Nebras</a>
</div>

<div class="blob">

</div>

</div>

<br/>

<div class="reflection-container">

<div class="users">
  <a class="name" href="https://github.com/waleedmalik7">Waleed</a>
</div>

<div class="blob">

</div>

</div>

<br/>

<div class="reflection-container">

<div class="users">
  <a class="name" href="https://github.com/lucas-lizhiwei">Lucas</a>
</div>

<div class="blob">

</div>

</div>

### Revision

| Date          | Version | Notes                        |
| ------------- | ------- | ---------------------------- |
| Sept. 16 2024 | 0.0     | Initial skafolding           |
| Sept. 25 2024 | 0.1     | Migration to Volere template |
