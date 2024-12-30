import React, { useEffect, useRef } from "react";
import { EditorState } from "@codemirror/state";
import { EditorView, basicSetup } from "codemirror";
import { markdown } from "@codemirror/lang-markdown";
import { inlineMarkdownExtension } from "./MarkdownRenderer";

export function EditorWithToolbar() {
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!editorRef.current) return;

    const startState = EditorState.create({
      doc: `## Hello World

This is **bold** text.

[[Wikilink Test]]
`,
      extensions: [
        basicSetup,
        markdown(),
        inlineMarkdownExtension
      ]
    });

    const view = new EditorView({
      state: startState,
      parent: editorRef.current
    });

    return () => {
      view.destroy();
    };
  }, []);

  return (
    <div className="border p-2">
      <div className="mb-2">
        <button className="btn">Tooltip</button>
      </div>
      <div ref={editorRef} />
    </div>
  );
}
