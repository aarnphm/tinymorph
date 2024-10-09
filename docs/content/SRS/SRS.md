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

Rational: Open-AI has developed and trained LLM using transformer as NLP, which has been widely tested and used, including the GPT models. Tinymorph will use this model as a base model and combine it with SAE to achieve user personalised feature.

> [!IMPORTANT] RFA-RF2
>
> Using SAEs to extract features from input text

Rational: SAE is a kind of autoencoder that efficient at extracting representations of user input text, and here it includes sparsity to selectively active the neurons in the NN to increase effectiveness. It is build above the Open-AI model to adjust for user preference.

> [!IMPORTANT] RFA-RF3
>
> Tinymorpgh is designed to run on a Web-based interface

Rational: The UI of Tinymorpgh is designed as Web-based, and this will allow it operated on main stream operating system, including Windows, lLinux and macOS. 


> [!IMPORTANT] RFA-RF4
>
> User agreed to submit the content into tinymorph, as well as preference

Rational: Tinymorph will record users' preferences selections and the uploaded file to perform SAE training, especially when user decided on a hosted inference selection. 

> [!IMPORTANT] RFA-RF5
>
> Hardware environment should allow local inference if required

Rational: If user decides a local inference to run SAE, the local hardware environment should be able to arrange GPU and CPU to support relative training. 

### 5.2 Business Rules

> [!IMPORTANT] RFA-BR1
>
> Store the preferences on feature and generated data

Rational: The data generated and user preferred feature should be stored, preventing potential data loss caused by crash.

> [!IMPORTANT] RFA-BR2
>
> Generated text should filter for detrimental content

Rational: All generated data should filter out prohibited words or detrimental content before deliver back to the user. 

### 5.3 Assumptions

> [!IMPORTANT] RFA-A1
>
> User have knowledge background about writing and language training via SAE 

Rational: Since tinymorph target engineers with writing demands as user, some steering and training require the user to have a expectation on the desired direction of training feature, with basic knowledge of steering the text-generating process.


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

- **Local Inference**: When running on a local inference, this system should use the GPU acceleration to reduce latency, making a time-to-first-token quick. Under ideal situation, responses should be returned in less than 1 second for shorter text completions (under 200 tokens) and under 5 seconds for longer completions (up to 1000 tokens).
- **Hosted Inference**: If the user choose to use hosted inference servers, the system should be capable to return results within 1-3 seconds under normal internet conditions.
- **UI Responsiveness**: The user interface should always be responsive, including the special case when processing large inputs or generating complex suggestions. There should not be significant lag when doing actions like scrolling, typing, and doing interaction with panels. 


### 12.2 Safety-Critical Requirements

- **Failure Recovery**: The software should be able to auto save the user's work when there is a crash or system failure. User can bring back the data from last state upon restart, without data loss. 
- **AI Output Filtering**: Harmful generated texts, like those include inappropriate, harmful, or offensive language, should be filtered out.
- **Data Integrity**: This software should ensure that the generated content and the settings from users can be saved and retrieved correctly, without possible corruption over the saved data or preferences. 

### 12.3 Precision or Accuracy Requirements

**AI output Accuracy**: High relevance and accuracy should be ensured over the generated text from this software.
- **SAE Steering Precision**: By using the integration of Sparse Auto-encoders (SAEs), users should be able to effectively control or guide the output generation, without losing text precision or context coherence. 


### 12.4 Robustness or Fault-Tolerance Requirements

- **Fallback to CPU**: In any cases the GPU resources are not available for local inference user, the system can switch to CPU to do the processing with notifying the users about the switch.
- **Error Handling**: Whenever a error that caused by user input, or external data sources, a good handle of the error should be provided to the users, including correct messaging and without crashing or freezing. 


### 12.5 Capacity Requirements

 **Text Input**: The system should be able to handle the documents with various lengths, ranging from short paragraphs (50-100 words) to full essays or reports (up to 10,000 words). There should not be obvious difference on performance.
- **External Data Integration**: This software should be able to integrate and process data that are from multiple external sources in real-time, by uploading files or inputs into the panel, without noticeable delays. 

### 12.6 Scalability or Extensibility Requirements

- **Model Extensibility**: The system should left chances allowing easy integration of additional models or APIs, which benefits the upgrades or language model change in the future.
- **Modular Features**: The architecture should be designed to allow selected features being kept for future use from user, and easy to implement new panels for tuning or introducing new steering techniques.
- **Cross-Platform Scalability**: This software should have consistent performance over different types of devices and screen sizes.  

### 12.7 Longevity Requirements

- **Future-Proofing**: This system should be designed in a way that align with adaptability, suitable for future upgrades to newer language models or libraries. 
- **Cross-Platform Longevity**: Tinymorph should allow operations over different system and devices, making it compatible with future hardware and updated operating system.
- **Regular Updates**: Without touching the core functionality of the system, feasible support should be provided for ongoing model improvements, bug fixes and adding new features. 

## 13. Operational and Environmental Requirements

### 13.1 Expected Physical Environment

- **Device Performance Requirements**: Tinymorph should be optimised on computers to allow local inference operation, but should also allow to run on some low-end devices with limited resources, using server-hosted environments.
- **Power Consumption**: Tinymorph should have functionality to manage power consumption efficiently, especially for users deciding running local inference.


### 13.2 Wider Environment Requirements

- **Internet Connectivity**: A stable internet connection is essential for the users who choose to run the hosted inference or using external sources. Tinymorph should be designed to able to handle various internet speeds, and give correct messages to user if connection or information is lost. 
- **Cross-Platform Usage**: Tinymorph should be able to run on different environment, like various operating systems and adjust to different window size.


### 13.3 Requirements for Interfacing with Adjacent Systems

- **API Interfacing**: Tinymorph should integrate with the external APIs, and here is OpenAI's API. Tinymorph should also be able to handle data sources, getting content from databases.
- **System Interactions**: Tinymorph's editor may need to integrate with word processors and cloud storage systems to export and save their work. 


### 13.4 Productization Requirements

- **Packaging and Distribution**: Tinymorph should be packaged with installers or package managers in a way that easy to distribute across platforms and easy to to updates. 
- **Documentation**: Clear user guide and technical document should be accompanied with the Tinymorph software, easy to access.

### 13.5 Release Requirements

- **Versioning**: Each time the release of tinymorph must be clearly versioned with changelogs outlining new features, bug fixes, and improvements. All modification should also be recorded in relevant documents. 

## 14. Maintainability and Support Requirements

### 14.1 Maintenance Requirements

- **Regular Updates**: Regular updates, including adding features and addressing bugs, should be provided during its life span. 
- **Backward Compatibility**: User's personalised preferences and setups should be kept and compatible with the new updates and maintenance. 


### 14.2 Supportability Requirements

- **User Support**: A platform should be provided for users to drop feedback or issues for request for help. Possible bugs will be reviewed by developer after being received.
  

### 14.3 Adaptability Requirements

- **Cross-Platform Expansion**: Tinymorph should be able to adapt to new platforms and devices, including different screen sizes and different processors.

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