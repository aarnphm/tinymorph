import { useState, useEffect } from "react"

interface Settings {
  vimMode: boolean
  theme: "light" | "dark" | "system"
  tabSize: number
}

const defaultSettings: Settings = {
  vimMode: false,
  theme: "system",
  tabSize: 2,
}

export default function usePersistedSettings() {
  const [settings, setSettings] = useState<Settings>(defaultSettings)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Load settings from localStorage on mount
    const savedSettings = localStorage.getItem("morph-settings")
    if (savedSettings) {
      try {
        const parsedSettings = JSON.parse(savedSettings)
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
  }
}
