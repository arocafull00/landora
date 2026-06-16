"use client";

import { CoffeeShopGalleryMedia } from "@/components/templates/coffee-shop/coffee-shop-gallery-media";
import type { GalleryItem } from "@/lib/dashboard-data";

const layoutClasses = [
  "col-span-2 row-span-2 min-h-[280px]",
  "col-span-1 row-span-1 min-h-[180px]",
  "col-span-1 row-span-2 min-h-[240px]",
  "col-span-1 row-span-1 min-h-[180px]",
  "col-span-2 row-span-1 min-h-[200px]",
  "col-span-1 row-span-1 min-h-[180px]",
];

export function CoffeeShopGalleryItem({
  item,
  index,
}: {
  item: GalleryItem;
  index: number;
}) {
  const layout = layoutClasses[index % layoutClasses.length];

  return (
    <div
      className={`group relative overflow-hidden rounded-2xl bg-[var(--coffee-primary)]/15 ${layout}`}
    >
      <CoffeeShopGalleryMedia item={item} />
    </div>
  );
}
