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
      className="h-auto w-16 shrink-0 rounded-xl border-0 bg-tone-1 p-1 opacity-70 transition-[opacity,box-shadow] duration-200 hover:bg-tone-1 hover:opacity-100 data-[state=on]:bg-tone-1 data-[state=on]:opacity-100 data-[state=on]:ring-2 data-[state=on]:ring-primary data-[state=on]:ring-offset-2 motion-reduce:transition-none sm:w-20"
    >
      <AspectRatio ratio={1} className="relative overflow-hidden rounded-lg">
        <AssetImage src={image.url} alt={image.alt} fill sizes="120px" className="object-cover" />
      </AspectRatio>
    </ToggleGroupItem>
  );
}
