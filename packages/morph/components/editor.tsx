"use client"

import * as React from "react"
import { useEffect, useCallback, useState, useRef, useMemo } from "react"
import axios, { AxiosResponse } from "axios"
import CodeMirror from "@uiw/react-codemirror"
import { markdown, markdownLanguage } from "@codemirror/lang-markdown"
import { languages } from "@codemirror/language-data"
import { EditorView } from "@codemirror/view"
import { Compartment, EditorState } from "@codemirror/state"
import { Pencil, Eye } from "lucide-react"
import usePersistedSettings from "@/hooks/use-persisted-settings"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { vim, Vim } from "@replit/codemirror-vim"
import { NoteCard, DraggableNoteCard, Note } from "./note-card"
import { Explorer } from "./explorer"
import { Toolbar } from "./toolbar"
import jsPDF from "jspdf"
import { SettingsPanel } from "./settings-panel"
import { FileSystemPermissionPrompt } from "./popup/permission"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { fileField, liveMode, mdToHtml } from "./markdown-inline"
import toJsx from "@/lib/jsx"
import type { Root } from "hast"
import { useTheme } from "next-themes"
import { WELCOME_MD } from "@/lib/constants"

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

export default function Editor() {
  const { theme } = useTheme()
  const editorRef = useRef<HTMLDivElement>(null)
  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const [showPopover, setShowPopover] = useState(false)
  const [currentFile, setCurrentFile] = useState<string>("")
  const [isEditMode, setIsEditMode] = useState(true)
  const [previewNode, setPreviewNode] = useState<Root | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)

  const { settings } = usePersistedSettings()
  const codeMirrorViewRef = useRef<EditorView | null>(null)

  const memoizedExtensions = useMemo(() => {
    const tabSize = new Compartment()
    const extensions = [
      markdown({ base: markdownLanguage, codeLanguages: languages }),
      liveMode,
      EditorView.lineWrapping,
      tabSize.of(EditorState.tabSize.of(settings.tabSize)),
      fileField.init(() => currentFile),
      EditorView.updateListener.of((update) => {
        if (update.docChanged || update.selectionSet) {
          const newFilename = update.state.field(fileField)
          setCurrentFile(newFilename)
        }
      }),
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
  }, [settings.vimMode, settings.tabSize, currentFile])

  const [markdownContent, setMarkdownContent] = useState(WELCOME_MD)
  const onContentChange = useCallback((value: string) => {
    setMarkdownContent(value)
  }, [])

  const [showNotes, setShowNotes] = useState(false)
  const toggleNotes = useCallback(() => {
    setShowNotes((prev) => !prev)
  }, [])

  const [notes, setNotes] = useState<Note[]>([])
  const handleNoteDrop = useCallback((note: Note, droppedOverEditor: boolean) => {
    if (droppedOverEditor) {
      setNotes((prevNotes) =>
        prevNotes.filter((n) => !(n.title === note.title && n.content === note.content)),
      )
    }
  }, [])

  // FIXME: increase in memory usage
  // TODO: update the name based on users imported files.
  const handleExportMarkdown = useCallback(() => {
    const blob = new Blob([markdownContent], { type: "text/markdown" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = currentFile
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }, [markdownContent, currentFile])

  const handleExportPdf = useCallback(() => {
    const pdf = new jsPDF()
    pdf.setFont("helvetica", "normal")

    const lines = pdf.splitTextToSize(markdownContent, 180)
    pdf.text(lines, 10, 10)

    pdf.save(currentFile)
  }, [markdownContent, currentFile])

  const fetchNewNotes = async (content: string) => {
    try {
      const apiEndpoint = process.env.NEXT_PUBLIC_API_ENDPOINT

      // TODO: should disable or greyed out the notes button
      if (!apiEndpoint) throw new Error("ENDPOINT cannot be found, notes won't be functional")

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
          return resp.data.suggestions.map((item, index) => ({
            title: `Note ${index + 1}`,
            content: item.suggestion,
          }))
        })
    } catch (error) {
      console.error("Error fetching suggestions:", error)
      return []
    }
  }

  useEffect(() => {
    if (!showNotes) return

    if (debounceTimeoutRef.current) clearTimeout(debounceTimeoutRef.current)

    setIsLoading(true)
    debounceTimeoutRef.current = setTimeout(() => {
      fetchNewNotes(markdownContent).then((newNotes) => {
        setNotes(newNotes)
        setIsLoading(false)
      })
    }, 1000)

    return () => {
      if (debounceTimeoutRef.current) clearTimeout(debounceTimeoutRef.current)
    }
  }, [showNotes, markdownContent])

  // Check for file permission
  const [fileSystemPermissionGranted, setFileSystemPermissionGranted] = useState(false)
  const handlePermissionGranted = useCallback(() => {
    setFileSystemPermissionGranted(true)
  }, [])
  useEffect(() => {
    const permissionGranted = localStorage.getItem("fileSystemPermissionGranted")
    if (permissionGranted === "true") setFileSystemPermissionGranted(true)
  }, [])

  // Keybind events
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === settings.notePanelShortcut && (event.metaKey || event.ctrlKey)) {
        event.preventDefault()
        toggleNotes()
      } else if (event.key === "," && (event.metaKey || event.ctrlKey)) {
        event.preventDefault()
        setIsSettingsOpen((prev) => !prev)
      } else if (event.key === settings.editModeShortcut && (event.metaKey || event.ctrlKey)) {
        event.preventDefault()
        setIsEditMode((prev) => !prev)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [toggleNotes, settings.editModeShortcut, settings.notePanelShortcut])

  useEffect(() => {
    const updatePreview = async () => {
      try {
        const hastNode = await mdToHtml(markdownContent, currentFile, true)
        setPreviewNode(hastNode)
      } catch (error) {
        console.error("Error converting markdown to JSX:", error)
      }
    }
    updatePreview()
  }, [markdownContent, currentFile])

  return (
    <div>
      <FileSystemPermissionPrompt onPermissionGranted={handlePermissionGranted} />
      <SidebarProvider defaultOpen={false}>
        <Explorer
          onExportMarkdown={handleExportMarkdown}
          onExportPDF={handleExportPdf}
          codeMirrorRef={codeMirrorViewRef}
        />
        <SidebarInset>
          <header className="inline-block h-10 border-b">
            <div className="h-full flex shrink-0 items-center justify-between mx-4">
              <Popover open={!fileSystemPermissionGranted && showPopover}>
                <PopoverTrigger asChild>
                  <div
                    className="relative"
                    onMouseEnter={() => !fileSystemPermissionGranted && setShowPopover(true)}
                    onMouseLeave={() => !fileSystemPermissionGranted && setShowPopover(false)}
                  >
                    <SidebarTrigger className="-ml-1" disabled={!fileSystemPermissionGranted} />
                  </div>
                </PopoverTrigger>
                {!fileSystemPermissionGranted && (
                  <PopoverContent
                    side="right"
                    className="w-80 transition-opacity duration-200"
                    sideOffset={8}
                  >
                    <div className="text-sm">
                      <p className="text-muted-foreground mt-1">
                        File system access is required to use FileSystem API.
                      </p>
                    </div>
                  </PopoverContent>
                )}
              </Popover>
              <Toolbar toggleNotes={toggleNotes} />
            </div>
          </header>
          <section className="flex h-[calc(100vh-104px)] gap-10 m-4">
            <div className="flex-1 relative border">
              <div
                className={`editor-mode absolute inset-0 ${
                  isEditMode ? "block h-full pointer-events-auto" : "hidden h-0 pointer-events-none"
                }`}
                ref={editorRef}
              >
                <CodeMirror
                  value={markdownContent}
                  height="100%"
                  extensions={memoizedExtensions}
                  onChange={onContentChange}
                  className="overflow-auto h-full mx-4 pt-4"
                  theme={theme === "dark" ? "dark" : "light"}
                  onCreateEditor={(view) => (codeMirrorViewRef.current = view)}
                />
              </div>
              <div
                className={`reading-mode absolute inset-0 ${
                  isEditMode ? "hidden h-0 pointer-events-auto" : "block h-full pointer-events-none"
                }`}
              >
                <div className="prose dark:prose-invert max-w-none mx-4 pt-4 overflow-auto h-full">
                  {previewNode && toJsx(previewNode)}
                </div>
              </div>
            </div>
            {showNotes && (
              <div className="w-80 overflow-auto border">
                <div className="p-4">
                  {isLoading ? (
                    <div className="grid gap-4">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <NoteCard key={i} isLoading />
                      ))}
                    </div>
                  ) : (
                    <div className="grid gap-4">
                      {notes.map((note, index) => (
                        <DraggableNoteCard
                          key={index}
                          title={note.title}
                          content={note.content}
                          editorRef={editorRef}
                          onDrop={handleNoteDrop}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </section>
          <footer className="inline-block h-8 border-t text-xs">
            <div className="h-full flex shrink-0 items-center align-middle font-mono justify-end mx-4">
              <Button
                onClick={() => setIsEditMode((prev) => !prev)}
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0"
              >
                {isEditMode ? (
                  <Eye className="h-3 w-3" widths={16} height={16} />
                ) : (
                  <Pencil className="h-3 w-3" widths={16} height={16} />
                )}
              </Button>
            </div>
          </footer>
        </SidebarInset>
      </SidebarProvider>

      {isSettingsOpen && (
        <SettingsPanel isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
      )}
    </div>
  )
}
