"use client";

import { useState } from "react";
import { useWatch, type Control } from "react-hook-form";
import type { ProductFormValues, ProductValues } from "@/lib/schemas/products";
import { LOW_STOCK_THRESHOLD } from "@/lib/products";

const COPY = { variant: "Variante", size: "Talla", empty: "—" } as const;

function stockTone(units: number | null) {
  if (units === null) return "text-ink-secondary";
  if (units === 0) return "text-danger-strong";
  if (units <= LOW_STOCK_THRESHOLD) return "text-warning-strong";
  return "text-ink-secondary";
}

export function useProductVariantRow(index: number, control: Control<ProductFormValues, unknown, ProductValues>, hasErrors: boolean) {
  const variant = useWatch({ control, name: `variants.${index}` });
  const [expanded, setExpanded] = useState(() => !variant.size && !variant.color && !variant.sku);
  const parsedStock = variant.stock === "" ? null : Number(variant.stock);
  const units = parsedStock === null || Number.isNaN(parsedStock) ? null : parsedStock;
  const name = [variant.size, variant.color].filter(Boolean).join(" · ") || `${COPY.variant} ${index + 1}`;
  const detail = [variant.size ? `${COPY.size} ${variant.size}` : "", variant.color].filter(Boolean).join(" / ");
  return {
    name,
    detail,
    sku: variant.sku || COPY.empty,
    stockText: units === null ? COPY.empty : String(units),
    stockTone: stockTone(units),
    open: expanded || hasErrors,
    toggle: () => setExpanded((current) => !current),
  };
}
