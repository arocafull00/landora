"use client";

import { createContext, type ReactNode } from "react";

type EditorCatalog = { enabled: boolean; productSlug: string | null };

export const EditorCatalogContext = createContext<EditorCatalog>({ enabled: false, productSlug: null });

export function EditorCatalogProvider({ children, ...catalog }: EditorCatalog & { children: ReactNode }) {
  return <EditorCatalogContext value={catalog}>{children}</EditorCatalogContext>;
}
