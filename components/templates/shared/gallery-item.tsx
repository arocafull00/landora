"use client";

import { GalleryMedia } from "@/components/templates/shared/gallery-media";
import type { GalleryItem } from "@/lib/dashboard-data";

const oneByOne =
  "col-span-1 row-span-1 min-h-[min(40vw,160px)] md:col-span-1 md:row-span-1 md:min-h-[160px]";

const bentoLayouts = [
  "col-span-2 row-span-2 min-h-[min(52vw,280px)] md:col-span-2 md:row-span-2 md:min-h-[320px]",
  oneByOne,
  oneByOne,
  oneByOne,
  "col-span-1 row-span-1 min-h-[min(40vw,160px)] md:col-span-1 md:row-span-2 md:min-h-[200px]",
  "col-span-2 row-span-1 min-h-[min(36vw,180px)] md:col-span-2 md:row-span-1 md:min-h-[180px]",
  oneByOne,
];

function getLayoutClass(index: number, total: number) {
  if (total === 1) {
    return "col-span-2 row-span-2 min-h-[min(56vw,320px)] md:col-span-4 md:row-span-2 md:min-h-[420px]";
  }

  if (total === 2) {
    return "col-span-1 row-span-2 min-h-[min(48vw,260px)] md:col-span-2 md:row-span-2 md:min-h-[320px]";
  }

  if (total === 3) {
    if (index === 0) {
      return "col-span-2 row-span-2 min-h-[min(52vw,280px)] md:col-span-2 md:row-span-2 md:min-h-[320px]";
    }
    if (index === 1) {
      return "col-span-1 row-span-2 min-h-[min(40vw,200px)] md:col-span-1 md:row-span-2 md:min-h-[280px]";
    }
    return oneByOne;
  }

  if (total === 4) {
    if (index === 0) {
      return "col-span-2 row-span-2 min-h-[min(52vw,280px)] md:col-span-2 md:row-span-2 md:min-h-[320px]";
    }
    if (index === 2) {
      return "col-span-1 row-span-2 min-h-[min(40vw,200px)] md:col-span-1 md:row-span-2 md:min-h-[280px]";
    }
    return oneByOne;
  }

  if (total === 5) {
    if (index === 0) {
      return "col-span-2 row-span-2 min-h-[min(52vw,280px)] md:col-span-2 md:row-span-2 md:min-h-[320px]";
    }
    return oneByOne;
  }

  if (index < bentoLayouts.length) {
    return bentoLayouts[index];
  }

  return oneByOne;
}

export function GalleryItem({
  item,
  index,
  total,
  featured = false,
  aosDelay = 0,
}: {
  item: GalleryItem;
  index: number;
  total: number;
  featured?: boolean;
  aosDelay?: number;
}) {
  const layoutClass = getLayoutClass(index, total);

  return (
    <div
      className={`group relative min-h-0 overflow-hidden bg-[var(--site-surface-alt)] ${featured ? "rounded-xl" : "rounded-lg"} ${layoutClass}`}
      data-aos="fade-up"
      data-aos-delay={aosDelay}
    >
      <GalleryMedia item={item} />
    </div>
  );
}
