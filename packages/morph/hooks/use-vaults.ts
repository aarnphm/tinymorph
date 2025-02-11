import { useState, useCallback } from "react"
import { useToast } from "@/hooks/use-toast"
import usePersistedSettings from "@/hooks/use-persisted-settings"
import { minimatch } from "minimatch"

export interface FileSystemTreeNode {
  name: string
  extension: string
  kind: "file" | "directory"
  id: string
  handle: FileSystemFileHandle | FileSystemDirectoryHandle
  children?: FileSystemTreeNode[]
  isOpen?: boolean
}

export interface Vault {
  id: string
  name: string
  lastOpened: Date
  handle: FileSystemDirectoryHandle | null
  tree: FileSystemTreeNode | null
  config: VaultConfig
}

export interface VaultConfig {
  ignorePatterns: string[]
  theme?: "light" | "dark" | "system"
}

export interface ReferenceItem {
  id: string
  vaultId: string
  handle: FileSystemFileHandle
  format: "biblatex" | "csl-json"
  path: string
  lastModified: Date
}

const VAULT_IDS_KEY = "morph:vault-ids"
const DB_NAME = "morph"
const DB_VERSION = 1
const STORE_NAME = "vaults"
const REFERENCES_STORE = "references"
const CHUNK_SIZE = 5
const PROCESS_DELAY = 1

async function getDB() {
  return new Promise<IDBDatabase>((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION)

    request.onupgradeneeded = () => {
      const db = request.result

      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, { keyPath: "id" })
        store.createIndex("name", "name", { unique: false })
      }

      // Create references store if needed (new in v2)
      const referencesStore = db.createObjectStore(REFERENCES_STORE, { keyPath: "id" })
      referencesStore.createIndex("vaultId", "vaultId", { unique: false })
      referencesStore.createIndex("path", "path", { unique: false })
    }

    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error)
  })
}

async function saveVaultToDB(vault: Vault) {
  const db = await getDB()
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readwrite")
    tx.objectStore(STORE_NAME).put(vault)
    tx.oncomplete = resolve
    tx.onerror = () => reject(tx.error)
  })
}

async function getVaultFromDB(id: string): Promise<Vault | null> {
  const db = await getDB()
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readonly")
    const request = tx.objectStore(STORE_NAME).get(id)
    request.onsuccess = () => resolve(request.result || null)
    request.onerror = () => reject(request.error)
  })
}

export async function getAllVaultsFromDB(): Promise<Vault[]> {
  const db = await getDB()
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readonly")
    const store = tx.objectStore(STORE_NAME)
    const vaults: Vault[] = []

    const cursorRequest = store.openCursor()
    cursorRequest.onsuccess = (event) => {
      const cursor = (event.target as IDBRequest<IDBCursorWithValue>).result
      if (cursor) {
        vaults.push(cursor.value)
        cursor.continue()
      } else {
        resolve(vaults)
      }
    }

    cursorRequest.onerror = () => reject(cursorRequest.error)
  })
}

// Add helper functions for references store
async function saveReferenceItem(item: ReferenceItem) {
  const db = await getDB()
  return new Promise((resolve, reject) => {
    const tx = db.transaction(REFERENCES_STORE, "readwrite")
    tx.objectStore(REFERENCES_STORE).put(item)
    tx.oncomplete = resolve
    tx.onerror = () => reject(tx.error)
  })
}

export async function getReferenceByVaultId(vaultId: string): Promise<ReferenceItem[]> {
  const db = await getDB()
  return new Promise((resolve, reject) => {
    const tx = db.transaction(REFERENCES_STORE, "readonly")
    const store = tx.objectStore(REFERENCES_STORE)
    const index = store.index("vaultId")
    const request = index.getAll(vaultId)
    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error)
  })
}

// TODO: refactor with Reducer and better used with @/context/vault-context
export default function useVaults() {
  const [vaults, setVaults] = useState<Vault[]>([])
  const [references, setReferences] = useState<Map<string, ReferenceItem[]>>(new Map())
  const { toast } = useToast()
  const { defaultSettings } = usePersistedSettings()

  const processDirectory = useCallback(
    async (
      handle: FileSystemDirectoryHandle,
      ignorePatterns: string[],
      parentNode?: FileSystemTreeNode,
    ): Promise<FileSystemTreeNode> => {
      const currentNode = parentNode || {
        name: handle.name,
        extension: "",
        id: crypto.randomUUID().slice(0, 32),
        kind: "directory",
        handle,
        children: [],
        isOpen: false,
      }

      // If rehydrating an existing tree, clear children to avoid duplicates
      // HACK: this is a hack to avoid duplicates, but we are rerendering this twice
      if (parentNode) currentNode.children = []

      let processedCount = 0

      for await (const entry of handle.values()) {
        const shouldIgnore = ignorePatterns.some((p) => minimatch(entry.name, p))

        if (shouldIgnore) continue

        if (entry.kind === "file") {
          const match = entry.name.match(/^(.+?)(\.[^.]*)?$/)
          const baseName = match?.[1] || entry.name
          const extension = match?.[2] || ""

          currentNode.children?.push({
            name: baseName,
            extension: extension.replace(/^\./, ""),
            id: crypto.randomUUID().slice(0, 32),
            kind: "file",
            handle: entry as FileSystemFileHandle,
          })
        } else if (entry.kind === "directory") {
          const dirNode: FileSystemTreeNode = {
            name: entry.name,
            extension: "",
            id: crypto.randomUUID().slice(0, 32),
            kind: "directory",
            handle: entry as FileSystemDirectoryHandle,
            children: [],
            isOpen: false,
          }
          currentNode.children?.push(dirNode)
          await processDirectory(entry as FileSystemDirectoryHandle, ignorePatterns, dirNode)
        }

        // Batch processing with delay
        if (++processedCount % CHUNK_SIZE === 0) {
          await new Promise((resolve) => setTimeout(resolve, PROCESS_DELAY))
        }
      }

      // Sort once after processing all entries
      currentNode.children?.sort((a, b) =>
        a.kind === b.kind ? a.name.localeCompare(b.name) : a.kind === "directory" ? -1 : 1,
      )

      // Filter out directory nodes with empty children
      if (currentNode.children) {
        currentNode.children = currentNode.children.filter(
          (child) => child.kind !== "directory" || (child.children && child.children.length > 0),
        )
      }

      return currentNode
    },
    [],
  )

  // Add function to manage references
  const updateVaultReferences = useCallback(async (vault: Vault) => {
    try {
      const refs = await getReferenceByVaultId(vault.id)
      setReferences((prev) => new Map(prev).set(vault.id, refs))
    } catch (error) {
      console.error("Error loading references for vault:", error)
    }
  }, [])

  const addVault = useCallback(
    async (handle: FileSystemDirectoryHandle) => {
      try {
        const existing = vaults.find((v) => v.name === handle.name)
        if (existing) {
          // Update lastOpened for existing vault
          const updatedVault = { ...existing, lastOpened: new Date() }
          await saveVaultToDB(updatedVault)
          setVaults((prev) => prev.map((v) => (v.id === existing.id ? updatedVault : v)))
          return updatedVault
        }

        const config = await initializeVaultConfig(handle, defaultSettings)
        const tree = await processDirectory(handle, config.ignorePatterns)

        const newVault: Vault = {
          name: handle.name,
          id: crypto.randomUUID().slice(0, 32),
          lastOpened: new Date(),
          handle,
          tree,
          config,
        }

        await saveVaultToDB(newVault)
        setVaults((prev) => [...prev, newVault])
        localStorage.setItem(
          VAULT_IDS_KEY,
          JSON.stringify([...vaults.map((v) => v.id), newVault.id]),
        )
        return newVault
      } catch (error) {
        console.error("Error adding vault:", error)
        toast({ title: "Error Adding Vault", variant: "destructive" })
        return null
      }
    },
    [vaults, toast, defaultSettings, processDirectory],
  )

  const refreshVault = useCallback(
    async (vaultId: string) => {
      const vault = vaults.find((v) => v.id === vaultId)
      if (!vault) return

      try {
        const newTree = await processDirectory(vault.handle!, vault.config.ignorePatterns)
        const updatedVault = { ...vault, tree: newTree }

        await saveVaultToDB(updatedVault)
        setVaults((prev) => prev.map((v) => (v.id === vaultId ? updatedVault : v)))
      } catch (error) {
        console.error("Error refreshing vault:", error)
      }
    },
    [vaults, processDirectory],
  )

  // Add function to add/update reference
  const updateReference = useCallback(
    async (
      vault: Vault,
      handle: FileSystemFileHandle,
      format: "biblatex" | "csl-json",
      path: string,
    ) => {
      try {
        const existingRefs = await getReferenceByVaultId(vault.id)
        if (existingRefs.some((ref) => ref.vaultId === vault.id && ref.format === format)) return

        const referenceItem: ReferenceItem = {
          id: crypto.randomUUID().slice(0, 32),
          vaultId: vault.id,
          handle,
          format,
          path,
          lastModified: new Date(),
        }
        await saveReferenceItem(referenceItem)
        await updateVaultReferences(vault)
      } catch (error) {
        console.error("Error updating reference:", error)
        throw error
      }
    },
    [updateVaultReferences],
  )

  // Update loadVaults to also load references
  // NOTE: We shan't call this function directly, but rather access it via useVaultContext
  const loadVaults = useCallback(async () => {
    async function hydrateTree(vault: Vault): Promise<FileSystemTreeNode> {
      if (!vault.tree) throw new Error("No tree data available")

      // Reattach handles from the vault's root directory
      const rootHandle = vault.handle!
      return processDirectory(rootHandle, vault.config.ignorePatterns, {
        ...vault.tree,
        handle: rootHandle,
      })
    }

    async function loadVaults() {
      try {
        const vaultIds = JSON.parse(localStorage.getItem(VAULT_IDS_KEY) || "[]")
        const loadedVaults = await Promise.all(
          vaultIds.map(async (id: string) => {
            const vault = await getVaultFromDB(id)
            if (vault && vault.handle) {
              await verifyHandle(vault.handle)
              const tree = await hydrateTree(vault)
              await updateVaultReferences(vault)
              return { ...vault, tree }
            }
            return null
          }),
        )
        setVaults(loadedVaults.filter(Boolean) as Vault[])
      } catch {
        toast({
          title: "Error Loading Vaults",
          description: "Failed to load vaults",
          variant: "destructive",
        })
      }
    }
    await loadVaults()
  }, [toast, processDirectory, updateVaultReferences])

  return {
    vaults,
    setVaults,
    references,
    addVault,
    processDirectory,
    refreshVault,
    loadVaults,
    getAllVaults: useCallback(async () => {
      try {
        return await getAllVaultsFromDB()
      } catch (error) {
        console.error("Error fetching all vaults:", error)
        toast({ title: "Error Loading Vaults", variant: "destructive" })
        return []
      }
    }, [toast]),
    updateReference,
    getReferenceByVaultId,
  }
}

// Helper functions
async function initializeVaultConfig(handle: FileSystemDirectoryHandle, defaults: VaultConfig) {
  try {
    const morphDir = await handle.getDirectoryHandle(".morph", { create: true })
    const configFile = await morphDir.getFileHandle("config.json", { create: true })
    const file = await configFile.getFile()
    return JSON.parse(await file.text()) as VaultConfig
  } catch {
    const config: VaultConfig = { ...defaults }
    const morphDir = await handle.getDirectoryHandle(".morph", { create: true })
    const configFile = await morphDir.getFileHandle("config.json", { create: true })
    const writable = await configFile.createWritable()
    await writable.write(JSON.stringify(config, null, 2))
    await writable.close()
    return config
  }
}

async function verifyHandle(handle: FileSystemDirectoryHandle): Promise<boolean> {
  if ((await handle.queryPermission({ mode: "read" })) === "granted") return true
  return (await handle.requestPermission({ mode: "read" })) === "granted"
}
