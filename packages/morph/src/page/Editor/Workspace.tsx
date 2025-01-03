import React, { useEffect, useRef, useState } from "react";
import { EditorState } from "@codemirror/state";
import { EditorView, basicSetup } from "codemirror";
import { markdown } from "@codemirror/lang-markdown";
import { inlineMarkdownExtension } from "./MarkdownRenderer";
import { NotesPanel } from "./NotesPanel";


export function EditorWithToolbar() {
  const [showNotes, setShowNotes] = useState(false);
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
    <div className="editor-container">
      <div className="toolbar">
        <button className="btn mr-2" onClick={() => setShowNotes(!showNotes)}>
          {showNotes ? 'Hide Notes' : 'Show Notes'}
        </button>
      </div>
      <div className={`editor-content ${showNotes ? 'with-notes' : ''}`}>
        <div className="editor" ref={editorRef} />
        {showNotes && <NotesPanel />}
      </div>
    </div>
  );
}
