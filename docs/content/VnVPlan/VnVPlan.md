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

**Test-LF-A1**

**Type**: Structural, Static, Manual

- **Initial State**: The fully developed `tinymorph` application is accessible on various devices.
- **Input/Condition**: Access the application UI on different devices and screen sizes.
- **Output/Result**: Confirmation that the UI is unified, non-intrusive, and uncluttered across all interfaces.
- **How test will be performed**: To perform this test we will conduct a design review by assembling a team of UI/UX experts. They will use a predefined checklist based on design guidelines to evaluate the UI, checking for consistency in layout, typography, color schemes, and identifying any elements that are intrusive or cluttered. Additionally, usability testing will be conducted by recruiting 10 target users representing the primary user personas. These users will be provided with common tasks to perform and their interactions will be observed. Feedback will be collected using a survey (see Appendix A), and the results will be analyzed to identify any distractions or issues with the visual design.

**Test-LF-A2**

- **Type**: Structural, Static, Manual
- **Initial State**: The application's UI components are fully implemented.
- **Input/Condition**: All UI screens and components are available for review.
- **Output/Result**: Verification that standardized typography and color palettes are consistently applied.
- **How test will be performed**: We will conduct a UI audit using the design system documentation as a reference. Automated tools like style linting software will be utilized to detect inconsistencies in the codebase. Manually, we will verify font sizes, styles, and color codes across different screens to ensure adherence to the design standards. Any deviations will be documented, and recommendations for corrections will be provided to maintain visual coherence throughout the application.

##### Validate Minimalist Design with Monotonic Color Palette

**Test-LF-S1**

- **Type**: Structural, Static, Manual
- **Initial State**: The application is ready with the intended design implemented.
- **Input/Condition**: Application is accessed on standard devices.
- **Output/Result**: Confirmation that the design is minimalist and utilizes a monotonic color palette.
- **How test will be performed**: We will evaluate the design by comparing the UI against minimalist design principles, checking for the use of clean lines and the absence of unnecessary elements. The color palette will be verified to ensure it is monotonic, consisting of variations of a single hue. User feedback will be gathered by 10 random users, including questions about the perception of the design in the usability survey (see Appendix A). Responses will be analyzed to determine if users find the design minimalist and focused, contributing to an efficient user experience.

##### Test Responsiveness Across Devices and Orientations

**Test-LF-S2**

- **Type**: Structural, Dynamic, Manual
- **Initial State**: The application is deployed and accessible.
- **Input/Condition**: Access the application on devices with various screen sizes and orientations (mobile, tablet, desktop).
- **Output/Result**: The application adapts seamlessly, maintaining functionality and visual integrity.
- **How test will be performed**: We will use physical devices and emulators to test the application across different screen sizes and orientations. Each UI element will be verified to adjust appropriately without distortion or loss of functionality. Accessibility of navigation menus, buttons, and interactive elements will be checked. Any issues related to layout or usability specific to certain devices will be documented for correction.

##### Verify Contrast of Interactive Elements

**Test-LF-S3**

- **Type**: Structural, Static, Manual
- **Initial State**: The UI is fully developed.
- **Input/Condition**: Inspect interactive elements (buttons, links) against background colors.
- **Output/Result**: All interactive elements have sufficient contrast to ensure visibility.
- **How test will be performed**: We will use color contrast analyzer tools such as the WCAG Contrast Checker to ensure that the contrast ratios of interactive elements meet at least the WCAG AA standards. Manually, we will inspect these elements under different lighting conditions to confirm their visibility. Any elements failing to meet the standards will be recorded, and appropriate fixes will be suggested to enhance accessibility.

##### Assess Smooth Transitions and Animations

**Test-LF-S4**

- **Type**: Structural, Dynamic, Manual
- **Initial State**: Application features transitions and animations.
- **Input/Condition**: Navigate through various sections and features of the application.
- **Output/Result**: Transitions are smooth, and animations are intuitive without causing confusion.
- **How test will be performed**: We will navigate through the application, observing the behavior of transitions and animations. The performance impact of these animations on different devices will be evaluated to ensure they do not hinder the user experience. During usability testing sessions, user reactions to animations will be observed and specific questions regarding their experience will be included in the survey (see Appendix A). Feedback will be analyzed to determine if animations enhance or detract from usability.

##### Verify Visual Feedback for User Interactions

**Test-LF-S5**

- **Type**: Structural, Dynamic, Manual
- **Initial State**: Interactive elements are implemented.
- **Input/Condition**: Interact with buttons, links, text fields, and other UI elements.
- **Output/Result**: Immediate visual feedback is provided for all user interactions.
- **How test will be performed**: We will test each interactive element to ensure it provides appropriate visual feedback, such as hover effects and click animations. Form submissions and other actions will be checked for confirmation messages or indicators. During usability tests, users will be asked if the feedback met their expectations. Any elements lacking appropriate feedback will be recorded for further enhancement.


#### 3.2.2 Usability and Humanity

##### Evaluate Session History Feature

**Test-UH-EOU1**

- **Type**: Structural, Dynamic, Manual
- **Initial State**: Session history functionality is implemented.
- **Input/Condition**: Perform a series of editing activities, including opening documents and making text modifications.
- **Output/Result**: The session history accurately records and displays recent activities.
- **How test will be performed**: We will execute predefined editing tasks and then access the session history to verify that the recorded entries correspond accurately to the actions taken. For usability evaluation, test users will be asked to utilize the session history to navigate to previous activities. Feedback on the ease of use and usefulness of the feature will be collected through observations and specific survey questions (see Appendix A), helping to identify any areas for improvement.

##### Test Interactive Review and Manual Acceptance of Suggestions

**Test-UH-EOU2**

- **Type**: Structural, Dynamic, Manual
- **Initial State**: Suggestion system is operational.
- **Input/Condition**: Submit text inputs to receive suggestions from the system.
- **Output/Result**: Users can interactively review and accept or reject suggestions.
- **How test will be performed**: We will generate suggestions by editing a document and verify that they appear appropriately. The functionality to accept or reject each suggestion will be tested thoroughly. Users will be observed during the testing to assess whether they can easily manage and interact with the suggestions. Surveys will be administered to gather user experiences and feedback regarding the suggestion interface (see Appendix A).

##### Assess the Planning Interface

**Test-UH-EOU3**

- **Type**: Structural, Dynamic, Manual
- **Initial State**: Planning interface is accessible.
- **Input/Condition**: Use the planning interface to organize and adjust creative writing steps.
- **Output/Result**: Users can effectively organize and debug their writing using the interface.
- **How test will be performed**: Users will be provided with a writing task that requires planning and organization. They will be instructed to use the planning interface to outline and refine their ideas. Observations will be made on how intuitively they navigate and utilize the features. Feedback on the interface's effectiveness and usability will be collected through surveys and interviews (see Appendix A), aiding in identifying any enhancements needed.

##### Verify Multilingual Support

**Test-UH-PI1**

- **Type**: Structural, Dynamic, Manual
- **Initial State**: Multilingual features are implemented.
- **Input/Condition**: Change the application language settings to supported languages.
- **Output/Result**: The interface displays correctly in all supported languages.
- **How test will be performed**: We will switch the application language to each supported language such as English, Spanish, and French. All UI elements, messages, and prompts will be checked for accurate translation. Text alignment and formatting will be verified for proper display. Native speakers will be involved to assess linguistic accuracy and cultural appropriateness, ensuring the interface is user-friendly across different languages.

##### Test Theme Customization Options

**Test-UH-PI2**

- **Type**: Structural, Dynamic, Manual
- **Initial State**: Theme options (light and dark mode) are available.
- **Input/Condition**: Toggle between light and dark modes manually and via system settings.
- **Output/Result**: The application correctly applies the selected theme without visual issues.
- **How test will be performed**: We will manually change themes within the application settings and observe the resulting UI changes. System settings on devices will also be adjusted to light or dark mode to check if the application adapts accordingly. All UI elements will be verified for visibility and legibility in both modes. User preferences and satisfaction with the theme options will be gathered through surveys to assess the effectiveness of the customization.

##### Measure Onboarding Time for New Users

**Test-UH-L1**

- **Type**: Structural, Dynamic, Manual
- **Initial State**: The application is ready for first-time use.
- **Input/Condition**: Provide new users with access to the application without prior instruction.
- **Output/Result**: Users begin creating or editing content within 10 minutes.
- **How test will be performed**: Participants who have not previously used `tinymorph` will be recruited for this test. Each user will be timed from the moment they start until they successfully create or edit content, aiming to achieve this within 10 minutes. Any obstacles or points of confusion encountered will be noted. Feedback on the onboarding experience will be collected to identify areas where the process can be improved.

##### Evaluate Clarity of Language in UI

**Test-UH-UP1**

- **Type**: Structural, Static, Manual
- **Initial State**: All UI text and instructions are finalized.
- **Input/Condition**: Review and use the application focusing on language used in instructions and feedback.
- **Output/Result**: Confirmation that language is clear, concise, and easily understood.
- **How test will be performed**:  Readability assessment tools such as the Flesch-Kincaid Grade Level will be used to evaluate the language complexity. During usability tests, users will be asked if they found any instructions or messages unclear. Survey questions about the understandability of UI language will be included to gather comprehensive feedback.

##### Test Text Resizing Functionality

**Test-UH-A1**

- **Type**: Structural, Dynamic, Manual
- **Initial State**: The application supports text resizing.
- **Input/Condition**: Adjust text size settings in the application and browser.
- **Output/Result**: Text resizes appropriately without loss of content or functionality.
- **How test will be performed**: We will adjust text sizes using both browser zoom functions and application settings to increase and decrease text size. The application will be tested at various magnification levels to ensure that all content remains visible and functional. We will check for issues like text overflow, truncation, or overlapping elements. Compatibility with screen magnifiers and other assistive tools will be tested to ensure accessibility for users with visual impairments.

##### Verify Keyboard Navigation Accessibility

**Test-UH-A2**

- **Type**: Structural, Dynamic, Manual
- **Initial State**: Application is fully developed.
- **Input/Condition**: Navigate the application using only the keyboard.
- **Output/Result**: All UI components are accessible via keyboard.
- **How test will be performed**: We will navigate through the application using only the keyboard, primarily the 'Tab' key, to move through interactive elements. Focus indicators will be checked for visibility and logical progression. Functionality of buttons, links, and form fields will be tested using keyboard inputs like 'Enter' and 'Space'. Common tasks such as creating a document or changing settings will be performed without the use of a mouse to ensure full keyboard accessibility.

##### Implement and Test ARIA Attributes

**Test-UH-A3**

- **Type**: Structural, Static, Manual
- **Initial State**: ARIA attributes are implemented in the code.
- **Input/Condition**: Use assistive technologies (e.g., screen readers) to interact with the application.
- **Output/Result**: All functionalities are conveyed and usable through assistive technologies.
- **How test will be performed**: A code review will be conducted to ensure correct implementation of ARIA roles, states, and properties. Screen readers like NVDA and JAWS will be used to navigate the application, verifying that all interactive elements are announced properly and that users can access all functionalities. Feedback from users who rely on assistive technologies will be collected to identify any accessibility issues and make necessary improvements.

#### 3.2.3 Performance

##### Measure Time-to-First-Token (TTFT)

**Test-PR-SLR1**

- **Type**: Structural, Dynamic, Automatic
- **Initial State**: The inference server and application are operational.
- **Input/Condition**: Submit requests for suggestions and planning.
- **Output/Result**: TTFT is between 200-500ms.
- **How test will be performed**: Performance testing tools will be used to automatically simulate user requests for suggestions and planning features. The time from request submission to the receipt of the first token will be recorded. Tests will be conducted under various network conditions including different latencies, to assess performance across typical user scenarios. The results will be compiled into a report detailing average TTFT and any deviations, ensuring the application's responsiveness meets the specified requirements.

##### Evaluate Throughput of Inference Server

**Test-PR-SLR2**

- **Type**: Structural, Dynamic, Automatic
- **Initial State**: Inference server is set up with batch processing capabilities.
- **Input/Condition**: Send batched requests with a batch size of 4.
- **Output/Result**: Achieve approximately 300 tokens/sec throughput.
- **How test will be performed**: Load testing tools will automatically send concurrent batched requests to the inference server. The number of tokens processed per second will be measured over multiple test runs. Server resource utilization including CPU, GPU, and memory will be analyzed to identify any bottlenecks. If the throughput is below the desired level, optimizations will be recommended to enhance performance.

##### Validate Non-Harmful Suggestions

**Test-PR-SCR1**

- **Type**: Structural, Dynamic, Automatic
- **Initial State**: Suggestion generation feature is active with SAEs in place.
- **Input/Condition**: Input texts that could potentially trigger offensive or inappropriate content.
- **Output/Result**: Suggestions are appropriate and free of harmful language.
- **How test will be performed**: An automated test suite containing inputs that may trigger offensive or inappropriate content will be created. Suggestions generated from these inputs will be automatically scanned using content moderation tools to detect harmful language. Any instances of inappropriate content will be flagged, and adjustments to the SAEs and content filtering mechanisms will be made to prevent future occurrences.

##### Ensure Interface Contains Only Safe Content

**Test-PR-SCR2**

- **Type**: Structural, Static, Automatic
- **Initial State**: All UI elements and assets are integrated.
- **Input/Condition**: Review all images, icons, and media used in the application.
- **Output/Result**: Confirmation that there is no NSFW or harmful content.
- **How test will be performed**: Automated image analysis tools will be used to scan all graphical assets for inappropriate content. Licenses and sources of third-party assets will be verified automatically where possible. Any content detected as unsuitable will be reviewed manually for confirmation and then replaced or removed to maintain a safe user environment.

##### Test Accuracy of Generated Text Matching User Steering

**Test-PR-PAR1**

- **Type**: Structural, Dynamic, Automatic
- **Initial State**: SAEs and steering functionalities are implemented.
- **Input/Condition**: Provide steering inputs (e.g., tone, style) and generate text.
- **Output/Result**: Generated text aligns with user inputs and feedback.
- **How test will be performed**: Specific steering parameters will be defined, and automated scripts will generate text outputs based on these inputs. Analytical metrics like cosine similarity and stylistic analysis tools will be used to quantitatively assess the alignment between the generated text and the steering inputs. Results will be compiled to evaluate the system's responsiveness and adjustments will be made to improve accuracy where necessary.

#####  Verify Notification on Inflight Request Failures

**Test-PR-RFR1**

- **Type**: Structural, Dynamic, Automatic
- **Initial State**: Application is connected to the inference server.
- **Input/Condition**: Simulate inflight request failures (e.g., network disruptions).
- **Output/Result**: Users receive a notification toast informing them of the failure.
- **How test will be performed**: Automated testing tools will simulate network disruptions and monitor the application's response. The appearance of the notification toast will be verified automatically, and the content of the message will be checked for clarity and actionability. The ability of users to resubmit requests or revert steps will be tested to ensure proper error handling.

##### Test Deployment Strategy for Fault Tolerance

**Test-PR-RFR2**

- **Type**: Structural, Dynamic, Automatic
- **Initial State**: Application is deployed on a Kubernetes cluster.
- **Input/Condition**: Simulate node or replica failures.
- **Output/Result**: Deployment is recreated automatically, maintaining availability.
- **How test will be performed**: Automated scripts will intentionally fail pods or nodes within the Kubernetes cluster. Monitoring tools will automatically track the system's response and recovery time, verifying that deployments are recreated as with the fault tolerance strategy. Application availability will be checked continuously to ensure minimal impact on users.

##### Assess Asynchronous Processing of Suggestions

**Test-PR-CR1**

- **Type**: Structural, Dynamic, Automatic
- **Initial State**: System supports asynchronous suggestion processing.
- **Input/Condition**: Multiple users submit suggestion requests simultaneously.
- **Output/Result**: Requests are processed without significant delay or errors.
- **How test will be performed**: Automated performance testing tools will simulate multiple users submitting requests concurrently. The system's queue management and processing times will be monitored automatically to assess its ability to handle asynchronous processing. Any request drops or errors will be logged for analysis and remediation.

##### Verify Input Responsiveness

**Test-PR-CR2**

- **Type**: Structural, Dynamic, Automatic
- **Initial State**: Text manipulation features are implemented.
- **Input/Condition**: Perform rapid text entry and editing operations.
- **Output/Result**: No noticeable delays or lag in input response.
- **How test will be performed**: Automated scripts will perform rapid text entry and editing operations while performance profiling tools measure input latency. Tests will be run on various hardware configurations and browsers automatically. If latency exceeds acceptable thresholds, code optimizations will be implemented to enhance responsiveness.

##### Test Inference Server Autoscaling

**Test-PR-SER1**

- **Type**: Structural, Dynamic, Automatic
- **Initial State**: Autoscaling policies are configured.
- **Input/Condition**: Vary the load on the inference server to simulate high and low traffic.
- **Output/Result**: Server scales up during high traffic and scales down to zero during low traffic.
- **How test will be performed**:  Automated load testing tools will apply varying levels of requests to the inference server. Monitoring systems will automatically track server instances and resource utilization to observe scaling actions. Verification will be made to ensure that scaling occurs according to the configured thresholds without impacting performance.

##### Evaluate Integration with Different Model Architectures

**Test-PR-LR1**

- **Type**: Structural, Automatic
- **Initial State**: Application is prepared to support multiple model architectures.
- **Input/Condition**: Swap the LLM with alternative architectures and SAEs.
- **Output/Result**: Application functions correctly with different models.
- **How test will be performed**: Automated integration scripts will replace the existing language model with alternative models like Llama 3 and Gemma 2. The full suite of regression tests will be run automatically to ensure that all features operate as expected. Compatibility issues will be identified and addressed, with documentation updated accordingly.

##### Test Packaging for Different Operating Systems

**Test-PR-LR2**

- **Type**: Structural, Automatic
- **Initial State**: Standalone binary versions are packaged.
- **Input/Condition**: Install and run the application on various OS (Windows, macOS, Linux).
- **Output/Result**: Application installs and runs without errors on all supported platforms.
- **How test will be performed**: Automated build and deployment tools will prepare installation packages for each operating system. Installation and execution tests will be run automatically on virtual machines or containers representing Windows, macOS, and Linux environments. Any OS-specific issues will be logged and resolved to ensure cross-platform compatibility.


#### 3.2.4 Security

##### Ensure HTTPS Encryption for All Communications

**Test-SR-INT1**

- **Type**: Structural, Dynamic, Automatic
- **Initial State**: Application and servers are set up with SSL certificates.
- **Input/Condition**: Monitor network traffic during application use.
- **Output/Result**: All data transmissions are encrypted using HTTPS.
- **How test will be performed**: Automated security testing tools will monitor network traffic to verify that all communications use HTTPS. Attempts to access the application via unsecured HTTP will be scripted to ensure automatic redirection to HTTPS. The validity and configuration of SSL certificates will be checked automatically. Any mixed content warnings detected by browsers will be addressed promptly.

##### Implement DNS Security Measures

**Test-SR-INT2**

- **Type**: Structural, Dynamic, Automatic
- **Initial State**: DNS security configurations are in place.
- **Input/Condition**: Perform DNS queries and observe responses.
- **Output/Result**: DNS queries and responses are secure from tampering and spoofing.
- **How test will be performed**: Automated DNSSEC testing tools will verify the implementation of DNS security measures. Simulated DNS spoofing attacks will be conducted automatically to test system resilience. Any vulnerabilities detected will be logged and remediated to protect against DNS-based attacks.

##### Validate Content Security Policies (CSP)

**Test-SR-INT3**

- **Type**: Structural, Dynamic, Automatic
- **Initial State**: CSP headers are configured on the server.
- **Input/Condition**: Use the application while attempting to execute unauthorized scripts.
- **Output/Result**: CSP effectively prevents XSS attacks.
- **How test will be performed**: Automated security testing tools will attempt to inject malicious scripts into the application. The effectiveness of CSP in blocking these scripts will be verified automatically. CSP headers will be analyzed to ensure they are correctly configured. Any violations or weaknesses will be addressed to enhance security.

##### Test Session Security with JWT and Short-Lived Tokens

**Test-SR-INT4**

- **Type**: Structural, Dynamic, Automatic
- **Initial State**: Session management is implemented using JWT.
- **Input/Condition**: Authenticate and use the application. Attempt token misuse.
- **Output/Result**: Sessions are secure. Tokens will not be misused or intercepted.
- **How test will be performed**: Automated scripts will inspect tokens to ensure proper signing and encryption. Attempts to reuse expired tokens or tamper with token data will be conducted automatically to test the system's defenses. Session expiration and re-authentication processes will be verified. Secure storage of tokens on the client side will be validated.

##### Verify Privacy Compliance

**Test-SR-P1**

- **Type**: Structural, Static, Automatic
- **Initial State**: Application codebase is complete.
- **Input/Condition**: Review data handling processes and storage mechanisms.
- **Output/Result**: Confirmation that no personal information is collected or stored.
- **How test will be performed**: Automated code analysis tools will scan the codebase to identify any components that collect, process, or store personal data. Network traffic will be monitored during simulated user interactions to ensure no personal information is transmitted. Storage mechanisms like databases, local storage, and cookies will be inspected to verify they do not retain personal data. All findings will be documented, and any issues will be resolved to ensure compliance with privacy policies.

#### 3.2.5 Maintainability and Support

##### Schedule and Verify Security Updates

**Test-OER-MR1**

- **Type**: Structural, Static, Automatic
- **Initial State**: Maintenance schedules are established.
- **Input/Condition**: Review update logs and schedules while performing security scans.
- **Output/Result**: Regular updates are performed. No outstanding vulnerabilities.
- **How test will be performed**: Automated tools will check adherence to the update schedule by reviewing logs and schedules. Dependency checking tools like npm audit will be run automatically to identify any vulnerabilities. Continuous integration pipelines will ensure that updates do not introduce new issues. Documentation of updates and patches will be maintained automatically.

##### Ensure Feature Integrations Pass Existing Tests

**Test-OER-MR2**

- **Type**: Structural, Dynamic, Automatic
- **Initial State**: New features are developed and ready for integration.
- **Input/Condition**: Integrate new features into the application.
- **Output/Result**: All existing tests pass. No regression issues are introduced.
- **How test will be performed**: After integrating new features, the full suite of automated tests will be run to detect any regression issues. Test coverage reports will be generated automatically to ensure new features are adequately tested. Any test failures will be addressed before deployment to maintain application stability.

##### Implement User Feedback Loop

**Test-OER-SR1**

- **Type**: Structural, Dynamic, Automatic
- **Initial State**: Feedback mechanisms are implemented in the application.
- **Input/Condition**: Submit feedback through the application interface.
- **Output/Result**: Feedback is successfully recorded and retrievable by the development team.
- **How test will be performed**: Automated tests will simulate feedback submission and verify that the data is stored securely and is accessible for review. Notifications or acknowledgments will be checked automatically. Compliance with privacy requirements will be validated to protect user information.

#### 3.2.6 Compliance

##### Verify Compliance with Canadian Copyright Law

**Test-CompR-LR1**

- **Type**: Structural, Static, Automatic
- **Initial State**: Suggestion generation is operational.
- **Input/Condition**: Generate content and analyze for potential copyright infringements.
- **Output/Result**: No generated content violates Canadian copyright laws.
- **How test will be performed**: Automated plagiarism detection tools like Copyscape will be used to compare the generated content against existing works to detect potential infringements under Canadian copyright law. For example, we'll generate content and check if it unintentionally reproduces passages from popular novels like "The Great Gatsby" by F. Scott Fitzgerald. Content generation filters will be implemented to prevent the reproduction of such copyrighted material. All findings will be documented, and the system will be adjusted to ensure that all generated content is original and fully compliant with Canadian copyright laws.

##### Ensure SOC 2 Compliance

**Test-CompR-LR2**

- **Type**: Structural, Static, Manual
- **Initial State**: Security controls and policies are in place.
- **Input/Condition**: Prepare for SOC 2 audit by an external auditor.
- **Output/Result**: Successful SOC 2 attestation for the inference server.
- **How test will be performed**: All security controls will be reviewed against SOC 2 criteria. Evidence of compliance, such as access logs and security policies will be collected. Any gaps identified during internal reviews will be addressed promptly. The formal audit process will be conducted by an external auditor to obtain SOC 2 certification, ensuring that the inference server meets industry security standards.

##### Obtain User Permission for Inference on Content

**Test-CompR-LR3**

- **Type**: Structural, Dynamic, Automatic
- **Initial State**: Consent mechanisms are implemented.
- **Input/Condition**: Use the application for the first time.
- **Output/Result**: Users provide explicit permission before content is used for inference.
- **How test will be performed**: Automated tests will verify that a consent prompt appears upon initial use of the application, requiring users to accept the terms before proceeding. The process will be tested to ensure users cannot bypass consent. Consent records will be checked automatically to confirm they are stored securely and in compliance with privacy regulations.

##### Verify Adherence to HTTP/1.1 Protocol Standards

**Test-CompR-SCR1**

- **Type**: Structural, Static, Manual
- **Initial State**: The application and server are fully implemented and operational.
- **Input/Condition**: Analyze the client-server communication protocols used by the application during typical operation.
- **Output/Result**: Confirmation that all client-server communications strictly adhere to HTTP/1.1 standards as defined in RFC 2616, including correct usage of HTTP methods, status codes, headers, message formats, and persistent connections.
- **How test will be performed**: Using network protocol analyzers like Wireshark, HTTP requests and responses between the client and server will be captured and inspected during typical application usage. The application will be verified to correctly implement HTTP methods (GET, POST, etc.). It will also be checked to ensure that appropriate status codes are returned (e.g., 200 OK, 404 Not Found) and that headers such as Host, Content-Type, and Connection are properly formatted. The HTTP/1.1 protocol version must be used in all communications, and persistent connections should be supported with the connection "keep-alive" header. Any deviations from the HTTP/1.1 standards will be documented, followed by necessary corrections. After remediation, re-testing will be conducted to confirm full compliance with the protocol standards to ensure reliable and standard compliant client-server interactions.


### 3.3 Traceability Between Test Cases and Requirements

<!--
\wss{Provide a table that shows which test cases are supporting which
requirements.}
-->

| **Requirement ID** | **Requirement Description**                                                                                                                                     | **Test Case ID(s)**                       |
|--------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------|
| **LF-A1**          | tinymorph shall adopt a unified, non-intrusive, and uncluttered visual design.                                                                                  | Test-LF-A1                                |
| **LF-A2**          | tinymorph must implement a consistent design system across all user interfaces, involving standardized typography and color palette.                             | Test-LF-A2                                |
| **LF-S1**          | The design of the application will be minimalist, utilizing clean lines and a monotonic color palette.                                                          | Test-LF-S1                                |
| **LF-S2**          | The application must be responsive, adapting seamlessly to various device screens and orientations.                                                             | Test-LF-S2                                |
| **LF-S3**          | Interactive elements such as buttons and links must contrast significantly with the background to ensure visibility and accessibility.                           | Test-LF-S3                                |
| **LF-S4**          | The user interface should enable smooth transitions and intuitive animations across various sections and features.                                               | Test-LF-S4                                |
| **LF-S5**          | The application should include visual cues and feedback for user interactions to reinforce usability.                                                           | Test-LF-S5                                |
| **UH-EOU1**        | tinymorph shall include a session history feature that records and displays the user’s most recent editing activities such as document accesses and text modifications. | Test-UH-EOU1                          |
| **UH-EOU2**        | tinymorph must allow users to interactively review and manually accept or reject changes suggested by the system after their inputs are submitted.               | Test-UH-EOU2                              |
| **UH-EOU3**        | The application shall include a planning interface to assist users in organizing and debugging their creative writing steps.                                     | Test-UH-EOU3                              |
| **UH-PI1**         | tinymorph interface must include multilingual support to cater to an international audience.                                                                    | Test-UH-PI1, Test-CulR-CR1, Test-CulR-CR3 |
| **UH-PI2**         | The application shall provide options for users to select between light or dark mode based on their system settings or preference.                               | Test-UH-PI2                               |
| **UH-L1**          | New users should be able to understand basic functionalities and start creating or editing content within 10 minutes of initial use.                             | Test-UH-L1                                |
| **UH-UP1**         | The application should utilize clear and concise language for all instructions, feedback, and user interface elements.                                           | Test-UH-UP1, Test-OER-PR2                 |
| **UH-A1**          | tinymorph should support text resizing without loss of content or functionality.                                                                                | Test-UH-A1                                |
| **UH-A2**          | tinymorph should ensure that all user interface components are accessible via keyboard navigation.                                                              | Test-UH-A2                                |
| **UH-A3**          | Implement ARIA (Accessible Rich Internet Applications) attributes throughout the application.                                                                   | Test-UH-A3                                |
| **PR-SLR1**        | TTFT should be minimum, around 200-500ms                                                                                                                        | Test-PR-SLR1                              |
| **PR-SLR2**        | Throughput should be approximate 300 tokens/sec for a batch size of 4                                                                                           | Test-PR-SLR2                              |
| **PR-SCR1**        | Suggestions must not be harmful                                                                                                                                | Test-PR-SCR1                              |
| **PR-SCR2**        | The interface must not contain harmful images or NSFW content.                                                                                                  | Test-PR-SCR2                              |
| **PR-PAR1**        | The generated text should match users’ steering direction                                                                                                       | Test-PR-PAR1, Test-CulR-CR2               |
| **PR-RFR1**        | A notification toast must be sent to users in case inflight requests fail to complete.                                                                          | Test-PR-RFR1                              |
| **PR-RFR2**        | tinymorph must implement a recreate deployment strategy                                                                                                         | Test-PR-RFR2                              |
| **PR-CR1**         | Suggestions would be run asynchronously on request.                                                                                                            | Test-PR-CR1                               |
| **PR-CR2**         | Input should not show any certain delay                                                                                                                         | Test-PR-CR2, Test-OER-EPE2                |
| **PR-SER1**        | tinymorph inference server must include scale-to-zero and concurrency-based autoscaling.                                                                        | Test-PR-SER1, Test-OER-EPE2               |
| **PR-LR1**         | Future integration with other language model architecture                                                                                                       | Test-PR-LR1, Test-OER-RIAS1               |
| **PR-LR2**         | Support different distribution platforms.                                                                                                                      | Test-PR-LR2, Test-OER-AR1                 |
| **OER-EPE1**       | tinymorph will be able to run on different hardware environment, given it can run modern browser.                                                              | Test-OER-AR1                             |
| **OER-EPE2**       | tinymorph should have minimal increase in power consumption                                                                                                     | Test-PR-SER1, Test-PR-CR2                 |
| **OER-RIAS1**      | tinymorph inference server should provide an OpenAI-compatible endpoints.                                                                                      | Test-PR-LR1                               |
| **OER-PR1**        | Secrets must be configured with certain Role-based access control (RBAC) rules                                                                                  | Test-SR-INT4                              |
| **OER-PR2**        | Relevant documentation should be accessible by users.                                                                                                          | Test-UH-UP1, Test-UH-L1                   |
| **OER-PR3**        | Feedback should also be included within the interface                                                                                                           | Test-OER-SR1                              |
| **OER-RR1**        | Release cycle must utilize current GitHub CD workflow.                                                                                                          | Test-OER-MR2                              |
| **OER-RR2**        | End-to-end tests should pass before deploying to production.                                                                                                    | Test-OER-MR2                              |
| **OER-MR1**        | Security updates must be done periodically                                                                                                                     | Test-OER-MR1, Test-SR-IM1                 |
| **OER-MR2**        | Feature integrations must pass existing tests                                                                                                                  | Test-OER-MR2                              |
| **OER-SR1**        | User feedback loop must be present.                                                                                                                            | Test-OER-SR1                              |
| **OER-AR1**        | tinymorph must be able to run with existing users’ environment                                                                                                 | Test-PR-LR2                              |
| **SR-INT1**        | All communication between the client UI, backend services, and external APIs must be encrypted using HTTPS.                                                    | Test-SR-INT1                              |
| **SR-INT2**        | Implement DNS security measures to ensure that DNS queries and responses are protected against tampering and spoofing.                                          | Test-SR-INT2                              |
| **SR-INT3**        | The application will use content security policies to mitigate the risk of XSS attacks.                                                                        | Test-SR-INT3                              |
| **SR-INT4**        | Implement JWT and short-lived tokens to secure session communications.                                                                                        | Test-SR-INT4, Test-OER-PR1                |
| **SR-P1**          | The application must ensure that it does not collect or store personal information, adhering strictly to privacy by design principles.                         | Test-SR-P1                                |
| **SR-AU1**         | Implement monitoring of interactions with external service providers to ensure their use complies with security policies and performance expectations.          | Test-OER-MR1                              |
| **SR-IM1**         | Employ up to date security measures to protect against known threats and vulnerabilities, including regular updates and patches to the software components.    | Test-OER-MR1                              |
| **SR-IM2**         | Configure the application to minimize the surface area for attacks by disabling unused services and endpoints.                                                 | Test-SR-INT4                              |
| **CulR-CR1**       | English supports                                                                                                                                               | Test-UH-PI1                               |
| **CulR-CR2**       | Cultural reference must be factual                                                                                                                             | Test-PR-PAR1                              |
| **CulR-CR3**       | Support left-to-right (LTR) reading flow                                                                                                                       | Test-UH-PI1                               |
| **CompR-LR1**      | Suggestion must follow strict US copyright law.                                                                                                                | Test-CompR-LR1                            |
| **CompR-LR2**      | SOC2 compliance                                                                                                                                               | Test-CompR-LR2                            |
| **CompR-LR3**      | Users permission to run inference against their content                                                                                                        | Test-CompR-LR3                            |
| **CompR-SCR1**     | Follows standard HTTP protocol for client-server communication                                                                                                 | Test-CompR-SCR1                           |


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

### 4.3 Tests for Nonfunctional Requirements
<!--
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
-->

#### 4.3.1 Inference Engine

**Test-IE1**

- **Type**: Functional, Dynamic, Automatic
- **Initial State**: The Inference Engine module is fully implemented and operational.
- **Input/Condition**: Submit a predefined request to the inference engine.
- **Output/Result**: The Time-to-First-Token (TTFT) is within 200-500 milliseconds.
- **How test will be performed**: A unit test will be created to send a request to the inference engine with a specific input. The test will measure the time elapsed from the moment the request is sent to the receipt of the first token from the inference engine. The test will assert that the TTFT falls within the specified range of 200-500 milliseconds.

**Test-IE2**

- **Type**: Functional, Dynamic, Automatic
- **Initial State**: The Inference Engine module supports batch processing.
- **Input/Condition**: Send batched requests with a batch size of 4.
- **Output/Result**: Achieve a throughput of approximately 300 tokens per second.
- **How test will be performed**: The unit test will send multiple batched requests to the inference engine, each batch containing 4 requests. It will measure the total number of tokens processed per second during the test. The test will verify that the throughput meets the specified target by asserting that the tokens processed per second are approximately 300.

**Test-IE3**

- **Type**: Functional, Dynamic, Automatic
- **Initial State**: The Harmful Content Filter within the Inference Engine is implemented.
- **Input/Condition**: Provide inputs that are likely to generate harmful or inappropriate content.
- **Output/Result**: The inference engine outputs are free of harmful or inappropriate content.
- **How test will be performed**: The unit test will feed the inference engine with inputs known to potentially trigger harmful content. It will analyze the outputs to ensure that no harmful or inappropriate content is present, confirming that the engine's safety mechanisms effectively filter out undesirable content.

#### 4.3.2 User Interface

**Test-UI1**

- **Type**: Functional, Dynamic, Automatic
- **Initial State**: The UI module is fully implemented and operational.
- **Input/Condition**: Simulate rapid text input and editing actions by the user.
- **Output/Result**: The UI responds without noticeable delays, ensuring a smooth user experience.
- **How test will be performed**: The unit test will automate rapid typing and editing actions within the text editor component of the UI. It will measure the response time of the UI to these actions, asserting that the response time is within acceptable thresholds of less than 50 milliseconds per action, ensuring high responsiveness during intensive user interactions.

**Test-UI2**

- **Type**: Functional, Dynamic, Automatic
- **Initial State**: The notification system within the UI is implemented.
- **Input/Condition**: Simulate an inflight request failure in the application.
- **Output/Result**: A notification toast is displayed to the user informing about the request failure.
- **How test will be performed**: The unit test will mock a failure in an inflight request by triggering an error condition in the request handling module. It will then verify that the UI displays a notification toast with the appropriate message, confirming that users are promptly informed of request failures.

#### 4.3.3 Deployment Management

**Test-DM1**

- **Type**: Functional, Dynamic, Automatic
- **Initial State**: The deployment strategy is configured with recreate capabilities.
- **Input/Condition**: Simulate a failure of a node or replica in the deployment environment.
- **Output/Result**: The deployment is automatically recreated, maintaining application availability.
- **How test will be performed**: The unit test will simulate the failure of a node or pod within the Kubernetes cluster by programmatically deleting or stopping it. It will verify that the deployment controller automatically recreates the failed components and that the application remains available during the process, ensuring robustness and fault tolerance in the deployment strategy.

#### 4.3.4 Suggestion Processing

**Test-SP1**

- **Type**: Functional, Dynamic, Automatic
- **Initial State**: The suggestion processing module supports asynchronous operations.
- **Input/Condition**: Submit multiple suggestion requests simultaneously.
- **Output/Result**: All suggestions are processed correctly without errors or significant delays.
- **How test will be performed**: The unit test will concurrently submit multiple suggestion requests to the processing module using asynchronous calls. It will monitor the processing of each request to ensure they are handled independently and efficiently. The test will assert that all suggestions are returned correctly and within acceptable time frames, confirming the system's capacity to handle concurrent requests.

#### 4.3.5 Autoscaling Mechanism

**Test-AM1**

- **Type**: Functional, Dynamic, Automatic
- **Initial State**: The autoscaling configuration is implemented in the deployment environment.
- **Input/Condition**: Vary the load on the inference server to simulate high and low traffic conditions.
- **Output/Result**: The inference server scales up during high traffic and scales down to zero during low traffic.
- **How test will be performed**: The unit test will programmatically generate varying loads on the inference server by simulating user requests at different rates. It will monitor the number of active server instances to verify that the autoscaling mechanism responds appropriately scaling up when the load increases and scaling down when the load decreases. This will confirm that the autoscaling works as intended to optimize resource usage.

#### 4.3.6 Model Integration

**Test-MI1**

- **Type**: Functional, Static, Automatic
- **Initial State**: The application is prepared to support multiple language model architectures.
- **Input/Condition**: Integrate an alternative language model architecture into the system.
- **Output/Result**: The application functions correctly with the new language model without errors.
- **How test will be performed**: The unit test will replace the current language model with an alternative one, such as integrating a new SAE  model. It will run the existing unit tests and check for compatibility issues or errors, ensuring that the application remains stable and functional with the new model.

#### 4.3.7 Platform Compatibility

**Test-PC1**

- **Type**: Functional, Static, Automatic
- **Initial State**: The application build is configured for different operating systems.
- **Input/Condition**: Build and run the application on Windows, macOS, and Linux environments.
- **Output/Result**: The application installs and runs successfully on all supported platforms.
- **How test will be performed**: The unit test will automate the build process for the application on different operating systems using cross-platform build tools. It will then execute automated tests to ensure that the application functions correctly on each platform, ensuring adaptability and support for different distribution platforms.

#### 4.3.8 Security Components

**Test-SC1**

- **Type**: Functional, Static, Automatic
- **Initial State**: Security components and dependencies are up-to-date.
- **Input/Condition**: Check for known vulnerabilities in the current dependencies.
- **Output/Result**: No critical vulnerabilities are found; security updates are scheduled and performed.
- **How test will be performed**: The unit test will use tools like npm audit or Snyk to scan the project's dependencies for known security vulnerabilities. It will generate a report of any issues found and verify that updates are applied promptly, maintaining the security integrity of the application.

**Test-SC2**

- **Type**: Functional, Static, Automatic
- **Initial State**: RBAC policies are defined and implemented.
- **Input/Condition**: Attempt to access secrets and resources with different user roles.
- **Output/Result**: Access is appropriately granted or denied based on the RBAC policies.
- **How test will be performed**: The unit test will simulate users with various roles attempting to access sensitive resources like secrets or configuration files. It will verify that only authorized roles have access, and unauthorized attempts are blocked, ensuring that secrets are protected with proper access controls.

#### 4.3.9 Documentation Accessibility

**Test-DA1**

- **Type**: Functional, Static, Manual
- **Initial State**: Documentation is written and linked within the application.
- **Input/Condition**: Navigate through the application to locate and access the documentation.
- **Output/Result**: Users can easily find and access relevant documentation from the interface.
- **How test will be performed**: A manual test will be conducted where the tester navigates the application's UI to locate links to usage manuals and technical documentation. The tester will verify that the links are prominently placed, clearly labeled, and lead to the correct documentation pages. This will facilitate user understanding through accessible documentation.

#### 4.3.10 Release and Deployment

**Test-RD1**

- **Type**: Functional, Dynamic, Automatic
- **Initial State**: The GitHub CD workflow is set up for the project.
- **Input/Condition**: Commit new code changes and push to the repository.
- **Output/Result**: The continuous deployment pipeline is triggered, and the application is built and deployed automatically.
- **How test will be performed**: The unit test will simulate code changes by committing to a test branch. It will verify that the GitHub CD workflow is triggered, running automated tests and deploying the application if all tests pass. This will ensure that the release cycle utilizes the current CI/CD workflow effectively.

### Traceability Between Test Cases and Modules

<!--
\wss{Provide evidence that all of the modules have been considered.}
-->

| **Test Case ID**  | **Description**                                                                                                   | **Module**                |
|-------------------|-------------------------------------------------------------------------------------------------------------------|--------------------------------|
| Test-LF-A1        | Verify unified, non-intrusive, and uncluttered visual design.                                                     | User Interface                 |
| Test-LF-A2        | Verify standardized typography and color palettes are consistently applied.                                       | User Interface                 |
| Test-LF-S1        | Validate minimalist design with a monotonic color palette.                                                        | User Interface                 |
| Test-LF-S2        | Test responsiveness across devices and orientations.                                                              | User Interface                 |
| Test-LF-S3        | Verify contrast of interactive elements to ensure visibility.                                                     | User Interface                 |
| Test-LF-S4        | Assess smooth transitions and animations for intuitive experience.                                                | User Interface                 |
| Test-LF-S5        | Verify visual feedback for user interactions.                                                                     | User Interface                 |
| Test-UH-EOU1      | Evaluate session history feature accuracy in recording activities.                                                | User Interface                 |
| Test-UH-EOU2      | Test interactive review and manual acceptance of suggestions.                                                     | Suggestion Processing          |
| Test-UH-EOU3      | Assess the planning interface for effective user interaction.                                                     | User Interface                 |
| Test-UH-PI1       | Verify multilingual support functionality.                                                                        | User Interface                 |
| Test-UH-PI2       | Test theme customization options for light and dark modes.                                                        | User Interface                 |
| Test-UH-L1        | Measure onboarding time for new users to begin creating or editing content.                                       | User Interface                 |
| Test-UH-UP1       | Evaluate the clarity of language used in the UI.                                                                  | User Interface                 |
| Test-UH-A1        | Test text resizing functionality for accessibility.                                                               | User Interface                 |
| Test-UH-A2        | Verify keyboard navigation accessibility for interactive components.                                              | User Interface                 |
| Test-UH-A3        | Implement and test ARIA attributes for screen reader compatibility.                                               | User Interface                 |
| Test-PR-SLR1      | Measure TTFT (Time-to-First-Token) between 200-500ms during requests.                                             | Inference Engine               |
| Test-PR-SLR2      | Evaluate throughput of the inference server with batch processing capabilities.                                   | Inference Engine               |
| Test-PR-SCR1      | Validate that suggestions are non-harmful and appropriate.                                                        | Inference Engine               |
| Test-PR-SCR2      | Ensure interface content contains no harmful or NSFW elements.                                                    | User Interface                 |
| Test-PR-PAR1      | Test the accuracy of generated text matching user steering parameters.                                            | Suggestion Processing          |
| Test-PR-RFR1      | Verify notification toast for inflight request failures.                                                          | User Interface                 |
| Test-PR-RFR2      | Test deployment strategy to ensure fault tolerance and application availability.                                  | Deployment Management          |
| Test-PR-CR1       | Assess asynchronous processing of multiple user requests without significant delay.                               | Suggestion Processing          |
| Test-PR-CR2       | Verify input responsiveness during rapid text entry and editing.                                                  | User Interface                 |
| Test-PR-SER1      | Test autoscaling mechanism of inference server during varying traffic loads.                                      | Autoscaling Mechanism          |
| Test-PR-LR1       | Evaluate integration with different model architectures.                                                          | Model Integration              |
| Test-PR-LR2       | Test packaging and execution across different operating systems.                                                  | Platform Compatibility         |
| Test-SR-INT1      | Ensure all communications are encrypted using HTTPS.                                                              | Security Components            |
| Test-SR-INT2      | Implement DNS security measures to secure queries and responses.                                                  | Security Components            |
| Test-SR-INT3      | Validate Content Security Policies (CSP) to prevent XSS attacks.                                                  | Security Components            |
| Test-SR-INT4      | Test session security with JWT and short-lived tokens.                                                            | Security Components            |
| Test-SR-P1        | Verify that privacy compliance is maintained with no collection of personal data.                                 | Security Components            |
| Test-OER-MR1      | Schedule and verify that security updates are performed regularly.                                                | Security Components            |
| Test-OER-MR2      | Ensure new feature integrations pass existing tests without regression.                                           | Release and Deployment         |
| Test-OER-SR1      | Implement a user feedback loop to ensure user feedback is recorded and accessible.                                | User Interface                 |
| Test-CompR-LR1    | Verify compliance with Canadian copyright laws for generated content.                                             | Documentation Accessibility    |
| Test-CompR-LR2    | Ensure SOC 2 compliance for security standards of the inference server.                                           | Security Components            |
| Test-CompR-LR3    | Obtain user consent before using content for inference purposes.                                                  | Security Components            |
| Test-CompR-SCR1   | Verify that client-server communications adhere to HTTP/1.1 standards.                                            | Release and Deployment         |

## Appendix

This is where you can place additional information.

### **Appendix A: Usability Survey Questions**

1. On a scale of 1 to 5, how would you rate the overall visual design of `tinymorph`?
2. Did you find the interface to be uncluttered and non-intrusive? Please explain.
3. How easy was it to navigate through the application?
4. Were the animations and transitions smooth and helpful in guiding you?
5. Did you notice any issues with theme customization (light/dark mode)?
6. How intuitive was the planning interface for organizing your writing?
7. Were instructions and feedback clear and understandable?
8. Did you encounter any difficulties when resizing text or using keyboard navigation?
9. How satisfied are you with the responsiveness of the application?
10. Do you have any suggestions for improving the usability of `tinymorph`?

<!--
### Usability Survey Questions?

\wss{This is a section that would be appropriate for some projects.}
-->

### Symbolic Parameters

The definition of the test cases will call for SYMBOLIC_CONSTANTS.
Their values are defined in this section for easy maintenance.


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
