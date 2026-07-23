"use client";

import { Plus } from "lucide-react";
import { PortfolioProjectGalleryImageEditor } from "@/components/dashboard/portfolio-project-gallery-image-editor";
import type { TemplateId } from "@/lib/dashboard-data";

export function PortfolioProjectGalleryEditor({
  onChange,
  templateId,
  value,
}: {
  onChange: (value: string[]) => void;
  templateId: TemplateId;
  value: string[];
}) {
  return (
    <section className="space-y-3">
      <div>
        <h3 className="font-label text-label-md text-on-surface">
          Galería adicional
        </h3>
        <p className="mt-1 text-body-sm text-on-surface-variant">
          Añade hasta 12 imágenes para desarrollar visualmente el proyecto.
        </p>
      </div>
      {value.map((image, index) => (
        <PortfolioProjectGalleryImageEditor
          index={index}
          key={`${index}-${image}`}
          onChange={(nextImage) =>
            onChange(
              value.map((currentImage, currentIndex) =>
                currentIndex === index ? nextImage : currentImage,
              ),
            )
          }
          onRemove={() =>
            onChange(
              value.filter((_, currentIndex) => currentIndex !== index),
            )
          }
          templateId={templateId}
          value={image}
        />
      ))}
      <button
        className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-outline-variant px-4 py-3 font-label text-label-md text-on-surface-variant transition-colors hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-50"
        disabled={value.length >= 12}
        onClick={() => onChange([...value, ""])}
        type="button"
      >
        <Plus aria-hidden className="size-4" />
        Añadir imagen
      </button>
    </section>
  );
}
