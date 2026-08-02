import type { ServiceMenuItem } from "@/lib/dashboard-data";
import { AssetImage } from "@/components/ui/asset-image";

export function RistoranteMenuCard({
  service,
}: {
  service: ServiceMenuItem;
}) {
  const hasImage = Boolean(service.image);

  return (
    <article
      className={`group grid min-h-64 overflow-hidden rounded-[1.75rem] border border-[var(--site-border)] bg-[var(--ristorante-surface)] shadow-md transition-[box-shadow,transform] hover:-translate-y-1 hover:shadow-xl motion-reduce:transform-none ${
        hasImage ? "sm:grid-cols-[42%_minmax(0,1fr)]" : ""
      }`}
    >
      {service.image ? (
        <div className="relative min-h-56 overflow-hidden bg-[var(--ristorante-muted)] sm:min-h-64">
          <AssetImage
            alt={service.name}
            className="object-cover transition-transform duration-500 group-hover:scale-[1.04] motion-reduce:transform-none"
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1280px) 42vw, 260px"
            src={service.image}
          />
        </div>
      ) : null}

      <div className="flex min-w-0 flex-col p-6">
        <div className="flex items-start justify-between gap-5">
          <h3
            className="text-balance text-2xl font-normal leading-tight text-[var(--site-text)]"
            style={{
              fontFamily: "var(--font-ristorante-display)",
              letterSpacing: "-0.025em",
            }}
          >
            {service.name}
          </h3>
          <p
            className="shrink-0 text-lg font-bold text-[var(--ristorante-accent)]"
            style={{ fontFamily: "var(--font-ristorante-body)" }}
          >
            {service.price}
          </p>
        </div>
        {service.description ? (
          <p
            className="mt-4 text-sm leading-7 text-[var(--site-text-muted)]"
            style={{
              fontFamily: "var(--font-ristorante-body)",
              fontWeight: 300,
            }}
          >
            {service.description}
          </p>
        ) : null}
        {!hasImage ? (
          <div
            aria-hidden
            className="mt-auto pt-8"
          >
            <span className="block h-px w-12 bg-[var(--ristorante-accent)]" />
          </div>
        ) : null}
      </div>
    </article>
  );
}
