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

- **Description:** The client for tinymorph includes academic institutions, research sponsors, and potentially commercial entities interested in the application of innovative text-editing solutions driven by AI. These entities provide critical oversight and resources.
- **Role:** Clients are responsible for defining the project's scope and deliverables, ensuring funding, and facilitating alignments with broader academic or commercial goals. They play a vital role in strategic decision-making and project validation.

### 2.2 Customer

- **Description:** Customers are diverse and include individual users such as professional writers, journalists, and students. It also includes organizations like content creation agencies and educational institutions that seek advanced tools for text manipulation and generation.
- **Role:** Customers drive user adoption and are key to the project’s market success. Their feedback influences continuous improvement efforts, helping to refine features and ensure the tool remains competitive and relevant.

### 2.3 Other Stakeholders

- **Description:** Includes software vendors, integration partners, and data providers who contribute technology or content essential for tinymorph functionality. This category may also include regulatory bodies if the tool processes sensitive data.
- **Role:** These stakeholders ensure that tinymorph can operate within an ecosystem of technologies, comply with regulations, and maintain data flows that enhance its capabilities to allow extending its utility and reach.

### 2.4 Hands-On Users of the Project

- **Description:** Comprise individuals who interact directly with tinymorph interface such as creative professionals, researchers, and educators. This group is crucial for initial adoption and long-term engagement with the tool.
- **Role:** They provide real-world usability feedback and are instrumental in iterative testing phases. Their experiences help identify practical challenges and opportunities for enhancing user interaction and satisfaction.

### 2.5 Personas

- **Description:** Involved are detailed, representative user profiles based on extensive user research. Personas such as College Researcher, Freelance Writer, or Technical Editor symbolize the diverse user base tinymorph aims to serve. The personas are constructed from typical characteristics, behaviors, and needs observed among potential users. They serve to bring user stories and requirements to life during the development process.
- **Role:** Serve as a focal point during design and development to tailor features, functionality, and user interfaces to meet specific needs and behaviors of different user groups. It ensures the product is versatile and inclusive.

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

LF-A1: The Tinymorph application shall adopt a unified and sophisticated visual design.

Rationale: A uniform and elegant design ensures brand recognition and provides a visually pleasing experience for users, fostering greater engagement and trust in the platform.

LF-A2. The application must utilize a consistent typography system across all user interfaces.

Rationale: Maintaining consistency in typography ensures readability and prevents user distraction or confusion, contributing to a cohesive user experience.

### 10.2 Style Requirements

LF-S1. The design of the application will be minimalist, utilizing clean lines and a limited color palette.

Rationale: A minimalist design emphasizes functionality and content, enhancing usability by directing the user's focus to essential elements. This approach ensures that the interface remains uncluttered and the features more accessible.

LF-S2. The application must be responsive, adapting seamlessly to various device screens and orientations.

Rationale: As users may access the application from different devices with varying screen sizes, responsiveness is essential to provide a consistent experience across all platforms.

LF-S3. Interactive elements such as buttons and links must contrast significantly with the background to ensure visibility and accessibility.

Rationale: High contrast between elements and backgrounds enhances the visibility of interactive features, making navigation intuitive and preventing user frustration.

LF-S4. The user interface should facilitate smooth transitions and logical navigation pathways between different sections and features of the application.

Rationale: Efficient navigation systems reduce user effort in learning how to use the application and increase overall satisfaction by minimizing the time spent on searching for functionalities.

LF-S5. The application should include visual cues and feedback for user interactions to reinforce usability.

Rationale: Providing immediate visual feedback for user actions confirms the system’s responsiveness, which will help users understand the application’s behavior and reduce errors.

## 11. Usability and Humanity Requirements

### 11.1 Ease of Use Requirements

UH-EOU1. Tinymorph shall include a session history feature that records and displays the user's most recent editing activities such as document accesses and text modifications.

Rationale: This functionality streamlines user workflow by providing quick access to recent actions, which reduces the time needed for navigation and increases efficiency.

UH-EOU2. The application must allow users to revise or remove their inputs after submission.

Rationale: The ability to alter or delete content post-submission empowers users with greater control over their work, enhancing the accuracy and relevance of their output.

### 11.2 Personalization and Internationalization Requirements

UH-PI1. Tinymorph must include multilingual support to cater to an international audience.

Rationale: Multilingual support enhances the application’s global accessibility and user engagement, ensuring that users can interact with the platform in their preferred language.

UH-PI2. The application shall provide customizable visual themes, including light and dark modes.

Rationale: Theme customization improves visual comfort and personalization, enabling users to adapt the interface to their visual preferences and working environments.

### 11.3 Learning Requirements

UH-L1. New users should be able to understand basic functionalities and start creating or editing content within 10 minutes of initial use.

Rationale: A straightforward and intuitive onboarding process is critical to ensuring that users can quickly become proficient with the application, leading to higher satisfaction and continued use.

### 11.4 Understandability and Politeness Requirements

UH-UP1. The application should utilize clear and concise language for all instructions, feedback, and user interface elements.

Rationale: Simple and direct language helps to avoid misunderstandings and ensures that the platform is user-friendly, making it accessible to a wide audience regardless of their background.

### 11.5 Accessibility Requirements

UH-A1. Tinymorph should support text resizing without loss of content or functionality.

Rationale: Allowing text resizing helps accommodate users with visual impairments who require larger text to read effectively. Ensuring that the application remains functional and has content accessible at different text sizes guarantees a more inclusive user experience.

UH-A2. The application should ensure that all user interface components are accessible via keyboard navigation.

Rationale: Keyboard navigability is essential for users who cannot use a mouse, including those using screen readers or other assistive technologies. Providing comprehensive keyboard access enhances the functionality and inclusivity of the platform, ensuring all users can efficiently use all features.

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
