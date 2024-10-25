---
id: MIS-Checklist
tags:
  - checklist
author: smiths
date: "2024-09-16"
title: MIS Checklist
---

- Follows writing checklist (full checklist provided in a separate document)

  - [ ] LaTeX points
  - [ ] Structure
  - [ ] Spelling, grammar, attention to detail
  - [ ] Avoid low information content phrases
  - [ ] Writing style

- Module Decomposition

  - [ ] One module one secret (unless an explicit exception is made, with a good reason) - all "and"s should be checked.
  - [ ] The uses relation is a hierarchy.
  - [ ] Secrets are nouns (generally).
  - [ ] Traceability matrix between modules and requirements shows every requirement is satisfied by at least on module
  - [ ] Traceability matrix between modules and requirements shows that every module is used to satisfy at least one requirement
  - [ ] Traceability matrix between likely changes and modules shows a one to one mapping, or, if this is not the case, explains the exceptions to this rule.
  - [ ] Level 1 of the decomposition by secrets shows: Hardware-Hiding, Behaviour-Hiding and Software Decision Hiding.
  - [ ] Behaviour-Hiding modules are related to the requirements
  - [ ] Software-Decision hiding modules are concepts that need to be introduced, but are not detailed in the requirements
  - [ ] Each Software Decision Hiding module is used by at least one Behaviour-Hiding Module (if this isn't the case, an explanation should be provided)
  - [ ] Uses relation is not confused with a data flow chart. If you can imagine an "import B" statement in the code for module A, then module A uses module B.
  - [ ] The arrow in the uses relation points from module A to module B when module A uses module B
  - [ ] Anticipated changes are a superset of the likely changes in the SRS

- MG quality
  - [ ] Follow template
  - [ ] Low coupling
  - [ ] Satisfies information hiding
