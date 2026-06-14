export function BlogPostListSkeleton() {
  return (
    <div
      aria-busy="true"
      aria-label="Cargando posts"
      className="overflow-hidden rounded-lg border border-outline-variant bg-surface-container-lowest"
    >
      <div className="grid grid-cols-12 gap-4 border-b border-outline-variant bg-surface-container-low p-unit-sm">
        <div className="col-span-2 hidden sm:block" />
        <div className="col-span-7 h-4 animate-pulse rounded bg-surface-variant sm:col-span-6" />
        <div className="col-span-5 h-4 animate-pulse rounded bg-surface-variant sm:col-span-4" />
      </div>
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          className="grid grid-cols-12 items-center gap-4 border-b border-outline-variant/50 p-unit-sm last:border-b-0"
          key={index}
        >
          <div className="col-span-2 hidden sm:block">
            <div className="h-12 w-12 animate-pulse rounded-md bg-surface-variant" />
          </div>
          <div className="col-span-7 space-y-2 sm:col-span-6">
            <div className="h-4 w-3/4 animate-pulse rounded bg-surface-variant" />
            <div className="h-3 w-1/2 animate-pulse rounded bg-surface-variant" />
          </div>
          <div className="col-span-5 flex justify-end sm:col-span-4">
            <div className="h-6 w-16 animate-pulse rounded-md bg-surface-variant" />
          </div>
        </div>
      ))}
    </div>
  );
}
