---
id: SRS
tags:
  - meta
author: aarnphm,waleedmalik7,nebrask,lucas-lizhiwei
date: "2024-09-16"
description: "Software Requirements Specification for tinymorph: LLM-steering text editor"
title: Software Requirements Specification
---

See also: [[Checklists/SRS-Checklist|checklist]] and
[[SRS/SRS#Revision|this document revision]]

_The following Software Requirements Specification for `tinymorph` is using [Volere Requirements Specification template](https://www.volere.org/templates/volere-requirements-specification-template/)_

## 1. Purpose of the Project

### 1.1 User Business

[Insert your content here.]

### 1.2 Goals of the Project

[Insert your content here.]

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

### 4.1 Glossary of All Terms, Including Acronyms, Used by Stakeholders involved in the Project

[Insert your content here.]

## 5. Relevant Facts And Assumptions

### 5.1 Relevant Facts

> [!IMPORTANT] RFA-RF1
>
> Using Open-AI as base model of the language model

Rationale: Open-AI has developed and trained LLM using transformer as NLP, which has been widely tested and used, including the GPT models. Tinymorph will use this model as a base model and combine it with SAE to achieve user personalised feature.

> [!IMPORTANT] RFA-RF2
>
> Using SAEs to extract features from input text

Rationale: SAE is a kind of autoencoder that efficient at extracting representations of user input text, and here it includes sparsity to selectively active the neurons in the NN to increase effectiveness. It is build above the Open-AI model to adjust for user preference.

> [!IMPORTANT] RFA-RF3
>
> Tinymorph is designed to run on a Web-based interface

Rationale: The UI of Tinymorph is designed as Web-based, and this will allow it operated on main stream operating system, including Windows, lLinux and macOS. 


> [!IMPORTANT] RFA-RF4
>
> User agreed to submit the content into tinymorph, as well as preference

Rationale: Tinymorph will record users' preferences selections and the file extarction to perform opn model, especially when user decided on a hosted inference selection. 

### 5.2 Business Rules

> [!IMPORTANT] RFA-BR1
>
> Store the preferences on feature and generated data

Rationale: The data generated and user preferred feature should be stored locally, preventing potential data loss caused by crash.

> [!IMPORTANT] RFA-BR2
>
> Generated text should filter for detrimental content

Rationale: All generated data should filter out prohibited words or detrimental content before deliver back to the user. 

### 5.3 Assumptions

> [!IMPORTANT] RFA-A1
>
> User have knowledge background about writing and language via SAE 

Rationale: Since tinymorph target engineers with writing demands as user, some steering require the user to have a expectation on the desired direction of feature, with basic knowledge of steering the text-generating process.

> [!IMPORTANT] RFA-A2
>
> Relative net-connection is provided for tinymorph running

Rationale: Since the user need to run the model remotely, a stable network connection is needed for ragular performance.


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

> [!IMPORTANT] PR-SLR1
>
> When runing host inference, responses should appear after within 1 to 3 seconds

Rationale: When host inference is chosen, under a good network connection environment, tinymorph uses a dependable remote model resources that can return the response within 3 seconds based on user's input.

> [!IMPORTANT] PR-SLR2
>
> Lag should not be apparent or significant in user end, even when receiving output from model on server 

Rationale: When user is using the server's model, generating process and receiving the output should not make big effect on user's interface to cause any significant lagging. 

### 12.2 Safety-Critical Requirements

> [!IMPORTANT] PR-SCR1
>
> There should not be harmful content generated

Rationale: There should be a filter on the returned content to exlude any harmful text like offensive language or inappropriate text. 

> [!IMPORTANT] PR-SCR2
>
> Data and preference should be stored locally to prevent loss on crash

Rationale: All the preference selections and text input from user should be stored on user's local machine to prevent the case of network interaption or local software crash. Thus stored data can help to bring back the process in recovery.

### 12.3 Precision or Accuracy Requirements

> [!IMPORTANT] PR-PAR1
>
> The output text should match user's intentional steering direction, or expectation 

Rationale: The tinymorph should have a good intepretaion on user's input and preferred direction of steering on generating text. Effective control should be provided to user over the generating process.

### 12.4 Robustness or Fault-Tolerance Requirements

> [!IMPORTANT] PR-RFR1
>
> Whenever one type of inference failed to perform, notification will be given and help user

Rationale: Whenever user run the host inference and some failure happened to halt the procedure, a notification will be demonstrated to user to inform about the failure, and use local cached data to do the switch and recovery.

> [!IMPORTANT] PR-RFR2
>
> Helpful error message is provided when a special case happened

Rationale: There might be specail case happened due to unstable internet connection or the input size is over limit. In these cases, an appropriate error message should be provided to user to guide for correction on following steps.

### 12.5 Capacity Requirements

> [!IMPORTANT] PR-CR1
>
> There should be only one task in-process for each user, and no more that 5 users running concurrently

Rationale: Due to the capacity of host server, we put a limit on the number of tasks available for user to run. We only allow each user to have a single task in progress and there should not be more that 5 users submitting request to the server at the same time.

> [!IMPORTANT] PR-CR2
>
> There should not be obvious delay on integrating the user input in panel and the text imported from file

Rationale: Tinymorph should have capability to integrate both the input from user web interface panel as well as the file input, this integration should not bring in lag to significantly affect performance.  

### 12.6 Scalability or Extensibility Requirements

> [!IMPORTANT] PR-SER1
>
> The web-based interface can fit multiple screen sizes and devices 

Rationale: The web-based interface should be able to adjust to different screen sizes and various devices.

### 12.7 Longevity Requirements

> [!IMPORTANT] PR-LR1
>
> Adaptability is reserved for future other language model implementation

Rationale: For the reason that there might be other language model suitable to use, tinymorph should reserve this adaptability to implement new models or libraries. 

> [!IMPORTANT] PR-LR1
>
> Adaptability is reserved for future operating system

Rationale: Since tinymorph reserve the option for user to do local inference, this hardware arrangement need to work well with upcoming operating systems as well. Maintenance might be needed for this longevity.

## 13. Operational and Environmental Requirements

### 13.1 Expected Physical Environment

> [!IMPORTANT] OER-EPE1
>
> Tinymorph should be able to operate on different hardware environment.

Rationale: Tinymorph should be able to arrange the local computing resources well to optimise generating process in user end. 

> [!IMPORTANT] OER-EPE2
>
> Tinymorph should not have huge effect on power consumption 

Rationale: Tinymorph should have the functionality to efficiently manage power consumption, while connecting with the host server. 

### 13.2 Wider Environment Requirements

> [!IMPORTANT] OER-WER1
>
> Tinymorph should be able to handle different internet speed for host inference.

Rationale: If user choose to use a host inference, a stable network connection is needed. Thus tinymorph need to adjust to different internet speed to provide a dependable performance, and give notice if network condition is badly concerned. 

### 13.3 Requirements for Interfacing with Adjacent Systems

> [!IMPORTANT] OER-RIAS1
>
> Tinymorph should have a good intergration with different model.

Rationale: Since tinymorph implements SAEs training over the Open-AI existing model, there need to be agood integration between these two parts.

> [!IMPORTANT] OER-RIAS2
>
> Tinymorph should cooperate with cloud model running well.

Rationale: For hosted inference, since the model is running remotely, the integration between model running and information return need better organized to make the process soomth.

### 13.4 Productization Requirements

> [!IMPORTANT] OER-PR1
>
> Tinymorph have a easy implementation on user side

Rationale: Tinymorph should be easy to implement for user end. Updates and distribution on the user end should also cost little effort.

> [!IMPORTANT] OER-PR1
>
> Updated relevant documentation should be easy to find for user

Rationale: The manual and technical document should be accessed by user without any barrier. Accompanied with the software, corresponding updates should also implemented on documents.

### 13.5 Release Requirements

> [!IMPORTANT] OER-RR1
>
> Version controls and updated information about new release should be recorded

Rationale: There should be a platform or document used to demonstrate the relevant version information and new release updates, like bug fixes and improvements. 

## 14. Maintainability and Support Requirements

### 14.1 Maintenance Requirements

> [!IMPORTANT] OER-RR1
>
> Updates should be provided during tinymorph's life span

Rationale: Regular updates, including adding features and addressing bugs on user end, and iteration on model should be carried out during the tinymorph's life span as maintenance.

### 14.2 Supportability Requirements

> [!IMPORTANT] OER-SR1
>
> Feedback from user should be able to gathered and pass to developers

Rationale: There should be a platform used to gather and record the feedback or report for bugs from end user as supplement for future development. 

### 14.3 Adaptability Requirements

> [!IMPORTANT] OER-AR1
>
> Tinymorph should adapt to main stream OS and devices as running environment

Rationale: Tinymorph should be able to provide services over the common OS including macOS, Windows and linux, and user end should perform well on average hardware environment. 

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

> [!IMPORTANT] CulR-CR1
>
> Tinymorph support English input and output

Rationale: In the first edition of tinymorph development, it only support for English input content and can only generate text in English.

> [!IMPORTANT] CulR-CR2
>
> Culturally inappropriate content is filtered out from output language

Rationale: If there are any inappropriate content specific to the culture of generated output language, they should be filtered out.

> [!IMPORTANT] CulR-CR3
>
> Using left-to-right (LTR) generating habit

Rationale: Currently only LTR habit implemented in the tinymorph to present output. 

## 17. Compliance Requirements

### 17.1 Legal Requirements

> [!IMPORTANT] CompR-LR1
>
> The generated contents is not protectable under US copyright law

Rationale: Since the genereted content invloves Open-AI model output, the generated content is subject to OpenAI's license and terms of use, which is not protectable under US copyright law

> [!IMPORTANT] CompR-LR2
>
> User agrees to send necessary data to host server for return from language model

Rationale: To use the language model in host server, user need to send necessary information based on input text to trigger language model. Users are consent for this data collection.


### 17.2 Standards Compliance Requirements

> [!IMPORTANT] CompR-SCR1
>
> Tinymorph align with standard HTTP protocol

Rationale: Tinymorph adhere to Hypertext Transfer Protocol (HTTP/1.1 and HTTP/2) standards as defined by the Internet Engineering Task Force (IETF) in RFC 2616 (for HTTP/1.1) and RFC 7540 (for HTTP/2).


## 18. Open Issues

[Insert your content here.]

## 19. Off-the-Shelf Solutions

### 19.1 Ready-Made Products

[Insert your content here.]

### 19.2 Reusable Components

[Insert your content here.]

### 19.3 Products That Can Be Copied

[Insert your content here.]

## 20. New Problems

### 20.1 Effects on the Current Environment

[Insert your content here.]

### 20.2 Effects on the Installed Systems

[Insert your content here.]

### 20.3 Potential User Problems

[Insert your content here.]

### 20.4 Limitations in the Anticipated Implementation Environment That May Inhibit the New Product

[Insert your content here.]

### 20.5 Follow-Up Problems

[Insert your content here.]

## 21. Tasks

### 21.1 Project Planning

[Insert your content here.]

### 21.2 Planning of the Development Phases

[Insert your content here.]

## 22. Migration to the New Product

### 22.1 Requirements for Migration to the New Product

[Insert your content here.]

### 22.2 Data That Has to be Modified or Translated for the New System

[Insert your content here.]

## 23. Costs

[Insert your content here.]

## 24. User Documentation and Training

### 24.1 User Documentation Requirements

> [!IMPORTANT] UDT-UDR1
>
> Release notes and version control of tinymorph will be provided 

Rationale: Changes including bug fixes and feature updating should be recorded correctly in release notes and version control software.


> [!IMPORTANT] UDT-UDR1
>
> A help system for user should accompany with the software distribution

Rationale: A help system for user to better familiar with the UI manipulation should be distributed with the software together, and update to the corresponding UI version. 

### 24.2 Training Requirements

> [!IMPORTANT] UDT-TR1
>
> On-demand training resources

Rationale: Tinymorph can provide user relevant reading matarials about SAEs training and implementing principle. User can find them and do self-learning on their demand.

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