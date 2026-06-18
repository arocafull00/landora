import { AnalyticsMetricCardSkeleton } from "@/components/dashboard/analytics/analytics-metric-card-skeleton";
import { Panel } from "@/components/ui/primitives";

export function AnalyticsLoadingSkeleton() {
  return (
    <div className="space-y-unit-lg">
      <Panel className="animate-pulse p-unit-lg">
        <div className="flex items-center justify-between">
          <div className="h-5 w-16 rounded bg-surface-container-high" />
          <div className="h-8 w-32 rounded-md bg-surface-container-high" />
        </div>
        <div className="mt-unit-md h-14 w-24 rounded bg-surface-container-high" />
        <div className="mt-1.5 h-4 w-20 rounded bg-surface-container-high" />
        <div className="mt-2 h-4 w-56 rounded bg-surface-container-high" />
        <div className="mt-unit-lg h-72 w-full rounded-lg bg-surface-container-high" />
      </Panel>
      <div className="grid grid-cols-1 gap-unit-md sm:grid-cols-3">
        <AnalyticsMetricCardSkeleton />
        <AnalyticsMetricCardSkeleton />
        <AnalyticsMetricCardSkeleton />
      </div>
    </div>
  );
}
