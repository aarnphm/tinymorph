import React from 'react';
import { EditorView } from "codemirror";
import { Button } from "@/components/ui/button";

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
    <Button variant="outline" asChild>
      <label className="cursor-pointer">
        <input
          type="file"
          accept=".md,.markdown"
          onChange={handleFileUpload}
          className="hidden"
        />
        <i className="las la-upload text-lg" />
        Upload
      </label>
    </Button>
  );
}