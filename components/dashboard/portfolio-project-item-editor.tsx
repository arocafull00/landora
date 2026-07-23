"use client";

import { FilePenLine, Trash2 } from "lucide-react";

import { ImageField } from "@/components/dashboard/image-field";
import { PortfolioGalleryTagsField } from "@/components/dashboard/portfolio-gallery-tags-field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { GalleryItem, TemplateId } from "@/lib/dashboard-data";
import {
  createUniqueProjectSlug,
  DEFAULT_PROJECT_BODY,
  resolveProjectLinkType,
} from "@/lib/portfolio-projects";

type PortfolioProjectItemEditorProps = {
  gallery: GalleryItem[];
  index: number;
  item: GalleryItem;
  onChange: (patch: Partial<GalleryItem>) => void;
  onEditPage: () => void;
  onRemove: () => void;
  templateId: TemplateId;
};

export function PortfolioProjectItemEditor({
  gallery,
  index,
  item,
  onChange,
  onEditPage,
  onRemove,
  templateId,
}: PortfolioProjectItemEditorProps) {
  const linkType = resolveProjectLinkType(item);

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
      <div className="space-y-2">
        <span className="block font-label text-label-md text-on-surface-variant">
          Acción al pulsar
        </span>
        <Select
          onValueChange={(value) => {
            if (value !== "internal") {
              onChange({ linkType: value as "none" | "external" });
              return;
            }

            const title = item.title || `Proyecto ${index + 1}`;
            onChange({
              linkType: "internal",
              title,
              projectSlug:
                item.projectSlug ||
                createUniqueProjectSlug(title, gallery, item.id),
              projectBody: item.projectBody || DEFAULT_PROJECT_BODY,
            });
          }}
          value={linkType}
        >
          <SelectTrigger className="w-full border-outline-variant bg-surface text-body-md text-on-surface focus:ring-primary">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-surface-container-lowest">
            <SelectItem value="none">Sin enlace</SelectItem>
            <SelectItem value="internal">Página de proyecto</SelectItem>
            <SelectItem value="external">Enlace externo</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {linkType === "external" ? (
        <label className="block">
          <span className="mb-2 block font-label text-label-md text-on-surface-variant">
            URL externa
          </span>
          <input
            className="w-full rounded-lg border border-outline-variant bg-surface px-3 py-2 text-body-md text-on-surface outline-none transition-shadow focus:border-primary focus:ring-1 focus:ring-primary"
            onChange={(event) => onChange({ link: event.target.value })}
            placeholder="https://..."
            type="url"
            value={item.link ?? ""}
          />
        </label>
      ) : null}
      {linkType === "internal" ? (
        <button
          className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 font-label text-label-md text-on-primary transition-colors hover:bg-primary-container"
          onClick={onEditPage}
          type="button"
        >
          <FilePenLine aria-hidden className="size-4" />
          Editar página del proyecto
        </button>
      ) : null}
    </div>
  );
}
