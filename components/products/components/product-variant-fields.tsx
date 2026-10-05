import type { FieldErrors, UseFormRegister } from "react-hook-form";
import type { ProductFormValues } from "@/lib/schemas/products";
import { ProductField } from "./product-field";

const COPY = {
  size: "Talla",
  color: "Color",
  sku: "SKU / referencia",
  stock: "Existencias",
  price: "Precio propio (€)",
  previous: "Precio anterior propio (€)",
  inherit: "Vacío: usar precio del producto",
} as const;

export function ProductVariantFields({
  index,
  register,
  error,
}: {
  index: number;
  register: UseFormRegister<ProductFormValues>;
  error: NonNullable<FieldErrors<ProductFormValues>["variants"]>[number] | undefined;
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      <ProductField label={COPY.size} binding={register(`variants.${index}.size`)} error={error?.size?.message} />
      <ProductField label={COPY.color} binding={register(`variants.${index}.color`)} error={error?.color?.message} />
      <ProductField label={COPY.sku} binding={register(`variants.${index}.sku`)} error={error?.sku?.message} />
      <ProductField label={COPY.stock} binding={register(`variants.${index}.stock`)} inputMode="numeric" error={error?.stock?.message} />
      <ProductField label={COPY.price} binding={register(`variants.${index}.priceCents`)} inputMode="decimal" placeholder={COPY.inherit} error={error?.priceCents?.message} />
      <ProductField
        label={COPY.previous}
        binding={register(`variants.${index}.previousPriceCents`)}
        inputMode="decimal"
        placeholder={COPY.inherit}
        error={error?.previousPriceCents?.message}
      />
    </div>
  );
}
