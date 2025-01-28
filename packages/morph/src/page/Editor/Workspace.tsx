import React, { useEffect, useRef, useState } from "react";
import { EditorState } from "@codemirror/state";
import { EditorView, basicSetup } from "codemirror";
import { markdown } from "@codemirror/lang-markdown";
import { vim } from "@replit/codemirror-vim";
import { inlineMarkdownExtension } from "./MarkdownRenderer";
import { NotesPanel } from "./NotesPanel";
import { MarkdownFileUpload } from "./MarkdownFileUpload";
import Settings from "./Settings";

import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar"

export function Workspace() {
  const [showNotes, setShowNotes] = useState(false);
  const [vimBindingEnabled, setVimBindingEnabled] = useState(false);
  const editorRef = useRef<HTMLDivElement>(null);
  const [editorView, setEditorView] = useState<EditorView | null>(null);

  useEffect(() => {
    if (!editorRef.current) return;

    const currentContent = editorView
      ? editorView.state.doc.toString()
      : `## Hello World

This is **bold** text.

[[Wikilink Test]]`;

    const extensions = [
      basicSetup,
      EditorView.lineWrapping,
      markdown(),
      inlineMarkdownExtension,
      ...(vimBindingEnabled ? [vim()] : []),
    ];

    if (editorView) {
      editorView.destroy();
    }

    const view = new EditorView({
      state: EditorState.create({
        doc: currentContent,
        extensions: extensions,
      }),
      parent: editorRef.current,
    });

    setEditorView(view);

    return () => {
      view.destroy();
    };
  }, [vimBindingEnabled]);

  const handleVimBindingToggle = (enabled: boolean) => {
    setVimBindingEnabled(enabled);
  };

  const toggleNotes = () => setShowNotes((prev) => !prev);

  return (
    <div className={`workspace-container ${showNotes ? "show-notes" : ""}`}>
      <div className="left">
        <section className="editor" data-editor-container="true">
          <div ref={editorRef} />
        </section>

        <section className="menu-bar">
          <Menubar className="h-11 flex justify-end">
            <MenubarMenu>
              <MenubarTrigger onClick={toggleNotes}>
          <i className="las la-sticky-note text-lg cursor-pointer" />
              </MenubarTrigger>
            </MenubarMenu>

            <MenubarMenu>
              <MenubarTrigger>
          <MarkdownFileUpload editorView={editorView} />
              </MenubarTrigger>
            </MenubarMenu>

            <MenubarMenu>
              <MenubarTrigger>
          <Settings onVimBindingToggle={handleVimBindingToggle} />
              </MenubarTrigger>
            </MenubarMenu>
          </Menubar>
        </section>
      </div>

      <div className="right">
        <aside className="notes-panel">
          <NotesPanel editorRef={editorRef} />
        </aside>
      </div>
    </div>
  );
}