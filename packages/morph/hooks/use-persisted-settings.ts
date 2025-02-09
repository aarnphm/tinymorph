import { useState, useEffect } from "react"
import { useVaultContext } from "@/context/vault-context"
import { useToast } from "@/hooks/use-toast"

export interface Settings {
  vimMode: boolean
  tabSize: number
  ignorePatterns: string[]
  editModeShortcut: string
  notePanelShortcut: string
  citation: {
    enabled: boolean
    format: "biblatex" | "csl-json"
    databasePath?: string
  }
}

const defaultSettings: Settings = {
  vimMode: false,
  tabSize: 2,
  ignorePatterns: [
    "**/.*",
    "**/node_modules/**",
    ".vercel/**",
    "**/dist/**",
    "__pycache__/**",
    "*.log",
    ".DS_Store",
    ".obsidian", // TODO: support obsidian vault
  ],
  editModeShortcut: "e",
  notePanelShortcut: "i",
  citation: {
    enabled: false,
    format: "biblatex",
  },
}

export default function usePersistedSettings() {
  const [settings, setSettings] = useState<Settings>(defaultSettings)
  const [isLoaded, setIsLoaded] = useState(false)
  const { getActiveVault } = useVaultContext()
  const { toast } = useToast()

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const vault = getActiveVault()
        if (!vault?.handle) {
          setIsLoaded(true)
          return
        }

        // Get the .morph directory handle
        const morphDir = await vault.handle.getDirectoryHandle(".morph", { create: true })
        const configFile = await morphDir.getFileHandle("config.json", { create: true })
        const file = await configFile.getFile()
        const text = await file.text()

        if (text) {
          const parsedSettings = { ...defaultSettings, ...JSON.parse(text) }
          setSettings(parsedSettings)
        }
      } catch (error) {
        console.error("Failed to load settings:", error)
        toast({
          title: "Error Loading Settings",
          description: "Failed to load settings from vault",
          variant: "destructive",
        })
      } finally {
        setIsLoaded(true)
      }
    }

    loadSettings()
  }, [getActiveVault, toast])

  const updateSettings = async (newSettings: Partial<Settings>) => {
    try {
      const vault = getActiveVault()
      if (!vault?.handle) return

      const updated = { ...settings, ...newSettings }
      setSettings(updated)

      // Save to .morph/config.json
      const morphDir = await vault.handle.getDirectoryHandle(".morph", { create: true })
      const configFile = await morphDir.getFileHandle("config.json", { create: true })
      const writable = await configFile.createWritable()
      await writable.write(JSON.stringify(updated, null, 2))
      await writable.close()
    } catch (error) {
      console.error("Failed to save settings:", error)
      toast({
        title: "Error Saving Settings",
        description: "Failed to save settings to vault",
        variant: "destructive",
      })
    }
  }

  return {
    settings,
    updateSettings,
    isLoaded,
    defaultSettings,
  }
}
