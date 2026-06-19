import { Skeleton } from "@/components/ui/skeleton";

export function DashboardSectionLoadingSkeleton() {
  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <div className="flex shrink-0 flex-wrap items-center justify-between gap-3 border-b border-outline-variant bg-surface-container-lowest px-unit-lg py-unit-md">
        <div className="min-w-0">
          <Skeleton className="h-7 w-40" />
          <Skeleton className="mt-1.5 h-4 w-56" />
        </div>
        <Skeleton className="h-9 w-28" />
      </div>
      <div className="flex min-h-0 flex-1 flex-col gap-unit-md overflow-hidden p-unit-lg">
        <div className="flex gap-2">
          <Skeleton className="h-9 w-24" />
          <Skeleton className="h-9 w-24" />
        </div>
        <Skeleton className="h-10 w-full" />
        <div className="grid flex-1 gap-unit-md">
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-20 w-full" />
        </div>
      </div>
    </div>
  );
}
