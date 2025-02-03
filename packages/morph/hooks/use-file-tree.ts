import { useState, useCallback } from "react"
import { minimatch } from "minimatch"

// For some reason typescript doesn't recognize this??
declare global {
  interface Window {
    showDirectoryPicker(options?: any): Promise<FileSystemDirectoryHandle>
  }
  interface FileSystemDirectoryHandle extends FileSystemHandle {
    values(): AsyncIterableIterator<FileSystemHandle>
  }
}

interface FileSystemTreeNode {
  name: string
  kind: "file" | "directory"
  handle: FileSystemHandle
  children?: FileSystemTreeNode[]
  isLoading?: boolean
}

interface UseFileTreeOptions {
  ignorePattern?: string | string[]
  onFileSelect?: (content: string) => void
}

// Much smaller chunk size for better responsiveness
const CHUNK_SIZE = 5
const PROCESS_DELAY = 1

// Markdown file patterns
const MARKDOWN_PATTERNS = ["*.md", "*.mdx"]

export default function useFileTree({ ignorePattern, onFileSelect }: UseFileTreeOptions = {}) {
  const [root, setRoot] = useState<FileSystemTreeNode | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const openDirectory = useCallback(async () => {
    try {
      setIsLoading(true)
      setRoot(null)

      const dirHandle = await window.showDirectoryPicker({ startIn: "documents" })
      const rootNode: FileSystemTreeNode = {
        name: dirHandle.name,
        kind: "directory",
        handle: dirHandle,
        children: [],
        isLoading: true,
      }
      setRoot(rootNode)

      // Only process the root level initially
      await processDirectoryLevel(dirHandle, ignorePattern, rootNode)
    } catch (error) {
      console.error("Error opening directory:", error)
      setRoot(null)
    } finally {
      setIsLoading(false)
    }
  }, [ignorePattern])

  // Process a single directory level
  const processDirectoryLevel = async (
    handle: FileSystemDirectoryHandle,
    ignorePattern?: string | string[],
    node?: FileSystemTreeNode,
  ) => {
    const currentNode = node || {
      name: handle.name,
      kind: "directory",
      handle: handle,
      children: [],
      isLoading: true,
    }

    const ignorePatterns = Array.isArray(ignorePattern)
      ? ignorePattern
      : [ignorePattern].filter(Boolean)

    try {
      const entries: FileSystemHandle[] = []
      const iterator = handle.values()
      let result = await iterator.next()

      while (!result.done) {
        const entry = result.value
        const shouldIgnore = ignorePatterns.some(
          (pattern) => pattern && minimatch(entry.name, pattern),
        )
        const isMarkdown =
          entry.kind === "directory" ||
          MARKDOWN_PATTERNS.some((pattern) => minimatch(entry.name, pattern))

        if (!shouldIgnore && isMarkdown) {
          entries.push(entry)
        }

        // Process in very small batches
        if (entries.length === CHUNK_SIZE) {
          await processEntryBatch(entries, currentNode, ignorePattern)
          entries.length = 0 // Clear the array
          await new Promise((resolve) => setTimeout(resolve, PROCESS_DELAY))
        }

        result = await iterator.next()
      }

      // Process remaining entries
      if (entries.length > 0) {
        await processEntryBatch(entries, currentNode, ignorePattern)
      }

      currentNode.isLoading = false
      updateNode(currentNode)
    } catch (error) {
      console.error("Error processing directory:", error)
      currentNode.isLoading = false
      updateNode(currentNode)
    }
  }

  // Process a batch of entries
  const processEntryBatch = async (
    entries: FileSystemHandle[],
    parentNode: FileSystemTreeNode,
    ignorePattern?: string | string[],
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
          isLoading: true,
        }
        parentNode.children?.push(dirNode)

        // Schedule directory processing for later
        queueMicrotask(() => {
          processDirectoryLevel(entry as FileSystemDirectoryHandle, ignorePattern, dirNode)
        })
      }
    }

    // Sort after each batch
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

  const handleFileSelect = useCallback(async (node: FileSystemTreeNode) => {
    if (node.kind === "file" && node.handle instanceof FileSystemFileHandle) {
      try {
        const file = await node.handle.getFile()
        const content = await file.text()
        onFileSelect?.(content)
      } catch (error) {
        console.error("Error reading file:", error)
      }
    }
  }, [onFileSelect])

  return { root, openDirectory, isLoading, handleFileSelect }
}
