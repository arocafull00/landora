"use client";

import { AssetImage } from "@/components/ui/asset-image";
import type { GalleryItem } from "@/lib/dashboard-data";

export function CoffeeShopGalleryMedia({ item }: { item: GalleryItem }) {
  if (item.image) {
    return (
      <AssetImage
        alt={item.title || "Imagen de la cafetería"}
        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        fill
        sizes="(max-width: 768px) 100vw, 33vw"
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
