"use client";
import { ToggleGroup } from "@/components/ui/toggle-group";
import type { PublicProductDto } from "@/lib/domain/dtos";
import { VariantOption } from "./variant-option";
import { VariantSpec } from "./variant-spec";

const COPY = {
  title: "Disponible en",
  size: "Talla",
  color: "Color",
  notice: "La disponibilidad puede cambiar. Consúltanos antes de venir si buscas una talla o color concreto.",
} as const;

export function VariantPicker({ variants, variantId, size, color, onSelect }: { variants: PublicProductDto["variants"]; variantId: string; size: string; color: string; onSelect: (id: string) => void }) {
  if (variants.length < 2 && !size && !color) return null;
  return (
    <div className="mt-8">
      <p className="text-sm font-semibold">{COPY.title}</p>
      {variants.length > 1 ? (
        <ToggleGroup type="single" value={variantId} onValueChange={(value) => value && onSelect(value)} aria-label={COPY.title} className="mt-4">
          {variants.map((variant) => (
            <VariantOption key={variant.id} variant={variant} />
          ))}
        </ToggleGroup>
      ) : null}
      {size || color ? (
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {size ? <VariantSpec label={COPY.size} value={size} /> : null}
          {color ? <VariantSpec label={COPY.color} value={color} /> : null}
        </div>
      ) : null}
      <p className="mt-3 text-xs leading-5 text-ink/45">{COPY.notice}</p>
    </div>
  );
}
