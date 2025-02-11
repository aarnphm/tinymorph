"use client"

import { createContext, useContext, useMemo } from "react"
import FlexSearch from "flexsearch"
import type { FileSystemTreeNode, Vault } from "@/hooks/use-vaults"
import { encode } from "@/lib/utils"

export interface UserDocument {
  id: string
  title: string
  path: string
  // Add content field later
}

type SearchContextType = {
  index: FlexSearch.Document<UserDocument> | null
}

const SearchContext = createContext<SearchContextType>({ index: null })

export function SearchProvider({ children, vault }: { children: React.ReactNode; vault: Vault }) {
  const index = useMemo(() => {
    const index = new FlexSearch.Document<UserDocument>({
      charset: "latin:extra",
      encode: encode,
      document: {
        id: "id",
        index: [
          {
            field: "title",
            tokenize: "forward",
            optimize: true,
          },
          {
            field: "path",
            tokenize: "forward",
          },
        ],
      },
    })

    const indexNode = async (node: FileSystemTreeNode) => {
      const promises = []
      if (node.kind === "file" && node.extension === "md") {
        promises.push(
          index.addAsync(node.id, {
            id: node.id,
            title: node.name,
            path: node.path,
          }),
        )
      }
      node.children?.forEach(indexNode)
      return await Promise.all(promises)
    }

    if (vault && vault.tree) vault.tree.children?.forEach(indexNode)

    return index
  }, [vault])

  return <SearchContext.Provider value={{ index }}>{children}</SearchContext.Provider>
}

export const useSearch = () => useContext(SearchContext)
