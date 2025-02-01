interface NoteCardProps {
  title: string
  content: string
}

export function NoteCard({ title, content }: NoteCardProps) {
  return (
    <div className="p-4 bg-white rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.1)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.1)] transition-shadow">
      <h3 className="mb-2 text-sm font-medium text-[#1e293b]">{title}</h3>
      <p className="text-xs text-[#475569] leading-relaxed">{content}</p>
    </div>
  )
}

