import type * as React from "react"
import { useState, useCallback } from "react"
import { ChevronRight, File, Folder, FolderSearch } from "lucide-react"
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

interface FileSystemNode {
  name: string
  kind: "file" | "directory"
  children?: FileSystemNode[]
}

// This is sample data.
const data = {
  tree: [
    ["app", ["api", ["hello", ["route.ts"]], "page.tsx", "layout.tsx", ["blog", ["page.tsx"]]]],
    ["components", ["ui", "button.tsx", "card.tsx"], "header.tsx", "footer.tsx"],
    ["lib", ["util.ts"]],
    ["public", "favicon.ico", "vercel.svg"],
    ".eslintrc.json",
    ".gitignore",
    "next.config.js",
    "tailwind.config.js",
    "package.json",
    "README.md",
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [folderName, setFolderName] = useState("~/")
  const [tree, setTree] = useState<FileSystemNode[]>([])

  const traverseFileSystem = async (
    dirHandle: FileSystemDirectoryHandle,
    path: string = "",
  ): Promise<FileSystemNode[]> => {
    const entries: FileSystemNode[] = []

    try {
      for await (const [name, handle] of (dirHandle as any).entries()) {
        if (handle.kind === "file") {
          entries.push({
            name,
            kind: "file",
          })
        } else if (handle.kind === "directory") {
          const children = await traverseFileSystem(
            handle as FileSystemDirectoryHandle,
            `${path}/${name}`,
          )
          entries.push({
            name,
            kind: "directory",
            children,
          })
        }
      }
    } catch (error) {
      console.error("Error traversing directory:", error)
    }

    return entries.sort((a, b) => {
      // Sort directories first, then files
      if (a.kind === "directory" && b.kind === "file") return -1
      if (a.kind === "file" && b.kind === "directory") return 1
      return a.name.localeCompare(b.name)
    })
  }

  const openFolder = useCallback(async () => {
    try {
      const dirHandle = await window.showDirectoryPicker()
      setFolderName(dirHandle.name)
      const newTree = await traverseFileSystem(dirHandle)
      setTree(newTree)
    } catch (err) {
      console.error("Error opening folder:", err)
      alert("Failed to open folder. This feature may not be supported in your browser.")
    }
  }, [])

  return (
    <Sidebar className="bg-background" {...props}>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {data.tree.map((item, index) => (
                <Tree key={index} item={item} />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t border-border p-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground truncate">{folderName}</span>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={openFolder}>
            <FolderSearch className="h-4 w-4" />
          </Button>
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}

function Tree({ item }: { item: string | any[] }) {
  const [name, ...items] = Array.isArray(item) ? item : [item]
  const [isOpen, setIsOpen] = useState(name === "components" || name === "ui")

  const toggleOpen = () => setIsOpen(!isOpen)

  if (!items.length) {
    return (
      <SidebarMenuButton
        isActive={name === "button.tsx"}
        className="data-[active=true]:bg-transparent"
      >
        <File />
        {name}
      </SidebarMenuButton>
    )
  }

  return (
    <SidebarMenuItem>
      <Collapsible open={isOpen} onOpenChange={setIsOpen} className="group/collapsible">
        <CollapsibleTrigger asChild>
          <SidebarMenuButton onClick={toggleOpen}>
            <ChevronRight className={`transition-transform ${isOpen ? "rotate-90" : ""}`} />
            <Folder />
            {name}
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenuSub>
            {items.map((subItem, index) => (
              <Tree key={index} item={subItem} />
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </Collapsible>
    </SidebarMenuItem>
  )
}
