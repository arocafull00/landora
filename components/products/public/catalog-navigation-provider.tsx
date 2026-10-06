"use client";

import type { ReactNode } from "react";
import { CatalogNavigationContext, useCatalogNavigation } from "../hooks/use-catalog-navigation";

export function CatalogNavigationProvider({ children }: { children: ReactNode }) {
  const returnToCatalog = useCatalogNavigation();
  return <CatalogNavigationContext value={returnToCatalog}>{children}</CatalogNavigationContext>;
}
