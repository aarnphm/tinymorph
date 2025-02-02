import { useState, useEffect } from "react"

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

  useEffect(() => {
    if (!isLoaded) return

    const root = document.documentElement
    root.classList.remove("light", "dark")

    if (settings.theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
      root.classList.add(systemTheme)
    } else {
      root.classList.add(settings.theme)
    }

    console.log("Applied theme:", root.className)
  }, [settings.theme, isLoaded])

  const updateSettings = (newSettings: Partial<Settings>) => {
    setSettings((prev) => {
      const updated = { ...prev, ...newSettings }
      console.log(updated)
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
