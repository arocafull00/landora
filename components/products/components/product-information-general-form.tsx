"use client";

import type { FieldErrors, UseFormRegister } from "react-hook-form";
import type { ProductFormValues } from "@/lib/schemas/products";
import { ProductField } from "./product-field";

const COPY = {
  title: "Título",
  subtitle: "Subtítulo",
  slug: "URL de la ficha",
  description: "Descripción",
} as const;

export function ProductInformationGeneralForm({
  register,
  errors,
  generateSlug,
}: {
  register: UseFormRegister<ProductFormValues>;
  errors: FieldErrors<ProductFormValues>;
  generateSlug: () => void;
}) {
  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <ProductField label={COPY.title} binding={register("title")} onBlur={generateSlug} error={errors.title?.message} />
        <ProductField label={COPY.subtitle} binding={register("subtitle")} error={errors.subtitle?.message} />
      </div>
      <ProductField label={COPY.slug} binding={register("slug")} error={errors.slug?.message} />
      <div className="space-y-2">
        <label htmlFor="product-description" className="text-sm font-medium">
          {COPY.description}
        </label>
        <textarea
          id="product-description"
          {...register("description")}
          className="min-h-36 w-full rounded-md border border-border bg-surface p-3 outline-none focus-visible:ring-2 focus-visible:ring-primary"
        />
        {errors.description ? <p className="text-sm text-danger">{errors.description.message}</p> : null}
      </div>
    </div>
  );
}
