"use client";

import { useCallback, useMemo, useState } from "react";
import type { ProductDto } from "@/lib/domain/dtos";

export function useProductsSelection(products: ProductDto[]) {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(() => new Set());
  const pageIds = useMemo(() => products.map((product) => product.id), [products]);
  const selectedOnPageCount = useMemo(
    () => pageIds.filter((id) => selectedIds.has(id)).length,
    [pageIds, selectedIds]
  );
  const allSelected = products.length > 0 && selectedOnPageCount === products.length;
  const indeterminate = selectedOnPageCount > 0 && !allSelected;
  const toggle = useCallback((productId: string) => {
    setSelectedIds((current) => {
      const next = new Set(current);
      if (next.has(productId)) next.delete(productId);
      else next.add(productId);
      return next;
    });
  }, []);
  const toggleAll = useCallback(() => {
    setSelectedIds((current) => {
      const next = new Set(current);
      if (allSelected) {
        pageIds.forEach((id) => next.delete(id));
        return next;
      }
      pageIds.forEach((id) => next.add(id));
      return next;
    });
  }, [allSelected, pageIds]);
  const clear = useCallback(() => setSelectedIds(new Set()), []);
  return {
    selectedIds,
    selectedCount: selectedIds.size,
    allSelected,
    indeterminate,
    toggle,
    toggleAll,
    clear,
  };
}
