---
id: HazardAnalysis
tags:
  - meta
author: aarnphm,waleedmalik7,nebrask,lucas-lizhiwei
date: "2024-09-16"
description: "Hazard Analysis for tinymorph: LLM-steering text editor"
title: Hazard Analysis
---

## 1. Introduction

![[SRS/SRS#^introduction|intro]]

## 2. Scope and Purpose of Hazard Analysis

The purpose of this hazard analysis is to:

- Identify potential hazards in `tinymorph`'s operation
- Analyze failure modes and their effects
- Define safety requirements and mitigation strategies
- Guide development priorities for risk reduction

This analysis covers the web-based text editor, its LLM inference system, user interactions, and data handling within
`tinymorph`.

By examining these hazards, the analysis seeks to outline preventive measures to avoid and minimize these losses, ensuring that the system operates reliably and securely while protecting user content and experience.

## 3. System Boundaries

<!-- Dividing the system into components will help you brainstorm the hazards. You shouldn't do a full design of the components, just get a feel for the major ones. For projects that involve hardware,
the components will typically include each individual piece of hardware. If your software will have a database, or an important library, these are also potential components. -->

The following defines system boundaries for `tinymorph`:

### 3.1 Core Functionalities

#### 3.1.1 User interface

- User can compose, modify and refine their writing through spatial interfaces for non-linear exploration.
- UI of the editor includes components of text editor, steering controller and posted-notes dashboard for suggestion.

#### 3.1.2 Steering control panel

- Refers to options panels allowing users to adjust and change preferences accordingly based on what they want their
  suggestion to focus on.

#### 3.1.3 Local file storage system

- maintains file-over-app philosophy, allowing users full control of the artifacts they create

#### 3.1.4 Inference engine (asteraceae)

- LLM inference engine used for ideas generations and steering.
- mainly used as backend for interfaces for suggestions.

#### 3.1.5 LLM-based suggestion generations

- suggestion generated from said inference engine to cultivate ideas and thoughts for writing piece.

> [!danger] Potential Hazard
>
> - Suggestions are not relevant to currently editing text.

### 3.2 Interactions

#### 3.2.1 Infrastructure reliability

- First iterations of LLM engine will depend on running inference on a remote server, which depends on reliable network
  connection.
- Uptime and performance of servers must be reliable during high traffic usage.

> [!danger] Potential Hazard
>
> - SLO and SLA are not met, leading to certain rollbacks and downtime

#### 3.2.2 File system operations

- File system operations are critical for `tinymorph` to function properly, where it allows users to include files as
  context or saving their progress.

> [!danger] Potential Hazard
>
> - network outages would render `tinymorph` unable to save or load files.

### 3.3 Components outside the boundary

#### 3.3.1 User devices and platforms

- `tinymorph` aims to provide support on cross platforms, and supports running on modern browsers.

#### 3.3.2 Networking connections

- The system will rely on networking connections to communicate with the inference engine.

## 4. Definition of Hazard

The definition of a hazard in this document is adapted from Nancy Leveson's work[^hazard].

> [!important] Definition
>
> Any attribute of `tinymorph` that when combined with specific external conditions, could result in a negative impact on system operations or user experience.

In the context of `tinymorph`, hazard is related to:

- Loss or corruption of user data
- Breach of user privacy
- System malfunction affecting user workflow
- Generation of harmful or inappropriate content
- Degradation of system performance
- Security vulnerabilities

[^hazard]: Nancy Leveson, [How to Perform Hazard Analysis on a "System-of-Systems"](http://sunnyday.mit.edu/SOS-hazard-analysis.pdf)

## 5. Critical Assumptions

<!--These assumptions that are made about the software or system. You should minimize the number of assumptions that remove potential hazards. For instance, you could assume a part will never fail, but it is generally better to include this potential failure mode.-->

No critical assumptions are being made for `tinymorph` that would limit
the scope of mitigating or eliminating potential hazards.

## 6. Failure Mode and Effect Analysis

<!-- Include your FMEA table here. This is the most important part of this document. -->
<!-- The safety requirements in the table do not have to have the prefix SR. The most important thing is to show traceability to your SRS. You might trace to requirements you have already written, or you might need to add new requirements. -->
<!-- If no safety requirement can be devised, other mitigation strategies can be entered in the table, including strategies involving providing additional documentation, and/or test cases. -->

### 6.1 Hazards Out of Scope

- Physical hardware failures
- Operating system incompatibilities
- Network infrastructure issues
- Browser implementation differences
- Third-party service disruptions

The first three are out of scope given they are managed by users, and the team don't have any controls over this.

For browser implementation difference, we follow the principle of least privilege, and all interactions will be
implemented according to [Web APIs standard](https://developer.mozilla.org/en-US/docs/Web/API). Browser implementation
difference therefore, out of scope as it is dependent on the browsers' developers to ensure these APIs are implemented
accordingly

For services disruptions, we rely on third-party services' SLA to host our inference engine, thus we don't have overall
control over the service's availability.

> [!important]
>
> These hazards and risks connected the aforementioned assumptions can't be completely solved; instead, they will be
> mitigated as much as possible.

### 6.2 Failure Modes & Effects Analysis Table

The following is the FEMA table for `tinymorph`.

| Component            | Failure Modes                                                                   | Effects of Failure                                              | Causes of Failure                                                                                                                                                                                       | Recommended Actions                                                                                                               | SR                                      | Ref. |
| -------------------- | ------------------------------------------------------------------------------- | --------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------- | ---- |
| User Interface       | Document is deleted/fails to save                                               | Users loss current progress, creative work loss                 | a. Browser crashes<br>b.files failed to save                                                                                                                                                            | a. Implement a revision control system<br>b. Automatic save given a time inverval                                                 | FR-6<br>RFA-BR1                         | H1.1 |
|                      | Version controls fails to track                                                 | Change not tracked; unable to determine history                 | a. Synchromization failed<br>b. Merkle trees not implemented correctly<br>c. Metadata corruption                                                                                                        | a. Display popup toast warning about errors<br>b. optionally ask users to save current edits locally                              | FR-8<br>FR-13<br>H1.1                   | H1.2 |
|                      | Configuration corruptions                                                       | lost users' preferences; degraded users' experience             | a. Configuration schema out of date<br>b. File was corrupted<br>c. Invalid data format                                                                                                                  | a. Maintain config backups<br>b. Validate all changes<br>c. Provide default fallbacks                                             | MNP-DMTNS1<br>UDT-D2<br>FR-5<br>SR-INT5 | H1.3 |
|                      | Ambiguous configuration parameters                                              | confusion; potential for jailbreaking                           | a. Too complex parameters that is not relevant to end-users                                                                                                                                             | a. Display relevant support popup for each parameters                                                                             | MC-S5<br>FR-4                           | H1.4 |
| Inference Engine     | Suggestions for planning fails                                                  | No assistance provided; workflow disrupted                      | a. Server overload<br>b. Model errors<br>c. Resource exhaustion                                                                                                                                         | a. Implement load balancing<br>b. Provide fallback mechanisms<br>c. Monitor server health<br>d. Implement KV cache optimization   | FR-3<br>                                | H2.1 |
|                      | Harmful content suggestions                                                     | Legal liability; inappropriate suggestions, potential user harm | a. [[glossary#sparse autoencoders\|feature steering]] failures<br>b. AI's [[glossary#bias bug\|bias bug]]<br>c. Insufficient filtering and guardrails<br>d. [[glossary#hallucinations\|hallucinations]] | a. Warn upfront as a research preview<br>b. Incorporate manual feedback to improve SAEs generations<br>c. Add relevant guardrails | FR-7<br>FR-11                           | H2.2 |
| Network connections  | Network outages                                                                 | interrupt users flow                                            | a. Electrical outage<br>b. Network congestion<br>c. Server outage                                                                                                                                       | a. Display a toast warning about network outage<br>b. Recommendation to save locally<br>c. Same as H1.1                           | FR-9                                    | H3.1 |
| Authentication       | Privacy breach                                                                  | Exposure of user content, trust                                 | a. Insecure transmission<br>b. Authentication token expire                                                                                                                                              | a. Implement end-to-end encryption<br>b. Secure all inference endpoint                                                            | OER-MR1<br>SR-INT1<br>SR-INT4<br>SR-P1  | H4.1 |
| General              | Overall system unresponsiveness                                                 | Users unable to use the system                                  | a. Memory leak<br>b. Browser limitation<br>c. Resource starvation                                                                                                                                       | a. Optimize memory usage<br>b. Implement early degradation detection and display warning                                          | LAIETMINP-1                             | H5.1 |
| User devices support | Unpredictable system behavior or crashes caused by device-level vulnerabilities | Crashes users system                                            | a. out-dated browsers                                                                                                                                                                                   | a. Recommend users to regularly update their browsers and device firmware<br>b. Same as H1.1                                      | SR-IM1                                  | H6.1 |

## 7. Safety and Security Requirements

<!--Newly discovered requirements. These should also be added to the SRS. (A rationale design process how and why to fake it.)-->

Requirements intended for inclusion in Revision 0.2 of the Security Requirements section of the SRS document are highlighted in bold. Bolded items also include notes explaining the absence of specific requirements.

### 7.1 Access Requirements

**Not applicable given the application is open source, and inference server are exposed over a HTTPS endpoints.**

### 7.2 Integrity Requirements

![[SRS/SRS#15.2 Integrity Requirements|SRSIR]]

> [!important] SR-INT5
>
> Ensure data integrity for local storage

Rationale: Corrupted file format can lead to loss in data, therefore, it is important to ensure data integrity for local storage.

> [!important] SR-INT6
>
> fair feature steering SAEs

Rationale: SAEs must comply to certain features, stay true to trained tonality (for example Raymond Carver's SAEs should depict his writing style), and the system should reject inappropriate suggestions.

### 7.3 Privacy Requirements

![[SRS/SRS#15.3 Privacy Requirements|SRSPR]]

### 7.4 Audit Requirements

![[SRS/SRS#15.4 Audit Requirements|SRSAR]]

### 7.5 Immunity Requirements

![[SRS/SRS#15.5 Immunity Requirements|SRSImR]]

## 8. Roadmap

<!-- Which safety requirements will be implemented as part of the capstone timeline? Which requirements will be implemented in the future? -->

The following roadmap for safety requirements will be divided into three phases:

| Phases | Description                                                                                                                                | Importance | Deadline          | Items      |
| ------ | ------------------------------------------------------------------------------------------------------------------------------------------ | ---------- | ----------------- | ---------- |
| 0      | Immediate risks that should be addressed during implementation phase                                                                       | High (P0)  | Capstone Rev 0    | H1, H2, H4 |
| 1      | Short-term requirements that is optimal to be addressed as soon as possible. Delay/failure to address these won't affect capstone timeline | Med (P1)   | Capstone Demo Day | H3         |
| 2      | Long-term requirements that should be addressed during further iterations                                                                  | Low (P2)   | n/a               | H4, H5     |

_NOTE_: Each of dependent risks/requirements will also be prioritized. For example: H1.1 requires FR-6 and RFA-BR1 to be addressed before said deadline

## Appendix

### Reflection

<!-- 1. What went well while writing this deliverable? -->
<!-- 2. What pain points did you experience during this deliverable, and how did you resolve them? -->
<!-- 3. Which of your listed risks had your team thought of before this deliverable, and which did you think of while doing this deliverable? For the latter ones (ones you thought of while doing the Hazard Analysis), how did they come about? -->
<!-- 4. Other than the risk of physical harm (some projects may not have any appreciable risks of this form), list at least 2 other types of risk in software products. Why are they important to consider? -->

<div class="reflection-container">

<div class="users">
  <a class="name" href="https://github.com/aarnphm">Aaron</a>
</div>

<div class="blob">

1. Reviewing the SRS and the FEMA table to ensure that the requirements are well-defined and clear.

2. references and crystalized some requirements we think of.

3. Most Integritty requirements are already in place, but we need additional SR-INT5, SR-INT6. We think it is good to
   bring it up here instead of SRS (though subject to merge back to [[SRS/SRS]])

4. Two possible risks:

- Data Loss/Corruption Risk: Loss of intellectual property and creative work can be devastating for users> which could
  lead to loss in trust from the users.
- Security Risk: Can lead to exposure of sensitive personal or professional information. May result in compliance violations (GDPR, CCPA, etc.)

</div>

</div>

<br/>

### Revision

| Date          | Developer(s) | Change                                                |
| ------------- | ------------ | ----------------------------------------------------- |
| Sept. 16 2024 | 0.0          | Initial skafolding                                    |
| Oct. 21 2024  | 0.1          | Assumption, Safety and Security Requirements, Roadmap |
| Oct. 21 2024  | 0.2          | Intro, scope                                          |
| Oct. 21 2024  | 0.3          | System boundaries                                     |
| Oct. 24 2024  | 0.4          | Table, Revisions                                      |
