import { useState, useCallback, useEffect } from "react"
import { useToast } from "./use-toast"
import useFileTree, {
  type FileSystemTreeNode,
  type UseFileTreeOptions,
  type FileSystemTreeNodeSerializable,
} from "./use-file-tree"
import { encodeUriHash } from "@/lib/utils"
import usePersistedSettings from "./use-persisted-settings"

export interface Vault {
  id: string
  name: string
  /**
   * This will be base64 encodeURIComponent
   * */
  path: string
  lastOpened: Date
  handle: FileSystemDirectoryHandle | null
  root: FileSystemTreeNode | null
  config?: VaultConfig
}

export interface VaultConfig {
  ignorePatterns: string[]
  theme?: "light" | "dark" | "system"
  // Add more vault-specific settings as needed
}

const VAULTS_STORAGE_KEY = "morph:vaults"

// IndexedDB storage for directory handles
const DB_NAME = "morph-vaults"
const STORE_NAME = "directory-handles"

async function getDB() {
  return new Promise<IDBDatabase>((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1)

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "id" })
      }
    }

    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error)
  })
}

async function saveHandle(id: string, handle: FileSystemDirectoryHandle) {
  const db = await getDB()
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readwrite")
    tx.objectStore(STORE_NAME).put({ id, handle })
    tx.oncomplete = resolve
    tx.onerror = () => reject(tx.error)
  })
}

async function getHandle(id: string): Promise<FileSystemDirectoryHandle | null> {
  try {
    const db = await getDB()
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, "readonly")
      const request = tx.objectStore(STORE_NAME).get(id)
      request.onsuccess = () => resolve(request.result?.handle || null)
      request.onerror = () => reject(request.error)
    })
  } catch (error) {
    console.error("Error retrieving handle:", error)
    return null
  }
}

export default function useVaults(opts: UseFileTreeOptions = {}) {
  const [vaults, setVaults] = useState<Map<string, Vault>>(new Map())
  const { processDirectoryLevel } = useFileTree(opts)
  const { toast } = useToast()
  const [isLoadingVaults, setIsLoadingVaults] = useState(true)
  const { defaultSettings } = usePersistedSettings()

  // Load vaults from localStorage and restore file system handles
  useEffect(() => {
    const loadVault = async () => {
      setIsLoadingVaults(true)
      const savedVaults = localStorage.getItem(VAULTS_STORAGE_KEY)
      if (!savedVaults) {
        setIsLoadingVaults(false)
        return
      }

      try {
        const parsed: Record<string, Vault> = JSON.parse(savedVaults)
        const entries = await Promise.all(
          Object.entries(parsed).map(async ([id, vault]) => {
            let root: FileSystemTreeNode | null = null
            let handle: FileSystemDirectoryHandle | null = null

            try {
              handle = await getHandle(id)
              if (handle && (await verifyHandle(handle))) {
                const morphDir = await handle.getDirectoryHandle(".morph")
                const treeFile = await morphDir.getFileHandle("tree.json")
                const file = await treeFile.getFile()
                root = JSON.parse(await file.text())
                await processDirectoryLevel(
                  handle,
                  vault.config?.ignorePatterns || defaultSettings.ignorePatterns,
                  root!,
                )
              }
            } catch (error) {
              console.log("Could not restore vault handle or tree:", error)
              // Remove invalid vault from storage
              localStorage.removeItem(VAULTS_STORAGE_KEY)
              return null
            }

            return handle ? ([id, { ...vault, handle, root }] as [string, Vault]) : null
          }),
        )

        // Filter out null entries and update state
        setVaults(new Map(entries.filter(Boolean) as [string, Vault][]))
      } catch (error) {
        console.error("Error loading vaults:", error)
        toast({
          title: "Session Expired",
          description: "Please re-authenticate file system access",
          variant: "destructive",
        })
      } finally {
        setIsLoadingVaults(false)
      }
    }

    loadVault()
  }, [defaultSettings.ignorePatterns, toast])

  // Save vaults to localStorage whenever they change
  // NOTE(@aarnphm): Should we update it everytime?
  // THIS IS PRETTY HACKY
  useEffect(() => {
    if (vaults.size > 0) {
      localStorage.setItem(
        VAULTS_STORAGE_KEY,
        JSON.stringify(
          Object.fromEntries(
            Array.from(vaults.entries()).map(([id, vault]) => [id, { ...vault, root: undefined }]),
          ),
        ),
      )
    }
  }, [vaults])

  const updateVaultTree = useCallback(
    async (id: string, handle: FileSystemDirectoryHandle, root: FileSystemTreeNode | null) => {
      try {
        // Get or create .morph directory
        const morphDir = await handle.getDirectoryHandle(".morph", { create: true })

        // Save file tree structure
        if (root) {
          const treeFile = await morphDir.getFileHandle("tree.json", { create: true })
          const writable = await treeFile.createWritable()

          // Create a serializable version of the tree (without handle references)
          const serializeNode = (node: FileSystemTreeNode): FileSystemTreeNodeSerializable => ({
            name: node.name,
            kind: node.kind,
            isOpen: node.isOpen,
            children: node.children?.map(serializeNode),
          })

          await writable.write(JSON.stringify(serializeNode(root), null, 2))
          await writable.close()
        }

        // Update vault in state
        setVaults((prev) => {
          const next = new Map(prev)
          const vault = next.get(id)
          if (vault) {
            next.set(id, {
              ...vault,
              path: encodeUriHash(handle.name),
              handle,
              root,
              lastOpened: new Date(),
            })
          }
          return next
        })
      } catch (error) {
        console.error("Error updating vault tree:", error)
      }
    },
    [],
  )

  const addVault = useCallback(
    async (handle: FileSystemDirectoryHandle) => {
      try {
        // Check if vault already exists
        const existingVault = Array.from(vaults.values()).find(
          (v) => v.path === encodeUriHash(handle.name),
        )

        if (existingVault) {
          return existingVault
        }

        // Create .morph directory if it doesn't exist
        const morphDir = await handle.getDirectoryHandle(".morph", { create: true })

        // Try to load existing config or create new one
        let config: VaultConfig = defaultSettings
        try {
          const configFile = await morphDir.getFileHandle("config.json")
          const file = await configFile.getFile()
          config = JSON.parse(await file.text())
        } catch {
          // Create default config file
          const configFile = await morphDir.getFileHandle("config.json", { create: true })
          const writable = await configFile.createWritable()
          await writable.write(JSON.stringify(config, null, 2))
          await writable.close()
        }

        // Initialize root node and process directory
        const root = {
          name: handle.name,
          kind: "directory" as const,
          handle,
          children: [],
        }
        await processDirectoryLevel(handle, config.ignorePatterns, root)

        const vault: Vault = {
          id: crypto.randomUUID().slice(0, 32),
          name: handle.name,
          path: encodeUriHash(handle.name),
          lastOpened: new Date(),
          handle,
          root,
          config,
        }
        handle.id = vault.id
        updateVaultTree(vault.id, handle, vault.root)

        setVaults((prev) => {
          const next = new Map(prev)
          next.set(vault.id, vault)
          return next
        })

        toast({
          title: "Vault Added",
          description: `Successfully added vault: ${vault.name}`,
        })

        // Persist the directory handle
        await saveHandle(vault.id, handle)

        return vault
      } catch (error) {
        console.error("Error adding vault:", error)
        toast({
          title: "Error",
          description: "Failed to add vault. Please try again.",
          variant: "destructive",
        })
        return null
      }
    },
    [vaults, toast, processDirectoryLevel, defaultSettings, updateVaultTree],
  )

  const removeVault = useCallback((id: string) => {
    setVaults((prev) => {
      const next = new Map(prev)
      next.delete(id)
      return next
    })
  }, [])

  const updateVaultConfig = useCallback(
    async (id: string, config: Partial<VaultConfig>) => {
      const vault = vaults.get(id)
      if (!vault) return

      try {
        const handle = vault.handle || (await window.showDirectoryPicker({ id: vault.id }))
        const morphDir = await handle.getDirectoryHandle(".morph", { create: true })
        const configFile = await morphDir.getFileHandle("config.json", { create: true })

        const newConfig = { ...vault.config, ...config } as VaultConfig
        const writable = await configFile.createWritable()
        await writable.write(JSON.stringify(newConfig, null, 2))
        await writable.close()

        setVaults((prev) => {
          const next = new Map(prev)
          next.set(id, {
            ...vault,
            config: newConfig,
            handle,
            path: encodeUriHash(handle.name),
          })
          return next
        })

        toast({
          title: "Config Updated",
          description: "Vault configuration has been updated successfully.",
        })
      } catch (error) {
        console.error("Error updating vault config:", error)
        toast({
          title: "Error",
          description: "Failed to update vault configuration.",
          variant: "destructive",
        })
      }
    },
    [vaults, toast],
  )

  return {
    vaults,
    addVault,
    removeVault,
    updateVaultConfig,
    updateVaultTree,
    isLoadingVaults,
  }
}

// Update the verifyHandle function to properly check permissions
async function verifyHandle(handle: FileSystemDirectoryHandle): Promise<boolean> {
  try {
    // Check if we already have permission
    if ((await handle.queryPermission({ mode: "read" })) === "granted") {
      return true
    }

    console.log(handle)
    // Request permission if needed
    const permission = await handle.requestPermission({ mode: "read" })
    return permission === "granted"
  } catch (error) {
    console.error("Permission verification failed:", error)
    return false
  }
}
