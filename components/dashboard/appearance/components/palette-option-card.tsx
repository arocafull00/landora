"use client";

import { Check } from "lucide-react";
import { RadioGroupItem } from "@/components/ui/radio-group";
import type { TemplateId } from "@/lib/dashboard-data";

export function PaletteOptionCard({
  description,
  id,
  label,
  selected,
  template,
}: {
  description: string;
  id: string;
  label: string;
  selected: boolean;
  template: TemplateId;
}) {
  return (
    <RadioGroupItem className="items-start gap-4 p-3" value={id}>
      <span className="min-w-0 flex-1">
        <span
          aria-hidden
          className="mb-3 flex h-16 overflow-hidden rounded-md border border-outline-variant"
          data-palette={id}
          data-site-theme=""
          data-template={template}
          data-typography="default"
        >
          <span className="h-full flex-1 bg-[var(--site-surface)]" />
          <span className="h-full w-12 bg-[var(--site-primary)]" />
          <span className="h-full w-10 bg-[var(--site-accent)]" />
          <span className="h-full w-8 bg-[var(--site-text)]" />
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
