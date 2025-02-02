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

const SAMPLE_NOTES = [
  {
    title: "Jogging",
    content: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
  },
  {
    title: "games",
    content: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
  },
  {
    title: "Jogging",
    content: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
  },
  {
    title: "Examination",
    content: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
  },
  {
    title: "Classes",
    content: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
  },
  {
    title: "Race",
    content: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
  },
  {
    title: "Speech",
    content: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
  },
  {
    title: "Party",
    content: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
  },
  {
    title: "Reminder",
    content: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
  },
  {
    title: "games",
    content: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
  },
  {
    title: "Speech",
    content: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
  },
  {
    title: "Party",
    content: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
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
    <div className={`grid h-screen grid-cols-[1fr,auto] grid-rows-[auto,1fr] ${theme === "dark" ? "dark" : ""}`}>
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
        <div className="border-r">
          <CodeMirror
            value={markdownContent}
            height="calc(100vh - 40px)"
            extensions={editorExtensions}
            onChange={handleChange}
            className="overflow-auto"
            theme={theme === "dark" ? "dark" : "light"}
          />
        </div>
        {showNotes && (
          <div className="w-80 h-[calc(100vh-40px)] overflow-auto border-l border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
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
    </div>
  )
}

