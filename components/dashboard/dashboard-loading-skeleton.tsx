import { Skeleton } from "@/components/ui/skeleton";

function DashboardSidebarSkeleton() {
  return (
    <aside className="hidden h-screen w-56 shrink-0 flex-col border-r border-outline-variant bg-sidebar md:flex">
      <div className="border-b border-sidebar-border px-unit-sm py-unit-lg">
        <div className="flex items-center gap-2.5 px-1">
          <Skeleton className="size-8 shrink-0 rounded-lg bg-sidebar-accent" />
          <Skeleton className="h-6 w-24 bg-sidebar-accent" />
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-unit-sm">
        {Array.from({ length: 8 }).map((_, index) => (
          <Skeleton key={index} className="h-9 w-full bg-sidebar-accent" />
        ))}
        <Skeleton className="mt-4 h-9 w-full bg-sidebar-accent" />
      </div>
      <div className="border-t border-sidebar-border p-unit-sm">
        <Skeleton className="h-9 w-full bg-sidebar-accent" />
      </div>
    </aside>
  );
}

export function DashboardLoadingSkeleton() {
  return (
    <div className="dashboard-app flex h-screen overflow-hidden bg-surface-bg text-on-background">
      <DashboardSidebarSkeleton />
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <div className="flex items-center gap-2 border-b border-outline-variant px-unit-md py-2 md:hidden">
          <Skeleton className="h-8 w-8" />
        </div>
        <div className="flex min-h-0 flex-1 flex-col overflow-hidden p-unit-lg">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="mt-2 h-4 w-72" />
          <div className="mt-unit-lg grid flex-1 gap-unit-md">
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-32 w-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
