"use client";

import { Package } from "lucide-react";
import type { ProductDto } from "@/lib/domain/dtos";
import { formatProductPrice, productStockInfo, productVariantSummary } from "@/lib/products";
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
  const price = formatProductPrice(product.priceCents);
  return (
    <TableRow data-state={selected ? "selected" : undefined} className="min-h-[68px]">
      <TableCell className="px-0 py-3 align-middle">
        <Checkbox checked={selected} onCheckedChange={() => onToggle(product.id)} aria-label={`Seleccionar ${product.title}`} />
      </TableCell>
      <TableCell className="px-2 py-3 align-middle">
        <button type="button" onClick={() => onEdit(product)} className="flex w-full min-w-0 items-center gap-3 text-left">
          {product.images[0] ? (
            <div className="relative size-11 shrink-0 overflow-hidden rounded-lg border border-line">
              <AssetImage src={product.images[0].url} alt={product.images[0].alt || product.title} fill sizes="44px" className="object-cover" />
            </div>
          ) : (
            <div className="flex size-11 shrink-0 items-center justify-center rounded-lg border border-line bg-linear-to-br from-primary-subtle to-line">
              <Package className="size-5 text-ink-faint" aria-hidden />
            </div>
          )}
          <div className="min-w-0 flex-1">
            <div className="truncate text-sm font-semibold text-ink">{product.title}</div>
            <div className="mt-0.5 truncate text-xs text-ink-subtle">{productVariantSummary(product)}</div>
          </div>
        </button>
      </TableCell>
      <TableCell className="px-2 py-3 align-middle">
        <ProductStatusBadge status={product.status} hasPendingChanges={product.hasPendingChanges} />
      </TableCell>
      <TableCell className="px-2 py-3 align-middle">
        <div className="text-sm text-ink-secondary">{stock.units === null ? "—" : `${stock.units} uds.`}</div>
        <div className={cn("text-xs", STOCK_TONES[stock.state])}>{PRODUCTS_LIST_COPY.stock[stock.state]}</div>
      </TableCell>
      <TableCell className="hidden truncate px-2 py-3 text-sm text-ink-secondary lg:table-cell">{product.category || "—"}</TableCell>
      <TableCell className="px-2 py-3 text-right align-middle text-sm font-medium tabular-nums text-ink">{price}</TableCell>
      <TableCell className="px-0 py-3 text-right align-middle">
        <ProductsRowActions product={product} pending={pending} onEdit={onEdit} onCommand={onCommand} />
      </TableCell>
    </TableRow>
  );
}
