"use client";

import { useState } from "react";
import type { FieldErrors } from "react-hook-form";
import type { ProductFormValues } from "@/lib/schemas/products";
import { invalidProductSections, type ProductSectionId } from "../product-editor-sections";

export function useProductEditorSection() {
  const [section, setSection] = useState<ProductSectionId>("general");
  const showFirstInvalid = (errors: FieldErrors<ProductFormValues>) => {
    const [first] = invalidProductSections(errors);
    if (first) setSection(first);
  };
  return { section, setSection, showFirstInvalid };
}
