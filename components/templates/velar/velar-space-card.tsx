"use client";

import Image from "next/image";
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
      <Image
        src={space.image}
        alt={space.name}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-105"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
      />
      <div className="absolute inset-0 bg-black/40 transition-colors group-hover:bg-black/50" />
      <div className="absolute inset-0 flex flex-col justify-end p-8 text-white opacity-100 transition-opacity duration-300 md:opacity-0 md:group-hover:opacity-100">
        <h3
          className="mb-3 text-3xl font-bold"
          style={{ fontFamily: "var(--font-syne)" }}
        >
          {space.name}
        </h3>
        <p
          className="mb-4 text-lg opacity-90"
          style={{ fontFamily: "var(--font-body)" }}
        >
          {space.description}
        </p>
      </div>
    </div>
  );
}
