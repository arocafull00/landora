"use client";

import { RistoranteGalleryMedia } from "@/components/templates/ristorante/ristorante-gallery-media";
import type { GalleryItem } from "@/lib/dashboard-data";

const masonrySpans = [
  "md:row-span-2",
  "md:row-span-1",
  "md:row-span-2",
  "md:row-span-1",
  "md:row-span-1",
  "md:row-span-2",
];

export function RistoranteGalleryItem({
  item,
  index,
  variant = "masonry",
}: {
  item: GalleryItem;
  index: number;
  variant?: "masonry" | "scroll";
}) {
  const spanClass = masonrySpans[index % masonrySpans.length];

  if (variant === "scroll") {
    return (
      <div
        className="group relative aspect-[4/5] shrink-0 snap-start overflow-hidden rounded-lg bg-[#e5e2dd]"
        style={{ width: "min(75vw, 320px)" }}
      >
        <RistoranteGalleryMedia item={item} />
      </div>
    );
  }

  return (
    <div
      className={`group relative overflow-hidden rounded-lg bg-[#e5e2dd] ${spanClass}`}
    >
      <RistoranteGalleryMedia item={item} />
    </div>
  );
}
