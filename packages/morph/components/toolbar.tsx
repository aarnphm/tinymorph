import { useState } from "react"
import { Copy, Settings, Home } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SettingsPanel } from "./settings-panel"
import { useRouter } from "next/navigation"

interface ToolbarProps {
  toggleNotes: () => void
  disableSidebar?: boolean
}

export function Toolbar({ toggleNotes, disableSidebar }: ToolbarProps) {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const router = useRouter()

  return (
    <>
      <div className="flex items-center justify-between backdrop-blur-sm bg-background/80 supports-[backdrop-filter]:bg-background/60">
        <div className="flex items-center gap-4">
          {disableSidebar && (
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0"
              onClick={() => router.push("/")}
            >
              <Home className="h-3 w-3" width={16} height={16} />
            </Button>
          )}
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
