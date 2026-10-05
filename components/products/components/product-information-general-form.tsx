"use client";

import type { FieldErrors, UseFormRegister } from "react-hook-form";
import type { ProductFormValues } from "@/lib/schemas/products";
import { ProductEditorCard } from "./product-editor-card";
import { ProductField } from "./product-field";

const COPY = {
  title: "Título",
  subtitle: "Subtítulo",
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
    <ProductEditorCard>
      <ProductField label={COPY.title} binding={register("title")} onBlur={generateSlug} error={errors.title?.message} />
      <ProductField label={COPY.subtitle} binding={register("subtitle")} error={errors.subtitle?.message} />
      <div className="space-y-1.5">
        <label htmlFor="product-description" className="text-sm font-medium">
          {COPY.description}
        </label>
        <textarea
          id="product-description"
          rows={5}
          {...register("description")}
          className="min-h-36 w-full resize-none rounded-md border border-input bg-surface p-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-primary"
        />
        {errors.description ? <p className="text-sm text-danger">{errors.description.message}</p> : null}
      </div>
    </ProductEditorCard>
  );
}
