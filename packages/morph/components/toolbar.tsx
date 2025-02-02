import { Copy, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ToolbarProps {
  toggleNotes: () => void
}

export function Toolbar({ toggleNotes }: ToolbarProps) {
  return (
    <div className="flex items-center justify-between p-2 bg-white border-b border-gray-200">
      <div className="flex-1" />
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <Settings className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={toggleNotes}>
          <Copy className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
