"use client";

import type {
  Control,
  FieldErrors,
  UseFormRegisterReturn,
} from "react-hook-form";
import { Controller } from "react-hook-form";
import { ImageField } from "@/components/dashboard/image-field";
import { PortfolioGalleryTagsField } from "@/components/dashboard/portfolio-gallery-tags-field";
import { PortfolioProjectGalleryEditor } from "@/components/dashboard/portfolio-project-gallery-editor";
import type { TemplateId } from "@/lib/dashboard-data";
import type { PortfolioProjectPageFormValues } from "@/lib/schemas/portfolio-project";

export function PortfolioProjectPageForm({
  control,
  errors,
  onImageChange,
  onProjectGalleryChange,
  onSubmit,
  onTagsChange,
  projectBodyField,
  projectSlugField,
  summaryField,
  templateId,
  titleField,
}: {
  control: Control<PortfolioProjectPageFormValues>;
  errors: FieldErrors<PortfolioProjectPageFormValues>;
  onImageChange: (value: string) => void;
  onProjectGalleryChange: (value: string[]) => void;
  onSubmit: () => void;
  onTagsChange: (value: string[]) => void;
  projectBodyField: UseFormRegisterReturn<"projectBody">;
  projectSlugField: UseFormRegisterReturn<"projectSlug">;
  summaryField: UseFormRegisterReturn<"description">;
  templateId: TemplateId;
  titleField: UseFormRegisterReturn<"title">;
}) {
  return (
    <form className="space-y-8 py-unit-lg" onSubmit={onSubmit}>
      <section className="space-y-5">
        <div>
          <h2 className="text-body-lg font-semibold text-on-surface">
            Página del proyecto
          </h2>
          <p className="mt-1 text-body-sm text-on-surface-variant">
            La portada, el título, el resumen y las etiquetas también se
            muestran en la tarjeta.
          </p>
        </div>
        <Controller
          control={control}
          name="image"
          render={({ field }) => (
            <ImageField
              label="Imagen de portada"
              onChange={(value) => {
                field.onChange(value);
                onImageChange(value);
              }}
              templateId={templateId}
              value={field.value}
            />
          )}
        />
        {errors.image?.message ? (
          <span className="block text-body-sm text-danger">
            {errors.image.message}
          </span>
        ) : null}
        <label className="block">
          <span className="mb-2 block font-label text-label-md text-on-surface-variant">
            Título
          </span>
          <input
            {...titleField}
            className="w-full rounded-lg border border-outline-variant bg-surface px-3 py-2 text-body-md text-on-surface outline-none transition-shadow focus:border-primary focus:ring-1 focus:ring-primary"
            data-editor-id="project-title"
            maxLength={120}
            type="text"
          />
          {errors.title?.message ? (
            <span className="mt-1 block text-body-sm text-danger">
              {errors.title.message}
            </span>
          ) : null}
        </label>
        <label className="block">
          <span className="mb-2 block font-label text-label-md text-on-surface-variant">
            Resumen
          </span>
          <textarea
            {...summaryField}
            className="min-h-28 w-full resize-y rounded-lg border border-outline-variant bg-surface px-3 py-2 text-body-md text-on-surface outline-none transition-shadow focus:border-primary focus:ring-1 focus:ring-primary"
            data-editor-id="project-summary"
            maxLength={500}
          />
          {errors.description?.message ? (
            <span className="mt-1 block text-body-sm text-danger">
              {errors.description.message}
            </span>
          ) : null}
        </label>
        <Controller
          control={control}
          name="tags"
          render={({ field }) => (
            <PortfolioGalleryTagsField
              maxItems={10}
              onChange={(value) => {
                field.onChange(value);
                onTagsChange(value);
              }}
              value={field.value}
            />
          )}
        />
      </section>

      <section className="space-y-5 border-t border-outline-variant pt-8">
        <label className="block">
          <span className="mb-2 block font-label text-label-md text-on-surface-variant">
            URL del proyecto
          </span>
          <div className="flex items-center rounded-lg border border-outline-variant bg-surface focus-within:border-primary focus-within:ring-1 focus-within:ring-primary">
            <span className="pl-3 text-body-md text-on-surface-variant">
              /proyectos/
            </span>
            <input
              {...projectSlugField}
              className="min-w-0 flex-1 bg-transparent px-1 py-2 text-body-md text-on-surface outline-none"
              maxLength={80}
              type="text"
            />
          </div>
          {errors.projectSlug?.message ? (
            <span className="mt-1 block text-body-sm text-danger">
              {errors.projectSlug.message}
            </span>
          ) : null}
        </label>
        <label className="block">
          <span className="mb-2 block font-label text-label-md text-on-surface-variant">
            Descripción extensa
          </span>
          <textarea
            {...projectBodyField}
            className="min-h-72 w-full resize-y rounded-lg border border-outline-variant bg-surface px-3 py-2 text-body-md text-on-surface outline-none transition-shadow focus:border-primary focus:ring-1 focus:ring-primary"
            data-editor-id="project-body"
            maxLength={10000}
          />
          {errors.projectBody?.message ? (
            <span className="mt-1 block text-body-sm text-danger">
              {errors.projectBody.message}
            </span>
          ) : null}
        </label>
      </section>

      <section className="border-t border-outline-variant pt-8">
        <Controller
          control={control}
          name="projectGallery"
          render={({ field }) => (
            <PortfolioProjectGalleryEditor
              onChange={(value) => {
                field.onChange(value);
                onProjectGalleryChange(value);
              }}
              templateId={templateId}
              value={field.value}
            />
          )}
        />
        {errors.projectGallery?.message ? (
          <span className="mt-2 block text-body-sm text-danger">
            {errors.projectGallery.message}
          </span>
        ) : null}
      </section>
    </form>
  );
}
