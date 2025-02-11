"use client"

import { useRouter } from "next/navigation"
import { FolderSearch, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { type Vault } from "@/hooks/use-vaults"
import { useVaultContext } from "@/context/vault-context"
import { useToast } from "@/hooks/use-toast"
import { Skeleton } from "@/components/ui/skeleton"

export default function Home() {
  const router = useRouter()
  const { setActiveVaultId, vaults, addVault, isLoading } = useVaultContext()
  const { toast } = useToast()

  const handleOpenDirectory = async () => {
    try {
      const handle = await window.showDirectoryPicker({ startIn: "documents" })
      await addVault(handle).then((el) => {
        if (el) {
          setActiveVaultId(el.id)
          router.push(`/${el.id}`)
        }
      })
    } catch {
      toast({
        title: "Vault picker aborted",
        description: "User aborted picker request.",
        duration: 500,
      })
    }
  }

  const handleVaultSelect = (vault: Vault) => {
    setActiveVaultId(vault.id)
    router.push(`/${vault.id}`)
  }

  return (
    <main className="min-h-screen w-full flex items-center justify-center bg-background">
      <div className="container max-w-4xl py-8">
        <section className="flex items-center justify-between mb-8">
          <hgroup>
            <h1 className="text-3xl font-bold tracking-tight">Vaults</h1>
            <p className="text-muted-foreground mt-2 italic">Manage recently opened vaults</p>
          </hgroup>
          <Button onClick={handleOpenDirectory} className="gap-2 cursor-pointer">
            <FolderSearch className="w-4 h-4" />
            Open New Vault
          </Button>
        </section>
        <div className="flex items-center gap-2 text-sm text-muted-foreground my-4">
          <Clock className="w-4 h-4" />
          Recently Opened
        </div>
        {isLoading || vaults.length === 0 ? (
          <div className="space-y-4">
            <Card>
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center space-x-4">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-4 w-[200px]" />
                    <Skeleton className="h-3 w-[160px]" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : vaults.length > 0 ? (
          <section className="grid gap-4">
            <div className="grid gap-4">
              {vaults.map((vault) => (
                <Card key={vault.id} className="group">
                  <Button
                    variant="ghost"
                    className="w-full h-auto p-0 justify-start"
                    onClick={() => handleVaultSelect(vault)}
                  >
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span>{vault.name}</span>
                      </CardTitle>
                      <CardDescription>
                        Last opened{" "}
                        {new Date(vault.lastOpened).toLocaleDateString(undefined, {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </CardDescription>
                    </CardHeader>
                  </Button>
                </Card>
              ))}
            </div>
          </section>
        ) : (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12 text-center">
              <FolderSearch className="w-12 h-12 text-muted-foreground mb-4" />
              <CardTitle className="mb-2">No Vaults Found</CardTitle>
              <CardDescription>
                Get started by opening a new vault to use with{" "}
                <code className="font-light italic">morph</code>.
              </CardDescription>
            </CardContent>
          </Card>
        )}
      </div>
    </main>
  )
}
