import { useRef, useState, useEffect, RefObject } from "react"
import { drag } from "d3-drag"
import { select } from "d3-selection"

export interface Note {
  id: number
  title: string
  content: string
  graph?: DataPoint[]
}

interface DataPoint {
  x: string
  y: number
}

interface DraggableNoteProps {
  note: Note
  editorRef: RefObject<HTMLDivElement | null>
  onDrop: (note: Note, droppedOverEditor: boolean) => void
}

interface NotesPanelProps {
  editorRef: RefObject<HTMLDivElement | null>
  onAddNotes?: (notes: Note[]) => void
  notes: Note[]
}

function DraggableNote({ note, editorRef, onDrop }: DraggableNoteProps) {
  const noteRef = useRef<HTMLDivElement>(null)
  const [dragging, setDragging] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [fixedWidth, setFixedWidth] = useState<number | null>(null)
  const offsetRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    if (noteRef.current) {
      setFixedWidth(noteRef.current.offsetWidth)

      const dragBehavior = drag<HTMLDivElement, unknown>()
        .on("start", (event) => {
          const rect = noteRef.current!.getBoundingClientRect()
          offsetRef.current = {
            x: event.sourceEvent.clientX - rect.left,
            y: event.sourceEvent.clientY - rect.top,
          }
          setPosition({ x: rect.left, y: rect.top })
          setDragging(true)
        })
        .on("drag", (event) => {
          const newPosition = {
            x: event.sourceEvent.clientX - offsetRef.current.x,
            y: event.sourceEvent.clientY - offsetRef.current.y,
          }
          setPosition(newPosition)
        })
        .on("end", (event) => {
          setDragging(false)
          let droppedOverEditor = false
          if (editorRef.current) {
            const editorRect = editorRef.current.getBoundingClientRect()
            const finalX = event.sourceEvent.clientX
            const finalY = event.sourceEvent.clientY
            droppedOverEditor =
              finalX >= editorRect.left &&
              finalX <= editorRect.right &&
              finalY >= editorRect.top &&
              finalY <= editorRect.bottom
          }
          onDrop(note, droppedOverEditor)
        })

      select(noteRef.current).call(dragBehavior)
    }
  }, [editorRef, note, onDrop])

  return (
    <section>
      {dragging && (
        <div
          className="note-item ghost"
          style={{
            width: fixedWidth || "auto",
            opacity: 0.5,
            position: "relative",
          }}
        >
          <h3 className="font-semibold mb-2">{note.title}</h3>
          <p className="text-sm text-gray-600">{note.content}</p>
        </div>
      )}

      <div
        ref={noteRef}
        className={`note-item ${dragging ? "dragging" : ""}`}
        style={{
          cursor: "grab",
          position: dragging ? "fixed" : "relative",
          top: dragging ? position.y : undefined,
          left: dragging ? position.x : undefined,
          width: fixedWidth || "auto",
          zIndex: dragging ? 999 : "auto",
          margin: 0,
        }}
      >
        <h3 className="font-semibold mb-2">{note.title}</h3>
        <p className="text-sm text-gray-500">{note.content}</p>
      </div>
    </section>
  )
}

export function NotesPanel({ editorRef, onAddNotes, notes }: NotesPanelProps) {
  const [droppedNotes, setDroppedNotes] = useState<Note[]>([])

  useEffect(() => {
    if (onAddNotes) {
      onAddNotes(notes)
    }
  }, [notes, onAddNotes])

  const handleDrop = (droppedNote: Note, droppedOverEditor: boolean) => {
    if (droppedOverEditor) {
      const { graph, ...noteWithoutGraph } = droppedNote
      setDroppedNotes((prev) => [...prev, noteWithoutGraph])
      console.log("Dropped Notes:", [...droppedNotes, noteWithoutGraph])
    }
  }

  const leftColumnNotes = notes.filter((_, index) => index % 2 === 0)
  const rightColumnNotes = notes.filter((_, index) => index % 2 === 1)

  return (
    <section className="notes-panel">
      <h2 className="text-xl font-bold mb-4">Notes</h2>
      <div className="notes-columns">
        <div className="notes-column">
          {leftColumnNotes.map((note) => (
            <DraggableNote key={note.id} note={note} editorRef={editorRef} onDrop={handleDrop} />
          ))}
        </div>
        <div className="notes-column">
          {rightColumnNotes.map((note) => (
            <DraggableNote key={note.id} note={note} editorRef={editorRef} onDrop={handleDrop} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default NotesPanel
