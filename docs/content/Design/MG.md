---
id: MG
tags:
  - design
author: aarnphm,waleedmalik7,nebrask,lucas-lizhiwei
date: "2024-09-16"
title: Module Guide
---

## Revision History

| **Date**      | **Version** | **Notes**          |
| ------------- | ----------- | ------------------ |
| Sept. 16 2024 | 0.0         | Initial skafolding |
| Sept. 16 2024 | 0.1         | Initial setup      |

## Reference Material

This section records information for easy reference.

### Abbreviations and Acronyms

| **symbol** | **description**                     |
| ---------- | ----------------------------------- |
| AC         | Anticipated Change                  |
| DAG        | Directed Acyclic Graph              |
| M          | Module                              |
| MG         | Module Guide                        |
| OS         | Operating System                    |
| R          | Requirement                         |
| SC         | Scientific Computing                |
| SRS        | Software Requirements Specification |
| \progname  | Explanation of program name         |
| UC         | Unlikely Change                     |
| etc.       | ...                                 |

## Introduction

Decomposing a system into modules is a commonly accepted approach to developing software. A module is a work assignment for a programmer or programming team ^1. We advocate a decomposition based on the principle of information hiding[2]. This principle supports design for change, because the "secrets" that each module hides represent likely future changes. Design for change is valuable in SC,... where modifications are frequent, especially during initial development as the solution space is explored.

Our design follows the rules layed out by Parnas et al.[1], as follows:

- System details that are likely to change independently should be the secrets of separate modules.
- Each data structure is implemented in only one module.
- Any other program that requires information stored in a module's data structures must obtain it by calling access programs belonging to that module.

After completing the first stage of the design, the Software Requirements Specification (SRS), the Module Guide (MG) is developed[1]. The MG specifies the modular structure of the system and is intended to allow both designers and maintainers to easily identify the parts of the software. The potential readers of this document are as follows:

- New project members: This document can be a guide for a new project member to easily understand the overall structure and quickly find the relevant modules they are searching for.
- Maintainers: The hierarchical structure of the module guide improves the maintainers' understanding when they need to make changes to the system. It is important for a maintainer to update the relevant sections of the document after changes have been made.
- Designers: Once the module guide has been written, it can be used to check for consistency, feasibility, and flexibility. Designers can verify the system in various ways, such as consistency among modules, feasibility of the decomposition, and flexibility of the design.

The rest of the document is organized as follows. Section 2 lists the anticipated and unlikely changes of the software requirements. Section 3 summarizes the module decomposition that was constructed according to the likely changes. Section 4 specifies the connections between the software requirements and the modules. Section 5 gives a detailed description of the modules.... Section 6 includes two traceability matrices. One checks the completeness of the design against the requirements provided in the SRS. The other shows the relation between anticipated changes and the modules. Section 7 describes the use relation between modules.

## Anticipated and Unlikely Changes

This section lists possible changes to the system. According to the likeliness of the change, the possible changes are classified into two categories. Anticipated changes are listed in Section 2.1, and unlikely changes are listed in Section 2.2.

### Anticipated Changes

Anticipated changes are the source of the information that is to be hidden inside the modules. Ideally, changing one of the anticipated changes will only require changing the one module that hides the associated decision. The approach adapted here is called design for change.

- **AC1:** The specific hardware on which the software is running.
- **AC2:** The format of the initial input data.
- ...

\wss{Anticipated changes relate to changes that would be made in requirements, design or implementation choices. They are not related to changes that are made at run-time, like the values of parameters.}

### Unlikely Changes

The module design should be as general as possible. However, a general system is more complex. Sometimes this complexity is not necessary. Fixing some design decisions at the system architecture stage can simplify the software design. If these decision should later need to be changed, then many parts of the design will potentially need to be modified. Hence, it is not intended that these decisions will be changed.

- **UC1:** Input/Output devices (Input: File and/or Keyboard, Output: File, Memory, and/or Screen).
- ...

## Module Hierarchy

This section provides an overview of the module design. Modules are summarized in a hierarchy decomposed by secrets in Table 1. The modules listed below, which are leaves in the hierarchy tree, are the modules that will actually be implemented.

- **M1:** Hardware-Hiding Module
- ...

| **Level 1**              | **Level 2** |
| ------------------------ | ----------- |
| Hardware-Hiding Module   | ~           |
| Behaviour-Hiding Module  | ?           |
|                          | ?           |
|                          | ?           |
|                          | ?           |
|                          | ?           |
|                          | ?           |
|                          | ?           |
|                          | ?           |
| Software Decision Module | ?           |
|                          | ?           |
|                          | ?           |

Table 1: Module Hierarchy

## Connection Between Requirements and Design

The design of the system is intended to satisfy the requirements developed in the SRS. In this stage, the system is decomposed into modules. The connection between requirements and modules is listed in Table 2.

<!-- The intention of this section is to document decisions that are made "between" the requirements and the design. To satisfy some requirements, design decisions need to be made. Rather than make these decisions implicit, they are explicitly recorded here. For instance, if a program has security requirements, a specific design decision may be made to satisfy those requirements with a password. -->

## Module Decomposition

Modules are decomposed according to the principle of "information hiding" proposed by Parnas et al.[1]. The _Secrets_ field in a module decomposition is a brief statement of the design decision hidden by the module. The _Services_ field specifies _what_ the module will do without documenting _how_ to do it. For each module, a suggestion for the implementing software is given under the _Implemented By_ title. If the entry is _OS_, this means that the module is provided by the operating system or by standard programming language libraries. _\progname{}_ means the module will be implemented by the \progname{} software. Only the leaf modules in the hierarchy have to be implemented. If a dash (_--_) is shown, this means that the module is not a leaf and will not have to be implemented.

### Hardware Hiding Modules (M1)

- **Secrets:** The data structure and algorithm used to implement the virtual hardware.
- **Services:** Serves as a virtual hardware used by the rest of the system. This module provides the interface between the hardware and the software. So, the system can use it to display outputs or to accept inputs.
- **Implemented By:** OS

### Behaviour-Hiding Module

- **Secrets:** The contents of the required behaviours.
- **Services:** Includes programs that provide externally visible behaviour of the system as specified in the software requirements specification (SRS) documents. This module serves as a communication layer between the hardware-hiding module and the software decision module. The programs in this module will need to change if there are changes in the SRS.
- **Implemented By:** --

#### Input Format Module (M2)

- **Secrets:** The format and structure of the input data.
- **Services:** Converts the input data into the data structure used by the input parameters module.
- **Implemented By:** [Your Program Name Here]
- **Type of Module:** [Record, Library, Abstract Object, or Abstract Data Type] [Information to include for leaf modules in the decomposition by secrets tree.]

#### Etc.

### Software Decision Module

- **Secrets:** The design decision based on mathematical theorems, physical facts, or programming considerations. The secrets of this module are _not_ described in the SRS.
- **Services:** Includes data structure and algorithms used in the system that do not provide direct interaction with the user....
- **Implemented By:** --

#### Etc.

## Traceability Matrix

This section shows two traceability matrices: between the modules and the requirements and between the modules and the anticipated changes.

| **Req.** | **Modules**             |
| -------- | ----------------------- |
| R1       | M1, M2, M3, M4          |
| R2       | M2, M3                  |
| R3       | M5                      |
| R4       | M6, M4                  |
| R5       | M6, M7, M4, M8, M9, M10 |
| R6       | M6, M7, M4, M8, M9, M10 |
| R7       | M6, M11, M4, M8, M10    |
| R8       | M6, M11, M4, M8, M10    |
| R9       | M12                     |
| R10      | M6, M7, M4              |
| R11      | M6, M7, M11, M4         |

Table 2: Trace Between Requirements and Modules

| **AC** | **Modules** |
| ------ | ----------- |
| AC1    | M1          |
| AC2    | M2          |
| AC3    | M3          |
| AC4    | M5          |
| AC5    | M6          |
| AC6    | M12         |
| AC7    | M7          |
| AC8    | M11         |
| AC9    | M4          |
| AC10   | M8          |
| AC11   | M9          |
| AC12   | M10         |

Table 3: Trace Between Anticipated Changes and Modules

## Use Hierarchy Between Modules

In this section, the uses hierarchy between modules is provided. Parnas[3] said of two programs A and B that A _uses_ B if correct execution of B may be necessary for A to complete the task described in its specification. That is, A _uses_ B if there exist situations in which the correct functioning of A depends upon the availability of a correct implementation of B. Figure 1 illustrates the use relation between the modules. It can be seen that the graph is a directed acyclic graph (DAG). Each level of the hierarchy offers a testable and usable subset of the system, and modules in the higher level of the hierarchy are essentially simpler because they use modules from the lower levels.

\wss{The uses relation is not a data flow diagram. In the code there will often be an import statement in module A when it directly uses module B. Module B provides the services that module A needs. The code for module A needs to be able to see these services (hence the import statement). Since the uses relation is transitive, there is a use relation without an import, but the arrows in the diagram typically correspond to the presence of import statement.}

\wss{If module A uses module B, the arrow is directed from A to B.}

![Use hierarchy among modules](UsesHierarchy.png)

Figure 1: Use hierarchy among modules

## User Interfaces

\wss{Design of user interface for software and hardware. Attach an appendix if needed. Drawings, Sketches, Figma}

## Design of Communication Protocols

\wss{If appropriate}

## Timeline

\wss{Schedule of tasks and who is responsible}

\wss{You can point to GitHub if this information is included there}

## References

> [!important] UPDATE CORRECT LINKS
> UPDATE LINKS

[1]: Parnas, D.L., Clements, P.C. and Weiss, D.M., 1984. The modular structure of complex systems. In Proceedings of the 7th international conference on Software engineering (pp. 408-417).

[2]: Parnas, D.L., 1972. On the criteria to be used in decomposing systems into modules. Communications of the ACM, 15(12), pp.1053-1058.

[3]: Parnas, D.L., 1978. Some software engineering principles. Infotech State of the Art Report, 14(1), pp.237-247.
