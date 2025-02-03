"use client"
import type * as React from "react"
import { useState } from "react"
import { ChevronRight, File, Folder, FolderOpen, FolderSearch, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"

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
} from "@/components/ui/sidebar"
import usePersistedSettings from "@/hooks/use-persisted-settings"
import useFileTree from "@/hooks/use-file-tree"

interface FileSystemTreeNode {
  name: string
  kind: "file" | "directory"
  handle: FileSystemHandle
  children?: FileSystemTreeNode[]
}

function FileTreeNode({
  node,
  onFileSelect,
}: {
  node: FileSystemTreeNode
  onFileSelect?: (node: FileSystemTreeNode) => void
}) {
  const [isOpen, setIsOpen] = useState(false)

  const toggleOpen = () => setIsOpen(!isOpen)

  if (node.kind === "file") {
    return (
      <SidebarMenuButton
        className="data-[active=true]:bg-transparent hover:bg-accent/50 transition-colors"
        onClick={() => onFileSelect?.(node)}
      >
        <File className="w-4 h-4 mr-2 shrink-0" />
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
              className={`transition-transform ${isOpen ? "rotate-90" : ""} w-4 h-4 mr-2 shrink-0`}
            />
            {isOpen ? (
              <FolderOpen className="w-4 h-4 mr-2 shrink-0" />
            ) : (
              <Folder className="w-4 h-4 mr-2 shrink-0" />
            )}
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

interface MorphSidebarProps extends React.ComponentProps<typeof Sidebar> {
  onFileSelect?: (value: string) => void
}

export function MorphSidebar({ onFileSelect, ...props }: MorphSidebarProps) {
  const { settings } = usePersistedSettings()
  const { root, openDirectory, isLoading, handleFileSelect } = useFileTree({
    ignorePattern: settings.ignorePatterns,
    onFileSelect,
  })

  return (
    <Sidebar className="bg-background" {...props}>
      <SidebarContent>
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
                  No directory selected. Click the folder icon below to choose a directory.
                </div>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t border-border h-8 px-4 py-1">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground truncate">
            {root ? root.name : "local"}
          </span>
          <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={openDirectory}>
            <FolderSearch className="h-3 w-3" width={16} height={16} />
          </Button>
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
