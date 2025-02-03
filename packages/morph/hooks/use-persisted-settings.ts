import { useState, useEffect } from "react"

interface Settings {
  vimMode: boolean
  tabSize: number
  ignorePatterns: string[]
  editModeShortcut: string
}

const defaultSettings: Settings = {
  vimMode: false,
  tabSize: 2,
  ignorePatterns: ['**/.*', '**/node_modules/**', '.vercel/**', '**/dist/**', '__pycache__/**', '*.log', '.DS_Store'],
  editModeShortcut: "e"
}

export default function usePersistedSettings() {
  const [settings, setSettings] = useState<Settings>(defaultSettings)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Load settings from localStorage on mount
    const savedSettings = localStorage.getItem("morph-settings")
    if (savedSettings) {
      try {
        const parsedSettings = {...defaultSettings, ...JSON.parse(savedSettings)}
        setSettings(parsedSettings)
      } catch (error) {
        console.error("Failed to parse settings:", error)
      }
    }
    setIsLoaded(true)
  }, [])

  const updateSettings = (newSettings: Partial<Settings>) => {
    setSettings((prev) => {
      const updated = { ...prev, ...newSettings }
      // Save to localStorage
      localStorage.setItem("morph-settings", JSON.stringify(updated))
      return updated
    })
  }

  return {
    settings,
    updateSettings,
    isLoaded,
    defaultSettings
  }
}
