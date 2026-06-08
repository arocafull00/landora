"use client";

import type { GalleryItem } from "@/lib/dashboard-data";

export function PortfolioProjectCard({
  item,
  index,
}: {
  item: GalleryItem;
  index: number;
}) {
  const isLarge = index % 3 === 0;

  return (
    <div
      className={`group relative overflow-hidden rounded-lg bg-[#1a1a1a] ${
        isLarge ? "md:col-span-2 md:row-span-2" : ""
      }`}
    >
      {item.image ? (
        <img
          alt=""
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          src={item.image}
        />
      ) : item.video ? (
        <video
          className="h-full w-full object-cover"
          muted
          playsInline
          src={item.video}
        />
      ) : null}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </div>
  );
}
