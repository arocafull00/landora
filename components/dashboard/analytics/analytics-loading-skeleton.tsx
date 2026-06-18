import { AnalyticsMetricCardSkeleton } from "@/components/dashboard/analytics/analytics-metric-card-skeleton";
import { Panel } from "@/components/ui/primitives";

export function AnalyticsLoadingSkeleton() {
  return (
    <div className="space-y-unit-lg">
      <div className="grid gap-unit-md sm:grid-cols-2 xl:grid-cols-3">
        <div className="col-span-1 sm:col-span-2 xl:col-span-1">
          <AnalyticsMetricCardSkeleton featured />
        </div>
        {Array.from({ length: 5 }).map((_, index) => (
          <AnalyticsMetricCardSkeleton key={index} />
        ))}
      </div>
      <Panel className="animate-pulse p-unit-md">
        <div className="h-6 w-36 rounded bg-surface-container-high" />
        <div className="mt-unit-md h-72 w-full rounded-lg bg-surface-container-high" />
      </Panel>
    </div>
  );
}
