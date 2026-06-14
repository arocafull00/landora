"use client";

import { AssetImage } from "@/components/ui/asset-image";
import type { GalleryItem } from "@/lib/dashboard-data";

export function FloristeriaGalleryMedia({ item }: { item: GalleryItem }) {
  if (item.image) {
    return (
      <AssetImage
        alt=""
        className="object-cover transition-transform duration-500 group-hover:scale-105"
        fill
        sizes="(max-width: 768px) 75vw, 320px"
        src={item.image}
      />
    );
  }

  if (!item.video) return null;

  return (
    <video
      aria-label={item.title || "Gallery video"}
      className="h-full w-full object-cover"
      muted
      playsInline
      src={item.video}
    />
  );
}
