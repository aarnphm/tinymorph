"use client"

import * as React from "react"
import axios, { AxiosResponse } from "axios"
import { drag } from "d3-drag"
import { select } from "d3-selection"
import CodeMirror from "@uiw/react-codemirror"
import { markdown, markdownLanguage } from "@codemirror/lang-markdown"
import { languages } from "@codemirror/language-data"
import { EditorView } from "@codemirror/view"
import { Compartment, EditorState } from "@codemirror/state"
import usePersistedSettings from "@/hooks/use-persisted-settings"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { vim, Vim } from "@replit/codemirror-vim"
import { inlineMarkdownExtension } from "./markdown-inline"
import { NoteCard } from "./note-card"
import { AppSidebar } from "./app-sidebar"
import { Toolbar } from "./toolbar"
import jsPDF from "jspdf"

interface Note {
  title: string
  content: string
}

interface Suggestion {
  suggestion: string
  relevance: number
}

interface AsteraceaRequest {
  essay: string
  num_suggestions: number
  max_tokens: number
}

interface AsteraceaResponse {
  suggestions: Suggestion[]
}

interface DraggableNoteProps extends Note {
  onDrop: (note: Note, droppedOverEditor: boolean) => void
  editorRef: React.RefObject<HTMLDivElement | null>
}

const initialMarkdown = `Each word was a stone dropped into the deep well of his chest, reverberating with the cold certainty of fate. His heart, once aflutter with the possibility of hope, now lay still, entombed in the icy chambers of reality`

function DraggableNoteCard({ title, content, onDrop, editorRef }: DraggableNoteProps) {
  const noteRef = React.useRef<HTMLDivElement>(null)
  const [dragging, setDragging] = React.useState(false)
  const [position, setPosition] = React.useState({ x: 0, y: 0 })
  const [fixedWidth, setFixedWidth] = React.useState<number | null>(null)
  const offsetRef = React.useRef({ x: 0, y: 0 })

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
  const [showNotes, setShowNotes] = React.useState(false)
  const [markdownContent, setMarkdownContent] = React.useState(initialMarkdown)
  const { settings } = usePersistedSettings()
  const [notes, setNotes] = React.useState<Note[]>([])
  const editorRef = React.useRef<HTMLDivElement>(null)
  const debounceTimeoutRef = React.useRef<NodeJS.Timeout | null>(null)

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

  const memoizedExtensions = React.useMemo(() => {
    const tabSize = new Compartment()
    const extensions = [
      markdown({ base: markdownLanguage, codeLanguages: languages }),
      inlineMarkdownExtension,
      EditorView.lineWrapping,
      tabSize.of(EditorState.tabSize.of(settings.tabSize)),
    ]
    if (settings.vimMode) {
      extensions.push(vim())
      Vim.defineEx("yank", "y", () => {
        const text = Vim.getRegister('"')
        if (text) {
          navigator.clipboard.writeText(text).catch(console.error)
        }
      })
    }
    return extensions
  }, [settings.vimMode, settings.tabSize])

  // Function to export Markdown file
  const exportMarkdown = () => {
    const blob = new Blob([markdownContent], { type: "text/markdown" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    // TODO: update the name based on users imported files.
    a.download = "document.md"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  // Function to export as PDF
  const exportPDF = () => {
    const pdf = new jsPDF()
    pdf.setFont("helvetica", "normal")

    const lines = pdf.splitTextToSize(markdownContent, 180)
    pdf.text(lines, 10, 10)

    pdf.save("document.pdf")
  }

  const fetchNewNotes = async (content: string): Promise<Note[]> => {
    try {
      const apiEndpoint = process.env.NEXT_PUBLIC_API_ENDPOINT
      if (!apiEndpoint) {
        throw new Error("NEXT_PUBLIC_API_ENDPOINT environment variable is not set")
      }
      return await axios
        .post<AsteraceaResponse, AxiosResponse<AsteraceaResponse>, AsteraceaRequest>(
          `${apiEndpoint}/suggests`,
          {
            essay: content,
            num_suggestions: 8,
            max_tokens: 8192,
          },
          {
            headers: {
              Accept: "text/event-stream",
              "Content-Type": "application/json",
            },
          },
        )
        .then((resp) => {
          const data = resp.data
          return data.suggestions.map((item, index) => ({
            title: `Note ${index + 1}`,
            content: item.suggestion,
          }))
        })
    } catch (error) {
      console.error("Error fetching suggestions:", error)
      return []
    }
  }

  React.useEffect(() => {
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current)
    }
    debounceTimeoutRef.current = setTimeout(() => {
      fetchNewNotes(markdownContent).then((newNotes) => {
        if (newNotes.length > 0) {
          setNotes(newNotes)
        }
      })
    }, 1000)

    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current)
      }
    }
  }, [markdownContent])

  return (
    <div className={settings.theme === "dark" ? "dark" : ""}>
      <SidebarProvider defaultOpen={false}>
        <AppSidebar />
        <SidebarInset>
          <header className="inline-block h-10 border-b">
            <div className="h-full flex shrink-0 items-center justify-between mx-4">
              <SidebarTrigger className="-ml-1" />
              <Toolbar
                toggleNotes={toggleNotes}
                exportMarkdown={exportMarkdown}
                exportPDF={exportPDF}
              />
            </div>
          </header>
          <section className="flex h-[calc(100vh-104px)] gap-10 m-4">
            <div ref={editorRef} className="flex-1 relative border-border border">
              <CodeMirror
                value={markdownContent}
                height="100%"
                extensions={memoizedExtensions}
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
          <footer className="inline-block h-8 border-t text-xs">
            <div className="h-full flex shrink-0 items-end justify-end mx-4">
              <div className="flex items-end justify-between align-middle font-mono pb-[0.5rem]">
                <div className="flex items-end gap-4">
                  <div>
                    <a
                      href="https://tinymorph.aarnphm.xyz"
                      target="_blank"
                      className="hover:underline"
                    >
                      Documentation
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </footer>
        </SidebarInset>
      </SidebarProvider>
    </div>
  )
}
