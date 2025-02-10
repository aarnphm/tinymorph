"use client"

import { useEffect } from "react"
import Editor from "@/components/editor"
import { useVaultContext } from "@/context/vault-context"
import { useRouter, useParams } from "next/navigation"
import mermaid from "mermaid"
import type { CustomEventMap } from "@/additional"

export default function VaultPage() {
  const router = useRouter()
  const params = useParams()
  const vaultId = params.vault as string
  const { activeVaultId, setActiveVaultId, getActiveVault, isLoading } = useVaultContext()

  useEffect(() => {
    const handleContentChange = async (event: CustomEventMap["mermaid-content"]) => {
      if (event.detail) {
        const cssVars = [
          "--color-red-400",
          "--color-orange-400",
          "--color-gray-400",
          "--color-slate-50",
          "--color-gray-200",
          "--color-accent",
          "--color-background",
          "--color-gray-700",
          "--font-mono",
        ]

        const cssVariables = cssVars.reduce(
          (acc, key) => {
            acc[key] = getComputedStyle(document.documentElement).getPropertyValue(key)
            return acc
          },
          {} as Record<string, string>,
        )
        const darkMode = document.documentElement.classList.contains("dark")

        mermaid.initialize({
          startOnLoad: false,
          securityLevel: "loose",
          theme: darkMode ? "dark" : "base",
          themeVariables: {
            fontFamily: cssVariables["--font-mono"],
            primaryColor: cssVariables["--color-slate-50"],
            primaryTextColor: cssVariables["--color-gray-700"],
            primaryBorderColor: cssVariables["--color-orange-400"],
            lineColor: cssVariables["--color-gray-700"],
            secondaryColor: cssVariables["--color-red-400"],
            tertiaryColor: cssVariables["--color-orange-400"],
            clusterBkg: cssVariables["--color-slate-50"],
            edgeLabelBackground: cssVariables["--color-accent"],
          },
        })
        window.mermaid = mermaid

        const nodes = document.querySelectorAll<HTMLDivElement>("pre > code.mermaid")
        await mermaid.run({ nodes })
      }
    }

    window.addEventListener("mermaid-content", handleContentChange)
    return () => window.removeEventListener("mermaid-content", handleContentChange)
  }, [])

  useEffect(() => {
    const activeVault = getActiveVault()

    if (!isLoading) {
      if (vaultId && (!activeVault || activeVault.id !== vaultId)) {
        // Only set if the vault ID has changed
        setActiveVaultId(vaultId)
      } else if (!vaultId && activeVaultId) {
        // Redirect if no vault ID in URL but we have an active vault
        router.push(`/${activeVaultId}`)
      } else if (!activeVault) {
        // Redirect home if no valid vault
        router.push("/")
      }
    }
  }, [params.vault, activeVaultId, isLoading, getActiveVault, setActiveVaultId, router, vaultId])

  return (
    <main className="min-h-screen bg-background">
      <Editor vaultId={vaultId} />
    </main>
  )
}
