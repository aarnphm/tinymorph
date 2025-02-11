import * as React from "react"
import { Button, ButtonProps } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { X, Cog } from "lucide-react"
import usePersistedSettings from "@/hooks/use-persisted-settings"
import { useTheme } from "next-themes"
import { Textarea } from "@/components/ui/textarea"
import { useVaultContext } from "@/context/vault-context"
import { Input } from "@/components/ui/input"

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
  { id: "keyboard", label: "Hotkeys" },
  { id: "core-plugins", label: "Core plugins" },
]

type PluginsCategory = {
  name: string
  description: string
  hasSettings: boolean
} & SettingsCategory

// Add core plugins configuration
const corePlugins: PluginsCategory[] = [
  {
    id: "citation",
    name: "Citations",
    description: "Add support for citations in your notes",
    hasSettings: true,
    label: "Citations",
  },
]

interface SettingItemProps {
  name: string | React.ReactNode
  description?: string
  children?: React.ReactNode
  isHeading?: boolean
  className?: string
}

function SettingItem({ name, description, children, isHeading, className }: SettingItemProps) {
  return (
    <div
      className={cn(
        "setting-item",
        isHeading && "setting-item-heading dark:border-slate-600",
        "dark:text-slate-200",
        className,
      )}
    >
      <div className="setting-item-info">
        <div className="setting-item-name">{name}</div>
        <div className="setting-item-description dark:text-slate-400">{description}</div>
      </div>
      <div className="setting-item-control">{children}</div>
    </div>
  )
}

function SettingsButton({ className, ref, ...props }: ButtonProps) {
  return (
    <Button
      ref={ref}
      size="sm"
      className={cn(
        "bg-cyan-500 dark:bg-teal-600 text-white dark:text-white",
        "hover:bg-cyan-500/80 dark:hover:bg-teal-600/80",
        "transition-colors duration-200",
        className,
      )}
      {...props}
    />
  )
}

function GeneralSettings() {
  return (
    <div className="text-sm">
      <SettingItem name="App" isHeading />

      <SettingItem name="GitHub" description="If you wish to contribute or open new issues">
        <SettingsButton onClick={() => window.open("https://github.com/aarnphm/morph", "_blank")}>
          Open
        </SettingsButton>
      </SettingItem>

      <SettingItem
        name="Documentation"
        description="For both engineering requirements and user manuals"
      >
        <SettingsButton onClick={() => window.open("https://tinymorph.aarnphm.xyz", "_blank")}>
          Open
        </SettingsButton>
      </SettingItem>
    </div>
  )
}

function EditorSettings() {
  const { settings, updateSettings } = usePersistedSettings()
  const { theme, setTheme } = useTheme()

  return (
    <div className="text-sm">
      <SettingItem name="Appearance" isHeading />

      <SettingItem name="Theme" description="Choose your preferred color theme">
        <RadioGroup value={theme} onValueChange={setTheme} className="flex gap-4">
          <div className="flex items-center gap-2">
            <RadioGroupItem value="light" id="light" />
            <Label htmlFor="light">Light</Label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="dark" id="dark" />
            <Label htmlFor="dark">Dark</Label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="system" id="system" />
            <Label htmlFor="system">System</Label>
          </div>
        </RadioGroup>
      </SettingItem>

      <SettingItem name="Editor" isHeading />

      <SettingItem name="Vim Mode" description="Enable Vim key bindings for text editing">
        <Switch
          id="vim-mode"
          checked={settings.vimMode}
          onCheckedChange={(checked) => updateSettings({ vimMode: checked })}
        />
      </SettingItem>
    </div>
  )
}

function HotkeySettings() {
  const { settings, updateSettings } = usePersistedSettings()

  return (
    <div className="text-sm">
      <SettingItem name="Keyboard Shortcuts" isHeading />

      <SettingItem
        name="Edit Mode Toggle"
        description="Shortcut to toggle between edit and reading mode (⌘ or Ctrl + key)"
      >
        <Input
          id="edit-mode-shortcut"
          type="text"
          value={settings.editModeShortcut}
          onChange={(e) => {
            const key = e.target.value.slice(-1).toLowerCase()
            if (key.match(/[a-z]/i)) {
              updateSettings({ editModeShortcut: key })
            }
          }}
          className="w-10 text-center border rounded-md"
          maxLength={1}
        />
      </SettingItem>
    </div>
  )
}

function CitationSettings() {
  const { settings, updateSettings } = usePersistedSettings()
  const { getActiveVault, updateReference } = useVaultContext()
  const [referencesPath, setReferencesPath] = React.useState<string | undefined>(
    settings.citation.databasePath,
  )
  const [hasManuallyCleared, setHasManuallyCleared] = React.useState(false)

  const vault = getActiveVault()

  // Save raw references to temp file and update database path
  const handleRawReferencesChange = React.useCallback(
    async (value: string) => {
      try {
        if (!vault?.handle) return

        const format = settings.citation.format
        const fileName = `references.${format === "biblatex" ? "bib" : "json"}`

        // Create or get .morph directory in vault
        const morphDir = await vault.handle.getDirectoryHandle(".morph", { create: true })
        const fileHandle = await morphDir.getFileHandle(fileName, { create: true })

        // Write raw references to file
        const writable = await fileHandle.createWritable()
        await writable.write(value)
        await writable.close()

        // Update settings with new file path and raw references
        const newPath = `.morph/${fileName}`
        setReferencesPath(newPath)
        updateSettings({
          citation: {
            ...settings.citation,
            databasePath: newPath,
          },
        })
      } catch (error) {
        console.error("Failed to save references file:", error)
      }
    },
    [vault, updateSettings, settings.citation],
  )

  // Check if References.bib exists in any vault and copy it to .morph directory
  React.useEffect(() => {
    const handleReferences = async () => {
      try {
        if (!vault?.handle) return

        // Try to get the default References.bib
        const defaultFileHandle = await vault.handle.getFileHandle("References.bib")
        if (defaultFileHandle && !hasManuallyCleared) {
          // Read the content of References.bib
          const file = await defaultFileHandle.getFile()
          const content = await file.text()

          // Create .morph directory and copy the content
          const morphDir = await vault.handle.getDirectoryHandle(".morph", { create: true })
          const morphFileHandle = await morphDir.getFileHandle("references.bib", { create: true })

          // Write content to .morph/references.bib
          const writable = await morphFileHandle.createWritable()
          await writable.write(content)
          await writable.close()

          // Update settings
          const newPath = `.morph/references.${settings.citation.format === "biblatex" ? "bib" : "json"}`
          setReferencesPath(newPath)
          await updateReference(vault, morphFileHandle, settings.citation.format, newPath)
          if (!settings.citation.databasePath) {
            updateSettings({
              citation: {
                ...settings.citation,
                databasePath: newPath,
              },
            })
          }
        }
      } catch (error) {
        // Silently fail if References.bib doesn't exist
        console.debug("No References.bib found:", error)
      }
    }

    if (!settings.citation.databasePath && !hasManuallyCleared) handleReferences()
  }, [vault, settings.citation, updateSettings, hasManuallyCleared, updateReference])

  return (
    <div className="text-sm">
      <SettingItem name="Citation Settings" isHeading />

      <SettingItem name="Citation Format" description="Choose your preferred citation format">
        <RadioGroup
          value={settings.citation.format}
          onValueChange={(value: "biblatex" | "csl-json") =>
            updateSettings({
              citation: {
                ...settings.citation,
                format: value,
              },
            })
          }
          className="flex gap-4"
        >
          <div className="flex items-center gap-2">
            <RadioGroupItem value="biblatex" id="biblatex" />
            <Label htmlFor="biblatex">BibLaTeX</Label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="csl-json" id="csl-json" />
            <Label htmlFor="csl-json">CSL-JSON</Label>
          </div>
        </RadioGroup>
      </SettingItem>

      <SettingItem
        name="Database Path"
        description="Path to your citation database file (automatically detected)"
      >
        <Input
          value={referencesPath || ""}
          onChange={(e) => {
            const newValue = e.target.value
            setReferencesPath(newValue)
            setHasManuallyCleared(!newValue)
            updateSettings({
              citation: {
                ...settings.citation,
                databasePath: newValue,
              },
            })
          }}
          className="w-full text-sm"
          placeholder="Enter path to your references file (e.g. References.bib)"
        />
      </SettingItem>
      <SettingItem
        name="Raw References"
        description="Enter your references in BibLaTeX or CSL-JSON format"
        className="items-start"
      >
        <Textarea
          value=""
          onChange={(e) => handleRawReferencesChange(e.target.value)}
          className="min-h-[200px] font-mono text-sm"
          placeholder={`Enter your references here in ${
            settings.citation.format === "biblatex" ? "BibLaTeX" : "CSL-JSON"
          } format`}
        />
      </SettingItem>
    </div>
  )
}

function CorePluginsSettings({ setActiveCategory }: { setActiveCategory: (id: string) => void }) {
  const { settings, updateSettings } = usePersistedSettings()

  return (
    <div className="text-sm">
      <SettingItem name="Core Plugins" isHeading />

      {corePlugins.map((plugin) => (
        <SettingItem
          key={plugin.id}
          name={
            <div className="flex items-center gap-2">
              {plugin.name}
              {plugin.hasSettings && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 p-0 hover:bg-slate-200 dark:hover:bg-slate-600/50"
                  onClick={() => setActiveCategory(plugin.id)}
                >
                  <Cog className="h-3 w-3" />
                </Button>
              )}
            </div>
          }
          description={plugin.description}
        >
          <Switch
            id={plugin.id}
            checked={plugin.id === "citation" ? (settings.citation.enabled ?? false) : false}
            onCheckedChange={(checked) => {
              if (plugin.id === "citation") {
                updateSettings({
                  citation: {
                    ...settings.citation,
                    enabled: checked,
                  },
                })
              }
            }}
          />
        </SettingItem>
      ))}
    </div>
  )
}

function SidebarSettingItem({
  category,
  isActive,
  onClick,
}: {
  category: SettingsCategory | PluginsCategory
  isActive: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full text-left px-3 py-2 rounded-md text-sm transition-colors flex items-center gap-2 cursor-pointer",
        "dark:text-slate-200 dark:hover:bg-slate-600/50",
        isActive && "bg-cyan-500 dark:bg-teal-600 text-white dark:text-white",
      )}
    >
      {category.label}
    </button>
  )
}

function SidebarSettingGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="p-[12px]">
      <div className="italic text-sm text-muted-foreground dark:text-slate-400 py-2">{title}</div>
      <ScrollArea className="pb-2">
        <div className="space-y-1">{children}</div>
      </ScrollArea>
    </div>
  )
}

export function SettingsPanel({ isOpen, onClose }: SettingsPanelProps) {
  const [activeCategory, setActiveCategory] = React.useState("general")
  const { isLoaded } = usePersistedSettings()

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

  const renderActiveCategory = () => {
    switch (activeCategory) {
      case "general":
        return <GeneralSettings />
      case "editor":
        return <EditorSettings />
      case "keyboard":
        return <HotkeySettings />
      case "core-plugins":
        return <CorePluginsSettings setActiveCategory={setActiveCategory} />
      case "citation":
        return <CitationSettings />
      default:
        return null
    }
  }

  return (
    <div className="fixed inset-0 bg-black/30 dark:bg-black/50 flex items-center justify-center z-50">
      <div className="bg-background dark:bg-[#1e1e1e] rounded-xl w-[900px] max-w-[90vw] max-h-[85vh] flex border border-black/10 dark:border-slate-600 overflow-hidden relative">
        <div className="w-[240px] flex flex-col bg-gray-100 dark:bg-[#262626] rounded-l-xl z-10">
          <SidebarSettingGroup title="Options">
            {categories.map((category) => (
              <SidebarSettingItem
                key={category.id}
                category={category}
                isActive={activeCategory === category.id}
                onClick={() => setActiveCategory(category.id)}
              />
            ))}
          </SidebarSettingGroup>
          <SidebarSettingGroup title="Core plugins">
            {corePlugins.map((category) => (
              <SidebarSettingItem
                key={category.id}
                category={category}
                isActive={activeCategory === category.id}
                onClick={() => setActiveCategory(category.id)}
              />
            ))}
          </SidebarSettingGroup>
        </div>

        <div className="flex-1 relative rounded-r-xl z-10 dark:bg-[#1e1e1e] p-6">
          <Button
            variant="ghost"
            className="h-6 w-6 p-0 absolute top-3 right-3 bg-transparent hover:bg-slate-200 dark:hover:bg-slate-600/50 z-20"
            onClick={onClose}
          >
            <X className="h-3 w-3 p-0" width={16} height={16} />
          </Button>
          <ScrollArea className="h-[calc(85vh-60px)] pt-8 pb-16 px-12">
            {renderActiveCategory()}
          </ScrollArea>
        </div>
      </div>
    </div>
  )
}
