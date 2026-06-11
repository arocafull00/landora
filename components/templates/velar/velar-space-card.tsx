"use client";

import { AssetImage } from "@/components/ui/asset-image";
import type { SpaceContent } from "@/lib/dashboard-data";

export function VelarSpaceCard({
  space,
  index,
}: {
  space: SpaceContent;
  index: number;
}) {
  return (
    <div
      className="group relative h-[500px] cursor-pointer overflow-hidden"
      data-aos="fade-up"
      data-aos-delay={index * 100}
    >
      <AssetImage
        alt={space.name}
        className="object-cover transition-transform duration-500 group-hover:scale-105"
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
        src={space.image}
      />
      <div className="absolute inset-0 bg-black/40 transition-colors group-hover:bg-black/50" />
      <div className="absolute inset-0 flex flex-col justify-end p-8 text-white opacity-100 transition-opacity duration-300 md:opacity-0 md:group-hover:opacity-100">
        <h3
          data-editor-id={`residences:space:${space.id}:name`}
          className="mb-3 text-3xl font-bold"
          style={{ fontFamily: "var(--font-syne)" }}
        >
          {space.name}
        </h3>
        <p
          data-editor-id={`residences:space:${space.id}:description`}
          className="mb-4 text-lg opacity-90"
          style={{ fontFamily: "var(--font-body)" }}
        >
          {space.description}
        </p>
        <a
          href={`#space-${space.id}`}
          className="inline-flex w-fit cursor-pointer items-center gap-2 font-semibold uppercase tracking-wide hover:underline"
          style={{ fontFamily: "var(--font-syne)" }}
        >
          Ver detalles
          <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </a>
      </div>
    </div>
  );
}
