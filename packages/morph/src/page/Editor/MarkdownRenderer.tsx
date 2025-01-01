import {
  Decoration,
  DecorationSet,
  ViewPlugin,
  ViewUpdate,
  WidgetType,
  EditorView
} from "@codemirror/view";
import { RangeSetBuilder } from "@codemirror/state";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkHtml from "remark-html";

const mdProcessor = unified().use(remarkParse).use(remarkHtml);

function renderMarkdownToHtml(markdown: string): string {
  try {
    const renderedMarkdown = mdProcessor.processSync(markdown);
    return String(renderedMarkdown);
  } catch (error) {
    console.error("Error with rendering Markdown:", error);
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

        const renderedHTML = renderMarkdownToHtml(lineText);

        const deco = Decoration.replace({
          widget: new MarkdownLineWidget(renderedHTML)
        });
        builder.add(line.from, line.to, deco);
      }

      return builder.finish();
    }

    destroy() {}
  },
  {
    decorations: (v) => v.decorations
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
