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

export default function Editor() {
  const [showNotes, setShowNotes] = React.useState(true)
  const [markdownContent, setMarkdownContent] = React.useState(initialMarkdown)
  const [theme, setTheme] = React.useState<"light" | "dark" | "system">("system")
  const [vimMode, setVimMode] = React.useState(false)

  const handleChange = React.useCallback((value: string) => {
    setMarkdownContent(value)
  }, [])

  const toggleNotes = React.useCallback(() => {
    setShowNotes((prev) => !prev)
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
            <div className="flex-1">
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
                    {SAMPLE_NOTES.map((note, index) => (
                      <NoteCard key={index} {...note} />
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
