import { useState, useCallback, useEffect } from "react"
import { useToast } from "./use-toast"
import usePersistedSettings from "./use-persisted-settings"
import { minimatch } from "minimatch"

// https://developer.mozilla.org/en-US/docs/Web/API/Window/showSaveFilePicker
type StartIn =
  | FileSystemHandle
  | "desktop"
  | "documents"
  | "downloads"
  | "music"
  | "pictures"
  | "videos"
interface SaveFilePickerOptions {
  excludeAcceptAllOptions?: boolean
  id?: string
  startIn?: StartIn
  suggestedName?: string
  types?: Array<{
    description?: string
    accept?: Record<string, string[]>
  }>
}

// https://developer.mozilla.org/en-US/docs/Web/API/Window/showDirectoryPicker
interface DirectoryPickerOptions {
  id?: string
  mode?: "read" | "readwrite"
  startIn?: StartIn
}

// NOTE: This are currently considered experimental API from Chrome
declare global {
  interface Window {
    showDirectoryPicker(options?: DirectoryPickerOptions): Promise<FileSystemDirectoryHandle>
    showSaveFilePicker(options?: SaveFilePickerOptions): Promise<FileSystemFileHandle>
  }
  interface FileSystemDirectoryHandle extends FileSystemHandle {
    id?: string
    getFile(): Promise<File>
    queryPermission(options: { mode: string }): Promise<Readonly<PermissionState>>
    requestPermission(options: { mode: string }): Promise<Readonly<PermissionState>>
    values(): AsyncIterableIterator<FileSystemHandle>
  }
}

export interface FileSystemTreeNode {
  name: string
  kind: "file" | "directory"
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

const VAULT_IDS_KEY = "morph:vault-ids"
const DB_NAME = "morph-vaults"
const STORE_NAME = "vaults"
const CHUNK_SIZE = 5
const PROCESS_DELAY = 1
const ACCEPT_PATTERNS = ["*.md", "*.mdx", "*.bib"]

async function getDB() {
  return new Promise<IDBDatabase>((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1)

    request.onupgradeneeded = () => {
      const db = request.result
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, { keyPath: "id" })
        // TODO: There are chances to collapse here
        store.createIndex("name", "name", { unique: false })
      }
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

async function getAllVaultsFromDB(): Promise<Vault[]> {
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

export default function useVaults() {
  const [vaults, setVaults] = useState<Vault[]>([])
  const { toast } = useToast()
  const { defaultSettings } = usePersistedSettings()

  async function hydrateTree(vault: Vault): Promise<FileSystemTreeNode> {
    if (!vault.tree) throw new Error("No tree data available")

    // Reattach handles from the vault's root directory
    const rootHandle = vault.handle!
    return processDirectory(rootHandle, vault.config.ignorePatterns, {
      ...vault.tree,
      handle: rootHandle,
    })
  }

  // Load vault IDs from localStorage and hydrate from IndexedDB
  useEffect(() => {
    const loadVaults = async () => {
      try {
        const vaultIds = JSON.parse(localStorage.getItem(VAULT_IDS_KEY) || "[]")
        const loadedVaults = await Promise.all(
          vaultIds.map(async (id: string) => {
            const vault = await getVaultFromDB(id)
            if (vault && vault.handle) {
              await verifyHandle(vault.handle)
              return { ...vault, tree: await hydrateTree(vault) }
            }
            return null
          }),
        )
        setVaults(loadedVaults.filter(Boolean) as Vault[])
      } catch (error) {
        console.error("Error loading vaults:", error)
        toast({ title: "Error Loading Vaults", variant: "destructive" })
      }
    }
    loadVaults()
  }, [toast])

  const addVault = useCallback(
    async (handle: FileSystemDirectoryHandle) => {
      try {
        const existing = vaults.find((v) => v.name === handle.name)
        if (existing) return existing

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

        toast({ title: "Vault Added", description: `Added ${newVault.name}` })
        return newVault
      } catch (error) {
        console.error("Error adding vault:", error)
        toast({ title: "Error Adding Vault", variant: "destructive" })
        return null
      }
    },
    [vaults, toast, defaultSettings],
  )

  const processDirectory = async (
    handle: FileSystemDirectoryHandle,
    ignorePatterns: string[],
    parentNode?: FileSystemTreeNode,
  ): Promise<FileSystemTreeNode> => {
    const currentNode = parentNode || {
      name: handle.name,
      kind: "directory",
      handle,
      children: [],
      isOpen: false,
    }

    // If rehydrating an existing tree, clear children to avoid duplicates
    if (parentNode) currentNode.children = []

    let processedCount = 0

    for await (const entry of handle.values()) {
      const shouldIgnore = ignorePatterns.some((p) => minimatch(entry.name, p))
      const allowPatterns =
        entry.kind === "directory" || ACCEPT_PATTERNS.some((p) => minimatch(entry.name, p))

      if (shouldIgnore || !allowPatterns) continue

      if (entry.kind === "file") {
        currentNode.children?.push({
          name: entry.name.replace(/\.[^/.]+$/, ""),
          kind: "file",
          handle: entry as FileSystemFileHandle,
        })
      } else if (entry.kind === "directory") {
        const dirNode: FileSystemTreeNode = {
          name: entry.name,
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
  }

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
    [vaults],
  )

  return {
    vaults,
    addVault,
    processDirectory,
    getAllVaults: useCallback(async () => {
      try {
        return await getAllVaultsFromDB()
      } catch (error) {
        console.error("Error fetching all vaults:", error)
        toast({ title: "Error Loading Vaults", variant: "destructive" })
        return []
      }
    }, [toast]),
    refreshVault,
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
