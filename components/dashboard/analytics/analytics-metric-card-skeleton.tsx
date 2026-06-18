export function AnalyticsMetricCardSkeleton() {
  return (
    <div className="animate-pulse rounded-lg border border-outline-variant bg-surface-container-lowest p-unit-md">
      <div className="flex items-start gap-unit-sm">
        <div className="h-10 w-10 shrink-0 rounded-full bg-surface-container-high" />
        <div className="flex flex-1 items-start justify-between gap-2 pt-0.5">
          <div className="h-4 w-28 rounded bg-surface-container-high" />
          <div className="h-5 w-8 rounded bg-surface-container-high" />
        </div>
      </div>
      <div className="mt-unit-md h-8 w-16 rounded bg-surface-container-high" />
      <div className="mt-1 h-4 w-24 rounded bg-surface-container-high" />
      <div className="mt-unit-sm h-7 w-full rounded bg-surface-container-high" />
    </div>
  );
}
