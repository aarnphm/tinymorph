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

Description: The client base would primarily comprise design studios and independent creative labs which specialize in developing innovative tools for digital creativity. These clients are at the forefront of technology and design, pushing the boundaries of what digital creative tools can achieve. They provide not only critical funding but also strategic insights that guide the development of advanced text-editing solutions.

Role: They are instrumental in defining the project’s scope and deliverables, ensuring the tool meets the high standards required by creative professionals. They facilitate strategic alignments that enhance the project’s visibility and usability within the creative industry. Their role is crucial in decision-making processes that shape the project’s trajectory and ensure its relevance to the target market.

### 2.2 Customer

Description: The primary customers for the Tinymorph project are writers and engineers seeking sophisticated tools to enhance their creative writing processes. This diverse group includes freelancers who work across various genres and formats. They require adaptable tools that cater to a broad range of creative needs. Writers in this segment value features that inspire creativity and streamline the writing process. Engineers on the other hand, seek functionalities that help articulate complex ideas clearly and intuitively.

Role: These customers are pivotal in driving user adoption and shaping the project’s trajectory. Their comprehensive feedback is crucial for continuous product development. It ensures that tinymorph evolves in response to the dynamic demands of creative writing, maintaining its competitive edge and relevance in the market.

### 2.3 Other Stakeholders

Description: Includes developers and contributors dedicated to local-first software, enhancing the tool’s offline functionality and independence from network constraints. This group includes a broad open-source community actively engaged in refining user interfaces and interaction paradigms. Other stakeholders also highlights professionals in usability and accessibility, ensuring that the tool remains approachable and usable by everyone regardless of ability.

Role: These stakeholders are vital for integrating tinymorph within a framework of local-first and open-source technologies. Their collective input ensures adherence to best practices in user centric design and open collaboration. It broadens the tool’s applicability and enhances its community-driven development.

### 2.4 Hands-On Users of the Project

Description: Comprises individuals who will directly interact with the tinymorph application's interface, primarily creative professionals and engineers engaged in creative writing. These users are essential for the initial adoption and sustained engagement with the tool, particularly benefiting from its suggestion aid features designed to enhance the creative writing process.

Role: The users provide critical usability feedback and actively participate in iterative testing phases. Their insights are invaluable for identifying challenges, refining the suggestion algorithms, and enhancing overall user interaction and satisfaction. This feedback directly influences feature development and adjustments to meet the diverse needs of creative writers.

User Categories:
- Creative Writers: Includes such as novelists, poets, scriptwriters, bloggers, and freelance writers who rely on tinymorph for its intuitive and inspiring writing environment. The suggestion aids help stimulate creativity, overcome writer's block, and enhance their creative flow and productivity.
- Engineers: Engineers who pursue creative writing, whether professionally or as a personal endeavor. They also seek advanced tools to support their writing projects. Engineers benefit from tinymorph's ability to provide intelligent suggestions that aid in articulating complex ideas creatively.

Subject Matter Experience: Users range from seasoned creative professionals with extensive writing experience to engineers who are exploring creative writing. All users share a common interest in enhancing their writing through intelligent suggestions that inspire creativity and improve the quality of their work.

Technological Experience: Expertise varies from users who are comfortable with basic word processing tools to those proficient in utilizing advanced software features to optimize their writing process. The application is designed to be accessible to users with varying levels of technical proficiency, ensuring that both novices and tech-savvy individuals can benefit from its features.

Other User Characteristics:
- Physical Location: Users are globally diverse, necessitating a platform that supports seamless access across different time zones and locations. The application should function reliably regardless of the user's geographical location.
- Education Levels: Users may have backgrounds ranging from self-taught creative writers to formally educated professionals in engineering or literature. The tool must cater to a wide spectrum of educational experiences.
- Attitude Toward Technology: Generally positive, with a preference for user-friendly technologies that require minimal learning curves. Users appreciate tools that enhance their creativity without imposing complex technical challenges.

### 2.5 Personas

Description: Involved are detailed, representative user profiles based on extensive user research. Personas such as College Researcher, Freelance Writer, or Technical Editor symbolize the diverse user base Tinymorph aims to serve. These personas are constructed from typical characteristics, behaviors, and needs observed among potential users and serve to bring user stories and requirements to life during the development process.

Role: Serve as a focal point during design and development. It helps to tailor features, functionality, and user interfaces to meet the specific needs and behaviors of different user groups. The applicaiton tinymorph is designed to assist in planning writing projects and overcoming writer's block, rather than simply rewriting or analyzing sentiment. This ensures the product is versatile and truly enhances the creative process for its users.

Example Personas:

1. Freelance Fiction Writer
- Name: Emily Brown
- Age: 28
- Occupation: Freelance Fiction Writer
- Interests: Novel writing, short stories, fantasy and science fiction
- Goals: To find new ways to build complex characters and intricate plots that captivate her readers.
- Technology Proficiency: Intermediate, utilizes various digital tools for research and manuscript editing.
- Persona Narrative: Emily looks to tinymorph to help her plan and overcome writer's block and generate creative content ideas that keep her narratives fresh and engaging.

2. Technical Engineer
- Name: Michael Liu
- Age: 35
- Occupation: Civil Engineer
- Interests: Technical documentation, project schematics, professional development articles
- Goals: To integrate creativity into his writing to make complex concepts accessible and engaging.
- Technology Proficiency: Advanced, highly skilled in technical design software and documentation tools.
- Persona Narrative: Michael utilizes Tinymorph to bring a storytelling approach to his engineering presentations and reports. He crafts narratives that explain complex engineering processes and project benefits in an appealing way. This approach helps his audience from clients to the general public, understand and appreciate the value of technical projects.

3. Blogger
- Name: Sarah Johnson
- Age: 40
- Occupation: Professor and Personal Blogger
- Interests: Academic publishing, lifestyle blogging, engaging a broad audience online
- Goals: To distill complex academic concepts into engaging blog posts that appeal to a general audience.
- Technology Proficiency: Advanced, adept with blogging platforms and social media engagement tools.
- Persona Narrative: Sarah utilizes tinymorph to creatively translate her academic research into compelling stories for her blog. By simplifying intricate concepts into enjoyable narratives, she makes her posts accessible and intriguing to a wide audience. Her use of the platform boosts the creativity and charm of her content, drawing in and maintaining reader interest effectively.

### 2.6 Priorities Assigned to Users

Description: Involves categorizing users based on their usage patterns and the criticality of their needs. For example, professional writers might need advanced editing tools more than casual users.

Role: This categorization helps in prioritizing development tasks such as feature enhancements, bug fixes, and custom integrations to align product capabilities with the most valuable user demands.  By focusing resources on the most impactful areas, the development team can more effectively address the core needs of primary users. It ensures that the product develops in a direction that supports its most critical use cases.

Key Users:
- Creative Writers and Engineers: These users are vital to the product's success as they rely heavily on its features for their professional tasks. Their requirements are given the highest priority, and their feedback directly influences major product decisions.

Secondary Users:
- Academic Researchers and Educators: While important, these user's needs are secondary to those of key users. Their feedback influences product enhancements but is prioritized after the essential needs of the primary user group.

Unimportant Users:
- Casual Content Creators: This group includes users who occasionally use the platform for non-professional writing. Their needs are considered, but they have the lowest priority and minimal impact on the core functionality and strategic direction of the product.

### 2.7 User Participation

Description: Active involvement of professional writers and engineers in the development process through mechanisms such as such as targeted workshops, specialized feedback forms, and direct interviews

Role: Crucial for gathering qualitative and quantitative data on user satisfaction, system performance, and potential improvements. It will guide the agile development process and feature prioritization.

### 2.8 Maintenance Users and Service Technicians

Description: Includes the technical team responsible for the deployment, maintenance, and troubleshooting of tinymorph. It ensures that the application remains operational and secure.

Role: Handle regular updates, patch deployments, system monitoring, and troubleshooting. Their work is critical to maintaining the high availability and reliability of the service and responding to emerging security threats and technical issues.

## 3. Mandated Constraints

### 3.1 Solution Constraints

MC-S1. Base models for generations should be open weights (Pythia, Phi-3, Llama 3.2, etc.)

Rationale: Having open-weight models allows for custom fine-tuning based on specific user needs (e.g., tonality, writing styles) or experimental features like, steering, and feedback mechanisms

MC-S2. All model inferences must be compatible with OpenAI's API specifications, ensuring interoperability with existing systems.

Rationale: OpenAI-compatible endpoints are widely adopted in the industry. An inference server providing an OpenAI-compatible endpoint would make it easier for API integration with upstream tools.

MC-S3. The Minimum Viable Product must be web-based, and accessible from standard web browsers (Chrome, Firefox, Safari) without requiring installation or browser-specific extensions.

Rationale: Starting with a web-based solution allows faster prototyping and wide accessibility, ensuring that the application can reach a broad audience quickly while allowing room for future iteration.

MC-S4. The user interface must follow a file-over-app architecture, avoiding a full application installation for minimal system dependencies.

Rationale: By following a file-over-app architecture, there is a reduction in the overhead associated with traditional software installation, making the tool more lightweight and easier to access. This approach ensures that users can engage with the tool seamlessly, without worrying about system compatibility or additional dependencies, aligning with the goal of rapid, cross-platform usability.

MC-S5. Personalization features, such as user preferences for tone and style, must remain within predefined limits to ensure compatibility with the model’s underlying architecture.

Rationale: Limiting personalization features to predefined parameters ensures that the system’s core architecture remains stable and compatible with the underlying language models. While users can still select tone and style preferences through features like dropdown menus, these constraints prevent excessive complexity in the model’s behavior, maintaining a balance between user customization and technical feasibility.

MC-S6. There shall be no explicit storage of user-specific content on external servers 

Rationale: Protecting user privacy and ensures that their data remains secure. By not storing user-specific content on external servers, the application reduces the risk of data breaches and aligns with privacy-conscious practices. This reassures users that their content is handled locally or securely on their own devices, maintaining trust in the platform.

### 3.2 Implementation Environment of the Current System

MC-I1. The implementation environment must follow modern web best practices.

Rationale: Following modern web best practices ensures compatibility, and ease of maintenance across various browsers and devices.

MC-I2. Server-side components must support deployment on scalable infrastructure, including compatibility with GPU usage and Kubernetes clusters.

Rationale: This ensures that the server-side architecture can efficiently handle the computational demands of the models (e.g., GPU support) while remaining flexible for deployment in various cloud environments, promoting scalability and ease of management.

MC-I3. The system must support cloud-based inference via APIs and local inference with GPU acceleration, while managing request queues and concurrency limits.

Rationale: This ensures the system can handle high-performance inference tasks both locally and in the cloud, while maintaining efficient resource usage and managing multiple concurrent requests to prevent bottlenecks.

MC-I4. The implementation must accommodate scalable infrastructure that manages increased load during high-traffic periods.

Rationale: This ensures the system can dynamically scale to meet user demand, maintaining performance and stability by efficiently managing multiple requests and preventing overload during periods of peak traffic.

### 3.3 Partner or Collaborative Applications

MC-P1. The system must support integration with tools like Notion, Obsidian, and text editors such as Neovim and VSCode.

Rationale: This allows users to work with their preferred tools, enhancing productivity and collaboration by enabling them to transfer and synchronize content seamlessly between the application and other commonly used applications in the same space.

MC-P2. The system must provide export options in multiple formats (e.g., Markdown, PDF, DOCX).

Rationale: Providing multiple export formats allows users to share and collaborate across a variety of tools and systems, supporting flexible workflows and interoperability with a wide range of applications.


### 3.4 Off-the-Shelf Software

MC-O1. The system must initially incorporate off-the-shelf writing assistance tools (e.g., Jasper, Copywrite) for comparison and benchmarking purposes during POC development.

Rationale: Benchmarking against existing tools helps identify areas where the application can offer more personalization and control compared to standard solutions.

### 3.5 Anticipated Workplace Environment

MC-A1. The system must support remote collaboration, using GitHub for version control and Microsoft Teams for communication.

Rationale: This ensures that development can proceed asynchronously, facilitating effective collaboration across distributed teams, with GitHub managing code changes and Teams handling communication.

MC-A2. All developers must set up their environments according to the contribution guidelines for tinymorph.

Rationale: Ensuring consistent environments across all developers minimizes integration issues, enhances collaboration, and maintains uniformity in development practices.

MC-A3. Developers are encouraged to add unit and integration testing to ensure fault tolerance and workflow stability, using tools like GitHub Actions for continuous integration.

Rationale: Adding testing early in the development cycle promotes code stability and helps identify issues across environments, supporting smooth development workflows and reliable user experiences.

### 3.6 Schedule Constraints

MC-S1. The system must meet the Revision 1 deadline March 24, 2025 as per the capstone project timeline, allowing additional buffer time for debugging, user testing, and revisions before the final presentation.

Rationale: Meeting the Revision 1 deadline ensures that there is sufficient time for testing and improvements, which are crucial for addressing issues and ensuring a polished final product by the end of the capstone project.

MC-S2. Preliminary research, including design thinking and proof of concept development, must be stabilized within the first two to three months of the project.

Rationale: Completing early-stage work promptly allows for more time to focus on complex engineering tasks like model integration, ensuring that key functionalities are implemented effectively within the project’s timeline.

MC-S3. The time required for training and validating SAEs must not exceed 5 days of GPU time, including any hyperparameter tuning, to keep the project on schedule.

Rationale: Limiting the training time for SAEs ensures that the system stays within development timelines, preventing bottlenecks and allowing time for other critical tasks.

### 3.7 Budget Constraints

MC-B1. The project has a maximum budget of $1000 in credits on BentoCloud for serving.

Rationale: This constraint ensures that the system operates within the available budget, focusing on efficient resource use and cost-effective solutions for cloud-based serving.

### 3.8 Enterprise Constraints

MC-E1. All software dependencies must follow the Apache 2.0 license or a compatible subset.

Rationale: Ensuring that all dependencies align with the project’s open-source licensing reduces legal risks and maintains consistency with the project's license requirements.

MC-E2. Open-weight models used for inference must adhere to their respective community licenses and be used only for research purposes.

Rationale: This ensures that any models integrated into tinymorph comply with their community usage terms, preventing misuse and maintaining alignment with ethical research standards.

## 4. Naming Conventions and Terminology

### 4.1 Glossary of All Terms, Including Acronyms, Used by Stakeholders involved in the Project

[Insert your content here.]

## 5. Relevant Facts And Assumptions

### 5.1 Relevant Facts

> [!IMPORTANT] RFA-RF1
>
> Using open models such as [Gemma](https://ai.google.dev/gemma) or [Llama](https://www.llama.com/) as base language model

Rationale: Google's Gemma is a language model family supporting long context generation, with GemmaScope as pre-trained SAEs for feature interpolation. `tinymorph` will utilize Gemma for planning and guiding users' writing.


> [!IMPORTANT] RFA-RF2
>
> offers web-based interface

Rationale: provide an universal access for all platforms and operating systems. 


> [!IMPORTANT] RFA-RF3
>
> `tinymorph` will utilise online inference for planning suggestion.

Rationale: Running model locally poses challenges for users to setup both base model with specific SAEs for different tasks. While `tinymorph` roadmap is to release a packaged binary that can be run everywhere, a online inference server will be used for web-based interface to ensure the best user experience. 

### 5.2 Business Rules

> [!IMPORTANT] RFA-BR1
>
> Data locality 

Rationale: Users' configuration will be stored within a vault-like directory, locally on users' machines. No data will be stored on the cloud.

> [!IMPORTANT] RFA-BR2
>
> Suggestions and planning steps must adhere to safety guidelines

Rationale: usage of SAEs to reduce hallucinations, as well as improve general safety of text quality. 

### 5.3 Assumptions

> [!IMPORTANT] RFA-A1
>
> User knows how to use the browser

Rationale: `tinymorph` will offer a web-based interface, thus users must know the basic navigation of the existing environment (in this case, the browser of choice).

> [!IMPORTANT] RFA-A2
>
> Network connection 

Rationale: `tinymorph` will require network connections to run inference for suggestion and planning UI.


## 6. The Scope of the Work

### 6.1 The Current Situation

The tinymorph project seeks to address current challenges in the field of creative writing assistance and content generation. Currently, most text editing tools are either limited in their capacity to foster creativity or are focused on improving technical writing. Creative individuals, including writers and engineers who wish to experiment with narrative writing, often lack tools that offer meaningful assistance beyond basic word processing. These limitations hinder users from exploring creative writing to its fullest extent, leaving them reliant on manual brainstorming and structuring processes.

Traditional conversational AI tools such as ChatGPT, often take a linear approach that doesn’t cater well to the iterative and non-linear nature of the creative writing process. Writers looking for inspiration or seeking to overcome writer's block have limited options when it comes to non-intrusive and contextually aware suggestion systems. Additionally, many current tools demand that writers feed in well-structured prompts but fail to provide flexibility in refining those prompts during the course of writing. This results in an difficult writing experience for many users, especially those unfamiliar with optimizing prompts.

In this current environment, there are manual tools for creative writing—such as physical brainstorming boards and simple planning aids that lack the adaptability needed for the fluid and changing nature of the writing process. Automated systems like Grammarly or even Google Doc's AI-driven text completion tools do exist. However, they typically focus on providing singular and deterministic results rather than empowering users to navigate various creative options and truly own their writing process.

The tinymorph project is being developed in response to these shortcomings. It intends to provide a more dynamic, interactive writing environment that not only offers suggestions but also encourages non-linear idea exploration. This "How Now" view aims to replace the rigidity of current AI text editors by fostering creativity through an intuitive and adaptive interface that blends planning, drafting, and revising stages into one cohesive experience.

### 6.2 The Context of the Work

The work context for tinymorph identifies the environment, systems, and users that the tool interacts with, defining the boundaries of its operation. Understanding this broader context helps ensure that tinymorph integrates seamlessly into users' creative workflows and provides an intuitive experience that aligns with the users' needs. This context includes adjacent systems, users, and interactions that might influence or be influenced by tinymorph.

**Adjacent Systems**
1. Local Storage Systems: tinymorph interacts with local storage to save user configuration settings, where it would store data in a vault directory. This helps users retain preferences without storing data on a centralized server.
2. Inference Server: tinymorph hosts its models on a cloud-based inference server. User files are formatted into a string and sent as part of a request to the inference server for generating suggestions. However, no user data is stored on the server, ensuring stateless transactions and preserving user privacy.
3. User Devices: The application is designed to operate across multiple platforms, supporting a range of devices such as computers, tablets, and potentially e-readers. It ensures maximum accessibility and ease of use for different users.

**Information Flow**

Below is a table representing the key interactions in the context of the project with adjacent systems:

| **Adjacent System**      | **Interaction Type**           | **Input/Output**              | **Purpose**                                                                 |
|--------------------------|--------------------------------|-------------------------------|-----------------------------------------------------------------------------|
| Local Storage Systems    | Configuration Management      | Input/Output                  | Stores user preferences locally, ensuring settings are retained without the need for cloud storage. |
| Inference Server         | Text Processing               | Input                         | Processes user inputs to generate creative suggestions, without storing any data to maintain privacy. |
| Inference Server         | Suggestions Generation        | Output                        | Generates and returns creative suggestions to users, based on provided inputs. |
| User Devices             | User Interface                | Output                        | Displays writing suggestions and outputs for a variety of supported devices.                


Defining the boundaries of tinymorph's operational context ensures that the product fits seamlessly into its intended environment and effectively supports users' creative endeavors. By clearly delineating the systems and flows involved, the context helps in building a product that aligns well with user expectations and enhances usability.

### 6.3 Work Partitioning

 Key business events represent the actions and scenarios that tinymorph responds to during typical usage. These events encompass user interactions, system activities, and the flow of information across tinymorph's components. It offers a detailed view of the operational flow.

 Understanding the key business events for tinymorph is essential for partitioning the work into manageable sections, ensuring each business use case (BUC) is clearly defined and independently understood. By breaking the work into logical segments it enables the process to help support better design decisions, validate workflows, and manage requirements effectively to ultimately maintain a user-centric focus throughout development.

 The business event list is presented in a tabular format. Each event includes:
  - **Event Number**: Identifies the specific business event.
  - **Event Name**: Describes the nature of the action or scenario.
  - **Input and Output**: Specifies whether the interaction is an input or an output.
  - **Summary of the Business Event (BUC)**: Provides a  description of the expected result of the business event.

  | Event Number | Event Name                   | Input/Output                    | Summary of BUC                                                                                       |
|--------------|------------------------------|---------------------------------|------------------------------------------------------------------------------------------------------|
| 1            | User Uploads Document        | Input                           | User uploads or begins editing a document. The file is processed locally and formatted into a request to the inference server for suggestions, but no data is stored on the server.  |
| 2            | Generate Writing Suggestions | Input                           | Generates writing suggestions based on the user's text, considering style preferences.               |
| 3            | Save Configuration Settings  | Input/Output                    | Saves user’s preferences, including tone, writing style, and personal configurations locally to a vault directory. |
| 4            | Inference Request Sent       | Input                           | User's text content is formatted and sent to the inference server for text generation or suggestions. This is a stateless transaction and no user data is stored.  |
| 5            | Display Suggestions          | Output                          | Displays generated suggestions inline within the user’s document for easier adoption or rejection.   |
| 6            | Manual Edits to Document     | Input/Output                    | User manually edits the document, accepting or rejecting suggestions made by tinymorph.              |
| 7            | Save Document Locally        | Input                           | User chooses to save their document locally, and the content is stored on the user's device.         |
| 8            | View Writing Analytics       | Output                          | Tinymorph provides analytical insights to the user such as structure, readability, and suggested improvements. |
| 9            | User Changes Theme           | Input/Output                    | User changes between light or dark mode for enhanced visual comfort. Configuration is saved locally.  |

### 6.4 Specifying a Business Use Case (BUC)

The Business Use Cases (BUC) detail how tinymorph responds to specific business events by providing a comprehensive description of each interaction. These descriptions ensure that the requirements for system actions are fully understood and documented, enhancing clarity during the implementation phase. Each BUC is carefully articulated to capture how tinymorph behaves in response to user actions and how each event impacts the system's workflow.

The purpose of defining detailed Business Use Cases is to understand how tinymorph responds during different user scenarios. This understanding helps identify the necessary requirements and ensures the solution meets the expected functionalities without ambiguity. By examining each BUC, we can ensure that all events are accounted for, creating a robust system that addresses user needs comprehensively. These scenarios build on the events specified in section 6.3, providing a full account of system behavior.

Below are detailed BUC scenarios, specifying how tinymorph handles each event:

1. User Uploads Document: When the user uploads or begins editing a document, tinymorph processes the file locally. The document is formatted into a string, which is sent to the inference server for suggestions. Importantly, no user data is stored on the server to enusre in preserving user privacy. The interaction is designed to maintain a stateless transaction while providing suggestions based on user inputs.

2. Generate Writing Suggestions: When a user inputs their text, tinymorph generates writing suggestions that align with the user's style preferences such as tone and clarity. These suggestions are then provided in a way that facilitates easy integration into the user’s writing process. This use case emphasizes tinymorph’s ability to assist users in enhancing their writing creatively while staying true to their personal style.

3. Save Configuration Settings: Users have the ability to save their preferences including tone, writing style, and custom configurations locally to a vault directory. This ensures that each time a user interacts with tinymorph, the tool aligns with their personalized needs, without relying on cloud-based storage. The local storage approach gives users the control and flexibility they need to maintain their preferred settings.

4. Inference Request Sent: User text content is formatted and sent to the inference server for generating suggestions. The request is processed on the server without saving any data, ensuring a stateless transaction that respects user privacy. This use case ensures that while the model provides sophisticated writing assistance, it does so in a privacy conscious manner.

5. Display Suggestions: Once the inference server processes the request, tinymorph displays the generated writing suggestions directly within the user’s document. This helps the user see the potential improvements in real-time and decide whether to accept or reject each suggestion. This approach is designed to seamlessly integrate AI assistance into the user’s creative process.

6. Manual Edits to Document: Users are encouraged to make manual edits to their document, either accepting or rejecting the suggestions made by tinymorph. The flexibility provided by this ensures users have complete creative control over the text. The manual editing process is integral to enhancing the accuracy of the content and ensuring that the suggestions align with the writer's intent.

7. Save Document Locally: After editing, the user may choose to save their document locally. Tinymorph ensures that the content is securely stored on the user’s device. The emphasis on local storage enhances user control over their documents, fostering a sense of security and convenience.

8. View Writing Analytics: Tinymorph provides the user with analytical insights into their writing. These analytics might include metrics such as structure, readability, and suggested improvements. The analysis helps writers to better understand their strengths and areas for improvement, ultimately enhancing the quality of their content. The insights also encourage users to make thoughtful changes to their work.

9. User Changes Theme: tinymorph offers users the ability to switch between light and dark modes to enhance visual comfort. The change is made on the user’s device and stored locally, ensuring that the theme aligns with user preferences each time they use the application. This feature is meant to make the writing experience visually comfortable, catering to different working environments and times of day.

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

FR-1. The system shall provide suggestions during the planning phase of creative writing, offering assistance in structuring ideas, topics, or themes based on user input, with a focus on brainstorming and outlining rather than real-time text generation. The system should generate relevant planning suggestions within 10 seconds of receiving a prompt, producing outlines or idea guidance based on user input.

Rationale: Traditional text suggestions may not suit creative writing, which is highly personal and abstract. Instead, guiding users through the planning phase helps them build a solid foundation for their content.

FR-2. The system shall provide users with manual control over text generation, enabling them to select advanced steering options such as tone, style, or creativity level. For beginners, a simplified option shall allow tone suggestions based on well-known authors. Additionally, users shall have the option to input their previous writing samples, allowing the model to adapt to their tone and style within a maximum of 30 seconds.

Rationale: Providing manual control over the model's output allows both beginners and advanced users to customize the text generation to their preferences. Offering tone suggestions and the option to input past writing samples enhances personalization, making the system more adaptable to individual writing styles.

FR-3. Users shall be able to interact with generated text through a left-to-right (LTR) feedback panel, allowing them to provide real-time feedback on model-generated suggestions. The panel should present previews that are easy to modify without causing cognitive overload, particularly for planning-related tasks.

Rationale: The LTR panel offers an intuitive way to refine model behavior, but it must be designed to reduce cognitive overload, enabling users to focus on effective interaction without being overwhelmed.

FR-4. Users shall be able to set preferences for tone, style, voice, and formality, which the system will apply to all future generations of text. 

Rationale: Allowing users to customize the tone, style, voice, and formality ensures the system adapts to individual preferences, making the generated text more personalized and relevant to the user's needs.

FR-5. Users shall be able to save their preferred configurations as profiles, enabling them to switch between different writing styles or goals. For the initial version, the focus shall be on creative writing, with the potential to expand to other writing types (e.g., academic, casual blog posts) as additional datasets are integrated.

Rationale: Allowing users to save profiles for different writing styles supports personalization, and initially focusing on creative writing ensures that the system can refine its functionality before expanding to other types of content that may require specialized datasets.

FR-6. The system shall allow users to navigate through their text non-linearly by providing a visual map or tree view that displays key points, topics, sections, and revision history. This tree-based exploration shall support both text structure and revision tracking, allowing users to explore and edit different versions or sections easily.

Rationale: Providing a tree-based view enhances the user’s ability to navigate their content efficiently, particularly during revision or structural changes. This visual aid allows for more intuitive exploration of key points, sections, and revisions, offering greater control over the writing process.

FR-7. The system shall present possible planning steps that users can choose, modify, or combine to guide the structure and flow of their writing.

Rationale: Focusing on planning steps rather than text alternatives aligns with the creative writing process, helping users organize and structure their ideas more effectively. This approach avoids the limitations of traditional generation methods like beam search, which may not perform well in this context.

FR-8. The system shall offer version control features that allow users to navigate through previous edits, revert to earlier document versions, and compare different drafts visually.

Rationale: Providing a clear representation of revision history helps users track changes, make informed decisions about reverting to previous states, and compare different versions of their work with ease.

FR-9. The system shall support an offline mode where users can continue to write and interact with the editor without internet access, using pre-downloaded resources.

Rationale: While offline mode may not be a priority in the current development phase, providing the ability to work offline in future versions ensures greater accessibility and flexibility for users in varying environments.

FR-10. The system shall allow users to continue writing and saving files locally during offline sessions. However, certain features, such as planning-related suggestions, will only be available when the user is connected to the internet.

Rationale: By allowing users to write and save locally during offline sessions, the system ensures uninterrupted productivity. However, advanced features requiring internet access, like planning assistance, will only function when a connection is restored.

FR-11. Users shall be able to set and track specific writing goals (e.g., word count, tone consistency, argument development) through customizable progress tracking features, such as word count meters, tone analysis, and style consistency checks. The system will offer suggestions to help users meet these goals, ensuring alignment with their intended writing objectives.

Rationale: Combining goal-setting with progress tracking allows users to monitor their progress and receive actionable feedback, making the writing process more structured and goal-oriented. This unified approach supports personalized goal management, helping users stay on track.

FR-12. The system shall allow users to categorize and tag different sections of their text (e.g., introduction, argument, conclusion), and automatically generate an outline based on the document’s structure. 

Rationale: Combining tagging with automatic outline generation streamlines document organization and navigation. This will provide a high-level overview of the content and enable quick access to specific sections for better organization and navigation within large documents. This feature also helps users maintain clarity and easily navigate large documents, providing both a detailed view of the content.

FR-13. The system shall allow users to export their documents in .pdf, .md (Markdown), and plain text formats, ensuring compatibility with external platforms. Support for .docx format will be considered for future development as better libraries become available.

Rationale: Exporting documents in widely compatible formats like Markdown, PDF, and plain text ensures flexibility for users without adding unnecessary complexity. Focusing on these formats simplifies implementation while covering most use cases.

FR-14. The system shall allow users to customize the visual appearance of the editor by choosing from different themes, such as dark mode, light mode, and high-contrast options.

Rationale: Providing customization of the visual appearance enhances user experience and accessibility, allowing users to choose themes that suit their preferences or visual needs.

## 10. Look and Feel Requirements

### 10.1 Appearance Requirements

LF-A1: The tinymorph application shall adopt a unified, non-intrusive, and uncluttered visual design.

Rationale: A consistent and non-intrusive design ensures brand recognition and provides a visually pleasing experience for users, fostering greater engagement and trust in the platform. This minimizes distractions to allow users in focusing more effectively on their creative tasks.

LF-A2. The application must implement a consistent design system across all user interfaces, involving standardized typography and color palette.

Rationale: A consistent design system enhances user experience by ensuring visual coherence in typography and colors. This uniformity aids readability, reduces user distraction, and contributes to a seamless intuitive interface.


### 10.2 Style Requirements

LF-S1. The design of the application will be minimalist, utilizing clean lines and a monotonic color palette.

Rationale: A minimalist design with a monotonic color palette emphasizes functionality and content, enhancing usability by directing the user's focus to essential elements without distraction. This approach ensures that the interface remains uncluttered and the features more accessible, supporting a focused and efficient user experience.

LF-S2. The application must be responsive, adapting seamlessly to various device screens and orientations.

Rationale: As users may access the application from different devices with varying screen sizes, responsiveness is essential to provide a consistent experience across all platforms.

LF-S3. Interactive elements such as buttons and links must contrast significantly with the background to ensure visibility and accessibility.

Rationale: High contrast between elements and backgrounds enhances the visibility of interactive features, making navigation intuitive and preventing user frustration.

LF-S4. The user interface should enable smooth transitions and intuitive animations across various sections and features. 

Smooth transitions and intuitive animations contribute significantly to a seamless user experience. By enhancing user engagement, these visual cues help guide users smoothly through the application’s features. Implementing animations effectively can indicate activity or the completion of tasks, reducing user confusion and improving clarity during navigation.

LF-S5. The application should include visual cues and feedback for user interactions to reinforce usability.

Rationale: Providing immediate visual feedback for user actions confirms the system’s responsiveness, which will help users understand the application’s behavior and reduce errors.

## 11. Usability and Humanity Requirements

### 11.1 Ease of Use Requirements

UH-EOU1. Tinymorph shall include a session history feature that records and displays the user's most recent editing activities such as document accesses and text modifications.

Rationale: This functionality streamlines user workflow by providing quick access to recent actions, which reduces the time needed for navigation and increases efficiency.

UH-EOU2. The application must allow users to interactively review and manually accept or reject changes suggested by the system after their inputs are submitted.

Rationale: Providing users with the option to manually accept or reject suggested changes allows them with greater control over their content. This functionality would enhance user engagement by making the editing process more interactive and ensures that the final output aligns precisely with their preferences and intentions.

UH-EOU3. The application shall include a planning interface to assist users in organizing and debugging their creative writing steps.

Rationale: The interface will improve user efficiency by supporting the iterative refinement of writing tasks and planning steps. It enables users to easily adjust and debug their creative outlines, enhancing the overall usability and functionality of the application.

### 11.2 Personalization and Internationalization Requirements

UH-PI1. Tinymorph must include multilingual support to cater to an international audience.

Rationale: Multilingual support enhances the application’s global accessibility and user engagement, ensuring that users can interact with the platform in their preferred language.

UH-PI2. The application shall provide options for users to select between light or dark mode based on their system settings or preference.

Rationale: These theme customization improves visual comfort and personalization, enabling users to adapt the interface to their visual preferences and working environments.

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

UH-A3. Implement ARIA (Accessible Rich Internet Applications) attributes throughout the application.

Rationale: ARIA attributes help provide essential information about the element's role, state, and property, which is crucial for users who interact with the application via assistive technologies. This ensures that all functionalities are conveyed and usable through these technologies.

## 12. Performance Requirements

### 12.1 Speed and Latency Requirements

> [!IMPORTANT] PR-SLR1
>
> [[glossary#time-to-first-tokens|TTFT]] should be minimum, around 200-500ms

Rationale: Suggestion and planning should feel smooth, and fast. Therefore, time-to-first-token is important.

> [!IMPORTANT] PR-SLR2
>
> Throughput should be approximate 300 tokens/sec for a batch size of 4

Rationale: `tinymorph` inference server should be able to handle incoming requests in batches, ideally handling a decent amount of throughput. Note that we will have to sacrifice some throughput for higher TTFT. 

### 12.2 Safety-Critical Requirements

> [!IMPORTANT] PR-SCR1
>
> Suggestions must not be **harmful**

Rationale: SAEs must ablate activations that represent offensive language or inappropriate text. 

> [!IMPORTANT] PR-SCR2
>
> The interface must not contain harmful images or NSFW content.

Rationale: All contents and icons from web-based interfaces must be safe for work.

### 12.3 Precision or Accuracy Requirements

> [!IMPORTANT] PR-PAR1
>
> The generated text should match users' steering direction

Rationale: `tinymorph`'s SAEs should activate specific attentions based on users inputs. Additionally, it must take into account all users' feedback.

### 12.4 Robustness or Fault-Tolerance Requirements

> [!IMPORTANT] PR-RFR1
>
> A notification toast must be sent to users in case inflight requests fail to complete.

Rationale: If any current requests fail to finish, a toast must be surfaced to users. This helps notify users to either resubmit specific plans or revert to previous planning steps.

> [!IMPORTANT] PR-RFR2
>
> `tinymorph` must implement a recreate deployment strategy

Rationale: In case certain replica and nodes failed to start, given Kubernetes cluster that run said inference server should be able to recreate the deployment.

### 12.5 Capacity Requirements

> [!IMPORTANT] PR-CR1
>
> Suggestions would be run asynchronously on request.

Rationale: `tinymorph` will support multiple users running suggestions at once. Users will be able to submit given requests and said inference server should be able to handle multiple requests at once.

> [!IMPORTANT] PR-CR2
>
> Input should not show any certain delay

Rationale: `tinymorph` must ensure text manipulation on users' content to be as smooth as possible.  

### 12.6 Scalability or Extensibility Requirements

> [!IMPORTANT] PR-SER1
>
> `tinymorph` inference server must include scale-to-zero and concurrency-based autoscaling.

Rationale: During high traffic, the inference servers must be able to scale up based on incoming requests. Additionally, in lower traffic, the server should be able to scale to zero to save on costs and resources.

### 12.7 Longevity Requirements

> [!IMPORTANT] PR-LR1
>
> Future integration with other language model architecture

Rationale: `tinymorph` should be able to extend to different [model architectures](https://www.llama.com/) with variety of SAEs. 

> [!IMPORTANT] PR-LR2
>
> Support different distribution platforms.

Rationale: `tinymorph` will first ship a web interface. It should then reserve the ability to be packaged into a standalone universal binary that can be run on different operating systems and architectures.


## 13. Operational and Environmental Requirements

### 13.1 Expected Physical Environment

> [!IMPORTANT] OER-EPE1
>
> `tinymorph` will be able to run on different hardware environment, given it can run modern browser.

Rationale: `tinymorph` will ship a web interface through browsers. Therefore, it should support any hardware environment that can run a browser. 

> [!IMPORTANT] OER-EPE2
>
> `tinymorph` should have minimal increase in power consumption 

Rationale: `tinymorph` should avoid a huge increase in RAM for a browser tab. 

### 13.2 Wider Environment Requirements


### 13.3 Requirements for Interfacing with Adjacent Systems

> [!IMPORTANT] OER-RIAS1
>
> `tinymorph` inference server should provide an OpenAI-compatible endpoints.

Rationale: The inference server must offer an OpenAI-compatible endpoint to ensure a handshake with the web interface. This server can also be accessed with any other tools that accept OpenAI-compatible endpoints.


### 13.4 Productization Requirements

> [!IMPORTANT] OER-PR1
>
> Secrets must be configured with certain Role-based access control (RBAC) rules

Rationale: To ensure all production environment variables are safe from bad actors and adversarial parties. 

> [!IMPORTANT] OER-PR2
>
> Relevant documentation should be accessible by users.

Rationale: Usage manuals and technical-related details should be easily accessible from `tinymorph`'s interface.

> [!IMPORTANT] OER-PR3
>
> Feedback should also be included within the interface

Rationale: Enable user-feedback to improve the product.

### 13.5 Release Requirements

> [!IMPORTANT] OER-RR1
>
> Release cycle must utilize current GitHub CD workflow.

Rationale: Version control and release cycle should follow semantic versioning and utilize GitHub's CI for automation.

> [!IMPORTANT] OER-RR2
>
> End-to-end tests should pass before deploying to production.

Rationale: end-to-end workflow must be the minimum for all feature development to ensure `tinymorph` is functional within a production environment.

## 14. Maintainability and Support Requirements

### 14.1 Maintenance Requirements

> [!IMPORTANT] OER-MR1
>
> Security updates must be done periodically

Rationale: Regular security updates to adjacent dependencies must be done quickly to avoid certain CVE exploits if they exist.

> [!IMPORTANT] OER-MR2
>
> Feature integrations must pass existing tests

Rationale: Given features works must not fail existing testing infrastructure.

### 14.2 Supportability Requirements

> [!IMPORTANT] OER-SR1
>
> User feedback loop must be present.

Rationale: For further development and UX improvement, a user-feedback loop is required. 

### 14.3 Adaptability Requirements

> [!IMPORTANT] OER-AR1
>
> `tinymorph` must be able to run with existing users' environment

Rationale: For web interface, `tinymorph` should be able to run on all existing modern browser. For packaged binary, it must support major architectures and operating system. 

## 15. Security Requirements

### 15.1 Access Requirements

N/A

### 15.2 Integrity Requirements

SR-INT1. All communication between the client UI, backend services, and external APIs must be encrypted using HTTPS.

Rationale: HTTPS encryption secures data in transit, preventing interception or tampering. It also ensures the confidentiality and integrity of user data and commands.

SR-INT2. Implement DNS security measures to ensure that DNS queries and responses are protected against tampering and spoofing.

Rationale: Securing DNS interactions prevents attackers from manipulating or rerouting network traffic. This is critical for maintaining the integrity of application data.

SR-INT3. The application will use content security policies to mitigate the risk of XSS attacks.

Rationale: Content Security Policies (CSP) are an effective security control to prevent XSS attacks by restricting the sources from which scripts can be loaded and executed in the application. CSP will help in safeguarding against data theft and maintain the integrity of the content delivered to users.

SR-INT4. Implement JWT and short-lived tokens to secure session communications.

Rationale: Utilizing JWT and short-lived tokens for session management enhances security by ensuring that session data remains protected against unauthorized access. This approach helps prevent bad actors from intercepting or tampering with session data, ensuring that user content and session details remain confidential and intact.


### 15.3 Privacy Requirements

SR-P1. The application must ensure that it does not collect or store personal information, adhering strictly to privacy by design principles.

Rationale: By not collecting personal information, the application minimizes privacy risks and complies with privacy laws and regulations. Avoiding personal data storage also reduces the need for complex data security measures, allowing the project to focus more on enhancing user experience and functionality.


### 15.4 Audit Requirements

SR-AU1: Implement monitoring of interactions with external service providers to ensure their use complies with security policies and performance expectations.

Rationale: Monitoring interactions with external service providers is essential to ensure they are used within the bounds of security protocols and that their performance aligns with the application's requirements. This helps in detecting any deviations that might compromise security or functionality, allowing for quick mitigation actions to maintain the integrity and reliability of the application services.

### 15.5 Immunity Requirements

SR-IM1. Employ up to date security measures to protect against known threats and vulnerabilities, including regular updates and patches to the software components.

Rationale: Keeping software updated ensures that known vulnerabilities are addressed, which will protect the application and its data from emerging threats.

SR-IM2. Configure the application to minimize the surface area for attacks by disabling unused services and endpoints.

Rationale: Minimizing the attack surface reduces the number of potential entry points for attackers, enhancing the overall security of the application. This proactive measure significantly lowers the risk of exploitations and helps maintain system integrity.

## 16. Cultural Requirements

### 16.1 Cultural Requirements

> [!IMPORTANT] CulR-CR1
>
> English supports

Rationale: English will be supported for alpha release of `tinymorph`. This is due to the limited capabilities of models when dealing with multilingual inputs.

> [!IMPORTANT] CulR-CR2
>
> Cultural reference must be factual

Rationale: If given cultural references are generated, it must utilize tools to fact-check given suggestions (using web-search).

> [!IMPORTANT] CulR-CR3
>
> Support left-to-right (LTR) reading flow

Rationale: Panels will be presented in LTR manner. RTL will be supported once multilingual are added. 

## 17. Compliance Requirements

### 17.1 Legal Requirements

> [!IMPORTANT] CompR-LR1
>
> Suggestion must follow strict US copyright law.

Rationale: Certain suggestions, if any, uses additional contents, references must be made to ensure copyright law compliance.

> [!IMPORTANT] CompR-LR2
>
> [SOC2](https://www.vanta.com/products/soc-2) compliance

Rationale: `tinymorph` should follow SOC-2 attestation for its inference server.

> [!IMPORTANT] CompR-LR2
>
> Users permission to run inference against their content

Rationale: `tinymorph` will require users' inputs to make corresponding suggestions. In other words, existing user content will be sent during inference requests.


### 17.2 Standards Compliance Requirements

> [!IMPORTANT] CompR-SCR1
>
> follows standard HTTP protocol for client-server communication

Rationale: `tinymorph` will adhere to Hypertext Transfer Protocol (HTTP/1.1) standards as defined by the Internet Engineering Task Force (IETF) in RFC 2616 (for HTTP/1.1).


## 18. Open Issues

[Insert your content here.]

## 19. Off-the-Shelf Solutions

### 19.1 Ready-Made Products

Text Editor Frameworks:

CodeMirror:
An open-source, browser-based text editor that supports rich editing features. CodeMirror can be integrated as the core text-editing interface for tinymorph, enabling basic editing functionality while allowing custom enhancements to support user steering and model behavior.
Language Models:

OpenAI GPT:
OpenAI’s Generative Pre-trained Transformer (GPT) is a highly advanced language model capable of generating coherent, contextually relevant text. Accessible via an API, GPT can be easily integrated into tinymorph, providing powerful text generation for tasks such as essays, dialogues, and story drafts.

Llama 3:
Llama 3 is an open-source large language model optimized for maintaining coherence in long-form writing. Its ability to handle extended context makes it ideal for writing tools like tinymorph, and its fine-tuning capabilities allow customization for specific use cases, such as creative or technical writing.

Writing Assistants:

Quill:
Quill is an AI-driven writing assistant that offers real-time feedback and suggestions to improve writing quality. With advanced grammar and style checks and collaborative features, Quill can help users refine their text, making it a useful tool for tinymorph’s vision of an intelligent writing assistant.

Jasper:
Jasper is an AI-powered writing assistant focused on generating content for diverse formats, including blogs, essays, and marketing materials. With personalization options for tone and style, Jasper aligns with tinymorph’s goal of empowering users to control their writing style and tone.

AI Infrastructure:

Goodfire:
Goodfire provides optimized infrastructure for AI model inference and deployment, ensuring low-latency, fast interactions. It scales seamlessly, making it a suitable platform for tinymorph to manage increased user demand without sacrificing performance. Goodfire's flexibility across hardware and software environments supports tinymorph’s scalability needs.

### 19.2 Reusable Components

LoRA (Low-Rank Adaptation):
LoRA is a technique for fine-tuning large pre-trained models, like GPT or Llama, for specific tasks. By reusing LoRA components, tinymorph can efficiently adapt these models for personalized writing assistance without the need to retrain the entire model. This approach allows for user-specific fine-tuning, enhancing tinymorph’s customization capabilities.

### 19.3 Products That Can Be Copied

GitHub Copilot (Interaction Paradigms):
The way GitHub Copilot integrates directly into development environments to provide in-line code suggestions can be adapted for tinymorph’s text generation. Tinymorph can borrow this interaction style by offering inlay suggestions for text, allowing users to manually steer and adjust the output based on their writing goals.

Google Docs' Suggestion Mode (Inlay Suggestions):
Google Docs' "Suggestion Mode" allows users to propose edits without making permanent changes. Tinymorph could adopt a similar mechanism, providing users with inlay suggestions from the model, which they can choose to accept or reject, enhancing control over the final output.

Grammarly’s Tone Detector (Tone Adjustment Feature):
Grammarly’s tone detection system analyzes writing to give feedback on the mood and tone of the content. Tinymorph could replicate this feature by analyzing the user’s writing style and suggesting tone adjustments, allowing users to fine-tune the emotional or stylistic qualities of their text.

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

> [!IMPORTANT] MNP-RMNP1
>
> Minimal downtime during migration process

Rationale: When the inference server is updating or maintaining, users should be aware of the downtime, given it shouldn't affect users' workflow.


### 22.2 Data That Has to be Modified or Translated for the New System

> [!IMPORTANT] MNP-DMTNS1
>
> Migration in future config format should ensure backward compatibility for one-time transition

Rationale: When configuration or certain features require breaking change, `tinymorph` must be able to migrate existing configuration to the new format without breaking change. 


## 23. Costs

[Insert your content here.]

## 24. User Documentation and Training

### 24.1 User Documentation Requirements

UDT-D1. Create a user's guide that details operational procedures, user interfaces, and troubleshooting tips.

Rationale: This guide will act as the primary resource for users to fully understand and effectively utilize all features of the application, enabling them to solve common problems independently. Keeping the guide updated will reflect ongoing changes and user feedback, enhancing user satisfaction and self sufficiency.

UDT-D2. Develop an installation manual with detailed instructions for the software installation, configuration, and initial setup processes.

Rationale: The manual ensures that all users regardless of their technical expertise can easily set up the application. This minimizes setup errors and facilitates smoother adoption of the software.

UDT-D3. Compile a design document describing the software architecture, API specifications, data flow diagrams, and code structure.

Rationale: This document is crucial for developers and technical stakeholders to understand the inner workings of the application. It wil support maintenance tasks, future development efforts, and integration with other systems.

UDT-D4. Create a Verification and Validation (V&V) plan and report that documents testing strategies, methodologies, results, and compliance checks.

Rationale: This documentation confirms that the application adheres to all technical specifications and user requirements, enhancing transparency and providing a basis for regulatory compliance and quality control.

UDT-D5. Develop a comprehensive Software Requirements Specification (SRS) that outlines functional and non-functional requirements, interfaces, data models, system behaviors, user interactions, and compliance obligations.

Rationale: Serves as a foundational document that guides the entire development process, ensuring that every feature and functionality aligns with user expectations and business objectives. It provides a detailed blueprint for developers and stakeholders, facilitating better planning and consistency in implementation. This approach ensures the development process remains focused on user and business needs, preventing deviations and ensuring the end product is robust, compliant, and aligned to the user's needs.

UDT-D6. Produce an emergency procedure manual outlining critical steps for handling urgent software issues and unexpected operational scenarios.

Rationale: Essential for enabling users to quickly respond to and resolve emergencies. This manual reduces downtime and ensures continuous operational efficiency, bolstering user confidence and system reliability.

### 24.2 Training Requirements

UDT-T1. Conduct interactive online workshops that demonstrate the core functionalities and creative writing tools of the web-based text editor.

Rationale: Interactive workshops provide hands-on learning experiences that allow users to see practical applications of the editor's features in real-time. This direct interaction enables users to ask questions and enhances their understanding and proficiency.

UDT-T2. Prepare video tutorials covering detailed use cases that highlight how to leverage advanced editing tools for various writing styles and genres.

Rationale: Video tutorials allow users to visually follow processes at their own pace, which is crucial for understanding complex features that enhance creative writing. It ensures users can fully exploit the text editor’s capabilities.

UDT-T3. Offer a scheduled Q&A session following the release of new features to address user queries and ensure clarity on the latest updates.

Rationale: Scheduled Q&A sessions after updates ensure that users fully understand new functionalities and can discuss any issues or suggestions. This helps in maintaining high user satisfaction and engagement with the platform.

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