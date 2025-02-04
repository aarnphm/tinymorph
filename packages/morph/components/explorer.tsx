import type * as React from "react"
import { useState } from "react"
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
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar"
import useVaults, { Vault } from "@/hooks/use-vaults"
import { useRouter } from "next/navigation"
import { useVaultContext } from "@/context/vault-context"

interface FileSystemTreeNode {
  name: string
  kind: "file" | "directory"
  handle: FileSystemHandle
  children?: FileSystemTreeNode[]
  isOpen?: boolean
}

interface FileTreeNodeProps {
  node: FileSystemTreeNode
  onFileSelect?: (node: FileSystemTreeNode) => void
  onTreeUpdate?: (root: FileSystemTreeNode) => void
}

const FileTreeNode: React.FC<FileTreeNodeProps> = ({ node, onFileSelect, onTreeUpdate }) => {
  const [isOpen, setIsOpen] = useState(node.isOpen ?? false)

  const toggleOpen = () => {
    setIsOpen(!isOpen)
    node.isOpen = !isOpen
  }

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
            {node.children?.map((child, index) => (
              <FileTreeNode
                key={index}
                node={child}
                onFileSelect={onFileSelect}
                onTreeUpdate={onTreeUpdate}
              />
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </Collapsible>
    </SidebarMenuItem>
  )
}

interface MorphSidebarProps extends React.ComponentProps<typeof Sidebar> {
  onFileSelect: (node: FileSystemTreeNode) => void
  onTreeUpdate: (root: FileSystemTreeNode) => void
  onExportMarkdown: () => void
  onExportPDF: () => void
}

export function Explorer({
  onFileSelect,
  onTreeUpdate,
  onExportMarkdown,
  onExportPDF,
  ...props
}: MorphSidebarProps) {
  const router = useRouter()
  const { vaults, addVault } = useVaults()
  const { getActiveVault, setActiveVaultId } = useVaultContext()

  const activeVault = getActiveVault()

  const handleOpenDirectory = async () => {
    try {
      const handle = await window.showDirectoryPicker({ startIn: "documents" })
      const vault = await addVault(handle)
      if (vault) {
        router.push(`/${vault.path}`)
      }
    } catch (error) {
      console.error("Error opening directory:", error)
    }
  }

  const handleVaultSelect = (vault: Vault) => {
    setActiveVaultId(vault.id)
    router.push(`/${vault.path}`)
  }

  return (
    <Sidebar className="bg-background" {...props}>
      <SidebarContent>
        <SidebarHeader className="border-b h-10 p-0">
          <div className="h-full flex items-center justify-between mx-4">
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0"
                title="New File"
                disabled={!activeVault}
              >
                <Plus className="h-3 w-3" width={16} height={16} />
              </Button>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-6 gap-1">
                  <span className="truncate max-w-[100px]">
                    {activeVault?.name || "Select Vault"}
                  </span>
                  <ChevronDown className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {Array.from(vaults.entries()).map(([id, vault]) => (
                  <DropdownMenuItem key={id} onClick={() => handleVaultSelect(vault)}>
                    {vault.name}
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleOpenDirectory}>Open Vault...</DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/">Manage Vaults...</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </SidebarHeader>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {activeVault && activeVault.root ? (
                <FileTreeNode
                  node={activeVault!.root}
                  onFileSelect={onFileSelect}
                  onTreeUpdate={onTreeUpdate}
                />
              ) : (
                <div className="p-4 text-sm text-muted-foreground italic">
                  No vault selected. Select a vault from the dropdown above.
                </div>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t h-8 p-0">
        <div className="flex items-center justify-between mx-4 h-full">
          <span className="text-sm text-muted-foreground truncate">
            {activeVault ? activeVault.name : "local"}
          </span>
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
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
