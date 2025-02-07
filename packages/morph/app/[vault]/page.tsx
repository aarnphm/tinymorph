"use client"

import { useEffect } from "react"
import Editor from "@/components/editor"
import { useVaultContext } from "@/context/vault-context"
import { useRouter, useParams } from "next/navigation"

export default function VaultPage() {
  const router = useRouter()
  const params = useParams()
  const vaultId = params.vault as string
  const { activeVaultId, setActiveVaultId, getActiveVault, isLoading } = useVaultContext()

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
