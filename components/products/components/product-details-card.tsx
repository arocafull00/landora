"use client";

import type { FieldErrors, UseFormRegister } from "react-hook-form";
import type { ProductFormValues } from "@/lib/schemas/products";
import { ProductEditorCard } from "./product-editor-card";
import { ProductField } from "./product-field";

const COPY = {
  title: "Detalles",
  material: "Material",
  composition: "Composición",
  dimensions: "Medidas",
  weight: "Peso",
} as const;

export function ProductDetailsCard({
  register,
  errors,
}: {
  register: UseFormRegister<ProductFormValues>;
  errors: FieldErrors<ProductFormValues>;
}) {
  return (
    <ProductEditorCard title={COPY.title}>
      <div className="grid gap-4 sm:grid-cols-2">
        <ProductField label={COPY.material} binding={register("material")} error={errors.material?.message} />
        <ProductField label={COPY.composition} binding={register("composition")} error={errors.composition?.message} />
        <ProductField label={COPY.dimensions} binding={register("dimensions")} error={errors.dimensions?.message} />
        <ProductField label={COPY.weight} binding={register("weight")} error={errors.weight?.message} />
      </div>
    </ProductEditorCard>
  );
}
