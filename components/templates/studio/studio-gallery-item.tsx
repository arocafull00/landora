"use client";

import type { GalleryItem } from "@/lib/dashboard-data";

const masonrySpans = [
  "md:row-span-2",
  "md:row-span-1",
  "md:row-span-2",
  "md:row-span-1",
  "md:row-span-1",
  "md:row-span-2",
];

export function StudioGalleryItem({
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
        <GalleryMedia item={item} />
      </div>
    );
  }

  return (
    <div
      className={`group relative overflow-hidden rounded-lg bg-[#e5e2dd] ${spanClass}`}
    >
      <GalleryMedia item={item} />
    </div>
  );
}

function GalleryMedia({ item }: { item: GalleryItem }) {
  if (item.image) {
    return (
      <img
        alt=""
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        src={item.image}
      />
    );
  }

  if (!item.video) return null;

  return (
    <video
      className="h-full w-full object-cover"
      muted
      playsInline
      src={item.video}
    />
  );
}
