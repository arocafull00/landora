"use client";

import { useCallback, useState } from "react";
import type { ProductDto } from "@/lib/domain/dtos";

export type ProductsDrawerState =
  | { mode: "closed" }
  | { mode: "new" }
  | { mode: "edit"; product: ProductDto };

export function useProductsDrawer() {
  const [drawer, setDrawer] = useState<ProductsDrawerState>({ mode: "closed" });
  const openNew = useCallback(() => setDrawer({ mode: "new" }), []);
  const openEdit = useCallback((product: ProductDto) => setDrawer({ mode: "edit", product }), []);
  const close = useCallback(() => setDrawer({ mode: "closed" }), []);
  const open = drawer.mode !== "closed";
  const onOpenChange = useCallback((next: boolean) => {
    if (!next) setDrawer({ mode: "closed" });
  }, []);
  return { drawer, open, openNew, openEdit, close, onOpenChange };
}
