"use client";

import type { ProductDto } from "@/lib/domain/dtos";
import { PRODUCTS_COPY } from "@/lib/products";
import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { PRODUCTS_LIST_COPY } from "../products-list-copy";
import { ProductsTableRow } from "./products-table-row";

const HEAD_CLASS = "h-auto py-3 text-[11px] font-semibold tracking-wide text-ink-faint uppercase";

export function ProductsTable({
  products,
  selectedIds,
  allSelected,
  indeterminate,
  pending,
  onToggleAll,
  onToggle,
  onEdit,
  onCommand,
}: {
  products: ProductDto[];
  selectedIds: Set<string>;
  allSelected: boolean;
  indeterminate: boolean;
  pending: boolean;
  onToggleAll: () => void;
  onToggle: (productId: string) => void;
  onEdit: (product: ProductDto) => void;
  onCommand: (product: ProductDto, command: "duplicate" | "archive" | "restore" | "unpublish" | "publish") => void;
}) {
  return (
    <Table className="w-full">
      <TableHeader>
        <TableRow className="border-b border-line hover:bg-transparent">
          <TableHead className="w-10 px-0 py-3">
            <Checkbox
              checked={allSelected ? true : indeterminate ? "indeterminate" : false}
              onCheckedChange={onToggleAll}
              aria-label="Seleccionar todos los productos visibles"
            />
          </TableHead>
          <TableHead className={cn(HEAD_CLASS, "px-2")}>{PRODUCTS_LIST_COPY.columns.product}</TableHead>
          <TableHead className={cn(HEAD_CLASS, "w-[7.5rem] px-2")}>{PRODUCTS_LIST_COPY.columns.status}</TableHead>
          <TableHead className={cn(HEAD_CLASS, "w-[8.5rem] px-2")}>{PRODUCTS_LIST_COPY.columns.inventory}</TableHead>
          <TableHead className={cn(HEAD_CLASS, "hidden w-[9rem] px-2 lg:table-cell")}>{PRODUCTS_LIST_COPY.columns.category}</TableHead>
          <TableHead className={cn(HEAD_CLASS, "w-[5.5rem] px-2 text-right")}>{PRODUCTS_LIST_COPY.columns.price}</TableHead>
          <TableHead className="w-10 px-0">
            <span className="sr-only">{PRODUCTS_LIST_COPY.columns.actions}</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.length ? (
          products.map((product) => (
            <ProductsTableRow
              key={product.id}
              product={product}
              selected={selectedIds.has(product.id)}
              pending={pending}
              onToggle={onToggle}
              onEdit={onEdit}
              onCommand={onCommand}
            />
          ))
        ) : (
          <TableRow className="hover:bg-transparent">
            <TableCell colSpan={7} className="p-8 text-center text-ink-subtle">
              {PRODUCTS_COPY.empty}
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
