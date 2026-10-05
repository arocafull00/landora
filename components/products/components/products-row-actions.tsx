"use client";

import { MoreHorizontal } from "lucide-react";
import type { ProductDto } from "@/lib/domain/dtos";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PRODUCTS_LIST_COPY } from "../products-list-copy";

export function ProductsRowActions({
  product,
  pending,
  onEdit,
  onCommand,
}: {
  product: ProductDto;
  pending: boolean;
  onEdit: (product: ProductDto) => void;
  onCommand: (product: ProductDto, command: "duplicate" | "archive" | "restore" | "unpublish" | "publish") => void;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          className="size-8 shrink-0 rounded-lg p-0 text-ink-subtle hover:bg-surface-container"
          aria-label={PRODUCTS_LIST_COPY.columns.actions}
        >
          <MoreHorizontal className="size-4" aria-hidden />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onSelect={() => onEdit(product)}>{PRODUCTS_LIST_COPY.row.edit}</DropdownMenuItem>
        <DropdownMenuItem disabled={pending} onSelect={() => onCommand(product, "duplicate")}>
          {PRODUCTS_LIST_COPY.row.duplicate}
        </DropdownMenuItem>
        {product.status === "archived" ? (
          <DropdownMenuItem disabled={pending} onSelect={() => onCommand(product, "restore")}>
            {PRODUCTS_LIST_COPY.row.restore}
          </DropdownMenuItem>
        ) : (
          <>
            {product.status === "published" && product.hasPendingChanges ? (
              <DropdownMenuItem disabled={pending} onSelect={() => onCommand(product, "publish")}>
                {PRODUCTS_LIST_COPY.row.publish}
              </DropdownMenuItem>
            ) : null}
            <DropdownMenuItem disabled={pending} onSelect={() => onCommand(product, product.status === "published" ? "unpublish" : "publish")}>
              {product.status === "published" ? PRODUCTS_LIST_COPY.row.unpublish : PRODUCTS_LIST_COPY.row.publish}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem disabled={pending} onSelect={() => onCommand(product, "archive")}>
              {PRODUCTS_LIST_COPY.row.archive}
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
