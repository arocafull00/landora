"use client";

import { StudioGalleryMedia } from "@/components/templates/studio/studio-gallery-media";
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
      <StudioGalleryMedia item={item} />
    </div>
  );
}
