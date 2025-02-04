"use client"

import * as React from "react"
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
import { setFile, fileField, liveMode, mdToHtml } from "./markdown-inline"
import toJsx from "@/lib/jsx"
import type { Root } from "hast"
import { useTheme } from "next-themes"
import useVaults from "@/hooks/use-vaults"
import { WELCOME_MD } from "@/lib/constants"
import { FileSystemTreeNode } from "@/hooks/use-file-tree"
import { useVaultContext } from "@/context/vault-context"

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

export default function Editor({ vaultId }: EditorProps) {
  const { theme } = useTheme()
  const editorRef = React.useRef<HTMLDivElement>(null)
  const debounceTimeoutRef = React.useRef<NodeJS.Timeout | null>(null)
  const [showPopover, setShowPopover] = React.useState(false)
  const [currentFile, setCurrentFile] = React.useState<string>("")
  const [isEditMode, setIsEditMode] = React.useState(true)
  const [previewNode, setPreviewNode] = React.useState<Root | null>(null)
  const [isLoading, setIsLoading] = React.useState(false)
  const [isSettingsOpen, setIsSettingsOpen] = React.useState(false)

  const { settings } = usePersistedSettings()
  const { getActiveVault } = useVaultContext()
  const { updateVaultTree } = useVaults()

  // TODO: support opening recent vaults and switching states
  const vault = getActiveVault()

  const memoizedExtensions = React.useMemo(() => {
    const tabSize = new Compartment()
    const extensions = [
      markdown({ base: markdownLanguage, codeLanguages: languages }),
      liveMode,
      EditorView.lineWrapping,
      tabSize.of(EditorState.tabSize.of(settings.tabSize)),
      fileField.init(() => currentFile),
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

  const [markdownContent, setMarkdownContent] = React.useState(WELCOME_MD)
  const onContentChange = React.useCallback((value: string) => {
    setMarkdownContent(value)
  }, [])

  const [showNotes, setShowNotes] = React.useState(false)
  const toggleNotes = React.useCallback(() => {
    setShowNotes((prev) => !prev)
  }, [])

  const [notes, setNotes] = React.useState<Note[]>([])
  const handleNoteDrop = React.useCallback((note: Note, droppedOverEditor: boolean) => {
    if (droppedOverEditor) {
      setNotes((prevNotes) =>
        prevNotes.filter((n) => !(n.title === note.title && n.content === note.content)),
      )
    }
  }, [])

  // FIXME: increase in memory usage
  const handleExportMarkdown = React.useCallback(() => {
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
  }, [markdownContent])

  const handleExportPdf = React.useCallback(() => {
    const pdf = new jsPDF()
    pdf.setFont("helvetica", "normal")

    const lines = pdf.splitTextToSize(markdownContent, 180)
    pdf.text(lines, 10, 10)

    pdf.save("document.pdf")
  }, [markdownContent])

  const fetchNewNotes = async (content: string) => {
    try {
      const apiEndpoint =
        process.env.CF_PAGES === "1"
          ? process.env.API_ENDPOINT
          : process.env.NEXT_PUBLIC_API_ENDPOINT

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

  React.useEffect(() => {
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
  const [fileSystemPermissionGranted, setFileSystemPermissionGranted] = React.useState(false)
  const handlePermissionGranted = React.useCallback(() => {
    setFileSystemPermissionGranted(true)
  }, [])
  React.useEffect(() => {
    const permissionGranted = localStorage.getItem("fileSystemPermissionGranted")
    if (permissionGranted === "true") setFileSystemPermissionGranted(true)
  }, [])

  // Keybind events
  React.useEffect(() => {
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
  }, [toggleNotes, settings.editModeShortcut])

  // Update file selection handler to work with vault tree
  const handleFileSelect = React.useCallback(
    async (node: FileSystemTreeNode) => {
      if (!vault || node.kind !== "file" || !(node.handle instanceof FileSystemFileHandle)) return

      try {
        const file = await node.handle.getFile()
        const content = await file.text()
        setCurrentFile(file.name)
        setMarkdownContent(content)

        // Dispatch file change to CodeMirror
        if (editorRef.current) {
          const view = EditorView.findFromDOM(editorRef.current)
          if (view) {
            view.dispatch({
              effects: setFile.of(file.name),
            })
          }
        }
      } catch (error) {
        console.error("Error reading file:", error)
      }
    },
    [vault],
  )

  // Update tree when files change
  const handleTreeUpdate = React.useCallback(
    async (newRoot: FileSystemTreeNode) => {
      if (!vault?.handle) return
      await updateVaultTree(vaultId, vault.handle, newRoot)
    },
    [vault, vaultId, updateVaultTree],
  )

  React.useEffect(() => {
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
          onFileSelect={handleFileSelect}
          onTreeUpdate={handleTreeUpdate}
          onExportMarkdown={handleExportMarkdown}
          onExportPDF={handleExportPdf}
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
