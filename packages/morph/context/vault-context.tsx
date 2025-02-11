"use client"

import { createContext, useContext, useState, useEffect, useCallback } from "react"
import useVaults, { type Vault } from "@/hooks/use-vaults"

type VaultContextType = {
  activeVaultId: string | null
  vaults: Vault[]
  setActiveVaultId: (id: string | null) => void
  getActiveVault: () => Vault | undefined
  refreshVault: (vaultId: string) => Promise<void>
  addVault: (handle: FileSystemDirectoryHandle) => Promise<Vault | null>
  updateReference: (
    vault: Vault,
    handle: FileSystemFileHandle,
    format: "biblatex" | "csl-json",
    path: string,
  ) => Promise<void>
  isLoading: boolean
}

const VaultContext = createContext<VaultContextType>({
  activeVaultId: null,
  vaults: [],
  setActiveVaultId: () => {},
  getActiveVault: () => undefined,
  refreshVault: async () => {},
  addVault: async () => null,
  updateReference: async () => {},
  isLoading: true,
})

// TODO: refactor using Reducer and Context
export function VaultProvider({ children }: { children: React.ReactNode }) {
  const [activeVaultId, setActiveVaultId] = useState<string | null>(null)
  const { vaults, refreshVault, addVault, updateReference, loadVaults } = useVaults()
  const [isLoading, setIsLoading] = useState(true)

  const getActiveVault = useCallback(() => {
    return activeVaultId ? vaults.find((v) => v.id === activeVaultId) : undefined
  }, [activeVaultId, vaults])

  // Handle initial vault hydration and persist active vault changes
  useEffect(() => {
    loadVaults()
      .then(() => {
        const lastActiveId = localStorage.getItem("morph:active-vault")
        if (lastActiveId && vaults.some((v) => v.id === lastActiveId)) {
          setActiveVaultId(lastActiveId)
          localStorage.setItem("morph:active-vault", lastActiveId)
        }
        setIsLoading(false)
        return
      })
      .catch(() => {
        const timer = setTimeout(() => setIsLoading(false), 1000)
        return () => clearTimeout(timer)
      })
  }, [vaults, activeVaultId, loadVaults])

  return (
    <VaultContext.Provider
      value={{
        vaults,
        activeVaultId,
        updateReference,
        setActiveVaultId,
        getActiveVault,
        refreshVault,
        addVault,
        isLoading,
      }}
    >
      {children}
    </VaultContext.Provider>
  )
}

export const useVaultContext = () => useContext(VaultContext)
