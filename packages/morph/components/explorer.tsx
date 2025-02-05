import type * as React from "react"
import { useState, useCallback, useEffect, memo } from "react"
import { ChevronRight, Plus, Download, ChevronDown } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarRail,
  SidebarHeader,
} from "@/components/ui/sidebar"
import { Vault } from "@/hooks/use-vaults"
import { useRouter } from "next/navigation"
import { EditorView } from "@uiw/react-codemirror"
import { setFile } from "./markdown-inline"
import useVaults, { FileSystemTreeNode } from "@/hooks/use-vaults"
import { useVaultContext } from "@/context/vault-context"
import { Skeleton } from "@/components/ui/skeleton"

interface FileTreeNodeProps {
  node: FileSystemTreeNode
  onFileSelect?: (node: FileSystemTreeNode) => void
}

const FileTreeNode: React.FC<FileTreeNodeProps> = memo(({ node, onFileSelect }) => {
  const [isOpen, setIsOpen] = useState(node.isOpen ?? false)

  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => {
      node.isOpen = !prev
      return !prev
    })
  }, [node])

  if (node.kind === "file") {
    return (
      <SidebarMenuButton
        className="data-[active=true]:bg-transparent hover:bg-accent/50 transition-colors"
        onClick={() => onFileSelect?.(node)}
      >
        <span className="truncate">{node.name}</span>
      </SidebarMenuButton>
    )
  }

  return (
    <SidebarMenuItem>
      <Collapsible open={isOpen} onOpenChange={setIsOpen} className="group/collapsible">
        <CollapsibleTrigger asChild>
          <SidebarMenuButton onClick={toggleOpen} className="hover:bg-accent/50 transition-colors">
            <ChevronRight
              className={`transition-transform ${isOpen ? "rotate-90" : ""} w-4 h-4 mr-1 shrink-0`}
            />
            <span className="truncate">{node.name}</span>
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenuSub>
            {node.children!.map((child) => (
              <FileTreeNode key={child.name} node={child} onFileSelect={onFileSelect} />
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </Collapsible>
    </SidebarMenuItem>
  )
})
FileTreeNode.displayName = "FileTreeNode"

interface MorphSidebarProps extends React.ComponentProps<typeof Sidebar> {
  codeMirrorRef: React.RefObject<EditorView | null>
  onExportMarkdown: () => void
  onExportPDF: () => void
  onFileSelect?: (handle: FileSystemFileHandle) => void
  onNewFile?: () => void
}

export function Explorer({
  codeMirrorRef,
  onExportMarkdown,
  onExportPDF,
  onFileSelect,
  onNewFile,
  ...props
}: MorphSidebarProps) {
  const router = useRouter()
  const { getAllVaults } = useVaults()
  const { getActiveVault } = useVaultContext()

  const [sortedVaults, setSortedVaults] = useState<Vault[]>([])

  useEffect(() => {
    const loadVaults = async () => {
      const allVaults = await getAllVaults()
      setSortedVaults(allVaults.sort((a, b) => b.lastOpened.getTime() - a.lastOpened.getTime()))
    }
    loadVaults()
  }, [getAllVaults])

  const activeVault = getActiveVault()

  const handleVaultSelect = (vault: Vault) => router.push(`/${vault.id}`)

  const handleFileSelect = useCallback(
    async (node: FileSystemTreeNode) => {
      if (!activeVault || node.kind !== "file" || !codeMirrorRef.current) return

      try {
        const file = await node.handle.getFile()
        const content = await file.text()

        if (onFileSelect) onFileSelect(node.handle as FileSystemFileHandle)

        codeMirrorRef.current.dispatch({
          changes: {
            from: 0,
            to: codeMirrorRef.current.state.doc.length,
            insert: content,
          },
          effects: setFile.of(file.name),
        })
      } catch (error) {
        console.error("Error reading file:", error)
      }
    },
    [activeVault, codeMirrorRef, onFileSelect],
  )

  return (
    <Sidebar className="bg-background" {...props}>
      <SidebarHeader className="border-b h-10 p-0 min-h-10 sticky">
        <div className="h-full flex items-center justify-end mx-4 gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0 group" title="Manage Vault">
                <ChevronDown className="h-3 w-3 transition-transform duration-200 group-data-[state=open]:rotate-180" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" sideOffset={2}>
              {sortedVaults.map((vault, idx) => (
                <DropdownMenuItem key={idx} onClick={() => handleVaultSelect(vault)}>
                  {vault.name}
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/">Manage Vaults...</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0"
            title="New File"
            disabled={!activeVault}
            onClick={() => {
              if (codeMirrorRef.current) {
                codeMirrorRef.current.dispatch({
                  changes: {
                    from: 0,
                    to: codeMirrorRef.current.state.doc.length,
                    insert: "",
                  },
                  effects: setFile.of("Untitled"),
                })
              }
              onNewFile?.()
            }}
          >
            <Plus className="h-3 w-3" width={16} height={16} />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0" title="Export">
                <Download className="h-3 w-3" width={16} height={16} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="top" align="center" sideOffset={5} alignOffset={2}>
              <DropdownMenuItem onClick={onExportMarkdown}>Markdown</DropdownMenuItem>
              <DropdownMenuItem onClick={onExportPDF}>PDF</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {activeVault ? (
                <FileTreeNode node={activeVault.tree!} onFileSelect={handleFileSelect} />
              ) : (
                <div className="p-4">
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
