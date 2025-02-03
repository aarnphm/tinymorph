import * as React from "react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { X } from "lucide-react"
import usePersistedSettings from "@/hooks/use-persisted-settings"
import { useTheme } from "next-themes"

interface SettingsPanelProps {
  isOpen: boolean
  onClose: () => void
}

type SettingsCategory = {
  id: string
  label: string
}

const categories: SettingsCategory[] = [
  { id: "general", label: "General" },
  { id: "editor", label: "Editor" },
  { id: "keyboard", label: "Keyboard" },
  { id: "files", label: "Files and Links" },
  { id: "about", label: "About" },
]

export function SettingsPanel({ isOpen, onClose }: SettingsPanelProps) {
  const [activeCategory, setActiveCategory] = React.useState("general")
  const { settings, updateSettings, isLoaded, defaultSettings } = usePersistedSettings()
  const { theme, setTheme } = useTheme()

  // Add escape key handler here
  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        onClose()
      }
    }
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, onClose])

  // Don't render until settings are loaded from localStorage
  if (!isLoaded || !isOpen) return null

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
          <div className="h-10 flex shrink-0 justify-end items-center mx-4">
            <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={onClose}>
              <X className="h-3 w-3 p-0" width={16} height={16} />
            </Button>
          </div>
          <ScrollArea className="h-[calc(85vh-60px)]">
            <div className="p-6 space-y-6">
              {activeCategory === "general" && (
                <div className="space-y-4">
                  <div className="text-sm text-muted-foreground">
                    General settings will be implemented in the future.
                  </div>
                </div>
              )}

              {activeCategory === "editor" && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium mb-4">Appearance</h3>
                    <div className="space-y-4">
                      <div>
                        <Label className="text-sm mb-2 block">Theme</Label>
                        <RadioGroup value={theme} onValueChange={setTheme} className="space-y-2">
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
                        <Switch
                          id="vim-mode"
                          checked={settings.vimMode}
                          onCheckedChange={(checked) => updateSettings({ vimMode: checked })}
                        />
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
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium mb-4">Keyboard Shortcuts</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="edit-mode-shortcut">Edit Mode Toggle</Label>
                          <div className="text-sm text-muted-foreground">
                            Shortcut to toggle between edit and reading mode (⌘ or Ctrl + key)
                          </div>
                        </div>
                        <input
                          id="edit-mode-shortcut"
                          type="text"
                          value={settings.editModeShortcut}
                          onChange={(e) => {
                            const key = e.target.value.slice(-1).toLowerCase()
                            if (key.match(/[a-z]/i)) {
                              updateSettings({ editModeShortcut: key })
                            }
                          }}
                          className="w-16 text-center border rounded-md"
                          maxLength={1}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeCategory === "files" && (
                <div className="space-y-4">
                  <div>
                    <div className="space-y-8">
                      <div className="space-y-4">
                        <Label>Ignore Patterns</Label>
                        <p className="text-sm text-muted-foreground italic">
                          Globbing patterns to exclude from file listings
                        </p>
                        <div className="space-y-2">
                          {settings.ignorePatterns
                            .filter((p) => !defaultSettings.ignorePatterns.includes(p))
                            .map((pattern, index) => (
                              <div key={index} className="flex items-center gap-2">
                                <input
                                  type="text"
                                  value={pattern}
                                  onChange={(e) => {
                                    const newPatterns = [...settings.ignorePatterns]
                                    newPatterns[newPatterns.indexOf(pattern)] = e.target.value
                                    updateSettings({ ignorePatterns: newPatterns })
                                  }}
                                  className="flex-1 text-sm p-1.5 border"
                                />
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-8 w-8 p-0"
                                  onClick={() =>
                                    updateSettings({
                                      ignorePatterns: settings.ignorePatterns.filter(
                                        (p) => p !== pattern,
                                      ),
                                    })
                                  }
                                >
                                  -
                                </Button>
                              </div>
                            ))}
                          <Button
                            variant="default"
                            size="sm"
                            className="mt-2"
                            onClick={() =>
                              updateSettings({
                                ignorePatterns: [...settings.ignorePatterns, ""],
                              })
                            }
                          >
                            Add New Pattern
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
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
