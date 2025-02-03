import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
interface Settings {
  vimMode: boolean
  theme: "light" | "dark" | "system"
}

const defaultSettings: Settings = {
  vimMode: false,
  theme: "system",
}

export default function usePersistedSettings() {
  const [settings, setSettings] = useState<Settings>(defaultSettings)
  const [isLoaded, setIsLoaded] = useState(false)
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    // Load settings from localStorage on mount
    const savedSettings = localStorage.getItem("morph-settings")
    if (savedSettings) {
      try {
        const parsedSettings = JSON.parse(savedSettings)
        setSettings(parsedSettings)
        // setting theme here
        if (parsedSettings.theme) {
          setTheme(parsedSettings.theme);
        }
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
      // setting theme here
      if (newSettings.theme) {
        setTheme(newSettings.theme);
      }
      return updated
    })
  }

  return {
    settings,
    updateSettings,
    isLoaded,
  }
}
