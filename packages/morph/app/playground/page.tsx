"use client"

import Editor from "@/components/editor"

export default function PlaygroundPage() {
  return (
    <main className="min-h-screen bg-background">
      <Editor vaultId="playground" disableSidebar />
    </main>
  )
}
