"use client";

import { Trash2 } from "lucide-react";
import { EditorTextArea } from "@/components/dashboard/editor-text-area";
import { EditorTextField } from "@/components/dashboard/editor-text-field";
import {
  PORTFOLIO_BENEFIT_ICON_OPTIONS,
  PORTFOLIO_BENEFITS_EDITOR_COPY,
} from "@/components/dashboard/portfolio-benefits-editor/portfolio-benefits-editor-copy";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { BenefitItem } from "@/lib/dashboard-data";

export function PortfolioBenefitItemForm({
  item,
  onChange,
  onRemove,
}: {
  item: BenefitItem;
  onChange: (patch: Partial<BenefitItem>) => void;
  onRemove: () => void;
}) {
  return (
    <div className="space-y-4 border-t border-outline-variant bg-surface-container-lowest p-4">
      <EditorTextField
        label="Título"
        onChange={(value) => onChange({ title: value })}
        value={item.title}
      />
      <EditorTextArea
        label="Descripción"
        onChange={(value) => onChange({ description: value })}
        value={item.description}
      />
      <div className="space-y-2">
        <span className="block font-label text-label-md text-on-surface-variant">
          Icono
        </span>
        <Select onValueChange={(icon) => onChange({ icon })} value={item.icon}>
          <SelectTrigger className="h-10 w-full border-outline-variant bg-surface text-body-md text-on-surface focus:ring-primary">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-surface-container-lowest">
            {PORTFOLIO_BENEFIT_ICON_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <button
        className="inline-flex h-9 w-full items-center justify-center gap-2 rounded-lg font-label text-label-sm font-medium text-error transition-colors hover:bg-error-container"
        onClick={onRemove}
        type="button"
      >
        <Trash2 aria-hidden className="size-4" />
        {PORTFOLIO_BENEFITS_EDITOR_COPY.deleteItem}
      </button>
    </div>
  );
}
