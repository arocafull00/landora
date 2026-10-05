import type { FieldErrors, UseFormRegister } from "react-hook-form";
import type { ProductFormValues } from "@/lib/schemas/products";
import { ProductField } from "./product-field";
import { Button } from "@/components/ui/button";

const COPY = { variant: "Variante", size: "Talla", color: "Color", sku: "SKU / referencia", stock: "Existencias", price: "Precio propio (€)", previous: "Precio anterior propio (€)", remove: "Eliminar variante", inherit: "Vacío: usar precio del producto" } as const;
export function ProductVariantForm({ index, register, error, remove, canRemove }: { index: number; register: UseFormRegister<ProductFormValues>; error: FieldErrors<ProductFormValues>["variants"]; remove: () => void; canRemove: boolean }) {
  const errors = error?.[index];
  return <fieldset className="space-y-3 rounded-lg border border-border p-4"><legend className="px-2 text-sm font-semibold">{COPY.variant} {index + 1}</legend><div className="grid gap-3 sm:grid-cols-3">
    <ProductField label={COPY.size} binding={register(`variants.${index}.size`)} error={errors?.size?.message} />
    <ProductField label={COPY.color} binding={register(`variants.${index}.color`)} error={errors?.color?.message} />
    <ProductField label={COPY.sku} binding={register(`variants.${index}.sku`)} error={errors?.sku?.message} />
    <ProductField label={COPY.stock} binding={register(`variants.${index}.stock`)} inputMode="numeric" error={errors?.stock?.message} />
    <ProductField label={COPY.price} binding={register(`variants.${index}.priceCents`)} inputMode="decimal" placeholder={COPY.inherit} error={errors?.priceCents?.message} />
    <ProductField label={COPY.previous} binding={register(`variants.${index}.previousPriceCents`)} inputMode="decimal" placeholder={COPY.inherit} error={errors?.previousPriceCents?.message} />
  </div><Button type="button" variant="outline" size="sm" disabled={!canRemove} onClick={remove}>{COPY.remove}</Button></fieldset>;
}
