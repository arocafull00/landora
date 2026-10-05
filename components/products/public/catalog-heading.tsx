const COPY = { product: "producto", products: "productos", preview: "Vista previa: incluye productos en borrador." } as const;

export function CatalogHeading({ title, description, total, preview }: { title: string; description: string; total: number; preview: boolean }) {
  return (
    <div>
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-ink/55">{total} {total === 1 ? COPY.product : COPY.products}</p>
        <h1 className="mt-2 text-balance font-headline text-3xl font-normal leading-tight sm:text-4xl">{title}</h1>
        {description ? <p className="mt-3 max-w-2xl text-pretty text-sm leading-6 text-ink/60">{description}</p> : null}
        {preview ? <p className="mt-3 text-sm text-warning">{COPY.preview}</p> : null}
    </div>
  );
}
