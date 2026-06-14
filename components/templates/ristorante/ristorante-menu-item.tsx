"use client";

import type { ServiceMenuItem } from "@/lib/dashboard-data";

export function RistoranteMenuItem({ service }: { service: ServiceMenuItem }) {
  return (
    <div className="flex items-baseline justify-between border-b border-[#1C1917]/[0.06] py-4">
      <div className="min-w-0 flex-1 pr-4">
        <p
          className="text-base font-semibold text-[#1C1917]"
          style={{ fontFamily: "var(--font-body)" }}
        >
          {service.name}
        </p>
        {service.description ? (
          <p className="mt-0.5 text-sm text-[#1C1917]/60">{service.description}</p>
        ) : null}
      </div>
      <span
        className="shrink-0 text-base font-bold text-[#8B2500]"
        style={{ fontFamily: "var(--font-body)" }}
      >
        {service.price}
      </span>
    </div>
  );
}
