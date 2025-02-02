import { useState } from "react"
import { Copy, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SettingsPanel } from "./settings-panel"

interface ToolbarProps {
  toggleNotes: () => void
}

export function Toolbar({ toggleNotes }: ToolbarProps) {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0"
            onClick={() => setIsSettingsOpen(true)}
          >
            <Settings className="h-3 w-3" width={16} height={16} />
          </Button>
          <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={toggleNotes}>
            <Copy className="h-3 w-3" width={16} height={16} />
          </Button>
        </div>
      </div>
      <SettingsPanel isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
    </>
  )
}
