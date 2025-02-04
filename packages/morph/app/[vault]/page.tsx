"use client"

import { useEffect } from "react"
import Editor from "@/components/editor"
import { useVaultContext } from "@/context/vault-context"
import { useRouter } from "next/navigation"

export const runtime = "edge"

export default function VaultPage() {
  const router = useRouter()
  const { activeVaultId, setActiveVaultId } = useVaultContext()

  useEffect(() => {
    if (activeVaultId) {
      setActiveVaultId(activeVaultId)
    } else {
      router.push("/")
    }
  }, [router, activeVaultId, setActiveVaultId])

  return (
    <main className="min-h-screen bg-background">
      <Editor vaultId={activeVaultId!} />
    </main>
  )
}
