"use client";

import { Check } from "lucide-react";
import type { HeroVariantId } from "@/lib/dashboard-data";
import type { HeroVariantDefinition } from "@/components/templates/shared/heroes/hero-variant-registry";
import { AssetImage } from "@/components/ui/asset-image";

export function HeroVariantCard({
  definition,
  onSelect,
  selected,
}: {
  definition: HeroVariantDefinition;
  onSelect: (variantId: HeroVariantId) => void;
  selected: boolean;
}) {
  return (
    <button
      aria-checked={selected}
      className={`group overflow-hidden rounded-xl border bg-surface text-left transition-[color,background-color,border-color,box-shadow,transform] duration-200 ${
        selected
          ? "border-primary"
          : "border-outline-variant hover:border-primary"
      }`}
      onClick={() => onSelect(definition.id)}
      role="radio"
      type="button"
    >
      <span className="relative block aspect-[16/10] overflow-hidden bg-surface-variant">
        <AssetImage
          alt={`Hero ${definition.label}`}
          className="object-cover"
          fill
          sizes="180px"
          src={definition.thumbnail}
        />
        {selected ? (
          <span className="absolute right-2 top-2 flex size-6 items-center justify-center rounded-full bg-primary text-on-primary">
            <Check className="size-3.5" aria-hidden />
          </span>
        ) : null}
      </span>
      <span className="block space-y-1 p-3">
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
    </button>
  );
}
