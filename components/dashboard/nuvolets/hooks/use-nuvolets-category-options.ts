"use client";

import { use } from "react";
import { useWatch, type UseFormReturn } from "react-hook-form";
import { EditorCatalogContext } from "@/components/dashboard/editor/editor-catalog-context";
import type { NuvoletsContent } from "@/lib/schemas/nuvolets";
import { NUVOLETS_CATEGORY_COPY, type NuvoletsField } from "../nuvolets-copy";

export function useNuvoletsCategoryOptions(form: UseFormReturn<NuvoletsContent>, name: NuvoletsField["name"]) {
  const { categories } = use(EditorCatalogContext);
  const value = String(useWatch({ control: form.control, name }) ?? "");
  const values = Array.from(new Set([...categories, ...(value ? [value] : [])]));
  return [{ value: "", label: NUVOLETS_CATEGORY_COPY.all }, ...values.map((category) => ({ value: category, label: category }))];
}
