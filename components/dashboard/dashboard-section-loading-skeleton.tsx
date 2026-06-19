import type { ReactNode } from "react";
import { DashboardPageHeader } from "@/components/dashboard/dashboard-page-header";
import { Skeleton } from "@/components/ui/skeleton";

export function DashboardSectionLoadingSkeleton({
  title,
  description,
  actions,
}: {
  title: string;
  description?: string;
  actions?: ReactNode;
}) {
  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <DashboardPageHeader
        title={title}
        description={description}
        actions={actions}
      />
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
