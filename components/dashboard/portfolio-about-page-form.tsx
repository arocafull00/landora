"use client";

import { Controller } from "react-hook-form";
import type {
  Control,
  FieldErrors,
  UseFormRegisterReturn,
} from "react-hook-form";
import { ImageField } from "@/components/dashboard/image-field";
import type {
  PortfolioAboutPageContent,
  TemplateId,
} from "@/lib/dashboard-data";

type ImageFieldName = "image" | "storyImage";

export function PortfolioAboutPageForm({
  control,
  errors,
  imageField,
  introField,
  onImageChange,
  onSubmit,
  storyBodyField,
  storyImageField,
  storyTitleField,
  templateId,
  titleField,
}: {
  control: Control<PortfolioAboutPageContent>;
  errors: FieldErrors<PortfolioAboutPageContent>;
  imageField: ImageFieldName;
  introField: UseFormRegisterReturn<"intro">;
  onImageChange: (field: ImageFieldName, value: string) => void;
  onSubmit: () => void;
  storyBodyField: UseFormRegisterReturn<"storyBody">;
  storyImageField: ImageFieldName;
  storyTitleField: UseFormRegisterReturn<"storyTitle">;
  templateId: TemplateId;
  titleField: UseFormRegisterReturn<"title">;
}) {
  return (
    <form className="space-y-8 py-unit-lg" onSubmit={onSubmit}>
      <section className="space-y-5">
        <div>
          <h2 className="text-body-lg font-semibold text-on-surface">
            Cabecera About me
          </h2>
          <p className="mt-1 text-body-sm text-on-surface-variant">
            Este contenido es independiente de la portada de Inicio.
          </p>
        </div>

        <label className="block">
          <span className="mb-2 block font-label text-label-md text-on-surface-variant">
            Título
          </span>
          <input
            {...titleField}
            className="w-full rounded-lg border border-outline-variant bg-surface px-3 py-2 text-body-md text-on-surface outline-none transition-shadow focus:border-primary focus:ring-1 focus:ring-primary"
            data-editor-id="about-title"
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
            Introducción
          </span>
          <textarea
            {...introField}
            className="min-h-36 w-full resize-y rounded-lg border border-outline-variant bg-surface px-3 py-2 text-body-md text-on-surface outline-none transition-shadow focus:border-primary focus:ring-1 focus:ring-primary"
            data-editor-id="about-intro"
            maxLength={1200}
          />
          {errors.intro?.message ? (
            <span className="mt-1 block text-body-sm text-danger">
              {errors.intro.message}
            </span>
          ) : null}
        </label>

        <Controller
          control={control}
          name={imageField}
          render={({ field }) => (
            <ImageField
              label="Imagen principal"
              onChange={(value) => onImageChange(imageField, value)}
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
      </section>

      <section className="space-y-5 border-t border-outline-variant pt-8">
        <div>
          <h2 className="text-body-lg font-semibold text-on-surface">
            Mi historia
          </h2>
          <p className="mt-1 text-body-sm text-on-surface-variant">
            Añade una narración personal acompañada de una imagen.
          </p>
        </div>

        <label className="block">
          <span className="mb-2 block font-label text-label-md text-on-surface-variant">
            Título
          </span>
          <input
            {...storyTitleField}
            className="w-full rounded-lg border border-outline-variant bg-surface px-3 py-2 text-body-md text-on-surface outline-none transition-shadow focus:border-primary focus:ring-1 focus:ring-primary"
            data-editor-id="about-story-title"
            maxLength={120}
            type="text"
          />
          {errors.storyTitle?.message ? (
            <span className="mt-1 block text-body-sm text-danger">
              {errors.storyTitle.message}
            </span>
          ) : null}
        </label>

        <label className="block">
          <span className="mb-2 block font-label text-label-md text-on-surface-variant">
            Contenido
          </span>
          <textarea
            {...storyBodyField}
            className="min-h-56 w-full resize-y rounded-lg border border-outline-variant bg-surface px-3 py-2 text-body-md text-on-surface outline-none transition-shadow focus:border-primary focus:ring-1 focus:ring-primary"
            data-editor-id="about-story-body"
            maxLength={5000}
          />
          {errors.storyBody?.message ? (
            <span className="mt-1 block text-body-sm text-danger">
              {errors.storyBody.message}
            </span>
          ) : null}
        </label>

        <Controller
          control={control}
          name={storyImageField}
          render={({ field }) => (
            <ImageField
              label="Imagen de Mi historia"
              onChange={(value) =>
                onImageChange(storyImageField, value)
              }
              templateId={templateId}
              value={field.value}
            />
          )}
        />
        {errors.storyImage?.message ? (
          <span className="block text-body-sm text-danger">
            {errors.storyImage.message}
          </span>
        ) : null}
      </section>
    </form>
  );
}
