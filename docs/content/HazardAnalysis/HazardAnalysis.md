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

Tinymorph system is aiming to provide a cross-platform, web-based text editor that embeded LLM steering to help to adjust to user personlized preferences. The system consist of:

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
    **- Potential Hazards:**
      - User may create confusing or harmful outputs by overly tweaking the controls unintentionally. 
      - Steering out of normal parameters results incorrect or unpredictable behavior.
**2. External Interfaces and Interactions**
  1. Third-Party APIs (LLM Providers)
  3. Network Infrastructure
**3. Components Outside the Boundary**
  1. User Devices and Platforms

## Critical Assumptions

These assumptions that are made about the software or system. You should minimize the number of assumptions that remove potential hazards. For instance, you could assume a part will never fail, but it is generally better to include this potential failure mode.

## Failure Mode and Effect Analysis

Include your FMEA table here. This is the most important part of this document.

The safety requirements in the table do not have to have the prefix SR. The most important thing is to show traceability to your SRS. You might trace to requirements you have already written, or you might need to add new requirements.

If no safety requirement can be devised, other mitigation strategies can be entered in the table, including strategies involving providing additional documentation, and/or test cases.

## Safety and Security Requirements

Newly discovered requirements. These should also be added to the SRS. (A rationale design process how and why to fake it.)

## Roadmap

Which safety requirements will be implemented as part of the capstone timeline? Which requirements will be implemented in the future?

## Appendix --- Reflection

Not required for CAS 741

1. What went well while writing this deliverable?
2. What pain points did you experience during this deliverable, and how did you resolve them?
3. Which of your listed risks had your team thought of before this deliverable, and which did you think of while doing this deliverable? For the latter ones (ones you thought of while doing the Hazard Analysis), how did they come about?
4. Other than the risk of physical harm (some projects may not have any appreciable risks of this form), list at least 2 other types of risk in software products. Why are they important to consider?
