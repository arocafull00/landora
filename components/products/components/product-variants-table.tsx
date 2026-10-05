"use client";

import type { Control, FieldErrors, UseFieldArrayReturn, UseFormRegister } from "react-hook-form";
import type { ProductFormValues, ProductValues } from "@/lib/schemas/products";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ProductVariantRow } from "./product-variant-row";

const COPY = { variant: "Variante", sku: "SKU", stock: "Stock", price: "Precio", actions: "Acciones" } as const;
const HEAD_CLASS = "h-10 px-3 text-[11px] font-medium tracking-wide text-ink-faint uppercase";

export function ProductVariantsTable({
  variants,
  control,
  register,
  error,
}: {
  variants: UseFieldArrayReturn<ProductFormValues, "variants", "fieldKey">;
  control: Control<ProductFormValues, unknown, ProductValues>;
  register: UseFormRegister<ProductFormValues>;
  error: FieldErrors<ProductFormValues>["variants"];
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-border-subtle bg-surface">
      <Table>
        <TableHeader className="bg-surface-subtle">
          <TableRow>
            <TableHead className={`${HEAD_CLASS} px-4`}>{COPY.variant}</TableHead>
            <TableHead className={HEAD_CLASS}>{COPY.sku}</TableHead>
            <TableHead className={HEAD_CLASS}>{COPY.stock}</TableHead>
            <TableHead className={`${HEAD_CLASS} text-right`}>{COPY.price}</TableHead>
            <TableHead className={HEAD_CLASS}>
              <span className="sr-only">{COPY.actions}</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {variants.fields.map((variant, index) => (
            <ProductVariantRow
              key={variant.fieldKey}
              index={index}
              control={control}
              register={register}
              error={error}
              canRemove={variants.fields.length > 1}
              remove={() => variants.remove(index)}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
