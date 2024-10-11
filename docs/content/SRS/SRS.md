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

MC-S1. Base models for generations should be open weights (Pythia, Phi-3, Llama 3.2, etc.)

rationale: SAEs require access to models' layer activations to extrapolate specific feature activations. Therefore, accessing the model weight is crucial in training SAEs for guiding activations.

MC-S2. All model inferences must be compatible with OpenAI's API specifications, ensuring interoperability with existing systems.

MC-S3. The solution must be web-based, and accessible from standard web browsers (Chrome, Firefox, Safari) without requiring installation or browser-specific extensions.

MC-S4. The user interface must follow a file-over-app architecture, avoiding a full application installation for minimal system dependencies.

MC-S5. Personalization features, such as user preferences for tone or style, must remain within predefined limits to ensure compatibility with the model's underlying architecture.

MC-S6. There shall be no explicit storage of user-specific content on external servers 

### 3.2 Implementation Environment of the Current System

MC-I1. The implementation environment must support modern HTML, JavaScript, and CSS for front-end development.

MC-I2. Server-side components must be compatible with widely-used web frameworks such as Node.js or Flask, ensuring ease of deployment across different cloud providers.

MC-I3. The current system must support cloud-based inference using APIs (e.g., OpenAI, BentoML) and local inference with GPU acceleration.

MC-I4. The implementation must accommodate scaling via BentoML infrastructure to handle increased load during periods of high traffic.

### 3.3 Partner or Collaborative Applications

MC-P1. The system must integrate with collaboration tools such as Windows Notepad, Apple Notes, and GitHub, enabling users to export, sync, or share their content across these platforms.

### 3.4 Off-the-Shelf Software

MC-O1. Off-the-shelf language models (e.g., GPT-3, Llama 2) must be used for initial POC development.

### 3.5 Anticipated Workplace Environment

MC-A1. The system must be developed with remote collaboration in mind, allowing team members to work asynchronously using tools like GitHub and Slack for version control and communication.

MC-A2. All developers must use industry-standard tools (e.g., Visual Studio Code, PyCharm, Git) to ensure consistency in code quality, collaboration, and version management.

MC-A3. Unit and integration testing must be supported using continuous integration tools like GitHub Actions to ensure stability across environments.


### 3.6 Schedule Constraints

MC-S1. The system must be completed by the end of the capstone project’s official timeline, leaving time for user testing, bug fixes, and revisions before the final presentation.

MC-S2. Preliminary research, including design thinking and proof of concept development, must be completed within the first 3 months to ensure that enough time is left for more complex engineering work (e.g., model integration).

MC-S3. If training new models, the total time required for training and validation must not exceed 4 weeks, including any hyperparameter tuning, to ensure the project remains on schedule.


### 3.7 Budget Constraints

[Insert your content here.]

### 3.8 Enterprise Constraints

MC-E1. All software and tools used in tinymorph must comply with the Apache 2.0 license under which the project is being developed. Any third-party libraries or software must also adhere to compatible open-source licenses.

## 4. Naming Conventions and Terminology

### 4.1 Glossary of All Terms, Including Acronyms, Used by Stakeholders involved in the Project

[Insert your content here.]

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

FR-1. The system shall generate text suggestions based on user input in real-time, allowing users to continuously write while receiving suggestions for the next words, sentences, or paragraphs.

FR-2. The system shall provide users with manual control over text generation by enabling them to select steering options like tone, style, or creativity level.

FR-3. Users shall be able to interact with generated text through a left-to-right feedback panel that lets them modify model behavior in real-time by providing feedback on individual suggestions.

FR-4. Users shall be able to set preferences for tone, style, voice, and formality, which the system will apply to all future generations of text.

FR-5. Users shall be able to save their preferred configurations as profiles, enabling them to switch between different writing styles or goals (e.g., academic writing, casual blog posts, fiction writing).

FR-6. The system shall allow users to upload custom system prompts (e.g., "Write like Hemingway" or "Adopt a motivational tone") to influence the overall behavior of the model.

FR-7. The system shall allow users to navigate through their text non-linearly by providing a visual map or tree view that displays key points, topics, or sections.

FR-8. The system shall provide explanations and recommendations for adjusting each hyperparameter, allowing users to better understand how changes will affect the model's output.

FR-9. For each generated text suggestion, the system shall present multiple alternatives, which users can choose from, modify, or combine to form the final text.

FR-10. Users shall be able to click on a specific part of the text and select from a dropdown of alternative phrasings or sentence structures generated by the model.

FR-11. The system shall offer version control features, enabling users to revert to previous versions of the document or compare different drafts side-by-side.

FR-12. The system shall support an offline mode where users can continue to write and interact with the editor without internet access, using pre-downloaded or locally hosted language models for text generation.

FR-13. The system shall automatically sync user data and documents when internet access is restored, ensuring that no work is lost during offline writing sessions.

FR-14. Users shall be able to set specific writing goals (e.g., word count, tone consistency, argument development) which the system will track and offer suggestions to help them meet those goals.

FR-15. The system shall provide progress tracking and feedback on goals, such as word count meters, tone analysis, and style consistency checks, helping users to stay aligned with their original intentions.

FR-16. The system shall support text input and generation in multiple languages, enabling users to switch between languages within the same document or work in multilingual environments.

FR-17. The system shall offer translation features, allowing users to translate model-generated text between languages, while maintaining the original meaning and tone as closely as possible.

FR-18. The system shall include standard text editing tools such as bold, italic, underline, strikethrough, and highlighting, enabling users to format their text as they write.

FR-19. The system shall allow users to track changes, providing an option to view a history of edits and revert to previous versions of their text.

FR-20. The system shall offer a grammar and style checker that runs in the background, highlighting potential issues and offering suggestions for improvement without interrupting the writing flow.

FR-21. The system shall allow users to categorize and tag different sections of their text (e.g., introduction, argument, conclusion), enabling better organization and navigation within large documents.

FR-22. Users shall be able to generate an automatic outline of their document based on its structure, providing a high-level overview of the content and enabling quick access to specific sections.

FR-23. The system shall allow users to export their documents in a variety of formats, including .docx, .pdf, .md (Markdown), and plain text, ensuring compatibility with external platforms.

FR-24: The system shall allow users to customize the visual appearance of the editor by choosing from different themes, including dark mode, light mode, and high-contrast options.


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
