export function AnalyticsMetricCardSkeleton({ featured = false }: { featured?: boolean }) {
  if (featured) {
    return (
      <div className="animate-pulse rounded-lg border border-primary/20 bg-primary/[0.06] p-unit-md">
        <div className="flex items-start justify-between gap-unit-sm">
          <div className="h-4 w-24 rounded bg-surface-container-high" />
          <div className="h-4 w-4 rounded bg-surface-container-high" />
        </div>
        <div className="mt-2 h-10 w-28 rounded bg-surface-container-high" />
      </div>
    );
  }

  return (
    <div className="animate-pulse rounded-lg border border-outline-variant bg-surface-container-lowest p-unit-md">
      <div className="flex items-start justify-between gap-unit-sm">
        <div className="h-4 w-32 rounded bg-surface-container-high" />
        <div className="h-4 w-4 rounded bg-surface-container-high" />
      </div>
      <div className="mt-2 h-8 w-20 rounded bg-surface-container-high" />
    </div>
  );
}
