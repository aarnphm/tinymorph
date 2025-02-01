import React from 'react';
import { EditorView } from "codemirror";

interface MarkdownFileUploadProps {
  editorView: EditorView | null;
}

export function MarkdownFileUpload({ editorView }: MarkdownFileUploadProps) {
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !editorView) return;

    try {
      const text = await file.text();
      editorView.dispatch({
        changes: {
          from: 0,
          to: editorView.state.doc.length,
          insert: text
        }
      });
    } catch (error) {
      console.error("Error reading markdown file:", error);
    }

    event.target.value = "";
  };

  return (
    <div className='flex justify-end items-center'>
      <label className="cursor-pointer flex justify-end items-center">
        <input
          type="file"
          accept=".md,.markdown"
          onChange={handleFileUpload}
          className="hidden"
        />
        <i className="las la-upload text-lg" />
      </label>
    </div>
  );
}