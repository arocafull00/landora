"use client";

import { Package, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DialogClose, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { PRODUCT_DRAWER_COPY } from "../product-drawer-copy";
import { ProductStatusBadge } from "./product-status-badge";

export function ProductEditorHeader({
  title,
  description,
  status,
  hasPendingChanges,
}: {
  title: string;
  description: string;
  status: "draft" | "published" | "archived";
  hasPendingChanges: boolean;
}) {
  return (
    <DialogHeader className="shrink-0 flex-row items-center justify-between gap-3 px-6 py-4 text-left">
      <div className="flex min-w-0 items-center gap-3">
        <div className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-border-subtle bg-primary-subtle">
          <Package className="size-5 text-ink-faint" aria-hidden />
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <DialogTitle className="truncate text-lg">{title}</DialogTitle>
            <ProductStatusBadge status={status} hasPendingChanges={hasPendingChanges} />
          </div>
          <DialogDescription className="mt-1 text-xs text-ink-secondary">{description}</DialogDescription>
        </div>
      </div>
      <DialogClose asChild>
        <Button type="button" variant="ghost" size="icon" aria-label={PRODUCT_DRAWER_COPY.close}>
          <X className="size-5" aria-hidden />
        </Button>
      </DialogClose>
    </DialogHeader>
  );
}
