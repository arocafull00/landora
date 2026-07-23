"use client";

import { Trash2 } from "lucide-react";
import { ImageField } from "@/components/dashboard/image-field";
import type { TemplateId } from "@/lib/dashboard-data";

export function PortfolioProjectGalleryImageEditor({
  index,
  onChange,
  onRemove,
  templateId,
  value,
}: {
  index: number;
  onChange: (value: string) => void;
  onRemove: () => void;
  templateId: TemplateId;
  value: string;
}) {
  return (
    <div className="space-y-2 rounded-lg border border-outline-variant bg-surface-container-low p-3">
      <div className="flex items-center justify-between gap-3">
        <span className="font-label text-label-sm text-on-surface-variant">
          Imagen {index + 1}
        </span>
        <button
          aria-label={`Eliminar imagen ${index + 1}`}
          className="inline-flex items-center gap-1.5 text-body-sm text-danger transition-colors hover:text-danger/80"
          onClick={onRemove}
          type="button"
        >
          <Trash2 aria-hidden className="size-4" />
          Eliminar
        </button>
      </div>
      <ImageField
        label="Archivo"
        onChange={onChange}
        templateId={templateId}
        value={value}
      />
    </div>
  );
}
