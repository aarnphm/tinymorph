import { forwardRef } from 'react'

interface NoteCardProps {
  title: string
  content: string
  style?: React.CSSProperties
}

export const NoteCard = forwardRef<HTMLDivElement, NoteCardProps>(
  ({ title, content, style }, ref) => {
    return (
      <div
        ref={ref}
        className="p-4 bg-card border border-border"
        style={style}
      >
        <h3 className="mb-2 text-sm font-medium text-foreground">{title}</h3>
        <p className="text-xs text-muted-foreground leading-relaxed">{content}</p>
      </div>
    )
  }
)

NoteCard.displayName = 'NoteCard'