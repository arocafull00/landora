"use client";

import type { GalleryItem } from "@/lib/dashboard-data";

const bentoSpans = [
  "col-span-1 row-span-2 md:col-span-auto md:row-span-2",
  "col-span-1 row-span-1 md:col-span-auto md:row-span-1",
  "col-span-1 row-span-1 md:col-span-auto md:row-span-2",
  "col-span-1 row-span-1 md:col-span-auto md:row-span-1",
  "col-span-1 row-span-1 md:col-span-auto md:row-span-1",
  "col-span-2 row-span-1 md:col-span-auto md:row-span-2",
];

function getSpanClass(index: number, total: number) {
  if (total === 1) {
    return "col-span-2 row-span-2 md:col-span-auto md:row-span-2";
  }

  if (total === 2) {
    return "col-span-1 row-span-2 md:col-span-auto md:row-span-2";
  }

  return bentoSpans[index % bentoSpans.length];
}

export function StudioGalleryItem({
  item,
  index,
  total,
}: {
  item: GalleryItem;
  index: number;
  total: number;
}) {
  const spanClass = getSpanClass(index, total);

  return (
    <div
      className={`group relative h-full min-h-0 overflow-hidden rounded-lg bg-[#e5e2dd] ${spanClass}`}
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
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        src={item.image}
      />
    );
  }

  if (!item.video) return null;

  return (
    <video
      className="absolute inset-0 h-full w-full object-cover"
      muted
      playsInline
      src={item.video}
    />
  );
}
