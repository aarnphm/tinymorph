import axios from "axios"
import { useEffect, useRef, useState } from "react"
import { EditorState } from "@codemirror/state"
import { EditorView, basicSetup } from "codemirror"
import { markdown } from "@codemirror/lang-markdown"
import { vim } from "@replit/codemirror-vim"
import { inlineMarkdownExtension } from "./MarkdownRenderer"
import { NotesPanel, Note } from "./NotesPanel"
import { MarkdownFileUpload } from "./MarkdownFileUpload"
import Settings from "./Settings"

import { Menubar, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar"

type Suggestion = { suggestion: string; relevance: number }

export function Workspace() {
  const [showNotes, setShowNotes] = useState(false)
  const [vimBindingEnabled, setVimBindingEnabled] = useState(false)
  const editorRef = useRef<HTMLDivElement>(null)
  const [editorView, setEditorView] = useState<EditorView | null>(null)
  const [lastContent, setLastContent] = useState("")
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null)
  const [notes, setNotes] = useState<Note[]>([])
  const [hasGeneratedInitialNotes, setHasGeneratedInitialNotes] = useState(false)

  const fetchNewNotes = async (content: string) => {
    try {
      const apiEndpoint = import.meta.env.ASTERACAEAE || "<URL>"
      const result = await axios.post<Suggestion[]>(
        `${apiEndpoint}/suggests`,
        {
          essay: content,
          num_suggestions: 5,
          max_tokens: 4096,
        },
        {
          headers: {
            Accept: "text/event-stream",
            "Content-Type": "application/json",
          },
        },
      )
      // Convert suggestions to Note format
      const newNotes = Array.from(result.data).map(({ suggestion }, index) => ({
        id: Date.now() + index,
        title: `Note ${index + 1}`,
        content: suggestion,
      }))

      return newNotes
    } catch (error) {
      console.error("Error fetching suggestions:", error)
      return []
    }
  }

  const toggleNotes = async () => {
    const newShowNotes = !showNotes
    setShowNotes(newShowNotes)

    // Only fetch initial notes when opening the panel for the first time
    if (newShowNotes && !hasGeneratedInitialNotes && editorView) {
      const content = editorView.state.doc.toString()
      const initialNotes = await fetchNewNotes(content)
      if (initialNotes.length > 0) {
        setNotes(initialNotes)
        setHasGeneratedInitialNotes(true)
      }
    }
  }

  useEffect(() => {
    if (!editorRef.current) return

    const currentContent = editorView
      ? editorView.state.doc.toString()
      : `## Hello World

This is **bold** text.

[[Wikilink Test]]`

    const extensions = [
      basicSetup,
      EditorView.lineWrapping,
      markdown(),
      inlineMarkdownExtension,
      ...(vimBindingEnabled ? [vim()] : []),
      EditorView.updateListener.of(async (update) => {
        if (update.docChanged) {
          const content = update.state.doc.toString()

          if (debounceTimeout.current) {
            clearTimeout(debounceTimeout.current)
          }

          debounceTimeout.current = setTimeout(async () => {
            if (content !== lastContent) {
              setLastContent(content)
              const newNotes = await fetchNewNotes(content)
              if (newNotes.length > 0) {
                setNotes((prevNotes) => [...prevNotes, ...newNotes])
              }
            }
          }, 1000)
        }
      }),
    ]

    if (editorView) {
      editorView.destroy()
    }

    const view = new EditorView({
      state: EditorState.create({
        doc: currentContent,
        extensions: extensions,
      }),
      parent: editorRef.current,
    })

    setEditorView(view)

    return () => {
      view.destroy()
    }
  }, [vimBindingEnabled, lastContent])

  const handleVimBindingToggle = (enabled: boolean) => {
    setVimBindingEnabled(enabled)
  }

  return (
    <div className={`workspace-container ${showNotes ? "show-notes" : ""}`}>
      <div className="left">
        <section className="editor" data-editor-container="true">
          <div ref={editorRef} />
        </section>

        <section className="menu-bar">
          <Menubar className="h-11 flex justify-end">
            <MenubarMenu>
              <MenubarTrigger onClick={toggleNotes}>
                <i className="las la-sticky-note text-lg cursor-pointer" />
              </MenubarTrigger>
            </MenubarMenu>

            <MenubarMenu>
              <MenubarTrigger>
                <MarkdownFileUpload editorView={editorView} />
              </MenubarTrigger>
            </MenubarMenu>

            <MenubarMenu>
              <MenubarTrigger>
                <Settings onVimBindingToggle={handleVimBindingToggle} />
              </MenubarTrigger>
            </MenubarMenu>
          </Menubar>
        </section>
      </div>

      <div className="right">
        <aside className="notes-panel">
          <NotesPanel
            editorRef={editorRef}
            onAddNotes={(newNotes) => setNotes(newNotes)}
            notes={notes}
          />
        </aside>
      </div>
    </div>
  )
}
