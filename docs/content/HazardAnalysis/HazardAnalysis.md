---
id: HazardAnalysis
tags:
  - meta
author: aarnphm
date: "2024-09-16"
title: Hazard Analysis
---

| Date          | Developer(s) | Change             |
| ------------- | ------------ | ------------------ |
| Sept. 16 2024 | 0.0          | Initial skafolding |

## Table of Contents

## 1. Introduction

The tinymorph application is a web-based text editor designed to assist writers in crafting creative content through AI-driven suggestions and planning interfaces. A hazard, in this context, is any potential condition or system failure that can lead to undesirable outcomes for the user or the system. These hazards may arise from system malfunctions, improper user interactions, or issues related to the underlying AI models. Identifying and mitigating these hazards is crucial to ensure that users have a safe and reliable experience.

## 2. Scope and Purpose of Hazard Analysis

The scope of this hazard analysis focuses on key components of the tinymorph system, including the user interface, AI model integration, and local data handling. The analysis aims to identify potential hazards that could lead to various losses, such as:

- Loss of user data, including unsaved content or incorrect suggestions.
- Loss of system functionality, resulting in crashes or unresponsive behavior.
- Loss of user trust due to breaches in data security or privacy.

By examining these hazards, the analysis seeks to outline preventive measures to avoid and minimize these losses, ensuring that the system operates reliably and securely while protecting user content and experience.

## 3. System Boundaries and Components

<!-- Dividing the system into components will help you brainstorm the hazards. You shouldn't do a full design of the components, just get a feel for the major ones. For projects that involve hardware, the components will typically include each individual piece of hardware. If your software will have a database, or an important library, these are also potential components. -->

`tinymorph` is aiming to provide a cross-platform, web-based text editor that embeded LLM steering to help to adjust to user personlized preferences. The system consist of:

**1. System Components Inside the Boundary**
  1. User Interface (UI)
    - User can compose, modify and refine text on the web-based text editing interface.
    - UI of the editor includes components of text editor, steering controller and the real-time display of the model's output
    **- Potential Hazards:**
      - The response is not consistent to user's input
      - Ineffecient redering, freesing or crashes of UI
  2. LLM Inference Engine
    - THis is the core component of the model that handles the request from user to LLM to generate text. 
    **- Potential Hazards:**
      - Incorrect output due to model biases.
      - Performace degration due to the delays from remote LLM API
  3. Model Steering Controls
    - The steering control makes user's preference acts adjustably on the LLM, via SAE training.
    
    - **Potential Hazards:**
      - User may create confusing or harmful outputs by overly tweaking the controls unintentionally. 
      - Steering out of normal parameters results incorrect or unpredictable behavior.
      
**2. External Interfaces and Interactions**
  1. Third-Party APIs (LLM Providers)
    - The system relies on external APIs of LLM providers for performing text generation.
    **- Potential Hazards:**
      - API may experience down time or rate limiting. This may cause interrupt or delay of return.
  2. Network Infrastructure
    - As a web-based tool, tinymorph relies heavily on the network for connecting users to remote inference servers and external APIs to create content.
    
    - **Potential Hazards:**
      - Network outages will impact responsiveness.
      
**3. Components Outside the Boundary**
  1. User Devices and Platforms
    - Although tinymorph  is aiming to run on multiple platforms, the hardware and operating system of user devices are outside the system's control.
    
    - **Potential Hazards:**
      - Device-level vulnerabilities (like outdated browsers) could lead to unpredictable system behavior or crashes.
  2. External Data Storage Services
    -  User need a local third-party storage services to store the preferences locally. These storage services are out of tinymorph's control.
    
    - **Potential Hazards:**
      - Data loss is possible if local third-party storage services crashes.
      
The system boundary in this case includes UI, LLM Inference Engine, Model Steering Controls. The user devices and platforms, local data storage provider, LLM API and user end network infrastructure are not controlled by tinymorph. LLM API is controlled by LLM provider. 

## 4. Definition of Hazard

The definition of a hazard in this document is adapted from Nancy Leveson's work. A hazard is any attribute of `tinymorph` that when combined with specific external conditions, could result in a negative impact on system operations or user experience. In `tinymorph`, hazards are primarily related to security and system integrity, involving any weaknesses or conditions that could lead to compromised system performance, unauthorized access, or unintended system behavior. These hazards are identified to ensure proactive measures are taken to maintain system reliability and protect user interactions.

## 5. Critical Assumptions

<!--These assumptions that are made about the software or system. You should minimize the number of assumptions that remove potential hazards. For instance, you could assume a part will never fail, but it is generally better to include this potential failure mode.-->

No critical assumptions are being made for the `tinymorph` project that would limit the scope of mitigating or eliminating potential hazards.

## 6. Failure Mode and Effect Analysis

Include your FMEA table here. This is the most important part of this document.

The safety requirements in the table do not have to have the prefix SR. The most important thing is to show traceability to your SRS. You might trace to requirements you have already written, or you might need to add new requirements.

If no safety requirement can be devised, other mitigation strategies can be entered in the table, including strategies involving providing additional documentation, and/or test cases.

### 6.1 Hazards Out of Scope

### 6.2 Failure Modes & Effects Analysis Table


## 7. Safety and Security Requirements

<!--Newly discovered requirements. These should also be added to the SRS. (A rationale design process how and why to fake it.)-->

Requirements intended for inclusion in Revision 0.2 of the Security Requirements section of the SRS document are highlighted in bold. Bolded items also include notes explaining the absence of specific requirements.

### 7.1 Access Requirements

**Not applicable given the application is open source, and inference server are exposed over a HTTPS endpoints.**

### 7.2 Integrity Requirements

> [!important] SR-INT1
>
> **All communication between the client UI, backend services, and external APIs must be encrypted using HTTPS.**

Rationale: HTTPS encryption secures data in transit, preventing interception or tampering. It also ensures the confidentiality and integrity of user data and commands.

> [!important] SR-INT2
>
> **Implement DNS security measures to ensure that DNS queries and responses are protected against tampering and spoofing.**

Rationale: Securing DNS interactions prevents attackers from manipulating or rerouting network traffic. This is critical for maintaining the integrity of application data.

> [!important] SR-INT3
>
> **The application will use content security policies to mitigate the risk of XSS attacks.**

Rationale: Content Security Policies (CSP) are an effective security control to prevent XSS attacks by restricting the sources from which scripts can be loaded and executed in the application. CSP will help in safeguarding against data theft and maintain the integrity of the content delivered to users.

> [!important] SR-INT4
>
> **Implement JWT and short-lived tokens to secure session communications.**

Rationale: Utilizing JWT and short-lived tokens for session management enhances security by ensuring that session data remains protected against unauthorized access. This approach helps prevent bad actors from intercepting or tampering with session data, ensuring that user content and session details remain confidential and intact.

### 7.3 Privacy Requirements

> [!important] SR-P1
>
> **The application must ensure that it does not collect or store personal information, adhering strictly to privacy by design principles.**

Rationale: By not collecting personal information, the application minimizes privacy risks and complies with privacy laws and regulations. Avoiding personal data storage also reduces the need for complex data security measures, allowing the project to focus more on enhancing user experience and functionality.

### 7.4 Audit Requirements

> [!important] SR-AU1
>
> **Implement monitoring of interactions with external service providers to ensure their use complies with security policies and performance expectations.**

Rationale: Monitoring interactions with external service providers is essential to ensure they are used within the bounds of security protocols and that their performance aligns with the application's requirements. This helps in detecting any deviations that might compromise security or functionality, allowing for quick mitigation actions to maintain the integrity and reliability of the application services.

### 7.5 Immunity Requirements

> [!important] SR-IM1
>
> **Employ up to date security measures to protect against known threats and vulnerabilities, including regular updates and patches to the software components.**

Rationale: Keeping software updated ensures that known vulnerabilities are addressed, which will protect the application and its data from emerging threats.

> [!important] SR-IM2
>
> **Configure the application to minimize the surface area for attacks by disabling unused services and endpoints.**

Rationale: Minimizing the attack surface reduces the number of potential entry points for attackers, enhancing the overall security of the application. This proactive measure significantly lowers the risk of exploitations and helps maintain system integrity.

## 8. Roadmap

<!-- Which safety requirements will be implemented as part of the capstone timeline? Which requirements will be implemented in the future? -->

The hazard analysis for `tinymorph` has identified several new security requirements, outlined in the section above. These requirements aim to enhance user privacy, data integrity, and overall application security. Due to time and resource constraints, some of these requirements will be integrated into the final application, while others may be postponed for future iterations. As the project progresses, the most critical security measures will be prioritized. Toward the end of the project, the hazard analysis will be revisited to assess which risks have been addressed and which still require attention, ensuring that unresolved issues are documented for future improvement.

## Appendix --- Reflection

Not required for CAS 741

1. What went well while writing this deliverable?
2. What pain points did you experience during this deliverable, and how did you resolve them?
3. Which of your listed risks had your team thought of before this deliverable, and which did you think of while doing this deliverable? For the latter ones (ones you thought of while doing the Hazard Analysis), how did they come about?
4. Other than the risk of physical harm (some projects may not have any appreciable risks of this form), list at least 2 other types of risk in software products. Why are they important to consider?


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

The hazard analysis process went well in terms of identifying potential risks within the `tinymorph` project. The structured approach allowed us to effectively define the system boundaries, assess the components involved, and categorize hazards by focusing on different aspects such as system integrity, security, and user experience. Collaborating as a team to discuss and refine these hazards helped ensure a better understanding of possible system vulnerabilities. Breaking down the analysis into well defined sections allowed for greater organization and helped us consider multiple perspectives on the potential risks to both users and the system.

One of the pain points we experienced was determining the level of detail required for defining hazards and the justifications for the safety and security requirements. It was challenging to decide how specific each hazard needed to be without overcomplicating the document. To resolve this we opted for a balance between general definitions and more detailed justifications, making sure each hazard's implications were understood without overwhelming the document with unnecessary technical details. Another issue was the integration of third-party API related hazards. Understanding the exact scope of our control over these external components was difficult, so we spent time clarifying system boundaries and ensuring that our analysis accurately reflected the control we had over each component.

Before starting this deliverable, we had already identified risks related to data privacy, data integrity, and maintaining a consistent user experience. However, during the hazard analysis process new risks emerged such as incorrect or harmful outputs from the model steering controls and the risks associated with steering the LLM beyond normal parameters. These risks came about when we examined the system from a more user-centered perspective and considered potential unintended outcomes from users tweaking model parameters excessively. Additionally, hazards associated with third party API downtime or rate limiting became more apparent as we started detailing the components outside our system boundary and recognizing our reliance on those external systems.

Two other significant risks in software products include data privacy risks and user experience risks. Data privacy risks involve improper handling of sensitive user information, which can lead to security breaches and legal consequences. It's crucial to minimize privacy risks to protect user trust and comply with data protection laws. User experience risks can arise from confusing or inconsistent interfaces, poor system performance, or model-generated content that misaligns with user expectations. Poor user experience can result in reduced adoption of the product and overall dissatisfaction, directly impacting the success of the project. Both of these risks are important to consider because they affect how users perceive and trust the software, which is critical for the long term viability of the `tinymorph` project.


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
<p>


</p>
</div>

</div>