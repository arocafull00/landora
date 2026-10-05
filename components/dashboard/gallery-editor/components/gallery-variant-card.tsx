"use client";

import { Check } from "lucide-react";
import { AssetImage } from "@/components/ui/asset-image";
import { Button } from "@/components/ui/button";
import type { GalleryVariantDefinition } from "@/components/templates/shared/galleries/gallery-variant-registry";
import type { GalleryVariantId } from "@/lib/dashboard-data";

export function GalleryVariantCard({
  definition,
  onSelect,
  selected,
}: {
  definition: GalleryVariantDefinition;
  onSelect: (variantId: GalleryVariantId) => void;
  selected: boolean;
}) {
  return (
    <Button
      aria-checked={selected}
      className="group h-auto w-full items-start justify-start gap-3 rounded-none px-0 py-3 text-left whitespace-normal"
      onClick={() => onSelect(definition.id)}
      role="radio"
      type="button"
      variant="ghost"
    >
      <span className="relative block size-16 shrink-0 overflow-hidden rounded-md bg-surface-variant">
        <AssetImage
          alt={`Galería ${definition.label}`}
          className="object-cover"
          fill
          sizes="64px"
          src={definition.thumbnail}
        />
        {selected ? (
          <span className="absolute right-2 top-2 flex size-6 items-center justify-center rounded-full bg-primary text-on-primary">
            <Check className="size-3.5" aria-hidden />
          </span>
        ) : null}
      </span>
      <span className="block min-w-0 space-y-1">
        <span
          className={`block text-body-md font-semibold ${
            selected ? "text-primary" : "text-on-surface"
          }`}
        >
          {definition.label}
        </span>
        <span className="block text-body-sm text-on-surface-variant">
          {definition.description}
        </span>
      </span>
    </Button>
  );
}
