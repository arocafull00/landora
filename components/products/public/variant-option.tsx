"use client";
import { ToggleGroupItem } from "@/components/ui/toggle-group";
import type { PublicProductDto } from "@/lib/domain/dtos";

const COPY = { standard: "Estándar", out: "Agotado" } as const;

export function VariantOption({ variant }: { variant: PublicProductDto["variants"][number] }) {
  const label = [variant.size, variant.color].filter(Boolean).join(" / ") || COPY.standard;
  return (
    <ToggleGroupItem
      value={variant.id}
      className="rounded-full border-border bg-surface px-4 py-2 font-semibold hover:bg-tone-1 data-[state=on]:border-primary data-[state=on]:bg-tone-1"
    >
      {label}
      {variant.available ? null : <span className="ml-2 text-xs font-medium text-ink/50">{COPY.out}</span>}
    </ToggleGroupItem>
  );
}
