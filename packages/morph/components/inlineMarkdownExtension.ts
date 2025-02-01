import type { VFile } from "vfile"
import { Decoration, type DecorationSet, ViewPlugin, type ViewUpdate, WidgetType, EditorView } from "@codemirror/view"
import { RangeSetBuilder, StateEffect, StateField } from "@codemirror/state"
import { unified } from "unified"
import remarkParse from "remark-parse"
import remarkRehype from "remark-rehype"
import rehypeStringify from "rehype-stringify"
import remarkGfm from "remark-gfm"
import rehypeSlug from "rehype-slug"

let mdProcessor: ReturnType<typeof createProcessor> | null = null

const processedCache = new Map<string, VFile>()

function createProcessor() {
  return unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeSlug)
    .use(rehypeStringify, { allowDangerousHtml: true })
}

function getProcessor() {
  if (!mdProcessor) {
    mdProcessor = createProcessor()
  }
  return mdProcessor
}

async function processMarkdown(markdown: string): Promise<string> {
  if (!markdown.trim()) {
    return ""
  }

  const preprocessedMarkdown = markdown.replace(/^ +/, (spaces) => spaces.replace(/ /g, "\u00A0"))

  const cachedFile = processedCache.get(preprocessedMarkdown)
  if (cachedFile) {
    return String(cachedFile.value)
  }

  try {
    const processor = getProcessor()
    const file = (await processor.process(preprocessedMarkdown)) as VFile
    processedCache.set(preprocessedMarkdown, file)
    return String(file.value)
  } catch (error) {
    console.error("Error rendering Markdown:", error)
    return markdown
  }
}

const updateDecorations = StateEffect.define<DecorationSet>()

const markdownDecorations = StateField.define<DecorationSet>({
  create() {
    return Decoration.none
  },
  update(decorations, tr) {
    decorations = decorations.map(tr.changes)
    for (const e of tr.effects) {
      if (e.is(updateDecorations)) {
        decorations = e.value
      }
    }
    return decorations
  },
  provide: (f) => EditorView.decorations.from(f),
})

interface PendingDecoration {
  from: number
  to: number
  html: string
}

export const inlineMarkdownExtension = ViewPlugin.fromClass(
  class {
    decorations: DecorationSet
    pending: Map<number, boolean>
    currentView: EditorView

    constructor(view: EditorView) {
      this.decorations = Decoration.none
      this.pending = new Map()
      this.currentView = view
      this.computeDecorations(view)
    }

    update(update: ViewUpdate) {
      if (update.docChanged || update.selectionSet) {
        this.computeDecorations(update.view)
      }
    }

    async computeDecorations(view: EditorView) {
      if (!view.dom.isConnected) return

      const { state } = view
      const cursorPos = state.selection.main.head
      const cursorLine = state.doc.lineAt(cursorPos).number
      const pendingDecorations: PendingDecoration[] = []

      const processLine = async (lineNum: number) => {
        if (this.pending.get(lineNum)) return

        const line = state.doc.line(lineNum)
        const lineText = line.text

        this.pending.set(lineNum, true)

        try {
          const renderedHTML = await processMarkdown(lineText)
          if (view.dom.isConnected) {
            pendingDecorations.push({
              from: line.from,
              to: line.to,
              html: renderedHTML,
            })
          }
        } finally {
          this.pending.delete(lineNum)
        }
      }

      const linePromises = []
      for (let lineNum = 1; lineNum <= state.doc.lines; lineNum++) {
        if (lineNum !== cursorLine) {
          linePromises.push(processLine(lineNum))
        }
      }

      await Promise.all(linePromises)

      if (view.dom.isConnected) {
        const builder = new RangeSetBuilder<Decoration>()

        pendingDecorations.sort((a, b) => a.from - b.from)

        for (const deco of pendingDecorations) {
          builder.add(
            deco.from,
            deco.to,
            Decoration.replace({
              widget: new MarkdownLineWidget(deco.html),
            }),
          )
        }

        view.dispatch({
          effects: updateDecorations.of(builder.finish()),
        })
      }
    }

    destroy() {
      this.pending.clear()
    }
  },
  {
    decorations: (v) => v.decorations,
    provide: () => [markdownDecorations],
  },
)

class MarkdownLineWidget extends WidgetType {
  private html: string

  constructor(html: string) {
    super()
    this.html = html
  }

  toDOM(): HTMLElement {
    const wrapper = document.createElement("div")
    wrapper.className = "cm-markdown-inline"
    wrapper.innerHTML = this.html
    return wrapper
  }
}

