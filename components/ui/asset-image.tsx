"use client";

import Image from "next/image";
import { isSvgAsset } from "@/lib/is-svg-url";

export function AssetImage({
  alt,
  className,
  fill,
  mimeType,
  priority,
  quality,
  sizes,
  src,
}: {
  alt: string;
  className?: string;
  fill?: boolean;
  mimeType?: string;
  priority?: boolean;
  quality?: number;
  sizes?: string;
  src: string;
}) {
  if (!src) return null;

  return (
    <Image
      alt={alt}
      className={className}
      fill={fill}
      priority={priority}
      quality={quality}
      sizes={sizes}
      src={src}
      unoptimized={isSvgAsset(src, mimeType) || src.startsWith("/")}
    />
  );
}
