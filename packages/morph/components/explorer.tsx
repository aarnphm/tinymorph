"use client"
import type * as React from "react"
import { useState } from "react"
import { ChevronRight, FolderSearch, Loader2, Plus, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
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
import usePersistedSettings from "@/hooks/use-persisted-settings"
import useFileTree, { UseFileTreeOptions } from "@/hooks/use-file-tree"

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
}

const FileTreeNode: React.FC<FileTreeNodeProps> = ({ node, onFileSelect }) => {
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
              <FileTreeNode key={index} node={child} onFileSelect={onFileSelect} />
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </Collapsible>
    </SidebarMenuItem>
  )
}

interface MorphSidebarProps
  extends React.ComponentProps<typeof Sidebar>,
    Omit<UseFileTreeOptions, "ignorePattern"> {
  onExportMarkdown?: () => void
  onExportPDF?: () => void
}

export function MorphSidebar({
  onFileSelect,
  onExportMarkdown,
  onExportPDF,
  ...props
}: MorphSidebarProps) {
  const { settings } = usePersistedSettings()
  const { root, openDirectory, isLoading, handleFileSelect, createNewFile } = useFileTree({
    ignorePattern: settings.ignorePatterns,
    onFileSelect,
  })

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
                onClick={createNewFile}
              >
                <Plus className="h-3 w-3" width={16} height={16} />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0"
                onClick={openDirectory}
                title="Open Directory"
              >
                <FolderSearch className="h-3 w-3" width={16} height={16} />
              </Button>
            </div>
          </div>
        </SidebarHeader>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {isLoading ? (
                <div className="p-4 text-sm text-muted-foreground flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Loading directory...
                </div>
              ) : root ? (
                <FileTreeNode node={root} onFileSelect={handleFileSelect} />
              ) : (
                <div className="p-4 text-sm text-muted-foreground italic">
                  No directory selected. Click the folder search icon above to choose a directory.
                </div>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t h-8 p-0">
        <div className="flex items-center justify-between mx-4 h-full">
          <span className="text-sm text-muted-foreground truncate">
            {root ? root.name : "local"}
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
