"use client"

import { createContext, useContext, useState } from "react"
import useVaults, { Vault } from "@/hooks/use-vaults"

type VaultContextType = {
  activeVaultId: string | null
  setActiveVaultId: (id: string | null) => void
  getActiveVault: () => Vault | undefined
}

const VaultContext = createContext<VaultContextType>({
  activeVaultId: null,
  setActiveVaultId: () => {},
  getActiveVault: () => undefined,
})

export function VaultProvider({ children }: { children: React.ReactNode }) {
  const [activeVaultId, setActiveVaultId] = useState<string | null>(null)
  const { vaults } = useVaults()

  const getActiveVault = () => {
    return activeVaultId ? vaults.get(activeVaultId) : undefined
  }

  return (
    <VaultContext.Provider value={{ activeVaultId, setActiveVaultId, getActiveVault }}>
      {children}
    </VaultContext.Provider>
  )
}

export const useVaultContext = () => useContext(VaultContext)
