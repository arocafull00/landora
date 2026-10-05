"use client";

import { useState, type SyntheticEvent } from "react";
import type { ProductImage } from "@/lib/domain/dtos";

export function useProductGallery(images: ProductImage[], activeIndex: number) {
  const [ratios, setRatios] = useState<Record<string, number>>({});
  const image = images[activeIndex] ?? images[0];
  const ratio = image ? (ratios[image.url] ?? 3 / 2) : 3 / 2;

  function handleImageLoad(event: SyntheticEvent<HTMLImageElement>) {
    const { naturalWidth, naturalHeight } = event.currentTarget;
    if (!image || !naturalWidth || !naturalHeight) return;

    const imageRatio = naturalWidth / naturalHeight;
    setRatios((current) => current[image.url] === imageRatio ? current : { ...current, [image.url]: imageRatio });
  }

  return { image, ratio, handleImageLoad };
}
