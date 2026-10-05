import { Skeleton } from "@/components/ui/skeleton";

export function EditorSectionLoadingSkeleton() {
  return <section aria-busy="true" aria-label="Cargando editor" className="editor-workspace flex min-w-0 flex-1 flex-col bg-canvas">
    <div className="flex h-16 shrink-0 items-center justify-between border-b border-border bg-surface px-4"><Skeleton className="h-5 w-32" /><Skeleton className="h-9 w-48" /><Skeleton className="h-9 w-28" /></div>
    <div className="grid min-h-0 flex-1 grid-cols-1 md:grid-cols-[minmax(0,1fr)_320px] xl:grid-cols-[280px_minmax(0,1fr)_340px]">
      <div className="hidden space-y-4 border-r border-border bg-surface p-4 xl:block"><Skeleton className="h-5 w-24" /><Skeleton className="h-64 w-full" /></div>
      <div className="min-h-0 p-5"><Skeleton className="h-full w-full rounded-xl" /></div>
      <div className="hidden space-y-5 border-l border-border bg-surface p-4 md:block"><Skeleton className="h-5 w-28" /><Skeleton className="h-10 w-full" /><Skeleton className="h-24 w-full" /><Skeleton className="h-10 w-full" /></div>
    </div>
  </section>;
}
