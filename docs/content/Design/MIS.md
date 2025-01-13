---
id: MIS
tags:
  - design
author: aarnphm,waleedmalik7,nebrask,lucas-lizhiwei
date: "2024-09-16"
title: Module Interface Specification
---

## Revision History

| **Date**      | **Version** | **Notes**          |
| ------------- | ----------- | ------------------ |
| Sept. 16 2024 | 0.0         | Initial skafolding |
| Jan. 12 2025  | 0.1         | Initial skafolding |
## Symbols, Abbreviations and Acronyms

The following data dictionary from [[SRS/SRS]] will be used for the symbols:

![[SRS/SRS#7.2 Data Dictionary|data dictionary]]

## Introduction

The following document details the Module Interface Specifications for
tinymorph, which aims to explore new interfaces and workflow for auto-regressive model to help writers craft better writing artifacts.

Complementary documents include the System Requirement Specifications
and Module Guide. The full documentation and implementation can be
found at [tinymorph](https://github.com/aarnphm/tinymorph/)

## Notation

The structure of the MIS for modules comes from [HoffmanAndStrooper1995],
with the addition that template modules have been adapted from
[GhezziEtAl2003]. The mathematical notation comes from Chapter 3 of
[HoffmanAndStrooper1995]. For instance, the symbol := is used for a
multiple assignment statement and conditional rules follow the form $(c_1 \Rightarrow r_1 \mid c_2 \Rightarrow r_2 \mid \dots \mid c_n \Rightarrow r_n)$.

The following table summarizes the primitive data types used by tinymorph.

| **Data Type**  | **Notation** | **Description**                                                  |
| -------------- | ------------ | ---------------------------------------------------------------- |
| character      | char         | a single symbol or digit                                         |
| integer        | $\mathbb{Z}$ | a number without a fractional component in (-$\infty$, $\infty$) |
| natural number | $\mathbb{N}$ | a number without a fractional component in [1, $\infty$)         |
| real           | $\mathbb{R}$ | any number in (-$\infty$, $\infty$)                              |

The specification of tinymorph uses some derived data types: sequences, strings, and
tuples. Sequences are lists filled with elements of the same data type. Strings
are sequences of characters. Tuples contain a list of values, potentially of
different types. In addition, tinymorph uses functions, which
are defined by the data types of their inputs and outputs. Local functions are
described by giving their type signature followed by their specification.

## Module Decomposition

The following table is taken directly from the Module Guide document for this project.

| **Level 1**       | **Level 2**                     |
| ----------------- | ------------------------------- |
| Hardware-Hiding   | Rendering module                           |
|                   | Storage Management                         |
|                   | Input Device Handling                      |
|                   | Display Management                         |
|                   | Hardware Resource Optimization             |
| Behaviour-Hiding  | Editor module                   |
|                   | note module                     |
|                   | setting module                  |
|                   | Graph module                    |
| Software Decision | Sparse Autoencoder (SAE) Integration         |
|                   | Inference Server Communication               |
|                   | Data Export and Import                       |
|                   | UI Rendering Logic                           |

Table: Module Hierarchy

## MIS of Editor module

### Module
Editor module
### Uses
- Rendering Module
- Markdown Parsing Library
### Syntax

#### Exported Constants
- defaultEditorConfig: Object
#### Exported Access Programs

| **Name**         | **In** | **Out** | **Exceptions** |
| ---------------- | ------ | ------- | -------------- |
| renderMarkdown   | string content      | HTML       | InvalidInput              |

### Semantics

#### State Variables
- editorContent: string — Tracks the current content of the editor.
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
- Exception: Throws \wss{InvalidInput} if the input string is null or empty.

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

| **Name**         | **In** | **Out** | **Exceptions** |
| ---------------- | ------ | ------- | -------------- |
| createNote   | string content      | NoteObject       | InvalidContent              |
| deleteNote   | int noteId      | boolean       | NoteNotFound              |
| fetchNotes   | -      | NoteArray       | APICallFailed              |

### Semantics

#### State Variables
- NoteArray — Tracks the current list of notes.
- selectedNote: NoteObject — Tracks the currently selected note.

#### Environment Variables

localStorage — Used to cache notes for offline access.

#### Assumptions

- Note objects are properly structured and contain unique identifiers.
- The local storage system is operational for offline caching.
- External API endpoints for note synchronization are accessible.

#### Access Routine Semantics

createNote(content: string): NoteObject

- Transition: Creates a new note with the provided content and adds it to the notes list.
- Output: Returns the newly created note object.
- Exception: Throws \wss{InvalidContent} if the input is invalid or null.

deleteNote(noteId: int): boolean

- Transition: Removes the note with the specified ID from the notes list.
- Output: Returns true if the note is successfully deleted.
- Exception: Throws NoteNotFound if the note ID does not exist.

fetchNotes(): NoteArray

- Transition: Retrieves all stored notes, either from local storage or an API.
- Output: Returns an array of note objects.
- Exception: Throws APICallFailed if the external API cannot be reached.

#### Local Functions

1. validateNoteContent(content: string): boolean
Checks whether the content meets length and format requirements.
2. syncWithServer(): void
Synchronizes local notes with the remote server.
3. cacheNotesLocally(notes: NoteArray): void
Stores the note array in local storage for offline use.

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

| **Name**         | **In** | **Out** | **Exceptions** |
| ---------------- | ------ | ------- | -------------- |
| createNote   | string content      | NoteObject       | InvalidContent              |
| deleteNote   | int noteId      | boolean       | NoteNotFound              |
| fetchNotes   | -      | NoteArray       | APICallFailed              |

### Semantics

#### State Variables
- NoteArray — Tracks the current list of notes.
- selectedNote: NoteObject — Tracks the currently selected note.

#### Environment Variables

localStorage — Used to cache notes for offline access.

#### Assumptions

- Note objects are properly structured and contain unique identifiers.
- The local storage system is operational for offline caching.
- External API endpoints for note synchronization are accessible.

#### Access Routine Semantics

createNote(content: string): NoteObject

- Transition: Creates a new note with the provided content and adds it to the notes list.
- Output: Returns the newly created note object.
- Exception: Throws \wss{InvalidContent} if the input is invalid or null.

deleteNote(noteId: int): boolean

- Transition: Removes the note with the specified ID from the notes list.
- Output: Returns true if the note is successfully deleted.
- Exception: Throws NoteNotFound if the note ID does not exist.

fetchNotes(): NoteArray

- Transition: Retrieves all stored notes, either from local storage or an API.
- Output: Returns an array of note objects.
- Exception: Throws APICallFailed if the external API cannot be reached.

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

| **Name**         | **In** | **Out** | **Exceptions** |
| ---------------- | ------ | ------- | -------------- |
| renderGraph   | GraphDataObject      | HTML       | InvalidGraph              |
| updateGraph   | GraphUpdateData    | boolean       | GraphNotFound              |

### Semantics

#### State Variables
- graphData: GraphDataObject — Tracks the current graph structure.
- graphSettings: Object — Tracks the configuration of the graph.

#### Environment Variables

canvas: DOMObject — Renders the graph visualization.

#### Assumptions

- Graph data is always structured as valid objects before rendering.
- The canvas element is available and properly initialized for graph visualization.
- User actions to update the graph do not conflict with ongoing render processes.

#### Access Routine Semantics

renderGraph(data: GraphDataObject): HTML

- Transition: Renders the graph using the given data.
- Output: Returns HTML for displaying the graph.
- Exception: Throws \wss{InvalidGraph} if the input data is malformed.

updateGraph(updateData: GraphUpdateData): boolean

- Transition: Updates the graph with the provided data.
- Output: Returns true if the update is successful.
- Exception: Throws \wss{GraphNotFound} if the graph does not exist.

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

| **Name**         | **In** | **Out** | **Exceptions** |
| ---------------- | ------ | ------- | -------------- |
| updateTheme   | string theme      | boolean       | InvalidTheme              |
| savePreference   | Object prefs    | boolean       | SaveFailed              |

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


## References
- Hoffman and Strooper (1995)
- Ghezzi et al. (2003)
## Appendix

## Appendix - Reflection

The information in this section will be used to evaluate the team members on the
graduate attribute of Problem Analysis and Design.

1. What went well while writing this deliverable?
2. What pain points did you experience during this deliverable, and how did you resolve them?
3. Which of your design decisions stemmed from speaking to your client(s) or a proxy (e.g. your peers, stakeholders, potential users)? For those that were not, why, and where did they come from?
4. While creating the design doc, what parts of your other documents (e.g. requirements, hazard analysis, etc), it any, needed to be changed, and why?
5. What are the limitations of your solution? Put another way, given unlimited resources, what could you do to make the project better? (LO_ProbSolutions)
6. Give a brief overview of other design solutions you considered. What are the benefits and tradeoffs of those other designs compared with the chosen design? From all the potential options, why did you select the documented design? (LO_Explores)
