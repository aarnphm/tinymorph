"use client"

import { createContext, useContext, useState, useEffect } from "react"
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
  const [isHydrating, setIsHydrating] = useState(true)

  const getActiveVault = () => {
    return activeVaultId ? vaults.find((v) => v.id === activeVaultId) : undefined
  }

  // Handle initial vault hydration
  useEffect(() => {
    if (vaults.length > 0) {
      setIsHydrating(false)
      const lastActiveId = localStorage.getItem("morph:active-vault")
      if (lastActiveId && vaults.some((v) => v.id === lastActiveId)) {
        setActiveVaultId(lastActiveId)
      }
    }
  }, [vaults])

  // Persist active vault changes
  useEffect(() => {
    if (activeVaultId) {
      localStorage.setItem("morph:active-vault", activeVaultId)
    }
    setIsHydrating(false)
  }, [activeVaultId])

  return (
    <VaultContext.Provider
      value={{
        activeVaultId,
        setActiveVaultId,
        getActiveVault,
        isLoading: isHydrating,
      }}
    >
      {children}
    </VaultContext.Provider>
  )
}

export const useVaultContext = () => useContext(VaultContext)
