"use client";

import { FilePenLine, Trash2 } from "lucide-react";
import { EditorTextArea } from "@/components/dashboard/editor-text-area";
import { EditorTextField } from "@/components/dashboard/editor-text-field";
import { ImageField } from "@/components/dashboard/image-field";
import { PortfolioGalleryTagsField } from "@/components/dashboard/portfolio-gallery-tags-field";
import { PORTFOLIO_PROJECTS_EDITOR_COPY } from "@/components/dashboard/portfolio-projects-editor/portfolio-projects-editor-copy";
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

export function PortfolioProjectItemForm({
  gallery,
  index,
  item,
  onChange,
  onEditPage,
  onRemove,
  templateId,
}: {
  gallery: GalleryItem[];
  index: number;
  item: GalleryItem;
  onChange: (patch: Partial<GalleryItem>) => void;
  onEditPage: () => void;
  onRemove: () => void;
  templateId: TemplateId;
}) {
  const linkType = resolveProjectLinkType(item);

  return (
    <div className="space-y-4 border-t border-outline-variant bg-surface-container-lowest p-4">
      <ImageField
        label="Imagen"
        onChange={(value) => onChange({ image: value })}
        templateId={templateId}
        value={item.image ?? ""}
      />
      <EditorTextField
        label="Título"
        onChange={(value) => onChange({ title: value })}
        value={item.title ?? ""}
      />
      <EditorTextArea
        label="Descripción"
        onChange={(value) => onChange({ description: value })}
        rows={3}
        value={item.description ?? ""}
      />
      <PortfolioGalleryTagsField
        onChange={(value) => onChange({ tags: value })}
        value={item.tags ?? []}
      />
      <EditorTextField
        label="URL del tour virtual (opcional)"
        onChange={(value) => onChange({ virtualTourUrl: value })}
        value={item.virtualTourUrl ?? ""}
      />
      {item.virtualTourUrl ? (
        <EditorTextField
          label="Texto del botón"
          onChange={(value) => onChange({ virtualTourLabel: value })}
          value={item.virtualTourLabel ?? ""}
        />
      ) : null}
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
          <SelectTrigger className="h-10 w-full border-outline-variant bg-surface text-body-md text-on-surface focus:ring-primary">
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
        <EditorTextField
          label="URL externa"
          onChange={(value) => onChange({ link: value })}
          value={item.link ?? ""}
        />
      ) : null}
      {linkType === "internal" ? (
        <button
          className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-primary font-label text-label-md text-on-primary transition-colors hover:bg-primary-container"
          onClick={onEditPage}
          type="button"
        >
          <FilePenLine aria-hidden className="size-4" />
          {PORTFOLIO_PROJECTS_EDITOR_COPY.editProjectPage}
        </button>
      ) : null}
      <button
        className="inline-flex h-9 w-full items-center justify-center gap-2 rounded-lg font-label text-label-sm font-medium text-error transition-colors hover:bg-error-container"
        onClick={onRemove}
        type="button"
      >
        <Trash2 aria-hidden className="size-4" />
        {PORTFOLIO_PROJECTS_EDITOR_COPY.deleteProject}
      </button>
    </div>
  );
}
