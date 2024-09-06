---
id: Code-Checklist
tags:
  - checklist
date: "2024-09-16"
title: Source Code Checklist
---

Spencer Smith

\today

- Identifier naming

  - [ ] Identifier names are consistent
  - [ ] Identifier names are meaningful

- Coding

  - [ ] Source code in the src folder
  - [ ] Comments on "what" not "how"
  - [ ] Avoid hard-coded constants (other than maybe 0 or 1)
  - [ ] Consistent indentation
  - [ ] Explicit identification of coding standard being followed
  - [ ] Code standard is followed
  - [ ] Parameters in the same order for all functions

- Relation to other documents

  - [ ] Descriptive name for source code files
  - [ ] Mapping to module guide (system architecture) is clear, may require a document explicitly mapping between modules and code files
  - [ ] Show mapping between MIS symbols (low-level design document) and code symbols

- Readability

  - [ ] Code is reasonably understandable to someone that knows the programming language, but is new to the project
  - [ ] Esoteric language features avoided when a simpler language feature could be used
  - [ ] Incomplete code is flagged with a suitable marker, such as "TO DO"?

- \wss{This checklist is not exhaustive. More items should be added.}
