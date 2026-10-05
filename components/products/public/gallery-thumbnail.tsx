"use client";
import type { ProductImage } from "@/lib/domain/dtos";
import { AssetImage } from "@/components/ui/asset-image";
const COPY = { image: "Ver imagen" } as const;

export function GalleryThumbnail({ image, index, active, onSelect }: { image: ProductImage; index: number; active: boolean; onSelect: () => void }) {
  return <button type="button" aria-label={`${COPY.image} ${index + 1}`} aria-pressed={active} onClick={onSelect} className={`relative aspect-square overflow-hidden rounded-lg border ${active ? "border-primary ring-2 ring-primary" : "border-border"}`}><AssetImage src={image.url} alt={image.alt} fill sizes="100px" className="object-cover" /></button>;
}
