import * as React from "react"
import { useDrop } from "react-dnd"
import { NOTES_DND_TYPE, type Note } from "@/lib/notes"
import { useNotes } from "@/context/notes-context"
import { cn } from "@/lib/utils"

export function EditorNotes() {
  const { editorNotes, moveNoteToEditor } = useNotes()

  const [{ isOver, isOverCurrent }, drop] = useDrop(() => ({
    accept: NOTES_DND_TYPE,
    drop: (item: Note, monitor) => {
      if (monitor.didDrop()) {
        return
      }
      moveNoteToEditor(item.id)
      return { noteId: item.id, targetId: 'editor' }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      isOverCurrent: monitor.isOver({ shallow: true }),
    }),
  }))

  return (
    <div
      ref={drop}
      className={cn(
        "fixed top-4 right-4 flex flex-col gap-2 z-50 w-48",
        isOverCurrent && "ring-2 ring-primary ring-offset-2",
        isOver && !isOverCurrent && "ring-2 ring-secondary ring-offset-2"
      )}
    >
      {editorNotes.map((note) => (
        <div
          key={note.id}
          className={cn(
            "p-2 shadow-sm cursor-pointer text-sm rounded border border-border",
            note.color,
            "text-gray-800 dark:text-gray-200"
          )}
        >
          <p className="line-clamp-1">{note.content}</p>
        </div>
      ))}
    </div>
  )
}
