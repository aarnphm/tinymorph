---
id: VnVPlan
tags:
  - meta
author: aarnphm
date: "2024-09-16"
title: System Verification and Validation Plan
---

## Revision History

| Date   | Version | Notes |
| ------ | ------- | ----- |
| Date 1 | 1.0     | Notes |
| Date 2 | 1.1     | Notes |

\wss{The intention of the VnV plan is to increase confidence in the software.
However, this does not mean listing every verification and validation technique
that has ever been devised. The VnV plan should also be a **feasible**
plan. Execution of the plan should be possible with the time and team available.
If the full plan cannot be completed during the time available, it can either be
modified to ``fake it'', or a better solution is to add a section describing
what work has been completed and what work is still planned for the future.}

\wss{The VnV plan is typically started after the requirements stage, but before
the design stage. This means that the sections related to unit testing cannot
initially be completed. The sections will be filled in after the design stage
is complete. the final version of the VnV plan should have all sections filled
in.}

## Symbols, Abbreviations, and Acronyms

| **Symbol** | **Description** |
| ---------- | --------------- |
| T          | Test            |

\wss{symbols, abbreviations, or acronyms --- you can simply reference the SRS
\citep{SRS} tables, if appropriate}

\wss{Remove this section if it isn't needed}

This document ... \wss{provide an introductory blurb and roadmap of the
Verification and Validation plan}

## General Information

### Summary

\wss{Say what software is being tested. Give its name and a brief overview of
its general functions.}

### Objectives

\wss{State what is intended to be accomplished. The objective will be around
the qualities that are most important for your project. You might have
something like: `build confidence in the software correctness,''
  `demonstrate adequate usability.'' etc. You won't list all of the qualities,
just those that are most important.}

\wss{You should also list the objectives that are out of scope. You don't have
the resources to do everything, so what will you be leaving out. For instance,
if you are not going to verify the quality of usability, state this. It is also
worthwhile to justify why the objectives are left out.}

\wss{The objectives are important because they highlight that you are aware of
limitations in your resources for verification and validation. You can't do everything,
so what are you going to prioritize? As an example, if your system depends on an
external library, you can explicitly state that you will assume that external library
has already been verified by its implementation team.}

### Challenge Level and Extras

\wss{State the challenge level (advanced, general, basic) for your project.
Your challenge level should exactly match what is included in your problem
statement. This should be the challenge level agreed on between you and the
course instructor. You can use a pull request to update your challenge level
(in TeamComposition.csv or Repos.csv) if your plan changes as a result of the
VnV planning exercise.}

\wss{Summarize the extras (if any) that were tackled by this project. Extras
can include usability testing, code walkthroughs, user documentation, formal
proof, GenderMag personas, Design Thinking, etc. Extras should have already
been approved by the course instructor as included in your problem statement.
You can use a pull request to update your extras (in TeamComposition.csv or
Repos.csv) if your plan changes as a result of the VnV planning exercise.}

### Relevant Documentation

\wss{Reference relevant documentation. This will definitely include your SRS
and your other project documents (design documents, like MG, MIS, etc). You
can include these even before they are written, since by the time the project
is done, they will be written. You can create BibTeX entries for your
documents and within those entries include a hyperlink to the documents.}

\citet{SRS}

\wss{Don't just list the other documents. You should explain why they are relevant and
how they relate to your VnV efforts.}

## Plan

\wss{Introduce this section. You can provide a roadmap of the sections to
come.}

### Verification and Validation Team

\wss{Your teammates. Maybe your supervisor.
You should do more than list names. You should say what each person's role is
for the project's verification. A table is a good way to summarize this information.}

### SRS Verification Plan

\wss{List any approaches you intend to use for SRS verification. This may
include ad hoc feedback from reviewers, like your classmates (like your
primary reviewer), or you may plan for something more rigorous/systematic.}

\wss{If you have a supervisor for the project, you shouldn't just say they will
read over the SRS. You should explain your structured approach to the review.
Will you have a meeting? What will you present? What questions will you ask?
Will you give them instructions for a task-based inspection? Will you use your
issue tracker?}

\wss{Maybe create an SRS checklist?}

### Design Verification Plan

\wss{Plans for design verification}

\wss{The review will include reviews by your classmates}

\wss{Create a checklists?}

### Verification and Validation Plan Verification Plan

\wss{The verification and validation plan is an artifact that should also be
verified. Techniques for this include review and mutation testing.}

\wss{The review will include reviews by your classmates}

\wss{Create a checklists?}

### Implementation Verification Plan

\wss{You should at least point to the tests listed in this document and the unit
testing plan.}

\wss{In this section you would also give any details of any plans for static
verification of the implementation. Potential techniques include code
walkthroughs, code inspection, static analyzers, etc.}

\wss{The final class presentation in CAS 741 could be used as a code
walkthrough. There is also a possibility of using the final presentation (in
CAS741) for a partial usability survey.}

### Automated Testing and Verification Tools

\wss{What tools are you using for automated testing. Likely a unit testing
framework and maybe a profiling tool, like ValGrind. Other possible tools
include a static analyzer, make, continuous integration tools, test coverage
tools, etc. Explain your plans for summarizing code coverage metrics.
Linters are another important class of tools. For the programming language
you select, you should look at the available linters. There may also be tools
that verify that coding standards have been respected, like flake9 for
Python.}

\wss{If you have already done this in the development plan, you can point to
that document.}

\wss{The details of this section will likely evolve as you get closer to the
implementation.}

### Software Validation Plan

\wss{If there is any external data that can be used for validation, you should
point to it here. If there are no plans for validation, you should state that
here.}

\wss{You might want to use review sessions with the stakeholder to check that
the requirements document captures the right requirements. Maybe task based
inspection?}

\wss{For those capstone teams with an external supervisor, the Rev 0 demo should
be used as an opportunity to validate the requirements. You should plan on
demonstrating your project to your supervisor shortly after the scheduled Rev 0 demo.
The feedback from your supervisor will be very useful for improving your project.}

\wss{For teams without an external supervisor, user testing can serve the same purpose
as a Rev 0 demo for the supervisor.}

\wss{This section might reference back to the SRS verification section.}

## System Tests

\wss{There should be text between all headings, even if it is just a roadmap of
the contents of the subsections.}

### Tests for Functional Requirements

\wss{Subsets of the tests may be in related, so this section is divided into
different areas. If there are no identifiable subsets for the tests, this
level of document structure can be removed.}

\wss{Include a blurb here to explain why the subsections below
cover the requirements. References to the SRS would be good here.}

#### Area of Testing1

\wss{It would be nice to have a blurb here to explain why the subsections below
cover the requirements. References to the SRS would be good here. If a section
covers tests for input constraints, you should reference the data constraints
table in the SRS.}

##### Title for Test

1. **test-id1**

   Control: Manual versus Automatic
   Initial State:
   Input:
   Output: \wss{The expected result for the given inputs. Output is not how you
   are going to return the results of the test. The output is the expected
   result.}

   Test Case Derivation: \wss{Justify the expected value given in the Output field}
   How test will be performed:

2. **test-id2**

   Control: Manual versus Automatic
   Initial State:
   Input:
   Output: \wss{The expected result for the given inputs}

   Test Case Derivation: \wss{Justify the expected value given in the Output field}

   How test will be performed:

#### Area of Testing2

...

### 3.1 Tests for Nonfunctional Requirements

<!--
\wss{The nonfunctional requirements for accuracy will likely just reference the
appropriate functional tests from above. The test cases should mention
reporting the relative error for these tests. Not all projects will
necessarily have nonfunctional requirements related to accuracy.}

\wss{For some nonfunctional tests, you won't be setting a target threshold for
passing the test, but rather describing the experiment you will do to measure
the quality for different inputs. For instance, you could measure speed versus
the problem size. The output of the test isn't pass/fail, but rather a summary
table or graph.}

\wss{Tests related to usability could include conducting a usability test and
survey. The survey will be in the Appendix.}

\wss{Static tests, review, inspections, and walkthroughs, will not follow the
format for the tests given below.}

\wss{If you introduce static tests in your plan, you need to provide details.
How will they be done? In cases like code (or document) walkthroughs, who will
be involved? Be specific.}

#### Area of Testing1

##### Title for Test

1. **test-id1**

   Type: Functional, Dynamic, Manual, Static etc.
   Initial State:
   Input/Condition:
   Output/Result:
   How test will be performed:

2. **test-id2**

   Type: Functional, Dynamic, Manual, Static etc.
   Initial State:
   Input:
   Output:
   How test will be performed:

#### Area of Testing2
...
-->

**3.1.1 Look and Feel**

##### Verify Unified, Non-Intrusive, and Uncluttered Visual Design

**Test ID**: Test-LF-A1

**Type**: Structural, Static, Manual

- **Initial State**: The fully developed tinymorph application is accessible on various devices.
- **Input/Condition**: Access the application UI on different devices and screen sizes.
- **Output/Result**: Confirmation that the UI is unified, non-intrusive, and uncluttered across all interfaces.
- **How test will be performed**: To perform this test we will conduct a design review by assembling a team of UI/UX experts. They will use a predefined checklist based on design guidelines to evaluate the UI, checking for consistency in layout, typography, color schemes, and identifying any elements that are intrusive or cluttered. Additionally, usability testing will be conducted by recruiting 10 target users representing the primary user personas. These users will be provided with common tasks to perform and their interactions will be observed. Feedback will be collected using a survey (see Appendix A), and the results will be analyzed to identify any distractions or issues with the visual design.

**Test ID**: Test-LF-A2

- **Type**: Structural, Static, Manual
- **Initial State**: The application's UI components are fully implemented.
- **Input/Condition**: All UI screens and components are available for review.
- **Output/Result**: Verification that standardized typography and color palettes are consistently applied.
- **How test will be performed**: We will conduct a UI audit using the design system documentation as a reference. Automated tools like style linting software will be utilized to detect inconsistencies in the codebase. Manually, we will verify font sizes, styles, and color codes across different screens to ensure adherence to the design standards. Any deviations will be documented, and recommendations for corrections will be provided to maintain visual coherence throughout the application.

##### Validate Minimalist Design with Monotonic Color Palette

**Test ID**: Test-LF-S1

- **Type**: Structural, Static, Manual
- **Initial State**: The application is ready with the intended design implemented.
- **Input/Condition**: Application is accessed on standard devices.
- **Output/Result**: Confirmation that the design is minimalist and utilizes a monotonic color palette.
- **How test will be performed**: We will evaluate the design by comparing the UI against minimalist design principles, checking for the use of clean lines and the absence of unnecessary elements. The color palette will be verified to ensure it is monotonic, consisting of variations of a single hue. User feedback will be gathered by including questions about the perception of the design in the usability survey (see Appendix A). Responses will be analyzed to determine if users find the design minimalist and focused, contributing to an efficient user experience.

##### Test Responsiveness Across Devices and Orientations

**Test ID**: Test-LF-S2

- **Type**: Structural, Dynamic, Manual
- **Initial State**: The application is deployed and accessible.
- **Input/Condition**: Access the application on devices with various screen sizes and orientations (mobile, tablet, desktop).
- **Output/Result**: The application adapts seamlessly, maintaining functionality and visual integrity.
- **How test will be performed**: We will use physical devices and emulators to test the application across different screen sizes and orientations. Each UI element will be verified to adjust appropriately without distortion or loss of functionality. Accessibility of navigation menus, buttons, and interactive elements will be checked. Any issues related to layout or usability specific to certain devices will be documented for correction.

##### Verify Contrast of Interactive Elements

**Test ID**: Test-LF-S3

- **Type**: Structural, Static, Manual
- **Initial State**: The UI is fully developed.
- **Input/Condition**: Inspect interactive elements (buttons, links) against background colors.
- **Output/Result**: All interactive elements have sufficient contrast to ensure visibility.
- **How test will be performed**: We will use color contrast analyzer tools such as the WCAG Contrast Checker to ensure that the contrast ratios of interactive elements meet at least the WCAG AA standards. Manually, we will inspect these elements under different lighting conditions to confirm their visibility. Any elements failing to meet the standards will be recorded, and appropriate fixes will be suggested to enhance accessibility.

##### Assess Smooth Transitions and Animations

**Test ID**: Test-LF-S4

- **Type**: Structural, Dynamic, Manual
- **Initial State**: Application features transitions and animations.
- **Input/Condition**: Navigate through various sections and features of the application.
- **Output/Result**: Transitions are smooth, and animations are intuitive without causing confusion.
- **How test will be performed**: We will navigate through the application, observing the behavior of transitions and animations. The performance impact of these animations on different devices will be evaluated to ensure they do not hinder the user experience. During usability testing sessions, user reactions to animations will be observed and specific questions regarding their experience will be included in the survey (see Appendix A). Feedback will be analyzed to determine if animations enhance or detract from usability.

##### Verify Visual Feedback for User Interactions

**Test ID**: Test-LF-S5

- **Type**: Structural, Dynamic, Manual
- **Initial State**: Interactive elements are implemented.
- **Input/Condition**: Interact with buttons, links, text fields, and other UI elements.
- **Output/Result**: Immediate visual feedback is provided for all user interactions.
- **How test will be performed**: We will test each interactive element to ensure it provides appropriate visual feedback, such as hover effects and click animations. Form submissions and other actions will be checked for confirmation messages or indicators. During usability tests, users will be asked if the feedback met their expectations. Any elements lacking appropriate feedback will be recorded for further enhancement.


### Traceability Between Test Cases and Requirements

\wss{Provide a table that shows which test cases are supporting which
requirements.}

## Unit Test Description

\wss{This section should not be filled in until after the MIS (detailed design
document) has been completed.}

\wss{Reference your MIS (detailed design document) and explain your overall
philosophy for test case selection.}

\wss{To save space and time, it may be an option to provide less detail in this section.
For the unit tests you can potentially layout your testing strategy here. That is, you
can explain how tests will be selected for each module. For instance, your test building
approach could be test cases for each access program, including one test for normal behaviour
and as many tests as needed for edge cases. Rather than create the details of the input
and output here, you could point to the unit testing code. For this to work, you code
needs to be well-documented, with meaningful names for all of the tests.}

### Unit Testing Scope

\wss{What modules are outside of the scope. If there are modules that are
developed by someone else, then you would say here if you aren't planning on
verifying them. There may also be modules that are part of your software, but
have a lower priority for verification than others. If this is the case,
explain your rationale for the ranking of module importance.}

### Tests for Functional Requirements

\wss{Most of the verification will be through automated unit testing. If
appropriate specific modules can be verified by a non-testing based
technique. That can also be documented in this section.}

#### Module 1

\wss{Include a blurb here to explain why the subsections below cover the module.
References to the MIS would be good. You will want tests from a black box
perspective and from a white box perspective. Explain to the reader how the
tests were selected.}

1. **test-id1**

   Type: \wss{Functional, Dynamic, Manual, Automatic, Static etc. Most will
   be automatic}
   Initial State:
   Input:
   Output: \wss{The expected result for the given inputs}

   Test Case Derivation: \wss{Justify the expected value given in the Output field}

   How test will be performed:

2. **test-id2**

   Type: \wss{Functional, Dynamic, Manual, Automatic, Static etc. Most will
   be automatic}
   Initial State:
   Input:
   Output: \wss{The expected result for the given inputs}

   Test Case Derivation: \wss{Justify the expected value given in the Output field}

   How test will be performed:

3. **...**

#### Module 2

...

### Tests for Nonfunctional Requirements

\wss{If there is a module that needs to be independently assessed for
performance, those test cases can go here. In some projects, planning for
nonfunctional tests of units will not be that relevant.}

\wss{These tests may involve collecting performance data from previously
mentioned functional tests.}

#### Module ?

1. **test-id1**

   Type: \wss{Functional, Dynamic, Manual, Automatic, Static etc. Most will
   be automatic}
   Initial State:
   Input/Condition:
   Output/Result:
   How test will be performed:

2. **test-id2**

   Type: Functional, Dynamic, Manual, Static etc.
   Initial State:
   Input:
   Output:
   How test will be performed:

#### Module ?

...

### Traceability Between Test Cases and Modules

\wss{Provide evidence that all of the modules have been considered.}

## Appendix

This is where you can place additional information.

### Symbolic Parameters

The definition of the test cases will call for SYMBOLIC_CONSTANTS.
Their values are defined in this section for easy maintenance.

### Usability Survey Questions?

\wss{This is a section that would be appropriate for some projects.}

## Appendix --- Reflection

\wss{This section is not required for CAS 741}

The information in this section will be used to evaluate the team members on the
graduate attribute of Lifelong Learning.

\input{../Reflection.tex}

1. What went well while writing this deliverable?

2. What pain points did you experience during this deliverable, and how
   did you resolve them?

3. What knowledge and skills will the team collectively need to acquire to
   successfully complete the verification and validation of your project?
   Examples of possible knowledge and skills include dynamic testing knowledge,
   static testing knowledge, specific tool usage, Valgrind etc. You should look to
   identify at least one item for each team member.

4. For each of the knowledge areas and skills identified in the previous
   question, what are at least two approaches to acquiring the knowledge or
   mastering the skill? Of the identified approaches, which will each team
   member pursue, and why did they make this choice?
