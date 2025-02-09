"use client"

import * as React from "react"
import { useEffect, useCallback, useState, useRef, useMemo } from "react"
import axios, { AxiosResponse } from "axios"
import CodeMirror from "@uiw/react-codemirror"
import { markdown, markdownLanguage } from "@codemirror/lang-markdown"
import { yamlFrontmatter } from "@codemirror/lang-yaml"
import { languages } from "@codemirror/language-data"
import { EditorView, placeholder } from "@codemirror/view"
import { Compartment, EditorState } from "@codemirror/state"
import { Pencil, Eye } from "lucide-react"
import usePersistedSettings from "@/hooks/use-persisted-settings"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Vim, vim } from "@replit/codemirror-vim"
import { NoteCard, DraggableNoteCard, Note } from "@/components/note-card"
import { Explorer } from "@/components/explorer"
import { Toolbar } from "@/components/toolbar"
import { SettingsPanel } from "@/components/settings-panel"
import { Button } from "@/components/ui/button"
import { fileField, mdToHtml } from "@/components/markdown-inline"
import toJsx from "@/lib/jsx"
import type { Root } from "hast"
import { useTheme } from "next-themes"
import { useVaultContext } from "@/context/vault-context"
import { md, frontmatter, syntaxHighlighting, theme as editorTheme } from "@/components/parser"
import { DotIcon } from "@/components/ui/icons"
import useVaults from "@/hooks/use-vaults"
import { useToast } from "@/hooks/use-toast"
import { ToastAction } from "@/components/ui/toast"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

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
  disableSidebar?: boolean
}

export default function Editor({ vaultId, disableSidebar = false }: EditorProps) {
  const { theme } = useTheme()
  const { refreshVault } = useVaults()
  const { getActiveVault, setActiveVaultId } = useVaultContext()
  const editorRef = useRef<HTMLDivElement>(null)
  const [currentFile, setCurrentFile] = useState<string>("")
  const [isEditMode, setIsEditMode] = useState(true)
  const [previewNode, setPreviewNode] = useState<Root | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)
  const [currentFileHandle, setCurrentFileHandle] = useState<FileSystemFileHandle | null>(null)

  const { settings } = usePersistedSettings()
  const codeMirrorViewRef = useRef<EditorView | null>(null)
  const editorScrollRef = useRef<HTMLDivElement>(null)
  const readingModeRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast()
  const placeholderRef = useRef<HTMLDivElement | null>(null)

  const [markdownContent, setMarkdownContent] = useState<string>("")
  const [notesError, setNotesError] = useState<string | null>(null)

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

  const updatePreview = useCallback(
    async (value: string) => {
      try {
        const tree = await mdToHtml({ value, settings, filename: currentFile, returnHast: true })
        setPreviewNode(tree)
      } catch (error) {
        toast({
          title: "Conversion failed",
          description: error instanceof Error ? error.message : "Failed to convert markdown",
        })
      }
    },
    [currentFile, toast, settings],
  )

  const onContentChange = useCallback(
    async (value: string) => {
      setMarkdownContent(value)
      setHasUnsavedChanges(true)
      updatePreview(value)
    },
    [updatePreview],
  )

  useEffect(() => {
    if (markdownContent) {
      updatePreview(markdownContent)
    }
  }, [markdownContent, updatePreview])

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
    } catch {
      toast({
        title: "Save failed",
        description: "Aborted",
        variant: "destructive",
        action: (
          <ToastAction altText="Retry" onClick={handleSave}>
            Retry
          </ToastAction>
        ),
      })
    }
  }, [
    currentFileHandle,
    markdownContent,
    currentFile,
    getActiveVault,
    refreshVault,
    vaultId,
    showNotes,
    toast,
  ])

  const fetchNewNotes = async (content: string) => {
    try {
      const apiEndpoint = process.env.NEXT_PUBLIC_API_ENDPOINT
      if (!apiEndpoint) {
        throw new Error("Notes functionality is currently unavailable")
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

      setNotesError(null)
      return resp.data.suggestions.map((item, index) => ({
        title: `Note ${index + 1}`,
        content: item.suggestion,
      }))
    } catch (error) {
      setNotesError("Notes not available, try again later")
      throw error
    }
  }

  useEffect(() => {
    if (!showNotes) return

    setIsLoading(true)

    const timerId = setTimeout(async () => {
      try {
        const newNotes = await fetchNewNotes(markdownContent)
        setNotes(newNotes)
      } catch (error) {
        toast({
          title: "Note generation failed",
          description: error instanceof Error ? error.message : "Please try again later",
        })
      } finally {
        setIsLoading(false)
      }
    }, 1000)

    return () => {
      clearTimeout(timerId)
    }
  }, [showNotes, markdownContent, toast])

  // CodeMirror extensions
  const memoizedExtensions = useMemo(() => {
    const tabSize = new Compartment()

    // base extensions
    return [
      yamlFrontmatter({
        content: markdown({ base: markdownLanguage, codeLanguages: languages }),
      }),
      frontmatter(),
      EditorView.lineWrapping,
      tabSize.of(EditorState.tabSize.of(settings.tabSize)),
      fileField.init(() => currentFile),
      EditorView.updateListener.of((update) => {
        if (update.docChanged || update.selectionSet) {
          const newFilename = update.state.field(fileField)
          setCurrentFile(newFilename)
        }
      }),
      syntaxHighlighting(),
      placeholder(() => placeholderRef.current!),
      vim(),
    ]
  }, [settings.tabSize, currentFile])

  // Effect to update vim mode when settings change
  useEffect(() => {
    Vim.defineEx("w", "w", handleSave)
    Vim.defineEx("wa", "w", handleSave)
    Vim.map(";", ":", "normal")
    Vim.map("jj", "<Esc>", "insert")
  }, [handleSave, toast])

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
      <SidebarProvider defaultOpen={!disableSidebar}>
        <Explorer
          currentFile={currentFile}
          markdownContent={markdownContent}
          editorViewRef={codeMirrorViewRef}
          onFileSelect={(handle: FileSystemFileHandle) => setCurrentFileHandle(handle)}
          onNewFile={() => {
            setCurrentFileHandle(null)
            setCurrentFile("Untitled")
          }}
          onContentUpdate={updatePreview}
        />
        <SidebarInset>
          <header className="inline-block h-10 border-b">
            <div className="h-full flex shrink-0 items-center justify-between mx-4">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div>
                      <SidebarTrigger
                        className={`-ml-1 ${disableSidebar ? "opacity-50 cursor-not-allowed" : ""}`}
                        disabled={disableSidebar}
                      />
                    </div>
                  </TooltipTrigger>
                  {disableSidebar && (
                    <TooltipContent>
                      <p>File system access is required</p>
                    </TooltipContent>
                  )}
                </Tooltip>
              </TooltipProvider>
              <Toolbar toggleNotes={toggleNotes} disableSidebar={disableSidebar} />
            </div>
          </header>
          <section className="flex h-[calc(100vh-104px)] gap-10 m-4">
            <div className="flex-1 relative border">
              <div
                className={`editor-mode absolute inset-0 ${isEditMode ? "block" : "hidden"}`}
                ref={editorRef}
              >
                <div ref={editorScrollRef} className="h-full scrollbar-hidden relative">
                  <div className="h-full">
                    {hasUnsavedChanges && (
                      <div className="absolute top-4 left-4 text-sm/7 z-10 text-yellow-200">
                        <DotIcon />
                      </div>
                    )}
                    <CodeMirror
                      value={markdownContent}
                      height="100%"
                      basicSetup={{
                        rectangularSelection: true,
                        indentOnInput: true,
                        syntaxHighlighting: true,
                        searchKeymap: true,
                      }}
                      extensions={memoizedExtensions}
                      onChange={onContentChange}
                      className="overflow-auto h-full mx-12 pt-4 scrollbar-hidden"
                      theme={theme === "dark" ? "dark" : editorTheme}
                      onCreateEditor={(view) => {
                        codeMirrorViewRef.current = view
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
                  {notesError ? (
                    <div className="flex items-center justify-center h-32 text-sm text-muted-foreground">
                      {notesError}
                    </div>
                  ) : isLoading ? (
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
          <SettingsPanel isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
        </SidebarInset>
      </SidebarProvider>
    </div>
  )
}
