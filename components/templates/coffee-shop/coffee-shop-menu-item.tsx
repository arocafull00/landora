"use client";

import type { ServiceMenuItem } from "@/lib/dashboard-data";

export function CoffeeShopMenuItem({ service }: { service: ServiceMenuItem }) {
  return (
    <div className="grid grid-cols-[1fr_auto] items-baseline gap-x-4 border-b border-[var(--coffee-secondary)]/10 py-5 last:border-b-0">
      <div className="min-w-0">
        <p
          className="text-base font-semibold text-[var(--coffee-secondary)]"
          style={{ fontFamily: "var(--font-coffee-body)" }}
        >
          {service.name}
        </p>
        {service.description ? (
          <p
            className="mt-1 text-sm leading-relaxed text-[var(--coffee-secondary)]/70"
            style={{ fontFamily: "var(--font-coffee-body)" }}
          >
            {service.description}
          </p>
        ) : null}
      </div>
      <span
        className="shrink-0 text-base font-semibold text-[var(--coffee-accent)]"
        style={{ fontFamily: "var(--font-coffee-body)" }}
      >
        {service.price}
      </span>
    </div>
  );
}
