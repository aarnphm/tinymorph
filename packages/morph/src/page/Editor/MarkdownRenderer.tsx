import {
  Decoration,
  DecorationSet,
  ViewPlugin,
  ViewUpdate,
  WidgetType,
  EditorView,
} from "@codemirror/view";
import { RangeSetBuilder } from "@codemirror/state";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";

let mdProcessor: ReturnType<typeof createProcessor> | null = null;

const processedCache = new Map<string, string>();

function createProcessor() {
  return unified()
    .use(remarkParse)
    // Example md plugins
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    // Example HTML plugins
    .use(rehypeSlug)
    .use(rehypeStringify, { allowDangerousHtml: true });
}

function getProcessor() {
  if (!mdProcessor) {
    mdProcessor = createProcessor();
  }
  return mdProcessor;
}

function processMarkdown(markdown: string): string {
  const cached = processedCache.get(markdown);
  if (cached) return cached;

  try {
    const processor = getProcessor();
    const renderedMarkdown = processor.processSync(markdown);
    const result = String(renderedMarkdown.value);
    processedCache.set(markdown, result);
    return result;
  } catch (error) {
    console.error("Error rendering Markdown:", error);
    return markdown;
  }
}

export const inlineMarkdownExtension = ViewPlugin.fromClass(
  class {
    decorations: DecorationSet;

    constructor(view: EditorView) {
      this.decorations = this.computeDecorations(view);
    }

    update(update: ViewUpdate) {
      if (update.docChanged || update.selectionSet) {
        this.decorations = this.computeDecorations(update.view);
      }
    }

    computeDecorations(view: EditorView): DecorationSet {
      const { state } = view;
      const builder = new RangeSetBuilder<Decoration>();

      const cursorPos = state.selection.main.head;
      const cursorLine = state.doc.lineAt(cursorPos).number;

      for (let lineNum = 1; lineNum <= state.doc.lines; lineNum++) {
        if (lineNum === cursorLine) continue;

        const line = state.doc.line(lineNum);
        const lineText = line.text;
        const renderedHTML = processMarkdown(lineText);

        const deco = Decoration.replace({
          widget: new MarkdownLineWidget(renderedHTML),
        });
        builder.add(line.from, line.to, deco);
      }

      return builder.finish();
    }

    destroy() {}
  },
  {
    decorations: (v) => v.decorations,
  }
);

class MarkdownLineWidget extends WidgetType {
  private html: string;

  constructor(html: string) {
    super();
    this.html = html;
  }

  toDOM(): HTMLElement {
    const wrapper = document.createElement("div");
    wrapper.className = "cm-markdown-inline";
    wrapper.innerHTML = this.html;
    return wrapper;
  }
}
