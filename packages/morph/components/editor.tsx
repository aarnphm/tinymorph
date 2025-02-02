"use client"

import * as React from "react"
import CodeMirror from "@uiw/react-codemirror"
import { markdown as markdownExtension } from "@codemirror/lang-markdown"
import { languages } from "@codemirror/language-data"
import { NoteCard } from "./note-card"
import { markdownLanguage } from "@codemirror/lang-markdown"
import { EditorView } from "@codemirror/view"
import { vim } from "@replit/codemirror-vim"
import { inlineMarkdownExtension } from "./inlineMarkdownExtension"
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

const initialMarkdown = `# Heading 1
## Heading 2
### Heading 3
#### Heading 4
##### Heading 5
###### Heading 6

## Chapter 1, The History

The city, a kaleidoscope of digital billboards and holographic projections, is in a state of perpetual twilight, casting an ethereal glow on its inhabitants.

X_AE_B-22's mission is to locate the source of a mysterious signal that has been disrupting the neural networks of both humans and synthetics alike. This signal, rumored to be the work of a rogue faction known as the Shadow Code, has the potential to rewrite the very fabric of consciousness.

X_AE_B-22's pursuit leads it to the subterranean depths of the city, where forgotten tunnels and abandoned cyber-labs hide secrets long buried by time. Each step forward unravels more of the intricate web spun by the Shadow Code, revealing a plot to seize control of the entire megacity.

Amidst the neon-lit chaos, X_AE_B-22 encounters a diverse cast of allies and adversaries, each with their own agendas and secrets. There is Luna, a rebellious hacker with a vendetta against the megacorporations, and Kyro, a seasoned detective with a cybernetic arm who has seen too much in his lifetime.`

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
    <div
      className={`grid h-screen grid-cols-[1fr,auto] grid-rows-[auto,1fr] ${theme === "dark" ? "dark" : ""}`}
    >
      <div className="col-span-2 border-sm">
        <Toolbar
          toggleNotes={toggleNotes}
          theme={theme}
          setTheme={setTheme}
          vimMode={vimMode}
          setVimMode={setVimMode}
        />
      </div>
      <div className="grid grid-cols-[1fr,auto]">
        <div ref={editorRef} className="border-r h-[calc(100vh-40px)]">
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
          <div className="w-80 h-[calc(100vh-40px)] overflow-auto border-l border-border bg-background">
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
    </div>
  )
}