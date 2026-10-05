"use client";
import type { ProductImage } from "@/lib/domain/dtos";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { AssetImage } from "@/components/ui/asset-image";
import { ToggleGroupItem } from "@/components/ui/toggle-group";

const COPY = { image: "Ver imagen" } as const;

export function GalleryThumbnail({ image, index }: { image: ProductImage; index: number }) {
  return (
    <ToggleGroupItem
      value={String(index)}
      aria-label={`${COPY.image} ${index + 1}`}
      className="h-auto w-full rounded-[22px] border-0 bg-surface p-1 opacity-80 transition-[opacity,box-shadow] hover:bg-surface hover:opacity-100 data-[state=on]:bg-surface data-[state=on]:opacity-100 data-[state=on]:ring-2 data-[state=on]:ring-primary"
    >
      <AspectRatio ratio={1} className="relative overflow-hidden rounded-[18px]">
        <AssetImage src={image.url} alt={image.alt} fill sizes="120px" className="object-cover" />
      </AspectRatio>
    </ToggleGroupItem>
  );
}
