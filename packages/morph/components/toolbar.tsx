import { useState } from "react"
import { Copy, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SettingsPanel } from "./settings"

interface ToolbarProps {
  toggleNotes: () => void
  theme: "light" | "dark" | "system"
  setTheme: (theme: "light" | "dark" | "system") => void
  vimMode: boolean
  setVimMode: (enabled: boolean) => void
}

export function Toolbar({ toggleNotes, theme, setTheme, vimMode, setVimMode }: ToolbarProps) {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)

  return (
    <>
      <div className="flex items-center justify-between p-2 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="flex-1"></div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0"
            onClick={() => setIsSettingsOpen(true)}
          >
            <Settings className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={toggleNotes}>
            <Copy className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <SettingsPanel
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        theme={theme}
        setTheme={setTheme}
        vimMode={vimMode}
        setVimMode={setVimMode}
      />
    </>
  )
}
