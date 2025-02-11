export default function Loading() {
  return (
    <div className="flex h-screen items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-2">
        <div className="h-1.5 w-60 overflow-hidden rounded-full bg-muted">
          <div className="h-full w-1/2 animate-[progress_1s_ease-in-out_infinite] rounded-full bg-accent" />
        </div>
        <p className="text-sm text-muted-foreground">Loading editor...</p>
      </div>
    </div>
  )
}
