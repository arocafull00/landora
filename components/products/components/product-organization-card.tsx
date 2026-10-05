"use client";

import { Controller, type Control, type FieldErrors, type UseFormRegister } from "react-hook-form";
import type { ProductFormValues, ProductValues } from "@/lib/schemas/products";
import { CreatableProductSelect } from "./creatable-product-select";
import { ProductEditorCard } from "./product-editor-card";
import { ProductField } from "./product-field";

const COPY = {
  title: "Organización",
  category: "Categoría",
  brand: "Marca",
  tags: "Etiquetas separadas por comas",
} as const;

export function ProductOrganizationCard({
  register,
  control,
  errors,
  categories,
  brands,
}: {
  register: UseFormRegister<ProductFormValues>;
  control: Control<ProductFormValues, unknown, ProductValues>;
  errors: FieldErrors<ProductFormValues>;
  categories: string[];
  brands: string[];
}) {
  return (
    <ProductEditorCard title={COPY.title}>
      <div className="grid gap-4 sm:grid-cols-2">
        <Controller
          name="category"
          control={control}
          render={({ field }) => (
            <CreatableProductSelect
              label={COPY.category}
              value={field.value}
              onChange={field.onChange}
              options={categories}
              error={errors.category?.message}
            />
          )}
        />
        <Controller
          name="brand"
          control={control}
          render={({ field }) => (
            <CreatableProductSelect label={COPY.brand} value={field.value} onChange={field.onChange} options={brands} error={errors.brand?.message} />
          )}
        />
      </div>
      <ProductField label={COPY.tags} binding={register("tags")} error={errors.tags?.message} />
    </ProductEditorCard>
  );
}
