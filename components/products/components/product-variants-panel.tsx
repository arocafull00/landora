"use client";

import { Plus } from "lucide-react";
import type { Control, FieldErrors, UseFieldArrayReturn, UseFormRegister } from "react-hook-form";
import type { ProductFormValues, ProductValues } from "@/lib/schemas/products";
import { Button } from "@/components/ui/button";
import { PRODUCT_DRAWER_COPY } from "../product-drawer-copy";
import { productPanelId } from "../product-editor-sections";
import { ProductEditorSection } from "./product-editor-section";
import { ProductVariantsTable } from "./product-variants-table";

const MAX_VARIANTS = 200;

export function ProductVariantsPanel({
  active,
  variants,
  control,
  register,
  error,
  onAdd,
}: {
  active: boolean;
  variants: UseFieldArrayReturn<ProductFormValues, "variants", "fieldKey">;
  control: Control<ProductFormValues, unknown, ProductValues>;
  register: UseFormRegister<ProductFormValues>;
  error: FieldErrors<ProductFormValues>["variants"];
  onAdd: () => void;
}) {
  const message = error?.root?.message ?? error?.message;
  return (
    <ProductEditorSection
      id={productPanelId("variants")}
      title={PRODUCT_DRAWER_COPY.sectionVariants}
      description={PRODUCT_DRAWER_COPY.sectionVariantsDescription}
      active={active}
      action={
        <Button type="button" size="sm" disabled={variants.fields.length >= MAX_VARIANTS} onClick={onAdd}>
          <Plus className="size-4" aria-hidden />
          {PRODUCT_DRAWER_COPY.addVariant}
        </Button>
      }
    >
      <ProductVariantsTable variants={variants} control={control} register={register} error={error} />
      {message ? <p className="text-sm text-danger">{message}</p> : null}
    </ProductEditorSection>
  );
}
