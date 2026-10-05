import type { FieldErrors, UseFormRegister } from "react-hook-form";
import type { ProductFormValues } from "@/lib/schemas/products";
import { ProductField } from "./product-field";
import { Button } from "@/components/ui/button";

const COPY = { variant: "Variante", size: "Talla", color: "Color", sku: "SKU / referencia", stock: "Existencias", remove: "Eliminar variante" } as const;
export function ProductVariantForm({ index, register, error, remove, canRemove }: { index: number; register: UseFormRegister<ProductFormValues>; error: FieldErrors<ProductFormValues>["variants"]; remove: () => void; canRemove: boolean }) {
  const errors = error?.[index];
  return <fieldset className="space-y-4"><legend className="mb-4 text-sm font-medium text-ink-secondary">{COPY.variant} {index + 1}</legend><div className="grid gap-4 sm:grid-cols-3">
    <ProductField label={COPY.size} binding={register(`variants.${index}.size`)} error={errors?.size?.message} />
    <ProductField label={COPY.color} binding={register(`variants.${index}.color`)} error={errors?.color?.message} />
    <ProductField label={COPY.sku} binding={register(`variants.${index}.sku`)} error={errors?.sku?.message} />
    <ProductField label={COPY.stock} binding={register(`variants.${index}.stock`)} inputMode="numeric" error={errors?.stock?.message} />
  </div><Button type="button" variant="ghost" size="sm" className="text-danger hover:text-danger" disabled={!canRemove} onClick={remove}>{COPY.remove}</Button></fieldset>;
}
