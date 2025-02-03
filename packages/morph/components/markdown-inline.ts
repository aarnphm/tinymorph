import {
  Decoration,
  type DecorationSet,
  ViewPlugin,
  type ViewUpdate,
  WidgetType,
  EditorView,
} from "@codemirror/view"
import { RangeSetBuilder, StateEffect, StateField } from "@codemirror/state"
import type { Root as HtmlRoot } from "hast"
import { s } from "hastscript"
import { VFile } from "vfile"
import { PluggableList, unified } from "unified"
import remarkParse from "remark-parse"
import remarkRehype from "remark-rehype"
import rehypeStringify from "rehype-stringify"
import remarkGfm from "remark-gfm"
import smartypants from "remark-smartypants"
import rehypeSlug from "rehype-slug"
import rehypePrettyCode from "rehype-pretty-code"
import rehypeKatex from "rehype-katex"
import rehypeAutolinkHeadings from "rehype-autolink-headings"
import rehypeRaw from "rehype-raw"

export type HtmlContent = [HtmlRoot, VFile]

function markdownPlugins() {
  return [remarkGfm, smartypants] as PluggableList
}

function htmlPlugins() {
  return [
    rehypeRaw,
    rehypeSlug,
    [
      rehypeAutolinkHeadings,
      {
        behavior: "append",
        properties: {
          "data-role": "anchor",
          "data-no-popover": true,
        },
        content: s(
          "svg",
          {
            xmlns: "http://www.w3.org/2000/svg",
            width: 16,
            height: 16,
            viewbox: "0 0 24 24",
            strokelinecap: "round",
            strokelinejoin: "round",
            fill: "none",
            stroke: "currentColor",
            strokewidth: "2",
          },
          s("path", { d: "M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" }),
          s("path", {
            d: "M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71",
          }),
        ),
      },
    ],
    [
      rehypePrettyCode,
      {
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      },
    ],
    [rehypeKatex, { output: "htmlAndMathml" }],
  ] as PluggableList
}

function processor() {
  return (
    unified()
      // base Markdown -> MD AST
      .use(remarkParse)
      .use(markdownPlugins())
      // MD AST -> HTML AST
      .use(remarkRehype, { allowDangerousHtml: true })
      // HTML AST -> HTML AST transforms
      .use(htmlPlugins())
      // HTML AST transforms -> string
      // TODO: we can parse directly to react components (given that this is updated within CodeMirror components)
      .use(rehypeStringify, { allowDangerousHtml: true })
  )
}

let mdProcessor: ReturnType<typeof processor> | null = null

const cached = new Map<string, VFile>()

function cacheProcessor() {
  if (!mdProcessor) mdProcessor = processor()
  return mdProcessor
}

async function mdToHtml(value: string): Promise<string> {
  if (!value.trim()) return ""

  value = value
    .replace(/^ +/, (spaces) => spaces.replace(/ /g, "\u00A0"))
    .toString()
    .trim()

  const cachedResult = cached.get(value)
  if (cachedResult) return String(cachedResult.value)

  const file = new VFile("")
  file.value = value

  try {
    const processor = cacheProcessor()
    const processed = await processor.process(file)
    cached.set(value, processed)
    return String(file.value)
  } catch (error) {
    console.error("Error rendering Markdown:", error)
    return value
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

export const inlineMarkdown = ViewPlugin.fromClass(
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
          const renderedHTML = await mdToHtml(lineText)
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

export default inlineMarkdown

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
