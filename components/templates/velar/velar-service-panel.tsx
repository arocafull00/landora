"use client";

import Image from "next/image";
import type { ServiceContent } from "@/lib/dashboard-data";

export function VelarServicePanel({
  service,
  priority = false,
}: {
  service: ServiceContent;
  priority?: boolean;
}) {
  return (
    <div className="group relative h-[400px] overflow-hidden md:h-[500px]">
      <Image
        src={service.image}
        alt={service.title}
        fill
        quality={95}
        priority={priority}
        className="object-cover transition-transform duration-700 group-hover:scale-105"
        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 20vw"
      />
      <div className="absolute inset-0 bg-black/35 transition-colors group-hover:bg-black/45" />
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-6 text-center text-white">
        {service.label && (
          <p
            className="mb-3 text-xs font-medium uppercase tracking-widest text-white/90"
            style={{ fontFamily: "var(--font-body)" }}
          >
            {service.label}
          </p>
        )}
        <h3
          className="mb-2 text-2xl font-bold drop-shadow-lg sm:text-3xl"
          style={{ fontFamily: "var(--font-syne)" }}
        >
          {service.title}
        </h3>
        {service.subtitle && (
          <p
            className="text-sm font-medium uppercase tracking-wide text-white/95 drop-shadow-md"
            style={{ fontFamily: "var(--font-body)" }}
          >
            {service.subtitle}
          </p>
        )}
      </div>
    </div>
  );
}
