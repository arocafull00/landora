export default function BlogPostLoading() {
  return (
    <div
      aria-busy="true"
      aria-label="Cargando contenido"
      className="min-h-screen bg-portfolio-canvas"
      role="status"
    >
      <div className="mx-auto max-w-3xl px-6 pb-16 pt-32 md:px-10 md:pb-24 md:pt-40 lg:px-16">
        <div className="h-3 w-32 animate-pulse rounded-full bg-portfolio-surface motion-reduce:animate-none" />
        <div className="mt-8 h-12 w-3/4 animate-pulse rounded-lg bg-portfolio-surface motion-reduce:animate-none md:h-16" />
        <div className="mt-5 h-4 w-1/2 animate-pulse rounded-full bg-portfolio-surface motion-reduce:animate-none" />
        <div className="mt-12 space-y-3">
          <div className="h-4 w-full animate-pulse rounded-full bg-portfolio-surface motion-reduce:animate-none" />
          <div className="h-4 w-11/12 animate-pulse rounded-full bg-portfolio-surface motion-reduce:animate-none" />
          <div className="h-4 w-4/5 animate-pulse rounded-full bg-portfolio-surface motion-reduce:animate-none" />
        </div>
      </div>
    </div>
  );
}
