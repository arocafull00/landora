"use client";
import type { CSSProperties } from "react";
import { Cloud, ImageIcon } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { AssetImage } from "@/components/ui/asset-image";
import { Badge } from "@/components/ui/badge";
import { ToggleGroup } from "@/components/ui/toggle-group";
import type { ProductImage } from "@/lib/domain/dtos";
import { useProductGallery } from "../hooks/use-product-gallery";
import { GalleryThumbnail } from "./gallery-thumbnail";

const COPY = { gallery: "Imágenes del producto", empty: "Imagen no disponible" } as const;

export function ProductGallery({ images, title, activeIndex, badge, onSelect }: { images: ProductImage[]; title: string; activeIndex: number; badge: string | null; onSelect: (index: number) => void }) {
  const { image, ratio, handleImageLoad } = useProductGallery(images, activeIndex);
  return (
    <div className="min-w-0 self-start">
      <div className="relative mx-auto w-full max-w-[calc(35rem*var(--product-image-ratio)+0.75rem)] overflow-hidden rounded-2xl bg-tone-1 p-1.5 sm:max-w-[calc(35rem*var(--product-image-ratio)+1rem)] sm:p-2" style={{ "--product-image-ratio": ratio } as CSSProperties}>
        {badge ? (
          <Badge className="absolute left-4 top-4 z-10 bg-surface/95 px-3 py-1.5 text-xs font-semibold text-ink backdrop-blur-sm">
            <Cloud aria-hidden />
            {badge}
          </Badge>
        ) : null}
        <AspectRatio ratio={ratio} className="relative max-h-[35rem] overflow-hidden rounded-xl bg-tone-1">
          {image ? <AssetImage src={image.url} alt={image.alt || title} fill priority sizes="(min-width:1280px) 640px, (min-width:1024px) 55vw, 100vw" onLoad={handleImageLoad} className="object-contain" /> : (
            <div className="flex h-full flex-col items-center justify-center gap-3 text-ink-secondary">
              <ImageIcon aria-hidden className="size-8" />
              <p className="text-sm">{COPY.empty}</p>
            </div>
          )}
        </AspectRatio>
      </div>
      {images.length > 1 ? (
        <ToggleGroup type="single" value={String(activeIndex)} onValueChange={(value) => value && onSelect(Number(value))} aria-label={COPY.gallery} className="mt-4 justify-start gap-3 p-1">
          {images.map((item, index) => (
            <GalleryThumbnail key={`${item.url}:${index}`} image={item} index={index} />
          ))}
        </ToggleGroup>
      ) : null}
    </div>
  );
}
