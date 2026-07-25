export function PublicLandingSkeleton() {
  return (
    <div
      aria-busy="true"
      aria-label="Cargando contenido"
      className="min-h-screen bg-canvas"
      role="status"
    >
      <div className="mx-auto max-w-7xl px-6 pb-16 pt-32 md:px-10 md:pb-24 md:pt-40 lg:px-16">
        <div className="h-3 w-32 animate-pulse rounded-full bg-border-subtle motion-reduce:animate-none" />
        <div className="mt-8 h-12 w-3/4 animate-pulse rounded-lg bg-border-subtle motion-reduce:animate-none md:h-20" />
        <div className="mt-5 h-4 w-1/2 animate-pulse rounded-full bg-border-subtle motion-reduce:animate-none" />
        <div className="mt-12 aspect-4/3 w-full animate-pulse rounded-2xl bg-border-subtle motion-reduce:animate-none" />
      </div>
    </div>
  );
}
