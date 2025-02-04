"use client"

import { useEffect } from "react"
import Editor from "@/components/editor"
import { useVaultContext } from "@/context/vault-context"

export default function VaultPage() {
  const { activeVaultId, setActiveVaultId, getActiveVault } = useVaultContext()
  const vault = getActiveVault()

  useEffect(() => {
    if (activeVaultId) setActiveVaultId(activeVaultId)
  }, [activeVaultId, setActiveVaultId])

  return (
    <main className="min-h-screen bg-background">
      <Editor vaultId={activeVaultId!} />
    </main>
  )
}
