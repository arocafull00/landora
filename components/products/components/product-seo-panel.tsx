"use client";

import type { FieldErrors, UseFormRegister } from "react-hook-form";
import type { ProductFormValues } from "@/lib/schemas/products";
import { PRODUCT_DRAWER_COPY } from "../product-drawer-copy";
import { productPanelId } from "../product-editor-sections";
import { ProductEditorCard } from "./product-editor-card";
import { ProductEditorSection } from "./product-editor-section";
import { ProductSlugField } from "./product-slug-field";

export function ProductSeoPanel({
  active,
  register,
  errors,
}: {
  active: boolean;
  register: UseFormRegister<ProductFormValues>;
  errors: FieldErrors<ProductFormValues>;
}) {
  return (
    <ProductEditorSection
      id={productPanelId("seo")}
      title={PRODUCT_DRAWER_COPY.sectionSeo}
      description={PRODUCT_DRAWER_COPY.sectionSeoDescription}
      active={active}
    >
      <ProductEditorCard>
        <ProductSlugField binding={register("slug")} error={errors.slug?.message} />
      </ProductEditorCard>
    </ProductEditorSection>
  );
}
