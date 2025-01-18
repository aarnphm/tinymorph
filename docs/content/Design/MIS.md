---
id: MIS
tags:
  - design
author: aarnphm,waleedmalik7,nebrask,lucas-lizhiwei
date: "2024-09-16"
modified: 2025-01-17 19:05:14 GMT-05:00
title: Module Interface Specification
---

## Symbols, Abbreviations and Acronyms

The following data dictionary from [[SRS/SRS]] will be used for the symbols:

![[SRS/SRS#7.2 Data Dictionary|data dictionary]]

## Introduction

The following document details the [[Design/MIS|Module Interface Specifications]] for `tinymorph`, which aims to explore new interfaces and workflow for auto-regressive model to help writers craft better writing artifacts.

Complementary documents include the [[SRS/SRS|System Requirement Specifications]] and [[Design/MG|Module Guide]].

See also [[/index|full documentation]] and [github](https://github.com/aarnphm/tinymorph)

## Notation

The structure of the MIS for modules comes from [@hoffman1995software], with the addition that template modules have been adapted from
[@ghezzi2003fundamentals]. The mathematical notation comes from Chapter 3 of
[@hoffman1995software]. For instance, the symbol := is used for a
multiple assignment statement and conditional rules follow the form $(c_1 \Rightarrow r_1 \mid c_2 \Rightarrow r_2 \mid \dots \mid c_n \Rightarrow r_n)$.

The following table summarizes the primitive data types used by `tinymorph`.

| **Data Type**  | **Notation** | **Description**                                                  |
| -------------- | ------------ | ---------------------------------------------------------------- |
| character      | char         | a single symbol or digit                                         |
| integer        | $\mathbb{Z}$ | a number without a fractional component in (-$\infty$, $\infty$) |
| natural number | $\mathbb{N}$ | a number without a fractional component in [1, $\infty$)         |
| real           | $\mathbb{R}$ | any number in (-$\infty$, $\infty$)                              |
| string         | String       | a sequence of characters representing textual data               |

The specification of tinymorph uses some derived data types: sequences, strings, and
tuples. Sequences are lists filled with elements of the same data type. Strings
are sequences of characters. Tuples contain a list of values, potentially of
different types. In addition, `tinymorph` uses functions, which
are defined by the data types of their inputs and outputs. Local functions are
described by giving their type signature followed by their specification.

## Module Decomposition

_excerpt from [[Design#MG|Module Guide]]_

![[Design/MG#Module Hierarchy]]

## MIS of `morph`

The following encapsulate specification of `morph` (Editor module)

### Module

Editor module

### Uses

- Rendering Module
- Markdown Parsing Library
- Data Fetching and State Management Module

### Syntax

#### Exported Constants

- defaultEditorConfig: Object
  Default configuration for the editor module

#### Exported Access Programs

| **Name**         | **In**         | **Out** | **Exceptions** |
| ---------------- | -------------- | ------- | -------------- |
| renderMarkdown   | string content | HTML    | InvalidInput   |
| applyVimBindings | -              | boolean | BindingError   |

### Semantics

#### State Variables

- editorContent: String — Tracks the current content of the editor.
- cursorPosition: Object — Tracks the current position of the cursor.

#### Environment Variables

window: DOMObject — Captures user input and resizing events.

#### Assumptions

- User input is always valid and non-null when it is passed to the access programs.
- The editor's state (e.g., cursor position, content) is synchronized with user actions.
- External modules, like the Markdown parser, are functioning correctly.

#### Access Routine Semantics

renderMarkdown(content: string): HTML

- Transition: Converts Markdown content to HTML for rendering in the editor.
- Output: Returns a string of valid HTML.
- Exception: Throws `InvalidInput` if the input string is null or empty.

renderMarkdown(content: string): HTML

- Transition: Activates Vim-style keyboard bindings for advanced text navigation and editing.
- Output: Returns `true` if bindings are successfully applied, otherwise `false`.
- Exception: Throws `BindingError` if the bindings cannot be applied.

#### Local Functions

1. sanitizeInput(input: string): string
   Ensures input content is free of harmful or invalid characters.
2. logEvent(event: string): void
   Records user interactions for debugging and analytics.
3. resetEditor(): void
   Clears all current content and resets the editor state.

## MIS of Notes Module

### Module

Notes Module

### Uses

- Data Fetching and State Management Module
- Rendering Module

### Syntax

#### Exported Constants

- defaultEditorConfig: Object
  Default styles for rendering notes

#### Exported Access Programs

| **Name**   | **In**         | **Out**    | **Exceptions** |
| ---------- | -------------- | ---------- | -------------- |
| createNote | string content | NoteObject | InvalidContent |
| deleteNote | int noteId     | boolean    | NoteNotFound   |
| fetchNotes | -              | NoteArray  | APICallFailed  |

### Semantics

#### State Variables

- NoteArray — Tracks the current list of notes.
- selectedNote: NoteObject — Tracks the currently selected note.

#### Environment Variables

- localStorage: Used to cache notes for offline access.

#### Assumptions

- Note objects are properly structured and contain unique identifiers.
- The local storage system is operational for offline caching.
- External API endpoints for note synchronization are accessible.

#### Access Routine Semantics

createNote(content: string): NoteObject

- Transition: Creates a new note with the provided content and adds it to the notes list.
- Output: Returns the newly created note object.
- Exception: Throws `InvalidContent` if the input is invalid or null.

deleteNote(noteId: int): boolean

- Transition: Removes the note with the specified ID from the notes list.
- Output: Returns `true` if the note is successfully deleted.
- Exception: Throws `NoteNotFound` if the note ID does not exist.

fetchNotes(): NoteArray

- Transition: Retrieves all stored notes, either from local storage or an API.
- Output: Returns an array of note objects.
- Exception: Throws `APICallFailed` if the external API cannot be reached.

#### Local Functions

1. validateNoteContent(content: string): boolean
   Checks whether the content meets length and format requirements.
2. syncWithServer(): void
   Synchronizes local notes with the remote server.
3. cacheNotesLocally(notes: NoteArray): void
   Stores the note array in local storage for offline use.

## MIS of Graph View Module

### Module

Graph View Module

### Uses

- Data Fetching and State Management Module
- Notes Module
- Rendering Module

### Syntax

#### Exported Constants

- defaultGraphSettings: Object
  Default settings for graph rendering

#### Exported Access Programs

| **Name**    | **In**          | **Out** | **Exceptions** |
| ----------- | --------------- | ------- | -------------- |
| renderGraph | GraphDataObject | HTML    | InvalidGraph   |
| updateGraph | GraphUpdateData | boolean | GraphNotFound  |

### Semantics

#### State Variables

- graphData: GraphDataObject — Tracks the current graph structure.
- graphSettings: Object — Tracks the configuration of the graph.

#### Environment Variables

- canvas: DOMObject — Renders the graph visualization.

#### Assumptions

- Graph data is always structured as valid objects before rendering.
- The canvas element is available and properly initialized for graph visualization.
- User actions to update the graph do not conflict with ongoing render processes.

#### Access Routine Semantics

renderGraph(data: GraphDataObject): HTML

- Transition: Renders the graph using the given data.
- Output: Returns HTML for displaying the graph.
- Exception: Throws `InvalidGraph` if the input data is malformed.

updateGraph(updateData: GraphUpdateData): boolean

- Transition: Updates the graph with the provided data.
- Output: Returns `true` if the update is successful.
- Exception: Throws `GraphNotFound` if the graph does not exist.

#### Local Functions

1. parseGraphData(rawData: string): GraphDataObject
   Converts raw data into a structured graph object.
2. logGraphChanges(change: GraphUpdateData): void
   Records modifications to the graph for debugging.
3. clearCanvas(): void
   Clears the graph visualization canvas.

## MIS of Settings Module

### Module

Settings Module

### Uses

- Rendering Module
- Data Fetching and State Management Module

### Syntax

#### Exported Constants

- defaultSettings: Object
  Default settings for the application

#### Exported Access Programs

| **Name**       | **In**       | **Out** | **Exceptions** |
| -------------- | ------------ | ------- | -------------- |
| updateTheme    | string theme | boolean | InvalidTheme   |
| savePreference | Object prefs | boolean | SaveFailed     |

### Semantics

#### State Variables

- userSettings: Object — Tracks current user preferences.

#### Environment Variables

localStorage — Persists user settings for future sessions.

#### Assumptions

All settings are stored in a valid key-value format.
Local storage is accessible for saving user preferences.
User-provided settings, like themes, are compatible with the system.

#### Access Routine Semantics

updateTheme(theme: string): boolean

- Transition: Applies the specified theme to the editor.
- Output: Returns true if the theme is successfully applied.
- Exception: Throws \wss{InvalidTheme} if the theme string is invalid.

savePreference(pref: Object): boolean

- Transition: Saves the provided preferences to local storage.
- Output: Returns true if the preferences are successfully saved.
- Exception: Throws \wss{SaveFailed} if the preferences cannot be stored.

#### Local Functions

1. validateTheme(theme: string): boolean
   Checks if the given theme is supported by the system.
2. loadDefaultSettings(): Object
   Loads default settings into the editor.
3. logSettingsChange(change: Object): void
   Records changes made to user settings for debugging purposes.

## MIS of Rendering Module

### Module

Rendering Module

### Uses

- Editor Module
- Notes Module
- Data Fetching and State Management Module

### Syntax

#### Exported Constants

- defaultRenderingSettings: Object
  Default settings for rendering views

#### Exported Access Programs

| **Name**        | **In**            | **Out** | **Exceptions** |
| --------------- | ----------------- | ------- | -------------- |
| renderView      | Object viewData   | HTML    | RenderError    |
| updateRendering | Object renderData | boolean | UpdateFailed   |

### Semantics

#### State Variables

- currentView: Object — Stores the currently rendered view.

#### Environment Variables

- display: DOMObject — Represents the rendering canvas or area.

#### Assumptions

Input data for rendering is always valid.
The rendering environment (e.g., browser or display) is functional.

#### Access Routine Semantics

renderView(viewData: Object): HTML

- Transition: Renders the provided view data into HTML format.
- Output: Returns HTML content for display.
- Exception: Throws `RenderError` if rendering fails.

updateRendering(renderData: Object): boolean

- Transition: Updates the rendering based on the new data provided.
- Output: Returns `true` if the update is successful.
- Exception: Throws `UpdateFailed` if the update process fails.

#### Local Functions

1. validateViewData(viewData: Object): boolean
   Ensures the view data is properly structured.

2. clearRenderArea(): void
   Clears the rendering canvas or display area.

3. logRenderingErrors(error: string): void
   Logs errors that occur during the rendering process.

## MIS of Data Fetching and State Management Module

### Module

Data Fetching and State Management Module

### Uses

- Notes Module
- Graph View Module
- Rendering Module

### Syntax

#### Exported Constants

- defaultFetchConfig: Object
  Default configuration for data fetching

#### Exported Access Programs

| **Name**    | **In**          | **Out**            | **Exceptions**    |
| ----------- | --------------- | ------------------ | ----------------- |
| fetchData   | string endpoint | Object fetchedData | FetchError        |
| updateState | Object newState | boolean            | StateUpdateFailed |

### Semantics

#### State Variables

- currentState: Object — Tracks the current application state.

#### Environment Variables

- networkInterface: Object — Represents the system's network connection.

#### Assumptions

Network connectivity is available for fetching data.
State updates do not conflict with ongoing processes.

#### Access Routine Semantics

fetchData(endpoint: string): Object

- Transition: Retrieves data from the specified endpoint.
- Output: Returns the fetched data as an object.
- Exception: Throws `FetchError` if the network request fails.

updateState(newState: Object): boolean

- Transition: Updates the application state with the provided data.
- Output: Returns `true` if the update is successful.
- Exception: Throws `StateUpdateFailed` if the state update process fails.

#### Local Functions

1. validateEndpoint(endpoint: string): boolean
   Checks whether the given endpoint is valid and reachable.

2. mergeStates(oldState: Object, newState: Object): Object
   Combines the old state with the new state data.

3. logFetchErrors(error: string): void
   Logs errors that occur during the data fetching process.

## MIS of Inference Module

### Module

Inference Module

### Uses

- Data Fetching and State Management Module
- Rendering Module

### Syntax

#### Exported Constants

- defaultInferenceConfig: Object
  Default configuration for inference tasks

#### Exported Access Programs

| **Name**        | **In**           | **Out**       | **Exceptions** |
| --------------- | ---------------- | ------------- | -------------- |
| runInference    | Object inputData | Object result | InferenceError |
| cancelInference | string taskId    | boolean       | TaskNotFound   |

### Semantics

#### State Variables

- currentInferenceTasks: Array — Tracks active inference tasks.

#### Environment Variables

- gpuResources — Tracks GPU usage for inference tasks.

#### Assumptions

Input data is preprocessed and ready for inference.
Sufficient GPU resources are available for task execution.

#### Access Routine Semantics

runInference(inputData: Object): Object

- Transition: Runs an inference task using the input data.
- Output: Returns the processed results.
- Exception: Throws `InferenceError` if the task fails.

cancelInference(taskId: string): boolean

- Transition: Cancels the specified inference task.
- Output: Returns `true` if the task is successfully canceled.
- Exception: Throws `TaskNotFound` if the task ID does not exist.

#### Local Functions

1. allocateGPU(taskId: string): boolean
   Allocates GPU resources for a specific task.

2. logInferenceErrors(error: string): void
   Logs errors that occur during inference.

3. freeResources(taskId: string): void
   Frees up resources after a task is completed or canceled.

## MIS of User Configuration Module

### Module

User Configuration Module

### Uses

- Rendering Module
- Data Fetching and State Management Module

### Syntax

#### Exported Constants

- defaultUserConfig: Object
  Default settings for user configurations

#### Exported Access Programs

| **Name**       | **In**              | **Out** | **Exceptions** |
| -------------- | ------------------- | ------- | -------------- |
| saveUserConfig | Object userSettings | boolean | SaveFailed     |
| getUserConfig  | -                   | Object  | ConfigNotFound |

### Semantics

#### State Variables

- userConfigurations: Object — Tracks current user configurations.

#### Environment Variables

- localStorage — Stores user preferences.

#### Assumptions

User-provided configurations are valid and compatible with the system.
The local storage system is accessible.

#### Access Routine Semantics

saveUserConfig(userSettings: Object): boolean

- Transition: Saves user-provided configurations to local storage.
- Output: Returns `true` if the settings are saved successfully.
- Exception: Throws `SaveFailed` if the saving process fails.

getUserConfig(): Object

- Transition: Retrieves the stored user configurations.
- Output: Returns the user settings as an object.
- Exception: Throws `ConfigNotFound` if no settings are found.

#### Local Functions

1. validateUserConfig(config: Object): boolean
   Validates the structure and content of the user-provided configurations.

2. loadDefaultConfig(): Object
   Loads the default user settings.

3. logConfigChanges(change: Object): void
   Records changes made to the user configurations.

## MIS of Analytics Module

### Module

Analytics Module

### Uses

- Data Fetching and State Management Module
- Rendering Module

### Syntax

#### Exported Constants

- defaultAnalyticsConfig: Object
  Default configuration for analytics tasks

#### Exported Access Programs

| **Name**       | **In**            | **Out**       | **Exceptions**        |
| -------------- | ----------------- | ------------- | --------------------- |
| logEvent       | Object eventData  | boolean       | LogError              |
| generateReport | string reportType | Object report | ReportGenerationError |

### Semantics

#### State Variables

- eventLogs: Array — Stores all logged events.

#### Environment Variables

- analyticsServer — Tracks the remote server for analytics processing.

#### Assumptions

Event data is valid and formatted correctly.
The analytics server is accessible for report generation.

#### Access Routine Semantics

logEvent(eventData: Object): boolean

- Transition: Logs the provided event data for analytics.
- Output: Returns `true` if the event is successfully logged.
- Exception: Throws `LogError` if logging fails.

generateReport(reportType: string): Object

- Transition: Generates a report based on the specified type.
- Output: Returns the generated report as an object.
- Exception: Throws `ReportGenerationError` if report creation fails.

#### Local Functions

1. validateEvent(eventData: Object): boolean
   Validates the structure and data of the event before logging.

2. sendEventToServer(eventData: Object): boolean
   Sends the event data to a remote analytics server.

3. aggregateEventData(): Object
   Combines event logs into a structured format for reporting.

## MIS of Export and Intergration Module

### Module

Export and Intergration Module

### Uses

- Rendering Module
- Data Fetching and State Management Module

### Syntax

#### Exported Constants

- defaultExportConfig: Object
  Default configuration for exporting tasks

#### Exported Access Programs

| **Name**              | **In**              | **Out** | **Exceptions**    |
| --------------------- | ------------------- | ------- | ----------------- |
| exportData            | Object exportConfig | boolean | ExportError       |
| integrateWithPlatform | string platform     | boolean | IntegrationFailed |

### Semantics

#### State Variables

- exportHistory: Array — Tracks all data export logs.

#### Environment Variables

- externalPlatforms: Tracks available platforms for integration.

#### Assumptions

Export configurations are valid and compatible with the target format.
External platforms are accessible for integration.

#### Access Routine Semantics

exportData(exportConfig: Object): boolean

- Transition: Exports data based on the provided configurations.
- Output: Returns `true` if the export is successful.
- Exception: Throws `ExportError` if the export process fails.

integrateWithPlatform(platform: string): boolean

- Transition: Integrates the system with the specified external platform.
- Output: Returns `true` if integration is successful.
- Exception: Throws `IntegrationFailed` if the process fails.

#### Local Functions

1. validateExportConfig(config: Object): boolean
   Ensures the export configurations are valid and complete.

2. logExportHistory(config: Object): void
   Records export activities for debugging or auditing purposes.

3. checkPlatformAvailability(platform: string): boolean
   Verifies if the specified platform is accessible for integration.

---

## Appendix

[^ref]

## Revision History

| **Date**      | **Version** | **Notes**          |
| ------------- | ----------- | ------------------ |
| Sept. 16 2024 | 0.0         | Initial skafolding |
| Jan. 12 2025  | 0.1         | Initial Rev        |

### Reflection

<!-- The information in this section will be used to evaluate the team members on the -->
<!-- graduate attribute of Problem Analysis and Design. -->
<!---->
<!-- 1. What went well while writing this deliverable? -->
<!-- 2. What pain points did you experience during this deliverable, and how did you resolve them? -->
<!-- 3. Which of your design decisions stemmed from speaking to your client(s) or a proxy (e.g. your peers, stakeholders, potential users)? For those that were not, why, and where did they come from? -->
<!-- 4. While creating the design doc, what parts of your other documents (e.g. requirements, hazard analysis, etc), it any, needed to be changed, and why? -->
<!-- 5. What are the limitations of your solution? Put another way, given unlimited resources, what could you do to make the project better? (LO_ProbSolutions) -->
<!-- 6. Give a brief overview of other design solutions you considered. What are the benefits and tradeoffs of those other designs compared with the chosen design? From all the potential options, why did you select the documented design? (LO_Explores) -->

<div class="reflection-container">
<div class="users">
  <a class="name" href="https://github.com/lucas-lizhiwei">Lucas</a>
</div>
<div class="blob">
<p>

1. The collaboration on documentation development is getting better, with the past experiences

2. The alignment with the other documents (e.g.SRS) need to be reviewed and corrected. This should be improved in coming up revisions.

3. The decisions related to technical implementation is quick to decide by the team member, but the functional requirements lack clients to gather requests and feedback for this stage.

4. Requirements are needed to be adjusted to be more detailed, together with the assumptions and constraints we observed during design doc development

5. The user interface can be brought better fitting end user's experience if time permits, allowing beatifying and improvement

6. One of the design solution in the early stage is to implement a cooperative database to support language model with better performance, but due to the demanding implementation effort, time limit and the language model we decided on, this option was dropped. Our current option can still compromise with satisfying results and much more feasible.
</p>
</div>
</div>
