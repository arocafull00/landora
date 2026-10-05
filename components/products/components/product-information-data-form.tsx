"use client";

import { Controller, type Control, type FieldErrors, type UseFormRegister } from "react-hook-form";
import type { ProductFormValues, ProductValues } from "@/lib/schemas/products";
import { ProductField } from "./product-field";
import { CreatableProductSelect } from "./creatable-product-select";
import { Switch } from "@/components/ui/switch";

const COPY = {
  category: "Categoría",
  brand: "Marca",
  tags: "Etiquetas separadas por comas",
  featured: "Producto destacado",
  price: "Precio (€)",
  previous: "Precio anterior (€)",
  material: "Material",
  composition: "Composición",
  dimensions: "Medidas",
  weight: "Peso",
} as const;

export function ProductInformationDataForm({
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
    <div className="space-y-5">
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
        <ProductField label={COPY.price} binding={register("priceCents")} inputMode="decimal" error={errors.priceCents?.message} />
        <ProductField label={COPY.previous} binding={register("previousPriceCents")} inputMode="decimal" error={errors.previousPriceCents?.message} />
      </div>
      <ProductField label={COPY.tags} binding={register("tags")} error={errors.tags?.message} />
      <Controller
        name="featured"
        control={control}
        render={({ field }) => (
          <div className="flex items-center gap-3">
            <Switch id="product-featured" checked={field.value} onCheckedChange={field.onChange} />
            <label htmlFor="product-featured">{COPY.featured}</label>
          </div>
        )}
      />
      <div className="grid gap-4 sm:grid-cols-2">
        <ProductField label={COPY.material} binding={register("material")} error={errors.material?.message} />
        <ProductField label={COPY.composition} binding={register("composition")} error={errors.composition?.message} />
        <ProductField label={COPY.dimensions} binding={register("dimensions")} error={errors.dimensions?.message} />
        <ProductField label={COPY.weight} binding={register("weight")} error={errors.weight?.message} />
      </div>
    </div>
  );
}
