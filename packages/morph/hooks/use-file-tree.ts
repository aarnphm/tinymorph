import { useState, useCallback } from "react"
import { minimatch } from "minimatch"

// For some reason typescript doesn't recognize this??
declare global {
  interface Window {
    showDirectoryPicker(options?: any): Promise<FileSystemDirectoryHandle>
  }
  interface FileSystemDirectoryHandle extends FileSystemHandle {
    id?: string
    values(): AsyncIterableIterator<FileSystemHandle>
  }
}

export interface FileSystemTreeNode {
  name: string
  kind: "file" | "directory"
  handle: FileSystemHandle
  children?: FileSystemTreeNode[]
  isOpen?: boolean
}

export type FileSystemTreeNodeSerializable = {
  name: string
  kind: "directory" | "file"
  isOpen?: boolean
  children?: FileSystemTreeNodeSerializable[]
}

export interface UseFileTreeOptions {
  ignorePatterns?: string[]
  onFileSelect?: (filename: string, content: string) => void
}

const CHUNK_SIZE = 5
const PROCESS_DELAY = 1
const MARKDOWN_PATTERNS = ["*.md", "*.mdx"]

export default function useFileTree({ ignorePatterns, onFileSelect }: UseFileTreeOptions = {}) {
  // NOTE(@aarnphm): We might need to set root as a context variables, given that
  // for vault we are passing this and mutate this in useVault
  const [root, setRoot] = useState<FileSystemTreeNode | null>(null)

  // Open a directory and process the files
  const openDirectory = useCallback(async () => {
    try {
      setRoot(null)
      const handle = await window.showDirectoryPicker()
      const rootNode: FileSystemTreeNode = {
        name: handle.name,
        kind: "directory",
        handle,
        children: [],
      }
      setRoot(rootNode)

      // Only process the root level initially
      await processDirectoryLevel(handle, ignorePatterns, rootNode)
    } catch (error) {
      console.error("Error opening directory:", error)
      setRoot(null)
    }
  }, [ignorePatterns])

  const processDirectoryLevel = async (
    handle: FileSystemDirectoryHandle,
    ignorePatterns?: string[],
    node?: FileSystemTreeNode,
  ) => {
    const currentNode = node || {
      name: handle.name,
      kind: "directory",
      handle: handle,
      children: [],
    }

    try {
      const entries: FileSystemHandle[] = []
      const iterator = handle.values()
      let result = await iterator.next()

      while (!result.done) {
        const entry = result.value
        const shouldIgnore = ignorePatterns?.some(
          (pattern) => pattern && minimatch(entry.name, pattern),
        )
        const isMarkdown =
          entry.kind === "directory" ||
          MARKDOWN_PATTERNS.some((pattern) => minimatch(entry.name, pattern))

        if (!shouldIgnore && isMarkdown) entries.push(entry)

        // Process in very small batches
        if (entries.length === CHUNK_SIZE) {
          await processEntryBatch(entries, currentNode, ignorePatterns)
          entries.length = 0 // Clear the array
          await new Promise((resolve) => setTimeout(resolve, PROCESS_DELAY))
        }

        result = await iterator.next()
      }

      // Process remaining entries
      if (entries.length > 0) {
        await processEntryBatch(entries, currentNode, ignorePatterns)
      }

      updateNode(currentNode)
    } catch (error) {
      console.error("Error processing directory:", error)
      updateNode(currentNode)
    }
  }

  const processEntryBatch = async (
    entries: FileSystemHandle[],
    parentNode: FileSystemTreeNode,
    ignorePatterns?: string[],
  ) => {
    for (const entry of entries) {
      if (entry.kind === "file") {
        parentNode.children?.push({
          name: entry.name.replace(/\.[^/.]+$/, ""),
          kind: "file",
          handle: entry,
        })
      } else if (entry.kind === "directory") {
        const dirNode: FileSystemTreeNode = {
          name: entry.name,
          kind: "directory",
          handle: entry,
          children: [],
        }
        parentNode.children?.push(dirNode)

        // Schedule directory processing for later
        queueMicrotask(() => {
          processDirectoryLevel(entry as FileSystemDirectoryHandle, ignorePatterns, dirNode)
        })
      }
    }

    parentNode.children?.sort((a, b) => {
      if (a.kind === b.kind) return a.name.localeCompare(b.name)
      return a.kind === "directory" ? -1 : 1
    })

    updateNode(parentNode)
  }

  // Helper to update a node in the tree
  const updateNode = (node: FileSystemTreeNode) => {
    setRoot((current) => {
      if (!current) return node
      return { ...current }
    })
  }

  const handleFileSelect = useCallback(
    async (node: FileSystemTreeNode) => {
      if (node.kind === "file" && node.handle instanceof FileSystemFileHandle) {
        try {
          const file = await node.handle.getFile()
          const content = await file.text()
          onFileSelect?.(file.name, content)
        } catch (error) {
          console.error("Error reading file:", error)
        }
      }
    },
    [onFileSelect],
  )

  // Add new function to create a new file
  // TODO: Implement this. Should be easy?
  const createNewFile = useCallback(async () => {
    if (!root) return
    console.log("Create new file")
  }, [root])

  return {
    root,
    openDirectory,
    processDirectoryLevel,
    handleFileSelect,
    createNewFile,
  }
}

// Update the serialization format to include full names
export const serializeNode = (node: FileSystemTreeNode): FileSystemTreeNodeSerializable => ({
  name: node.name,
  kind: node.kind,
  isOpen: node.isOpen,
  children: node.children?.map(serializeNode),
})
