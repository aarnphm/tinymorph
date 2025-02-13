import Dexie, { type Table } from "dexie"
import { createId } from "@paralleldrive/cuid2"

// Define interfaces
export interface Vault {
  id: string
  name: string
  lastOpened: Date
  tree: FileSystemTreeNode
  config: VaultConfig
}

export interface VaultConfig {
  ignorePatterns: string[]
  theme?: "light" | "dark" | "system"
}

export interface FileSystemTreeNode {
  name: string
  extension: string
  kind: "file" | "directory"
  id: string
  handle: FileSystemFileHandle | FileSystemDirectoryHandle
  children?: FileSystemTreeNode[]
  isOpen?: boolean
  path: string
}

export interface Reference {
  id: string
  vaultId: string
  handle: FileSystemFileHandle
  format: "biblatex" | "csl-json"
  path: string
  lastModified: Date
}

export interface Note {
  id: string
  content: string
  color: string
  fileId: string
  vaultId: string
  isInEditor: boolean
  createdAt: Date
  lastModified: Date
}

export class MorphDB extends Dexie {
  vaults!: Table<Vault, string>
  references!: Table<Reference, string>
  notes!: Table<Note, string>

  constructor() {
    super("morph")

    this.version(1).stores({
      vaults: "&id, name, lastOpened",
      references: "id, vaultId",
      notes: "id, fileId, vaultId",
    })
  }

  async addVaultWithReference(vault: Omit<Vault, "id">): Promise<string> {
    return this.transaction("rw", this.vaults, this.references, async () => {
      const id = createId()
      await this.vaults.add({ ...vault, id })

      // Create associated empty reference
      await this.references.add({
        id: createId(),
        vaultId: id,
        handle: null as any, // Will be updated later
        format: "biblatex",
        path: "",
        lastModified: new Date(),
      })

      return id
    })
  }
}

export const db = new MorphDB()
