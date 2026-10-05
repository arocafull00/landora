"use client";

import { Package } from "lucide-react";
import type { ProductDto } from "@/lib/domain/dtos";
import { formatProductPrice, productMinPrice, productStockInfo, productVariantSummary } from "@/lib/products";
import { AssetImage } from "@/components/ui/asset-image";
import { Checkbox } from "@/components/ui/checkbox";
import { TableCell, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { PRODUCTS_LIST_COPY } from "../products-list-copy";
import { ProductStatusBadge } from "./product-status-badge";
import { ProductsRowActions } from "./products-row-actions";

const STOCK_TONES = {
  out: "text-danger-strong",
  low: "text-warning-strong",
  pending: "text-ink-faint",
  ok: "text-ink-faint",
} as const;

export function ProductsTableRow({
  product,
  selected,
  pending,
  onToggle,
  onEdit,
  onCommand,
}: {
  product: ProductDto;
  selected: boolean;
  pending: boolean;
  onToggle: (productId: string) => void;
  onEdit: (product: ProductDto) => void;
  onCommand: (product: ProductDto, command: "duplicate" | "archive" | "restore" | "unpublish" | "publish") => void;
}) {
  const stock = productStockInfo(product);
  const price = product.priceCents === null ? formatProductPrice(null) : formatProductPrice(productMinPrice(product));
  return (
    <TableRow data-state={selected ? "selected" : undefined}>
      <TableCell className="px-4 py-3">
        <Checkbox checked={selected} onCheckedChange={() => onToggle(product.id)} aria-label={`Seleccionar ${product.title}`} />
      </TableCell>
      <TableCell className="min-w-[16rem] px-2 py-3">
        <button type="button" onClick={() => onEdit(product)} className="flex w-full items-center gap-3 text-left">
          {product.images[0] ? (
            <div className="relative size-12 shrink-0 overflow-hidden rounded-lg border border-line">
              <AssetImage src={product.images[0].url} alt={product.images[0].alt || product.title} fill sizes="48px" className="object-cover" />
            </div>
          ) : (
            <div className="flex size-12 shrink-0 items-center justify-center rounded-lg border border-line bg-linear-to-br from-primary-subtle to-line">
              <Package className="size-5 text-ink-faint" aria-hidden />
            </div>
          )}
          <div className="min-w-0">
            <div className="truncate text-sm font-semibold text-ink">{product.title}</div>
            <div className="mt-0.5 truncate text-xs text-ink-subtle">{productVariantSummary(product)}</div>
          </div>
        </button>
      </TableCell>
      <TableCell className="px-3 py-3">
        <ProductStatusBadge status={product.status} />
      </TableCell>
      <TableCell className="px-3 py-3">
        <div className="text-sm text-ink-secondary">{stock.units === null ? "—" : `${stock.units} uds.`}</div>
        <div className={cn("text-xs", STOCK_TONES[stock.state])}>{PRODUCTS_LIST_COPY.stock[stock.state]}</div>
      </TableCell>
      <TableCell className="px-3 py-3 text-sm text-ink-secondary">{product.category || "—"}</TableCell>
      <TableCell className="px-3 py-3 text-right text-sm font-medium text-ink">{price}</TableCell>
      <TableCell className="px-4 py-3 text-right">
        <ProductsRowActions product={product} pending={pending} onEdit={onEdit} onCommand={onCommand} />
      </TableCell>
    </TableRow>
  );
}
