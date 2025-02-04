import { forwardRef } from "react"
import { Skeleton } from "@/components/ui/skeleton"

interface NoteCardProps {
  title?: string
  content?: string
  style?: React.CSSProperties
  isLoading?: boolean
}

export const NoteCard = forwardRef<HTMLDivElement, NoteCardProps>(
  ({ title, content, style, isLoading = false }, ref) => {
    if (isLoading) {
      return (
        <div
          ref={ref}
          className="p-4 bg-card border border-border rounded"
          style={style}
        >
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
  },
)

NoteCard.displayName = "NoteCard"
