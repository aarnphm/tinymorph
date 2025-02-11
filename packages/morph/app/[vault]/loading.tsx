import { Skeleton } from "@/components/ui/skeleton"
import {
  SidebarInset,
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarRail,
  SidebarHeader,
} from "@/components/ui/sidebar"

export default function Loading() {
  return (
    <main className="min-h-screen bg-background">
      <SidebarProvider defaultOpen={true}>
        <Sidebar className="bg-background">
          <SidebarHeader className="border-b h-10 p-0 min-h-10 sticky">
            <div className="h-full flex items-center justify-end mx-4 gap-2">
              <Skeleton className="h-6 w-6 p-0 rounded-full" />
              <Skeleton className="h-6 w-6 p-0 rounded-full" />
              <Skeleton className="h-6 w-6 p-0 rounded-full" />
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <SidebarMenuItem key={i}>
                      <Skeleton className="h-4 w-[16rem] p-2 mt-2" />
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarRail />
        </Sidebar>
        <SidebarInset>
          <header className="inline-block h-10 border-b">
            <div className="h-full flex shrink-0 items-center justify-between mx-4">
              <Skeleton className="h-6 w-6 rounded-md" />
              <div className="flex items-center gap-2">
                <Skeleton className="h-6 w-24 rounded-md" />
                <Skeleton className="h-6 w-6 rounded-md" />
              </div>
            </div>
          </header>
          <section className="flex h-[calc(100vh-104px)] gap-10 m-4">
            <div className="flex-1 border">
              <div className="h-full p-12">
                <div className="space-y-4 max-w-3xl mx-auto">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                    <Skeleton
                      key={i}
                      className="h-4 rounded"
                      style={{
                        width: `${Math.random() * 40 + 60}%`,
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </section>
          <footer className="inline-block h-8 border-t text-xs">
            <div className="h-full flex shrink-0 items-center align-middle font-mono justify-end mx-4">
              <Skeleton className="h-6 w-6 p-0 rounded-full" />
            </div>
          </footer>
        </SidebarInset>
      </SidebarProvider>
    </main>
  )
}
