"use client";

import type { Control, FieldErrors, UseFormRegister } from "react-hook-form";
import type { ProductFormValues, ProductValues } from "@/lib/schemas/products";
import { PRODUCT_DRAWER_COPY } from "../product-drawer-copy";
import { productPanelId } from "../product-editor-sections";
import { ProductEditorSection } from "./product-editor-section";
import { ProductFeaturedCard } from "./product-featured-card";
import { ProductInformationGeneralForm } from "./product-information-general-form";
import { ProductOrganizationCard } from "./product-organization-card";
import { ProductPriceCard } from "./product-price-card";

export function ProductGeneralPanel({
  active,
  register,
  control,
  errors,
  categories,
  brands,
  generateSlug,
}: {
  active: boolean;
  register: UseFormRegister<ProductFormValues>;
  control: Control<ProductFormValues, unknown, ProductValues>;
  errors: FieldErrors<ProductFormValues>;
  categories: string[];
  brands: string[];
  generateSlug: () => void;
}) {
  return (
    <ProductEditorSection
      id={productPanelId("general")}
      title={PRODUCT_DRAWER_COPY.sectionGeneral}
      description={PRODUCT_DRAWER_COPY.sectionGeneralDescription}
      active={active}
    >
      <ProductInformationGeneralForm register={register} errors={errors} generateSlug={generateSlug} />
      <ProductOrganizationCard register={register} control={control} errors={errors} categories={categories} brands={brands} />
      <ProductFeaturedCard control={control} />
      <ProductPriceCard register={register} errors={errors} />
    </ProductEditorSection>
  );
}
