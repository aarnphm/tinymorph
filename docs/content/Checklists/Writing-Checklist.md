---
id: Writing-Checklist
tags:
  - checklist
date: "2024-09-16"
title: Writing Checklist
---

Spencer Smith

September 16, 2024

The following checklist should be applied to the documents that you write.

- LaTeX points
  - [ ] Only tex file (and possibly pdf files, or image files) are under version control (`aux` files etc. are not under version control) (`.gitignore` can help with this)
  - [ ] Opening and closing `quotes'' are used (`\`quotes''`)
  - [ ] Periods that do not end sentences are followed by only one space (LaTeX inserts two by default): `I like Dr.\ Smith.'', or for no linebreaks: `I like Dr.~Smith.''`
  - [ ] Long names in math mode use either mathit or text, or equivalent: $coeff$ (`$coeff$`) versus $\mathit{coeff}$ (`$\mathit{coeff}$`) versus $\text{coeff}$ (`$\text{coeff}$`). (By default LaTeX incorrectly thinks each letter is a separate variable and spaces accordingly.)
  - [ ] The `Comments.tex` file is provided for ease of adding comments to a LaTeX file.
  - [ ] Text lines should be 80 characters wide. That is, the text has a hard-wrap at 80 characters. This is done to facilitate meaingful diffs between different commits. (Some ideas on how to do this are given below.)
  - [ ] Template comments (plt) should not be shown in the pdf version, either by removing them, or by turning them off.
  - [ ] References and labels are used so that maintenance is feasible
  - [ ] Cross-references between documents are used as appropriate
  - [ ] BibTeX is used for generating bibliographic references
  - [ ] [booktabs](https://nhigham.com/2019/11/19/better-latex-tables-with-booktabs/) is used to generate tables, vertical and horizontal lines are minimized
- Structure
  - [ ] There is always some text between section headings
  - [ ] There aren't instances of only one subsection within a section
- Spelling, Grammar and attention to detail
  - [ ] Each punctuation symbol (period, comma, semicolon, question mark, exclamation point) has no space before it.
  - [ ] Opening parentheses (brackets) have a space before, closing parentheses have a space after the symbol.
  - [ ] Parentheses (brackets) occur in pairs, one opening and one closing
  - [ ] All sentences begin with a capital letter.
  - [ ] Document is spell checked!
  - [ ] Grammar has been checked (review, assign a team member an issue to review the grammar for each section).
  - [ ] That and which are used correctly (http://www.kentlaw.edu/academics/lrw/grinker/LwtaThat_Versus_Which.htm)
  - [ ] Symbols used outside of a formula should be formatted the same way as they are in the equation. For instance, when listing the variables in an equation, you should still use math mode for the symbols.
  - [ ] Include a `.gitignore` file in your repo so that generated files are ignored by git. More information is available on-line on [Hidden files and hidden directories](https://en.wikipedia.org/wiki/Hidden_file_and_hidden_directory).
  - [ ] All hyperlinks work
  - [ ] Every figure has a caption
  - [ ] Every table has a heading
  - [ ] Every figure is referred to by the text at some point
  - [ ] Every table is referred to be the text at some point
  - [ ] All acronyms are expanded on their first usage, using capitals to show the source of each letter in the acronym. Defining the acronym only in a table at the beginning of the document is not enough.
  - [ ] [All numbers from zero to ten should be written out as words. Larger numbers should be written as numerals.](https://www.scribendi.com/academy/articles/when_to_spell_out_numbers_in_writing.en.html?session_token=eyJ0aW1lIjoxNjY2MDY0ODcyOTQ4LCJob3N0Ijoid3d3LnNjcmliZW5kaS5jb20iLCJyZWZlcmVyIjoiaHR0cHM6Ly93d3cuc2NyaWJlbmRpLmNvbS9hY2FkZW15L2FydGljbGVzL3doZW5fdG9fc3BlbGxfb3V0X251bWJlcnNfaW5fd3JpdGluZy5lbi5odG1sIn0%3D)
- Avoid Low Information Content phrases ([List of LIC phrases](https://www.webpages.uidaho.edu/range357/extra-refs/empty-words.htm))
  - [ ] `in order to` simplified to `to`
  - [ ] ...
- Writing style
  - [ ] Avoid sentences that start with "It."
  - [ ] Paragraphs are structured well (clear topic sentence, cohesive)
  - [ ] Paragraphs are concise (not wordy)
- GitHub
  - [ ] Proper GitHub conventions are followed (see below)

#### Fixed Width LaTeX Text

Having the LaTeX text at a fixed width (hard-wrap) is useful when the source is under version control. The fixed line lengths help with isolating the changes between diffs.

Although the checklist mentions an 80 column width, any reasonable fixed width is fine.

The hard-wrap shouldn't be done manually. Most editors will have some facility for fixed width. In emacs it is called auto-fill. Some advice from previous and current students:

- In TEXMaker, you can do: User > Run script > hardwordwrap
- Wrapping is easy in VSCode, Emacs, and Vim

#### Using GitHub Checklist

- When closing an issue, include (where appropriate) the commit hash of the commit that addresses the issue
- Make small commits (sometimes a commit will be changing only one line, or even just one word)
- Make sure that all of the changes in a commit are related (you can change more than one file, but the changes should all be related)
- You can easily link to other issues in your issue description or discussion comments by using the hash symbol followed by the number of that other issue
- If your issue references a document or file in your repo (or elsewhere) include a link to that document to make it easier for others to navigate your issue
- Make your issue as self-contained as possible. Sometimes this will involve including a screenshot or other graphic.
- You can include a smiley face :smile:, if you want to ensure that your comments do not come across as more harsh than you intend
- What needs to happen to close an issue should be clear
- Close issues when they are done (the person assigned the issue is generally the person that closes the issue)
- Most issues should be explicitly assigned to someone
- [Advice from Emily Horsman](https://gitlab.cas.mcmaster.ca/smiths/se2aa4_cs2me3/-/blob/master/FAQ/GitAdvice.txt) on git commits

There are many other [checklists](<https://gitlab.cas.mcmaster.ca/SEforSC/se4sc/-/wikis/Advice-and-Checklists-for-Repos-(including-a-list-of-recommended-artifacts)>) available for scientific computing (research) software. Google can help find even more checklists.
