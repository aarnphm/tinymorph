import { useState } from "react"
import { Copy, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SettingsPanel } from "./settings-panel"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

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
      <div className="flex items-center justify-between px-2 bg-background border-b border-border h-10">
        <div className="flex-1"></div>
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0"
            onClick={() => setIsSettingsOpen(true)}
          >
            <Settings className="h-4 w-4" />
          </Button>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={toggleNotes}>
                  <Copy className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom" align="end" className="text-xs py-1 px-2">
                <p>Toggle Notes</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
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
