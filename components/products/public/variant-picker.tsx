"use client";
import { ToggleGroup } from "@/components/ui/toggle-group";
import { Separator } from "@/components/ui/separator";
import { Palette, Shirt } from "lucide-react";
import type { PublicProductDto } from "@/lib/domain/dtos";
import { VariantOption } from "./variant-option";
import { VariantSpec } from "./variant-spec";

const COPY = {
  title: "Disponible en",
  size: "Talla",
  color: "Color",
} as const;

export function VariantPicker({ variants, variantId, size, color, onSelect }: { variants: PublicProductDto["variants"]; variantId: string; size: string; color: string; onSelect: (id: string) => void }) {
  if (variants.length < 2 && !size && !color) return null;
  return (
    <div className="min-w-0">
      {size || color ? (
        <div className="space-y-4">
          {size ? <VariantSpec icon={Shirt} label={COPY.size} value={size} /> : null}
          {size && color ? <Separator /> : null}
          {color ? <VariantSpec icon={Palette} label={COPY.color} value={color} /> : null}
        </div>
      ) : null}
      {variants.length > 1 ? (
        <>
          <p className="mt-5 text-xs font-semibold text-ink-secondary">{COPY.title}</p>
          <ToggleGroup type="single" value={variantId} onValueChange={(value) => value && onSelect(value)} aria-label={COPY.title} className="mt-3">
            {variants.map((variant) => (
              <VariantOption key={variant.id} variant={variant} />
            ))}
          </ToggleGroup>
        </>
      ) : null}
    </div>
  );
}
