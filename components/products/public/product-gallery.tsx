"use client";
import { Cloud } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { AssetImage } from "@/components/ui/asset-image";
import { Badge } from "@/components/ui/badge";
import { ToggleGroup } from "@/components/ui/toggle-group";
import type { ProductImage } from "@/lib/domain/dtos";
import { GalleryThumbnail } from "./gallery-thumbnail";

export function ProductGallery({ images, title, activeIndex, badge, onSelect }: { images: ProductImage[]; title: string; activeIndex: number; badge: string | null; onSelect: (index: number) => void }) {
  const image = images[activeIndex] ?? images[0];
  return (
    <div>
      <div className="relative overflow-hidden rounded-[38px] bg-tone-1 p-3 sm:p-4">
        {badge ? (
          <Badge className="absolute left-5 top-5 z-10 bg-surface/85 px-4 py-2 text-xs font-semibold text-ink backdrop-blur">
            <Cloud aria-hidden />
            {badge}
          </Badge>
        ) : null}
        <AspectRatio ratio={4 / 3} className="relative overflow-hidden rounded-[42%_58%_52%_48%/46%_43%_57%_54%] bg-surface">
          {image ? <AssetImage src={image.url} alt={image.alt || title} fill priority sizes="(min-width:1024px) 55vw, 100vw" className="object-cover" /> : null}
        </AspectRatio>
      </div>
      {images.length > 1 ? (
        <ToggleGroup type="single" value={String(activeIndex)} onValueChange={(value) => value && onSelect(Number(value))} className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-4">
          {images.map((item, index) => (
            <GalleryThumbnail key={`${item.url}:${index}`} image={item} index={index} />
          ))}
        </ToggleGroup>
      ) : null}
    </div>
  );
}
