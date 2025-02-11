import {
  CommandDialog,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import { type UserDocument, useSearch } from "@/context/search-context"
import { useEffect, useState, useCallback, useMemo } from "react"
import type { Vault, FileSystemTreeNode } from "@/hooks/use-vaults"
import { type FlattenedFileMapping } from "@/context/vault-context"

type SearchCommandProps = {
  maps: FlattenedFileMapping
  vault: Vault
  onFileSelect: (node: FileSystemTreeNode) => void
}

export function SearchCommand({ maps, vault, onFileSelect }: SearchCommandProps) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [debouncedQuery, setDebouncedQuery] = useState("")
  const [results, setResults] = useState<Array<UserDocument>>([])
  const { index } = useSearch()

  // Debounce the query input to reduce the number of search operations
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedQuery(query), 20)
    return () => clearTimeout(handler)
  }, [query])

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((prev) => !prev)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  useEffect(() => {
    if (!index || !open) return

    const search = async () => {
      try {
        const results = await index.searchAsync({
          query: debouncedQuery,
          index: ["title"],
          limit: 100,
          suggest: true,
        })

        // Flatten and map results to documents
        const docs = results.flatMap((fieldResults) =>
          fieldResults.result
            .map(String)
            .map((id) => {
              const item = maps.get(id)
              if (!item) return null

              const { name, path } = item

              return {
                id,
                title: name,
                path,
              } as UserDocument
            })
            .filter((el) => el !== null),
        )
        setResults(docs)
      } catch (error) {
        console.error("Search failed:", error)
        setResults([])
      }
    }

    search()
  }, [debouncedQuery, open, index, maps])

  const handleSelect = useCallback(
    (id: string) => {
      if (!vault?.tree) return

      const findNode = (nodes?: FileSystemTreeNode[]): FileSystemTreeNode | undefined => {
        if (!nodes) return
        for (const node of nodes) {
          if (node.id === id) return node
          if (node.children) {
            const found = findNode(node.children)
            if (found) return found
          }
        }
      }

      const node = findNode(vault.tree.children)
      if (node) {
        onFileSelect(node)
      }
    },
    [vault, onFileSelect],
  )

  // Memoize the item selection handler to prevent unnecessary re-renders
  const handleItemSelect = useCallback(
    (id: string) => {
      handleSelect(id)
      setQuery("")
      setDebouncedQuery("")
      setOpen(false)
    },
    [handleSelect],
  )

  const MemoizedCommandItems = useMemo(() => {
    return results.map((file) => (
      <CommandItem
        key={file.id}
        value={file.title}
        onSelect={() => handleItemSelect(file.id)}
        className="flex whitespace-pre-wrap gap-0 px-3 py-1.5 text-sm/7 flex-col items-start"
      >
        <span>{file.title}</span>
        <span className="italic">{file.path}</span>
      </CommandItem>
    ))
  }, [results, handleItemSelect])

  // Memoize CommandInput to prevent unnecessary re-renders
  const MemoizedCommandInput = useMemo(
    () => (
      <CommandInput placeholder="Rechercher quelque chose" value={query} onValueChange={setQuery} />
    ),
    [query, setQuery],
  )

  // Memoize CommandDialog to prevent unnecessary re-renders
  return useMemo(
    () => (
      <CommandDialog
        open={open}
        onOpenChange={setOpen}
        modal
        title="Search Files"
        description="Search for a file in the vault"
      >
        {MemoizedCommandInput}
        <CommandList
          onKeyDown={(e) => {
            if (e.ctrlKey && e.key === "p") {
              e.preventDefault()
              const items = document.querySelectorAll("[cmdk-item]")
              const activeElement = document.activeElement
              const currentIndex = Array.from(items).findIndex((item) => item === activeElement)
              if (currentIndex > 0) {
                const prevItem = items[currentIndex - 1] as HTMLElement
                prevItem.focus()
              }
            }
            if (e.ctrlKey && e.key === "n") {
              e.preventDefault()
              const items = document.querySelectorAll("[cmdk-item]")
              const activeElement = document.activeElement
              const currentIndex = Array.from(items).findIndex((item) => item === activeElement)
              if (currentIndex < items.length - 1) {
                const nextItem = items[currentIndex + 1] as HTMLElement
                nextItem.focus()
              }
            }
          }}
        >
          <CommandEmpty className="flex whitespace-pre-wrap gap-0 px-3 py-1.5 text-xs/8 flex-col py-2 items-start text-muted-foreground italic">
            Aucun fichier trouvé
          </CommandEmpty>
          {MemoizedCommandItems}
        </CommandList>
        <CommandSeparator />
        <ul id="helper">
          <li>
            <kbd>↑↓</kbd> pour naviguer
          </li>
          <li>
            <kbd>⌘ k</kbd> pour active
          </li>
          <li>
            <kbd>↵</kbd> pour ouvrir
          </li>
          <li>
            <kbd>esc</kbd> pour rejeter
          </li>
        </ul>
      </CommandDialog>
    ),
    [open, setOpen, MemoizedCommandInput, MemoizedCommandItems],
  )
}
