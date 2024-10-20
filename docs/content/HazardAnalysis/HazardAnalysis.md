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

## Introduction

You can include your definition of what a hazard is here.

## Scope and Purpose of Hazard Analysis

You should say what **loss** could be incurred because of the hazards.

## System Boundaries and Components

Dividing the system into components will help you brainstorm the hazards. You shouldn't do a full design of the components, just get a feel for the major ones. For projects that involve hardware, the components will typically include each individual piece of hardware. If your software will have a database, or an important library, these are also potential components.

## Critical Assumptions

<!--These assumptions that are made about the software or system. You should minimize the number of assumptions that remove potential hazards. For instance, you could assume a part will never fail, but it is generally better to include this potential failure mode.-->

No critical assumptions are being made for the `tinymorph` project that would limit the scope of mitigating or eliminating potential hazards.

## Failure Mode and Effect Analysis

Include your FMEA table here. This is the most important part of this document.

The safety requirements in the table do not have to have the prefix SR. The most important thing is to show traceability to your SRS. You might trace to requirements you have already written, or you might need to add new requirements.

If no safety requirement can be devised, other mitigation strategies can be entered in the table, including strategies involving providing additional documentation, and/or test cases.

## 15 Safety and Security Requirements

<!--Newly discovered requirements. These should also be added to the SRS. (A rationale design process how and why to fake it.)-->

Requirements intended for inclusion in Revision 1 of the Security Requirements section of the SRS document are highlighted in bold. Bolded items also include notes explaining the absence of specific requirements.

### 15.1 Access Requirements

**Not applicable given the application is open source, and inference server are exposed over a HTTPS endpoints.**

### 15.2 Integrity Requirements

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

### 15.3 Privacy Requirements

> [!important] SR-P1
>
> **The application must ensure that it does not collect or store personal information, adhering strictly to privacy by design principles.**

Rationale: By not collecting personal information, the application minimizes privacy risks and complies with privacy laws and regulations. Avoiding personal data storage also reduces the need for complex data security measures, allowing the project to focus more on enhancing user experience and functionality.

### 15.4 Audit Requirements

> [!important] SR-AU1
>
> **Implement monitoring of interactions with external service providers to ensure their use complies with security policies and performance expectations.**

Rationale: Monitoring interactions with external service providers is essential to ensure they are used within the bounds of security protocols and that their performance aligns with the application's requirements. This helps in detecting any deviations that might compromise security or functionality, allowing for quick mitigation actions to maintain the integrity and reliability of the application services.

### 15.5 Immunity Requirements

> [!important] SR-IM1
>
> **Employ up to date security measures to protect against known threats and vulnerabilities, including regular updates and patches to the software components.**

Rationale: Keeping software updated ensures that known vulnerabilities are addressed, which will protect the application and its data from emerging threats.

> [!important] SR-IM2
>
> **Configure the application to minimize the surface area for attacks by disabling unused services and endpoints.**

Rationale: Minimizing the attack surface reduces the number of potential entry points for attackers, enhancing the overall security of the application. This proactive measure significantly lowers the risk of exploitations and helps maintain system integrity.

## Roadmap

<!-- Which safety requirements will be implemented as part of the capstone timeline? Which requirements will be implemented in the future? -->

The hazard analysis for `tinymorph` has identified several new security requirements, outlined in the section above. These requirements aim to enhance user privacy, data integrity, and overall application security. Due to time and resource constraints, some of these requirements will be integrated into the final application, while others may be postponed for future iterations. As the project progresses, the most critical security measures will be prioritized. Toward the end of the project, the hazard analysis will be revisited to assess which risks have been addressed and which still require attention, ensuring that unresolved issues are documented for future improvement.

## Appendix --- Reflection

Not required for CAS 741

1. What went well while writing this deliverable?
2. What pain points did you experience during this deliverable, and how did you resolve them?
3. Which of your listed risks had your team thought of before this deliverable, and which did you think of while doing this deliverable? For the latter ones (ones you thought of while doing the Hazard Analysis), how did they come about?
4. Other than the risk of physical harm (some projects may not have any appreciable risks of this form), list at least 2 other types of risk in software products. Why are they important to consider?
