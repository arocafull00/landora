"use client";

import { Trash2 } from "lucide-react";

import { ImageField } from "@/components/dashboard/image-field";
import { PortfolioGalleryTagsField } from "@/components/dashboard/portfolio-gallery-tags-field";
import type { GalleryItem, TemplateId } from "@/lib/dashboard-data";

type PortfolioProjectItemEditorProps = {
  index: number;
  item: GalleryItem;
  onChange: (patch: Partial<GalleryItem>) => void;
  onRemove: () => void;
  templateId: TemplateId;
};

export function PortfolioProjectItemEditor({
  index,
  item,
  onChange,
  onRemove,
  templateId,
}: PortfolioProjectItemEditorProps) {
  return (
    <div className="space-y-3 border-b border-outline-variant pb-6 last:border-0 last:pb-0">
      <div className="flex items-center justify-between gap-3">
        <p className="font-label text-label-md text-on-surface-variant">
          Proyecto {index + 1}
        </p>
        <button
          aria-label={`Eliminar proyecto ${index + 1}`}
          className="inline-flex items-center gap-2 font-label text-label-md text-error transition-colors hover:text-error/80"
          onClick={onRemove}
          type="button"
        >
          <Trash2 aria-hidden className="size-4" />
          Eliminar
        </button>
      </div>
      <ImageField
        label="Imagen"
        onChange={(value) => onChange({ image: value })}
        templateId={templateId}
        value={item.image ?? ""}
      />
      <label className="block">
        <span className="mb-2 block font-label text-label-md text-on-surface-variant">
          Título (opcional)
        </span>
        <input
          className="w-full rounded-lg border border-outline-variant bg-surface px-3 py-2 text-body-md text-on-surface outline-none transition-shadow focus:border-primary focus:ring-1 focus:ring-primary"
          onChange={(event) => onChange({ title: event.target.value })}
          type="text"
          value={item.title ?? ""}
        />
      </label>
      <label className="block">
        <span className="mb-2 block font-label text-label-md text-on-surface-variant">
          Descripción (opcional)
        </span>
        <textarea
          className="w-full resize-none rounded-lg border border-outline-variant bg-surface px-3 py-2 text-body-md text-on-surface outline-none transition-shadow focus:border-primary focus:ring-1 focus:ring-primary"
          onChange={(event) => onChange({ description: event.target.value })}
          rows={2}
          value={item.description ?? ""}
        />
      </label>
      <PortfolioGalleryTagsField
        onChange={(value) => onChange({ tags: value })}
        value={item.tags ?? []}
      />
      <label className="block">
        <span className="mb-2 block font-label text-label-md text-on-surface-variant">
          Enlace (opcional)
        </span>
        <input
          className="w-full rounded-lg border border-outline-variant bg-surface px-3 py-2 text-body-md text-on-surface outline-none transition-shadow focus:border-primary focus:ring-1 focus:ring-primary"
          onChange={(event) => onChange({ link: event.target.value })}
          placeholder="https://..."
          type="text"
          value={item.link ?? ""}
        />
      </label>
    </div>
  );
}
