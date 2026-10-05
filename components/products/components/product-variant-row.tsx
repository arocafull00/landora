"use client";

import { ChevronDown, Trash2 } from "lucide-react";
import type { Control, FieldErrors, UseFormRegister } from "react-hook-form";
import type { ProductFormValues, ProductValues } from "@/lib/schemas/products";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { useProductVariantRow } from "../hooks/use-product-variant-row";
import { ProductVariantFields } from "./product-variant-fields";

const COPY = { edit: "Editar variante", remove: "Eliminar variante" } as const;

export function ProductVariantRow({
  index,
  control,
  register,
  error,
  canRemove,
  remove,
}: {
  index: number;
  control: Control<ProductFormValues, unknown, ProductValues>;
  register: UseFormRegister<ProductFormValues>;
  error: FieldErrors<ProductFormValues>["variants"];
  canRemove: boolean;
  remove: () => void;
}) {
  const variantErrors = error?.[index];
  const row = useProductVariantRow(index, control, Boolean(variantErrors));
  const detailId = `product-variant-${index}-fields`;
  return (
    <>
      <TableRow className={cn(row.open && "border-b-0")}>
        <TableCell className="px-4 py-3">
          <div className="text-sm font-medium text-ink">{row.name}</div>
          <div className="text-xs text-ink-faint">{row.detail}</div>
        </TableCell>
        <TableCell className="px-3 py-3 text-sm text-ink-secondary">{row.sku}</TableCell>
        <TableCell className={cn("px-3 py-3 text-sm", row.stockTone)}>{row.stockText}</TableCell>
        <TableCell className={cn("px-3 py-3 text-right text-sm tabular-nums", row.hasOwnPrice ? "font-medium text-ink" : "text-ink-faint")}>
          {row.priceText}
        </TableCell>
        <TableCell className="px-3 py-3 text-right">
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            aria-label={COPY.edit}
            aria-expanded={row.open}
            aria-controls={detailId}
            onClick={row.toggle}
          >
            <ChevronDown className={cn("transition-transform", row.open && "rotate-180")} aria-hidden />
          </Button>
          <Button type="button" variant="destructive" size="icon-sm" aria-label={COPY.remove} disabled={!canRemove} onClick={remove}>
            <Trash2 aria-hidden />
          </Button>
        </TableCell>
      </TableRow>
      {row.open ? (
        <TableRow className="bg-surface-subtle hover:bg-surface-subtle">
          <TableCell id={detailId} colSpan={5} className="p-4 whitespace-normal">
            <ProductVariantFields index={index} register={register} error={variantErrors} />
          </TableCell>
        </TableRow>
      ) : null}
    </>
  );
}
