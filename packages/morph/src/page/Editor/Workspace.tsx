import { useEffect, useRef, useState } from "react";
import { EditorState } from "@codemirror/state";
import { EditorView, basicSetup } from "codemirror";
import { markdown } from "@codemirror/lang-markdown";
import { inlineMarkdownExtension } from "./MarkdownRenderer";
import { NotesPanel } from "./NotesPanel";
import { MarkdownFileUpload } from "./MarkdownFileUpload";
import { Button } from "@/components/ui/button";
import { vim } from "@replit/codemirror-vim";

export function Workspace() {
  const [showNotes, setShowNotes] = useState(false);
  const editorRef = useRef<HTMLDivElement>(null);
  const [editorView, setEditorView] = useState<EditorView | null>(null);

  useEffect(() => {
    if (!editorRef.current) return;

    const startState = EditorState.create({
      doc: `## Hello World

This is **bold** text.

[[Wikilink Test]]`,
      extensions: [
        basicSetup,
        EditorView.lineWrapping,
        markdown(),
        inlineMarkdownExtension,
        vim()
      ]
    });

    const view = new EditorView({
      state: startState,
      parent: editorRef.current
    });

    setEditorView(view);

    return () => {
      view.destroy();
    };
  }, []);

  return (
    <div className="editor-container">
      <div className="flex justify-end items-center gap-2 mb-4 mt-2 mr-4">
        <Button
          variant="outline"
          onClick={() => setShowNotes(!showNotes)}
        >
          Notes
        </Button>
        <MarkdownFileUpload editorView={editorView} />
      </div>
      <div className={`editor-content ${showNotes ? 'with-notes' : ''}`}>
        <div className="editor" ref={editorRef} data-editor-container="true" />
        {showNotes && <NotesPanel editorRef={editorRef} />}
      </div>
    </div>
  );
}