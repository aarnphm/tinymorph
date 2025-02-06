import { drag } from "d3-drag"
import { select } from "d3-selection"
import { useEffect, useRef, useState } from "react"
import { Skeleton } from "@/components/ui/skeleton"

interface NoteCardProps {
  title?: string
  content?: string
  style?: React.CSSProperties
  isLoading?: boolean
  ref?: React.RefObject<HTMLDivElement | null>
}

export function NoteCard({ title, content, style, isLoading = false, ref }: NoteCardProps) {
  if (isLoading) {
    return (
      <div ref={ref} className="p-4 bg-card border border-border rounded" style={style}>
        <Skeleton className="h-4 w-1/2 mb-2" />
        <Skeleton className="h-3 w-full mb-1" />
        <Skeleton className="h-3 w-full mb-1" />
        <Skeleton className="h-3 w-2/3" />
      </div>
    )
  }

  return (
    <div
      ref={ref}
      className="p-4 bg-card border border-border transition-all duration-200 hover:shadow-lg hover:bg-gradient-to-br from-background to-muted"
      style={style}
    >
      <h3 className="mb-2 text-sm font-medium text-foreground">{title}</h3>
      <p className="text-xs text-muted-foreground leading-relaxed">{content}</p>
    </div>
  )
}

export interface Note {
  title: string
  content: string
}

interface DraggableNoteProps extends Note {
  onDrop: (note: Note, droppedOverEditor: boolean) => void
  editorRef: React.RefObject<HTMLDivElement | null>
}

export function DraggableNoteCard({ title, content, onDrop, editorRef }: DraggableNoteProps) {
  const noteRef = useRef<HTMLDivElement>(null)
  const [dragging, setDragging] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [fixedWidth, setFixedWidth] = useState<number | null>(null)
  const offsetRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    if (!noteRef.current) return

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
        setPosition({
          x: event.sourceEvent.clientX - offsetRef.current.x,
          y: event.sourceEvent.clientY - offsetRef.current.y,
        })
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

        onDrop({ title, content }, droppedOverEditor)
      })

    select(noteRef.current).call(dragBehavior)
  }, [title, content, onDrop, editorRef])

  return (
    <>
      {dragging && (
        <NoteCard
          ref={noteRef}
          title={title}
          content={content}
          style={{
            width: fixedWidth || "auto",
            opacity: 0.5,
            position: "relative",
          }}
        />
      )}

      <NoteCard
        ref={noteRef}
        title={title}
        content={content}
        style={{
          cursor: "grab",
          position: dragging ? "fixed" : "relative",
          top: dragging ? position.y : undefined,
          left: dragging ? position.x : undefined,
          width: fixedWidth || "auto",
          zIndex: dragging ? 999 : "auto",
          margin: 0,
        }}
      />
    </>
  )
}
