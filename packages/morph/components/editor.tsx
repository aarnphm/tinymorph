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
import { useRef, useState } from "react";

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

const initialMarkdown = `# Hello, world!

This is a sample markdown document. You can edit it using the editor on the left.

## Features

* **Markdown support:** Write in markdown and see the rendered output in real time.
* **Vim mode:** Enable vim mode for a more efficient editing experience.
* **Syntax highlighting:** Code blocks are syntax highlighted for better readability.
* **Line wrapping:** Long lines are automatically wrapped to prevent horizontal scrolling.
* **Notes panel:** View notes related to the document in the right panel.

## Getting started

To get started, simply start typing in the editor. You can use all the standard markdown features, such as headings, lists, and code blocks.

For more information, please refer to the documentation.
`

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
  const [theme, setTheme] = useState<"light" | "dark" | "system">("system")
  const [vimMode, setVimMode] = useState(false)
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
        prevNotes.filter(
          (n) => !(n.title === note.title && n.content === note.content)
        )
      )
    }
  }, [])

  const editorExtensions = React.useMemo(() => {
    const extensions = [
      markdownExtension({ base: markdownLanguage, codeLanguages: languages }),
      inlineMarkdownExtension,
      EditorView.lineWrapping,
    ]
    if (vimMode) {
      extensions.push(vim())
    }
    return extensions
  }, [vimMode])

  return (
    <div className={theme === "dark" ? "dark" : ""}>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-8 shrink-0 items-center justify-between px-4 border-b">
            <SidebarTrigger className="-ml-1" />
            <Toolbar
              className="pl-4"
              toggleNotes={toggleNotes}
              theme={theme}
              setTheme={setTheme}
              vimMode={vimMode}
              setVimMode={setVimMode}
            />
          </header>
          <div className="flex h-[calc(100vh-64px)]">
            <div ref={editorRef} className="flex-1">
              <CodeMirror
                value={markdownContent}
                height="100%"
                extensions={editorExtensions}
                onChange={handleChange}
                className="overflow-auto bg-background h-full"
                theme={theme === "dark" ? "dark" : "light"}
              />
          </div>
            {showNotes && (
              <div className="w-80 overflow-auto border-l border-border bg-background">
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
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  )
}
