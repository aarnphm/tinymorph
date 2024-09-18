---
id: MIS
tags:
  - design
author: aarnphm,waleedmalik7,nebrask,Hoshino-Kiichi
date: "2024-09-16"
title: Module Interface Specification
---

## Revision History

| **Date**      | **Version** | **Notes**          |
| ------------- | ----------- | ------------------ |
| Sept. 16 2024 | 0.0         | Initial skafolding |

## Symbols, Abbreviations and Acronyms

See SRS Documentation at \wss{give url}

\wss{Also add any additional symbols, abbreviations or acronyms}

## Introduction

The following document details the Module Interface Specifications for
\wss{Fill in your project name and description}

Complementary documents include the System Requirement Specifications
and Module Guide. The full documentation and implementation can be
found at \url{...}. \wss{provide the url for your repo}

## Notation

\wss{You should describe your notation. You can use what is below as
a starting point.}

The structure of the MIS for modules comes from \citet{HoffmanAndStrooper1995},
with the addition that template modules have been adapted from
\cite{GhezziEtAl2003}. The mathematical notation comes from Chapter 3 of
\citet{HoffmanAndStrooper1995}. For instance, the symbol := is used for a
multiple assignment statement and conditional rules follow the form $(c_1
\Rightarrow r_1 | c_2 \Rightarrow r_2 | ... | c_n \Rightarrow r_n )$.

The following table summarizes the primitive data types used by \progname.

| **Data Type**  | **Notation** | **Description**                                                  |
| -------------- | ------------ | ---------------------------------------------------------------- |
| character      | char         | a single symbol or digit                                         |
| integer        | $\mathbb{Z}$ | a number without a fractional component in (-$\infty$, $\infty$) |
| natural number | $\mathbb{N}$ | a number without a fractional component in [1, $\infty$)         |
| real           | $\mathbb{R}$ | any number in (-$\infty$, $\infty$)                              |

\noindent
The specification of \progname \ uses some derived data types: sequences, strings, and
tuples. Sequences are lists filled with elements of the same data type. Strings
are sequences of characters. Tuples contain a list of values, potentially of
different types. In addition, \progname \ uses functions, which
are defined by the data types of their inputs and outputs. Local functions are
described by giving their type signature followed by their specification.

## Module Decomposition

The following table is taken directly from the Module Guide document for this project.

| **Level 1**       | **Level 2**                     |
| ----------------- | ------------------------------- |
| Hardware-Hiding   | ~                               |
| Behaviour-Hiding  | Input Parameters                |
|                   | Output Format                   |
|                   | Output Verification             |
|                   | Temperature ODEs                |
|                   | Energy Equations                |
|                   | Control Module                  |
|                   | Specification Parameters Module |
| Software Decision | Sequence Data Structure         |
|                   | ODE Solver                      |
|                   | Plotting                        |

Table: Module Hierarchy

## MIS of \wss{Module Name}

\wss{You can reference SRS labels, such as R\ref{R_Inputs}.}

\wss{It is also possible to use \LaTeX for hypperlinks to external documents.}

### Module

\wss{Short name for the module}

### Uses

### Syntax

#### Exported Constants

#### Exported Access Programs

| **Name**         | **In** | **Out** | **Exceptions** |
| ---------------- | ------ | ------- | -------------- |
| \wss{accessProg} | -      | -       | -              |

### Semantics

#### State Variables

\wss{Not all modules will have state variables. State variables give the module
a memory.}

#### Environment Variables

\wss{This section is not necessary for all modules. Its purpose is to capture
when the module has external interaction with the environment, such as for a
device driver, screen interface, keyboard, file, etc.}

#### Assumptions

\wss{Try to minimize assumptions and anticipate programmer errors via
exceptions, but for practical purposes assumptions are sometimes appropriate.}

#### Access Routine Semantics

\noindent \wss{accessProg}():

- transition: \wss{if appropriate}
- output: \wss{if appropriate}
- exception: \wss{if appropriate}

\wss{A module without environment variables or state variables is unlikely to
have a state transition. In this case a state transition can only occur if
the module is changing the state of another module.}

\wss{Modules rarely have both a transition and an output. In most cases you
will have one or the other.}

#### Local Functions

\wss{As appropriate} \wss{These functions are for the purpose of specification.
They are not necessarily something that is going to be implemented
explicitly. Even if they are implemented, they are not exported; they only
have local scope.}

## References

## Appendix

\wss{Extra information if required}

## Appendix - Reflection

\wss{Not required for CAS 741 projects}

The information in this section will be used to evaluate the team members on the
graduate attribute of Problem Analysis and Design.

1. What went well while writing this deliverable?
2. What pain points did you experience during this deliverable, and how did you resolve them?
3. Which of your design decisions stemmed from speaking to your client(s) or a proxy (e.g. your peers, stakeholders, potential users)? For those that were not, why, and where did they come from?
4. While creating the design doc, what parts of your other documents (e.g. requirements, hazard analysis, etc), it any, needed to be changed, and why?
5. What are the limitations of your solution? Put another way, given unlimited resources, what could you do to make the project better? (LO_ProbSolutions)
6. Give a brief overview of other design solutions you considered. What are the benefits and tradeoffs of those other designs compared with the chosen design? From all the potential options, why did you select the documented design? (LO_Explores)
