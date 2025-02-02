"use client"

import * as React from "react"
import CodeMirror from "@uiw/react-codemirror"
import { markdown as markdownExtension } from "@codemirror/lang-markdown"
import { languages } from "@codemirror/language-data"
import { NoteCard } from "./note-card"
import { markdownLanguage } from "@codemirror/lang-markdown"
import { EditorView } from "@codemirror/view"
import { vim } from "@replit/codemirror-vim"
import { inlineMarkdownExtension } from "./markdown-inline"
import { AppSidebar } from "./app-sidebar"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Toolbar } from "./toolbar"
import { drag } from "d3-drag"
import { select } from "d3-selection"
import { useRef, useState } from "react"
import usePersistedSettings from "@/hooks/use-persisted-settings"
import jsPDF from "jspdf";

interface Note {
  title: string
  content: string
}

interface DraggableNoteProps extends Note {
  onDrop: (note: Note, droppedOverEditor: boolean) => void
  editorRef: React.RefObject<HTMLDivElement | null>
}

const SAMPLE_NOTES = [
  {
    title: "Jogging",
    content:
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
  },
  {
    title: "games",
    content:
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
  },
  {
    title: "Jogging",
    content:
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
  },
  {
    title: "Examination",
    content:
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
  },
  {
    title: "Classes",
    content:
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
  },
  {
    title: "Race",
    content:
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
  },
  {
    title: "Speech",
    content:
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
  },
  {
    title: "Party",
    content:
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
  },
  {
    title: "Reminder",
    content:
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
  },
  {
    title: "games",
    content:
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
  },
  {
    title: "Speech",
    content:
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
  },
  {
    title: "Party",
    content:
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
  },
]

const initialMarkdown = `---
id: mechanistic interpretability
aliases:
  - mechinterp
  - reveng neural net
tags:
  - interp
abstract: The subfield of alignment, or reverse engineering neural network. In a sense, it is the field of learning models' world representation.
date: 2024-10-30
description: and reverse engineering neural networks.
modified: 2025-02-02 07:17:20 GMT-05:00
permalinks:
  - /mechinterp
title: mechanistic interpretability
---

[whirlwind tour](https://www.youtube.com/watch?v=veT2VI4vHyU&ab_channel=FAR%E2%80%A2AI), [[thoughts/pdfs/tinymorph exploration.pdf|initial exploration]], [glossary](https://dynalist.io/d/n2ZWtnoYHrU1s4vnFSAQ519J)

> The subfield of alignment that delves into reverse engineering of a neural network, especially [[thoughts/LLMs]]

To attack the *curse of dimensionality*, the question remains: *==how do we hope to understand a function over such a large space, without an exponential amount of time?==* [^lesswrongarc]

[^lesswrongarc]: good read from [Lawrence C](https://www.lesswrong.com/posts/6FkWnktH3mjMAxdRT/what-i-would-do-if-i-wasn-t-at-arc-evals#Ambitious_mechanistic_interpretability) for ambitious mech interp.

Topics:

- [[thoughts/sparse autoencoder]]
- [[thoughts/sparse crosscoders]]
- [[thoughts/Attribution parameter decomposition]]

## open problems

@sharkey2025openproblemsmechanisticinterpretability

- differentiate between "reverse engineering" versus "concept-based"
  - reverse engineer:
    - decomposition -> hypotheses -> validation
      - Decomposition via dimensionality [[thoughts/university/twenty-four-twenty-five/sfwr-4ml3/principal component analysis|reduction]]
  - drawbacks with [[thoughts/sparse autoencoder#sparse dictionary learning|SDL]]:
    - SDL reconstruction error are way too high [@rajamanoharan2024improvingdictionarylearninggated{see section 2.3}]
    - SDL assumes linear representation hypothesis against non-linear feature space.
    - SDL leaves feature geometry unexplained ^geometry

## inference

Application in the wild: [Goodfire](https://goodfire.ai/) and [Transluce](https://transluce.org/)

> [!question]- How we would do inference with SAE?
>
> https://x.com/aarnphm_/status/1839016131321016380

idea: treat SAEs as a logit bias, similar to [[thoughts/vllm#guided decoding]]

## steering

refers to the process of manually modifying certain activations and hidden state of the neural net to influence its
outputs

For example, the following is a toy example of how a decoder-only transformers (i.e: GPT-2) generate text given the prompt "The weather in California is"

\`\`\`mermaid
flowchart LR
  A[The weather in California is] --> B[H0] --> D[H1] --> E[H2] --> C[... hot]
\`\`\`

To steer to model, we modify $H_2$ layers with certain features amplifier with scale 20 (called it $H_{3}$)[^1]

[^1]: An example steering function can be:

    $$
    H_{3} = H_{2} + \\text{steering_strength} * \\text{SAE}.W_{\\text{dec}}[20] * \\text{max_activation}
    $$

\`\`\`mermaid
flowchart LR
  A[The weather in California is] --> B[H0] --> D[H1] --> E[H3] --> C[... cold]
\`\`\`

One usually use techniques such as [[thoughts/mechanistic interpretability#sparse autoencoders]] to decompose model activations into a set of
interpretable features.`

function DraggableNoteCard({ title, content, onDrop, editorRef }: DraggableNoteProps) {
  const noteRef = useRef<HTMLDivElement>(null)
  const [dragging, setDragging] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [fixedWidth, setFixedWidth] = useState<number | null>(null)
  const offsetRef = useRef({ x: 0, y: 0 })

  React.useEffect(() => {
    if (!noteRef.current) return

    setFixedWidth(noteRef.current.offsetWidth)

    const dragBehavior = drag<HTMLDivElement, unknown>()
      .on("start", (event) => {
        const rect = noteRef.current!.getBoundingClientRect()
        offsetRef.current = {
          x: event.sourceEvent.clientX - rect.left,
          y: event.sourceEvent.clientY - rect.top,
        }
        setPosition({ x: rect.left, y: rect.top })
        setDragging(true)
      })
      .on("drag", (event) => {
        setPosition({
          x: event.sourceEvent.clientX - offsetRef.current.x,
          y: event.sourceEvent.clientY - offsetRef.current.y,
        })
      })
      .on("end", (event) => {
        setDragging(false)
        let droppedOverEditor = false

        if (editorRef.current) {
          const editorRect = editorRef.current.getBoundingClientRect()
          const finalX = event.sourceEvent.clientX
          const finalY = event.sourceEvent.clientY

          droppedOverEditor =
            finalX >= editorRect.left &&
            finalX <= editorRect.right &&
            finalY >= editorRect.top &&
            finalY <= editorRect.bottom
        }

        onDrop({ title, content }, droppedOverEditor)
      })

    select(noteRef.current).call(dragBehavior)
  }, [title, content, onDrop, editorRef])

  return (
    <>
      {dragging && (
        <NoteCard
          title={title}
          content={content}
          style={{
            width: fixedWidth || "auto",
            opacity: 0.5,
            position: "relative",
          }}
        />
      )}

      <NoteCard
        ref={noteRef}
        title={title}
        content={content}
        style={{
          cursor: "grab",
          position: dragging ? "fixed" : "relative",
          top: dragging ? position.y : undefined,
          left: dragging ? position.x : undefined,
          width: fixedWidth || "auto",
          zIndex: dragging ? 999 : "auto",
          margin: 0,
        }}
      />
    </>
  )
}

export default function Editor() {
  const [showNotes, setShowNotes] = useState(true)
  const [markdownContent, setMarkdownContent] = useState(initialMarkdown)
  const { settings } = usePersistedSettings()
  const [notes, setNotes] = useState<Note[]>(SAMPLE_NOTES)
  const editorRef = useRef<HTMLDivElement>(null)

  const handleChange = React.useCallback((value: string) => {
    setMarkdownContent(value)
  }, [])

  const toggleNotes = React.useCallback(() => {
    setShowNotes((prev) => !prev)
  }, [])

  const handleNoteDrop = React.useCallback((note: Note, droppedOverEditor: boolean) => {
    if (droppedOverEditor) {
      setNotes((prevNotes) =>
        prevNotes.filter((n) => !(n.title === note.title && n.content === note.content)),
      )
    }
  }, [])

  const editorExtensions = React.useMemo(() => {
    const extensions = [
      markdownExtension({ base: markdownLanguage, codeLanguages: languages }),
      inlineMarkdownExtension,
      EditorView.lineWrapping,
    ]
    if (settings.vimMode) {
      extensions.push(vim())
    }
    return extensions
  }, [settings.vimMode])

  // Function to export Markdown file
  const exportMarkdown = () => {
    const blob = new Blob([markdownContent], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "document.md";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Function to export as PDF
  const exportPDF = () => {
    const pdf = new jsPDF();
    pdf.setFont("helvetica", "normal");

    const lines = pdf.splitTextToSize(markdownContent, 180);
    pdf.text(lines, 10, 10);

    pdf.save("document.pdf");
  };

  return (
    <div className={settings.theme === "dark" ? "dark" : ""}>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-10 shrink-0 items-center justify-between px-4 border-b">
            <SidebarTrigger className="-ml-1" />
            <Toolbar toggleNotes={toggleNotes} exportMarkdown={exportMarkdown} exportPDF={exportPDF}/>
          </header>
          <section className="flex h-[calc(100vh-104px)] gap-10 m-4">
            <div ref={editorRef} className="flex-1 relative border-border border">
              <CodeMirror
                value={markdownContent}
                height="100%"
                extensions={editorExtensions}
                onChange={handleChange}
                className="overflow-auto h-full mx-4 pt-4"
                theme={settings.theme === "dark" ? "dark" : "light"}
              />
            </div>
            {showNotes && (
              <div className="w-80 overflow-auto border">
                <div className="p-4">
                  <div className="grid gap-4">
                    {notes.map((note, index) => (
                      <DraggableNoteCard
                        key={index}
                        {...note}
                        editorRef={editorRef}
                        onDrop={handleNoteDrop}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </section>
          <footer className="flex h-8 shrink-0 items-end justify-end px-4 border-t text-xs">
            <div className="flex items-end justify-between align-middle font-mono pb-[0.5rem]">
              <div className="flex items-end gap-4">
                <div>
                  <a href="https://tinymorph.aarnphm.xyz" target="_blank">
                    Documentation
                  </a>
                </div>
              </div>
            </div>
          </footer>
        </SidebarInset>
      </SidebarProvider>
    </div>
  )
}
