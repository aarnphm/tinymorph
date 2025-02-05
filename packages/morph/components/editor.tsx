"use client"

import * as React from "react"
import { useEffect, useCallback, useState, useRef, useMemo } from "react"
import axios, { AxiosResponse } from "axios"
import CodeMirror from "@uiw/react-codemirror"
import { markdown, markdownLanguage } from "@codemirror/lang-markdown"
import { yamlFrontmatter } from "@codemirror/lang-yaml"
import { languages } from "@codemirror/language-data"
import { tags } from "@lezer/highlight"
import { HighlightStyle, syntaxHighlighting } from "@codemirror/language"
import { EditorView, placeholder } from "@codemirror/view"
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
import { fileField, mdToHtml } from "./markdown-inline"
import toJsx from "@/lib/jsx"
import type { Root } from "hast"
import { useTheme } from "next-themes"
import { useVaultContext } from "@/context/vault-context"
import { Skeleton } from "./ui/skeleton"
import { md } from "./parser"
import { DotIcon } from "@/components/ui/icons"
import useVaults from "@/hooks/use-vaults"
import { useToast } from "@/hooks/use-toast"
import { ToastAction } from "@/components/ui/toast"

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

interface EditorProps {
  vaultId: string
}

function frontmatterExtension() {
  return EditorView.inputHandler.of((view: EditorView, from: number, to: number, text: string) => {
    // If you're inserting a `-` at index 2 and all previous characters are also `-`,
    // insert a matching `---` below the line
    if (
      (text === "-" && from === 2 && view.state.sliceDoc(0, 2) === "--") ||
      // Sometimes the mobile Safari replaces `--` with `—` so we need to handle that case too
      (text === "-" && from === 1 && view.state.sliceDoc(0, 1) === "—")
    ) {
      view.dispatch({
        changes: {
          from: 0,
          to,
          insert: "---\n\n---",
        },
        selection: {
          anchor: 4,
        },
      })

      return true
    }

    return false
  })
}

const syntaxHighlighter = HighlightStyle.define([
  {
    tag: tags.heading1,
    fontSize: "var(--font-size-xl)",
    fontWeight: 550,
  },
  {
    tag: tags.heading2,
    fontSize: "var(--font-size-lg)",
    fontWeight: 550,
  },
  {
    tag: [tags.heading3, tags.heading4, tags.heading5, tags.heading6],
    fontWeight: 550,
  },
  {
    tag: [tags.comment, tags.contentSeparator],
    color: "var(--color-text-secondary)",
  },
  {
    tag: tags.emphasis,
    fontStyle: "italic",
  },
  {
    tag: tags.strong,
    fontWeight: 650,
  },
  {
    tag: tags.strikethrough,
    textDecoration: "line-through",
  },
])

export default function Editor({ vaultId }: EditorProps) {
  const { theme } = useTheme()
  const { refreshVault } = useVaults()
  const { getActiveVault, setActiveVaultId } = useVaultContext()
  const editorRef = useRef<HTMLDivElement>(null)
  const [showPopover, setShowPopover] = useState(false)
  const [currentFile, setCurrentFile] = useState<string>("")
  const [isEditMode, setIsEditMode] = useState(true)
  const [previewNode, setPreviewNode] = useState<Root | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [isEditorReady, setIsEditorReady] = useState(false)
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)
  const [currentFileHandle, setCurrentFileHandle] = useState<FileSystemFileHandle | null>(null)

  const { settings } = usePersistedSettings()
  const codeMirrorViewRef = useRef<EditorView | null>(null)
  const editorScrollRef = useRef<HTMLDivElement>(null)
  const readingModeRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast()
  const placeholderRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!placeholderRef.current) {
      const placeholder = document.createElement("div")
      placeholder.textContent = "Start writing... (or drag notes here)"
      placeholder.className = "cm-empty-placeholder"
      placeholderRef.current = placeholder
    }
  }, [])

  // Set active vault when component mounts or vaultId changes
  useEffect(() => {
    if (vaultId) {
      setActiveVaultId(vaultId)
    }
  }, [vaultId, setActiveVaultId])

  const [markdownContent, setMarkdownContent] = useState("")
  const onContentChange = useCallback(
    (value: string) => {
      setMarkdownContent(value)

      // Only update preview if there are unsaved changes
      if (!hasUnsavedChanges) {
        setHasUnsavedChanges(true)
        const updatePreview = async () => {
          try {
            const tree = await mdToHtml(value, currentFile, true)
            setPreviewNode(tree)
          } catch (error) {
            console.error("Error converting markdown to JSX:", error)
          }
        }
        updatePreview()
      } else {
        // Just mark as unsaved without updating preview
        setHasUnsavedChanges(true)
      }
    },
    [currentFile, hasUnsavedChanges],
  )

  const [showNotes, setShowNotes] = useState(false)
  const toggleNotes = useCallback(() => setShowNotes((prev) => !prev), [])

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

  //TODO: Add a toast?
  const handleSave = useCallback(async () => {
    try {
      let targetHandle = currentFileHandle

      // If new file, show save dialog
      if (!targetHandle) {
        targetHandle = await window.showSaveFilePicker({
          id: vaultId,
          suggestedName: currentFile.endsWith(".md") ? currentFile : `${currentFile}.md`,
          types: [
            {
              description: "Markdown Files",
              accept: { "text/markdown": [".md"] },
            },
          ],
        })
      }

      const writable = await targetHandle.createWritable()
      await writable.write(markdownContent)
      await writable.close()

      // Update state only if it's a new file
      if (!currentFileHandle) {
        setCurrentFileHandle(targetHandle)
        setCurrentFile(targetHandle.name)

        // Refresh vault tree
        const activeVault = getActiveVault()
        if (activeVault) {
          await refreshVault(activeVault.id)
        }
      }

      setHasUnsavedChanges(false)
      
      // Only fetch notes if panel is open
      if (showNotes) {
        try {
          const newNotes = await fetchNewNotes(markdownContent)
          setNotes(newNotes)
        } catch (error) {
          toast({
            title: "Note generation failed",
            description: error instanceof Error ? error.message : "Please try again later",
            variant: "destructive",
          })
        }
      }
    } catch (error) {
      console.error("Error saving file:", error)
      toast({
        title: "Save failed",
        description: error instanceof Error ? error.message : "Unknown error occurred",
        variant: "destructive",
        action: <ToastAction altText="Retry" onClick={handleSave}>Retry</ToastAction>,
      })
    }
  }, [
    currentFileHandle,
    markdownContent,
    hasUnsavedChanges,
    currentFile,
    getActiveVault,
    refreshVault,
    vaultId,
    showNotes,
  ])

  const fetchNewNotes = async (content: string) => {
    try {
      const apiEndpoint = process.env.NEXT_PUBLIC_API_ENDPOINT
      if (!apiEndpoint) {
        throw new Error('Notes functionality is currently unavailable')
      }

      const resp = await axios.post<
        AsteraceaResponse,
        AxiosResponse<AsteraceaResponse>,
        AsteraceaRequest
      >(
        `${apiEndpoint}/suggests`,
        {
          essay: md(content).content,
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

      return resp.data.suggestions.map((item, index) => ({
        title: `Note ${index + 1}`,
        content: item.suggestion,
      }))
    } catch (error) {
      console.error("Error fetching suggestions:", error)
      throw new Error('Failed to generate notes. Please try again.')
    }
  }

  useEffect(() => {
    if (!showNotes) return

    setIsLoading(true)

    const timerId = setTimeout(async () => {
      const newNotes = await fetchNewNotes(markdownContent)
      setNotes(newNotes)
      setIsLoading(false)
    }, 1000)

    return () => {
      clearTimeout(timerId)
    }
  }, [showNotes])

  // CodeMirror extensions
  const memoizedExtensions = useMemo(() => {
    Vim.defineEx("yank", "y", () => {
      const text = Vim.getRegister('"')
      if (text) {
        navigator.clipboard.writeText(text).catch(console.error)
      }
    })
    Vim.defineEx("w", "w", handleSave)
    const tabSize = new Compartment()

    return [
      yamlFrontmatter({
        content: markdown({ base: markdownLanguage, codeLanguages: languages }),
      }),
      frontmatterExtension(),
      vim(),
      EditorView.lineWrapping,
      tabSize.of(EditorState.tabSize.of(settings.tabSize)),
      fileField.init(() => currentFile),
      EditorView.updateListener.of((update) => {
        if (update.docChanged || update.selectionSet) {
          const newFilename = update.state.field(fileField)
          setCurrentFile(newFilename)
        }
      }),
      syntaxHighlighting(syntaxHighlighter),
      placeholder(() => placeholderRef.current!),
    ]
  }, [settings.tabSize, currentFile, handleSave])

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
      } else if (event.key === settings.editModeShortcut && (event.metaKey || event.altKey)) {
        event.preventDefault()
        setIsEditMode((prev) => !prev)
      } else if ((event.ctrlKey || event.metaKey) && event.key === "s") {
        event.preventDefault()
        handleSave()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [toggleNotes, settings.editModeShortcut, settings.notePanelShortcut, handleSave])

  return (
    <div>
      <FileSystemPermissionPrompt onPermissionGranted={handlePermissionGranted} />
      <SidebarProvider defaultOpen={true}>
        <Explorer
          onExportMarkdown={handleExportMarkdown}
          onExportPDF={handleExportPdf}
          codeMirrorRef={codeMirrorViewRef}
          onFileSelect={(handle: FileSystemFileHandle) => setCurrentFileHandle(handle)}
          onNewFile={() => {
            setCurrentFileHandle(null)
            setCurrentFile("Untitled")
          }}
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
                className={`editor-mode absolute inset-0 ${isEditMode ? "block" : "hidden"}`}
                ref={editorRef}
              >
                <div ref={editorScrollRef} className="h-full scrollbar-hidden relative">
                  <div
                    className={`h-full transition-opacity duration-100 ${isEditorReady ? "opacity-100" : "opacity-0"}`}
                  >
                    {!isEditorReady && (
                      <div className="flex flex-col max-w-5xl mx-auto pt-4">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((idx) => (
                          <Skeleton key={idx} className="h-12 w-full mb-4" />
                        ))}
                      </div>
                    )}
                    {hasUnsavedChanges && (
                      <div className="absolute top-4 left-4 text-sm/7 z-10 text-yellow-200">
                        <DotIcon />
                      </div>
                    )}
                    <CodeMirror
                      value={markdownContent}
                      height="100%"
                      extensions={memoizedExtensions}
                      onChange={onContentChange}
                      className="overflow-auto h-full mx-12 pt-4 scrollbar-hidden"
                      theme={theme === "dark" ? "dark" : "light"}
                      onCreateEditor={(view) => {
                        codeMirrorViewRef.current = view
                        setIsEditorReady(true)
                      }}
                    />
                  </div>
                </div>
              </div>
              <div
                className={`reading-mode absolute inset-0 ${isEditMode ? "hidden" : "block overflow-hidden"}`}
                ref={readingModeRef}
              >
                <div className="prose dark:prose-invert h-full mx-4 pt-4 overflow-auto scrollbar-hidden">
                  <article className="@container h-full max-w-5xl mx-auto scrollbar-hidden">
                    {previewNode && toJsx(previewNode)}
                  </article>
                </div>
              </div>
            </div>
            {showNotes && (
              <div className="w-80 overflow-auto border scrollbar-hidden">
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
