"use client";

import { Check } from "lucide-react";
import { RadioGroupItem } from "@/components/ui/radio-group";
import type { TemplateId } from "@/lib/dashboard-data";

export function TypographyOptionCard({
  description,
  id,
  label,
  paletteId,
  selected,
  template,
}: {
  description: string;
  id: string;
  label: string;
  paletteId: string;
  selected: boolean;
  template: TemplateId;
}) {
  return (
    <RadioGroupItem className="items-start gap-4 p-3" value={id}>
      <span className="min-w-0 flex-1">
        <span
          aria-hidden
          className="mb-3 block rounded-md border border-outline-variant bg-[var(--site-surface)] px-4 py-3 text-[var(--site-text)]"
          data-palette={paletteId}
          data-site-theme=""
          data-template={template}
          data-typography={id}
        >
          <span className="block font-[family-name:var(--site-font-display)] text-xl font-semibold leading-tight">
            Tu negocio, con carácter
          </span>
          <span className="mt-1 block font-[family-name:var(--site-font-body)] text-xs text-[var(--site-text-muted)]">
            Una identidad clara y fácil de recordar.
          </span>
        </span>
        <span className="flex items-center justify-between gap-3">
          <span className="font-body text-body-md font-semibold text-on-surface">
            {label}
          </span>
          {selected ? <Check aria-hidden className="size-4 shrink-0 text-primary" /> : null}
        </span>
        <span className="mt-1 block text-body-sm text-on-surface-variant">
          {description}
        </span>
      </span>
    </RadioGroupItem>
  );
}
