import type * as React from "react"
import { useState } from "react"
import { ChevronRight, File, Folder, FolderSearch } from "lucide-react"
import { Button } from "@/components/ui/button"
// import { globby } from 'globby'

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
  const [fileTree, setFileTree] = useState<[string| string[]][]>([])
  const [currentDirName, setCurrentDirName] = useState('~')
  const { settings } = usePersistedSettings()

  const traverseDirectoryHandle = async (handle: any, path = '') => {
    const entries: any[] = []
    
    // Get all entries as paths
    const paths = await globby('**/*', {
      cwd: handle,
      dot: true,
      onlyFiles: false,
      ignore: settings.ignorePatterns,
      objectMode: true
    })

    // Build tree structure from paths
    const tree = {}
    for (const entry of paths) {
      const parts = entry.path.split('/')
      let current = tree
      for (const part of parts) {
        current[part] = current[part] || []
        current = current[part]
      }
    }

    // Convert tree to nested arrays
    const buildNestedArray = (node) => {
      return Object.entries(node).map(([name, children]) => {
        return children.length ? [name, ...buildNestedArray(children)] : name
      })
    }

    return buildNestedArray(tree)
  }

  const handleOpenFolder = async () => {
    try {
      const handle = await window.showDirectoryPicker()
      const tree = await traverseDirectoryHandle(handle)
      setFileTree(tree)
      setCurrentDirName(handle.name)
    } catch (err) {
      console.error('Error accessing directory:', err)
    }
  }

  return (
    <Sidebar className="bg-background" {...props}>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {fileTree.map((item, index) => (
                <Tree key={index} item={item} />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t border-border h-8 px-4 py-1">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground truncate">{currentDirName}</span>
          <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={handleOpenFolder}>
            <FolderSearch className="h-3 w-3" width={16} height={16} />
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
