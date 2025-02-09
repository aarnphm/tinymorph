"use client"

import { createContext, useContext, useState, useEffect, useCallback } from "react"
import useVaults, { Vault } from "@/hooks/use-vaults"

type VaultContextType = {
  activeVaultId: string | null
  setActiveVaultId: (id: string | null) => void
  getActiveVault: () => Vault | undefined
  isLoading: boolean
}

const VaultContext = createContext<VaultContextType>({
  activeVaultId: null,
  setActiveVaultId: () => {},
  getActiveVault: () => undefined,
  isLoading: true,
})

export function VaultProvider({ children }: { children: React.ReactNode }) {
  const [activeVaultId, setActiveVaultId] = useState<string | null>(null)
  const { vaults } = useVaults()
  const [isLoading, setIsLoading] = useState(true)

  const getActiveVault = useCallback(() => {
    return activeVaultId ? vaults.find((v) => v.id === activeVaultId) : undefined
  }, [activeVaultId, vaults])

  // Handle initial vault hydration
  useEffect(() => {
    if (vaults.length > 0) {
      const lastActiveId = localStorage.getItem("morph:active-vault")
      if (lastActiveId && vaults.some((v) => v.id === lastActiveId)) {
        setActiveVaultId(lastActiveId)
      }
      setIsLoading(false)
    } else {
      const timer = setTimeout(() => setIsLoading(false), 1000)
      return () => clearTimeout(timer)
    }
  }, [vaults])

  // Persist active vault changes
  useEffect(() => {
    if (activeVaultId) localStorage.setItem("morph:active-vault", activeVaultId)
  }, [activeVaultId])

  return (
    <VaultContext.Provider value={{ activeVaultId, setActiveVaultId, getActiveVault, isLoading }}>
      {children}
    </VaultContext.Provider>
  )
}

export const useVaultContext = () => useContext(VaultContext)
