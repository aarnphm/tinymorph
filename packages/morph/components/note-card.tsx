interface NoteCardProps {
  title: string
  content: string
}

export function NoteCard({ title, content }: NoteCardProps) {
  return (
    <div className="p-4 bg-card border border-border">
      <h3 className="mb-2 text-sm font-medium text-foreground">{title}</h3>
      <p className="text-xs text-muted-foreground leading-relaxed">{content}</p>
    </div>
  )
}

