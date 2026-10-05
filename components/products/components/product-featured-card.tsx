"use client";

import { Controller, type Control } from "react-hook-form";
import type { ProductFormValues, ProductValues } from "@/lib/schemas/products";
import { Switch } from "@/components/ui/switch";
import { ProductEditorCard } from "./product-editor-card";

const COPY = {
  title: "Producto destacado",
  hint: "Se mostrará con prioridad en la tienda.",
} as const;

export function ProductFeaturedCard({ control }: { control: Control<ProductFormValues, unknown, ProductValues> }) {
  return (
    <ProductEditorCard>
      <Controller
        name="featured"
        control={control}
        render={({ field }) => (
          <div className="flex items-center justify-between gap-4">
            <div>
              <label htmlFor="product-featured" className="text-sm font-semibold text-ink">
                {COPY.title}
              </label>
              <p id="product-featured-hint" className="mt-1 text-xs text-ink-secondary">
                {COPY.hint}
              </p>
            </div>
            <Switch
              id="product-featured"
              aria-describedby="product-featured-hint"
              checked={field.value}
              onCheckedChange={field.onChange}
            />
          </div>
        )}
      />
    </ProductEditorCard>
  );
}
