"use client";

import { Trash2 } from "lucide-react";
import type { BenefitItem } from "@/lib/dashboard-data";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ICON_OPTIONS = [
  { label: "Objetivo", value: "target" },
  { label: "Colaboración", value: "users" },
  { label: "Crecimiento", value: "trending-up" },
  { label: "Tiempo", value: "clock" },
] as const;

type PortfolioBenefitItemEditorProps = {
  index: number;
  item: BenefitItem;
  onChange: (patch: Partial<BenefitItem>) => void;
  onRemove: () => void;
};

export function PortfolioBenefitItemEditor({
  index,
  item,
  onChange,
  onRemove,
}: PortfolioBenefitItemEditorProps) {
  return (
    <div className="space-y-3 border-b border-outline-variant pb-6 last:border-0 last:pb-0">
      <div className="flex items-center justify-between gap-3">
        <p className="font-label text-label-md text-on-surface-variant">
          Elemento {index + 1}
        </p>
        <button
          aria-label={`Eliminar elemento ${index + 1} de Cómo trabajo`}
          className="inline-flex items-center gap-2 font-label text-label-md text-danger transition-colors hover:text-danger/80"
          onClick={onRemove}
          type="button"
        >
          <Trash2 aria-hidden className="size-4" />
          Eliminar
        </button>
      </div>
      <label className="block">
        <span className="mb-2 block font-label text-label-md text-on-surface-variant">
          Título
        </span>
        <input
          className="w-full rounded-lg border border-outline-variant bg-surface px-3 py-2 text-body-md text-on-surface outline-none transition-shadow focus:border-primary focus:ring-1 focus:ring-primary"
          onChange={(event) => onChange({ title: event.target.value })}
          type="text"
          value={item.title}
        />
      </label>
      <label className="block">
        <span className="mb-2 block font-label text-label-md text-on-surface-variant">
          Descripción
        </span>
        <textarea
          className="w-full resize-none rounded-lg border border-outline-variant bg-surface px-3 py-2 text-body-md text-on-surface outline-none transition-shadow focus:border-primary focus:ring-1 focus:ring-primary"
          onChange={(event) => onChange({ description: event.target.value })}
          rows={3}
          value={item.description}
        />
      </label>
      <label className="block">
        <span className="mb-2 block font-label text-label-md text-on-surface-variant">
          Icono
        </span>
        <Select value={item.icon} onValueChange={(icon) => onChange({ icon })}>
          <SelectTrigger className="w-full bg-surface">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {ICON_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </label>
    </div>
  );
}
