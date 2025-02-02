import * as React from "react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { X } from "lucide-react"

interface SettingsPanelProps {
  isOpen: boolean
  onClose: () => void
  theme: "light" | "dark" | "system"
  setTheme: (theme: "light" | "dark" | "system") => void
  vimMode: boolean
  setVimMode: (enabled: boolean) => void
}

type SettingsCategory = {
  id: string
  label: string
}

const categories: SettingsCategory[] = [
  { id: "general", label: "General" },
  { id: "editor", label: "Editor" },
  { id: "appearance", label: "Appearance" },
  { id: "keyboard", label: "Keyboard" },
  { id: "files", label: "Files and Links" },
  { id: "about", label: "About" },
]

export function SettingsPanel({
  isOpen,
  onClose,
  theme,
  setTheme,
  vimMode,
  setVimMode,
}: SettingsPanelProps) {
  const [activeCategory, setActiveCategory] = React.useState("general")

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-900 rounded-lg w-[900px] max-w-[90vw] max-h-[85vh] flex">
        {/* Left sidebar */}
        <div className="w-[240px] border-r border-gray-200 dark:border-gray-800">
          <div className="p-4 font-medium text-lg">Settings</div>
          <ScrollArea className="h-[calc(85vh-60px)]">
            <div className="space-y-1 p-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={cn(
                    "w-full text-left px-3 py-2 rounded-md text-sm transition-colors",
                    activeCategory === category.id
                      ? "bg-rose-200 text-rose-900 dark:bg-rose-900 dark:text-rose-100"
                      : "hover:bg-gray-100 dark:hover:bg-gray-800",
                  )}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Right content area */}
        <div className="flex-1">
          <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-800">
            <h2 className="text-lg font-medium">
              {categories.find((c) => c.id === activeCategory)?.label}
            </h2>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          <ScrollArea className="h-[calc(85vh-60px)]">
            <div className="p-6 space-y-6">
              {activeCategory === "general" && (
                <>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium mb-4">Appearance</h3>
                      <div className="space-y-4">
                        <div>
                          <Label className="text-sm mb-2 block">Theme</Label>
                          <RadioGroup
                            value={theme}
                            onValueChange={(value: "light" | "dark" | "system") => setTheme(value)}
                            className="space-y-2"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="light" id="light" />
                              <Label htmlFor="light">Light</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="dark" id="dark" />
                              <Label htmlFor="dark">Dark</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="system" id="system" />
                              <Label htmlFor="system">System</Label>
                            </div>
                          </RadioGroup>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {activeCategory === "editor" && (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium mb-4">Editor Settings</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="vim-mode">Vim Mode</Label>
                          <div className="text-sm text-muted-foreground">
                            Enable Vim key bindings
                          </div>
                        </div>
                        <Switch id="vim-mode" checked={vimMode} onCheckedChange={setVimMode} />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeCategory === "appearance" && (
                <div className="text-sm text-muted-foreground">
                  Appearance settings will be implemented in the future.
                </div>
              )}

              {activeCategory === "keyboard" && (
                <div className="text-sm text-muted-foreground">
                  Keyboard settings will be implemented in the future.
                </div>
              )}

              {activeCategory === "files" && (
                <div className="text-sm text-muted-foreground">
                  Files and links settings will be implemented in the future.
                </div>
              )}

              {activeCategory === "about" && (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium mb-2">Version</h3>
                    <p className="text-sm text-muted-foreground">v1.0.0</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium mb-2">About</h3>
                    <p className="text-sm text-muted-foreground">
                      A simple markdown editor with live preview.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  )
}
