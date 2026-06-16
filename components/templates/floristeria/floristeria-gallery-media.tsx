"use client";

import { useReducedMotion } from "motion/react";
import { AssetImage } from "@/components/ui/asset-image";
import type { GalleryItem } from "@/lib/dashboard-data";

export function FloristeriaGalleryMedia({ item }: { item: GalleryItem }) {
  const reduce = useReducedMotion();
  const motionClass = reduce
    ? "object-cover"
    : "object-cover transition-transform duration-500 group-hover:scale-[1.03]";

  if (item.image) {
    return (
      <AssetImage
        alt={item.title || "Creación floral"}
        className={motionClass}
        fill
        sizes="(max-width: 768px) 50vw, 25vw"
        src={item.image}
      />
    );
  }

  if (!item.video) return null;

  return (
    <video
      autoPlay
      aria-label={item.title || "Gallery video"}
      className={`h-full w-full ${motionClass}`}
      loop
      muted
      playsInline
      src={item.video}
    />
  );
}
