"use client";

import type { FieldErrors, UseFormRegister } from "react-hook-form";
import type { ProductFormValues } from "@/lib/schemas/products";
import { ProductEditorCard } from "./product-editor-card";
import { ProductField } from "./product-field";

const COPY = {
  title: "Precio del producto",
  description: "El mismo precio para todas las tallas y colores.",
  price: "Precio (€)",
  previous: "Precio anterior (€)",
  optional: "Opcional",
} as const;

export function ProductPriceCard({
  register,
  errors,
}: {
  register: UseFormRegister<ProductFormValues>;
  errors: FieldErrors<ProductFormValues>;
}) {
  return (
    <ProductEditorCard title={COPY.title} description={COPY.description}>
      <div className="grid gap-4 sm:grid-cols-2">
        <ProductField label={COPY.price} binding={register("priceCents")} inputMode="decimal" error={errors.priceCents?.message} />
        <ProductField
          label={COPY.previous}
          binding={register("previousPriceCents")}
          inputMode="decimal"
          placeholder={COPY.optional}
          error={errors.previousPriceCents?.message}
        />
      </div>
    </ProductEditorCard>
  );
}
