"use client";

import type { ServiceMenuItem } from "@/lib/dashboard-data";

export function RistoranteMenuItem({ service }: { service: ServiceMenuItem }) {
  return (
    <div className="grid grid-cols-[1fr_auto] items-baseline gap-x-3 py-4">
      <div className="min-w-0">
        <div className="flex min-w-0 items-baseline gap-2">
          <p
            className="shrink-0 text-base font-semibold text-[var(--ristorante-secondary)]"
            style={{ fontFamily: "var(--font-ristorante-body)" }}
          >
            {service.name}
          </p>
          <span
            aria-hidden
            className="hidden min-w-0 flex-1 border-b border-dotted border-[var(--ristorante-secondary)]/25 sm:block"
          />
        </div>
        {service.description ? (
          <p
            className="mt-1 text-sm text-[var(--ristorante-secondary)]/70"
            style={{ fontFamily: "var(--font-ristorante-body)", fontWeight: 300 }}
          >
            {service.description}
          </p>
        ) : null}
      </div>
      <span
        className="shrink-0 text-base font-bold text-[var(--ristorante-accent)]"
        style={{ fontFamily: "var(--font-ristorante-body)" }}
      >
        {service.price}
      </span>
    </div>
  );
}
