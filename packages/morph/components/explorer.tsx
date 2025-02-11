import type * as React from "react"
import { useState, useCallback, memo } from "react"
import { ChevronRight, Plus, Download, ChevronDown } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"
import { md } from "@/components/parser"
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
  SidebarHeader,
} from "@/components/ui/sidebar"
import jsPDF from "jspdf"
import { Vault } from "@/hooks/use-vaults"
import { EditorView } from "@uiw/react-codemirror"
import { setFile } from "./markdown-inline"
import { FileSystemTreeNode } from "@/hooks/use-vaults"

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
        className="data-[active=true]:bg-transparent hover:bg-accent/50 transition-colors flex items-center"
        onClick={() => onFileSelect?.(node)}
      >
        <span className="truncate">{node.name}</span>
        {node.extension && node.extension != "md" && (
          <span className="text-muted-foreground uppercase text-tiny flex-shrink-0 border rounded px-1 ml-2">
            {node.extension}
          </span>
        )}
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
          <SidebarMenuSub className="mr-0">
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
  vault: Vault
  editorViewRef: React.RefObject<EditorView | null>
  onFileSelect?: (handle: FileSystemFileHandle) => void
  onNewFile?: () => void
  onContentUpdate?: (content: string) => void
  currentFile: string
  markdownContent: string
}

export function Explorer({
  vault,
  editorViewRef,
  onFileSelect,
  onNewFile,
  onContentUpdate,
  currentFile,
  markdownContent,
  ...props
}: MorphSidebarProps) {
  const { toast } = useToast()

  const handleFileSelect = useCallback(
    async (node: FileSystemTreeNode) => {
      if (!vault || node.kind !== "file" || !editorViewRef.current) return
      if (node.extension !== "md") {
        toast({ title: "opening file", description: "Can only open markdown files" })
        return
      }

      try {
        const file = await node.handle.getFile()
        const content = await file.text()

        if (onFileSelect) onFileSelect(node.handle as FileSystemFileHandle)

        editorViewRef.current.dispatch({
          changes: {
            from: 0,
            to: editorViewRef.current.state.doc.length,
            insert: content,
          },
          effects: setFile.of(file.name),
        })

        if (onContentUpdate) {
          onContentUpdate(content)
        }
      } catch (error) {
        console.error("Error reading file:", error)
      }
    },
    [vault, editorViewRef, onFileSelect, onContentUpdate, toast],
  )

  const handleExportMarkdown = useCallback(() => {
    const blob = new Blob([md(markdownContent).content], { type: "text/markdown" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = currentFile
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }, [markdownContent, currentFile])

  const handleExportPdf = useCallback(() => {
    const pdf = new jsPDF({ unit: "pt", format: "a4" })

    // Get styles from reading mode preview
    const preview = document.querySelector(".prose") as HTMLElement
    const styles = preview ? getComputedStyle(preview) : null

    // Set up font metrics based on actual rendered styles
    const fontSize = styles?.fontSize || "16px"
    const fontFamily = "Parclo Serif"

    const lines = pdf.splitTextToSize(md(markdownContent).content, 180)
    pdf.text(lines, 10, 10)

    pdf.setFont(fontFamily)
    pdf.setFontSize(parseFloat(fontSize))

    pdf.save(currentFile.endsWith(".md") ? currentFile.slice(0, -3) + ".pdf" : `${currentFile}.pdf`)
  }, [markdownContent, currentFile])

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
            disabled={!vault}
            onClick={() => {
              if (editorViewRef.current) {
                editorViewRef.current.dispatch({
                  changes: {
                    from: 0,
                    to: editorViewRef.current.state.doc.length,
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
              <DropdownMenuItem onClick={handleExportMarkdown}>Markdown</DropdownMenuItem>
              <DropdownMenuItem onClick={handleExportPdf}>PDF</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {vault &&
                vault.tree!.children!.map((node, idx) => (
                  <FileTreeNode key={idx} node={node} onFileSelect={handleFileSelect} />
                ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
