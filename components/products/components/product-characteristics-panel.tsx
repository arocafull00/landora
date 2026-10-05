"use client";

import { ListPlus } from "lucide-react";
import type { FieldErrors, UseFieldArrayReturn, UseFormRegister } from "react-hook-form";
import type { ProductFormValues } from "@/lib/schemas/products";
import { Button } from "@/components/ui/button";
import { PRODUCT_DRAWER_COPY } from "../product-drawer-copy";
import { productPanelId } from "../product-editor-sections";
import { ProductCharacteristicRow } from "./product-characteristic-row";
import { ProductDetailsCard } from "./product-details-card";
import { ProductEditorCard } from "./product-editor-card";
import { ProductEditorSection } from "./product-editor-section";

const MAX_CHARACTERISTICS = 30;
const COPY = { title: "Otras características", add: "Añadir característica" } as const;

export function ProductCharacteristicsPanel({
  active,
  characteristics,
  register,
  errors,
  onAdd,
}: {
  active: boolean;
  characteristics: UseFieldArrayReturn<ProductFormValues, "characteristics">;
  register: UseFormRegister<ProductFormValues>;
  errors: FieldErrors<ProductFormValues>;
  onAdd: () => void;
}) {
  return (
    <ProductEditorSection
      id={productPanelId("characteristics")}
      title={PRODUCT_DRAWER_COPY.sectionCharacteristics}
      description={PRODUCT_DRAWER_COPY.sectionCharacteristicsDescription}
      active={active}
    >
      <ProductDetailsCard register={register} errors={errors} />
      <ProductEditorCard title={COPY.title}>
        {characteristics.fields.map((field, index) => (
          <ProductCharacteristicRow
            key={field.id}
            index={index}
            register={register}
            errors={errors.characteristics}
            remove={() => characteristics.remove(index)}
          />
        ))}
        <Button type="button" variant="outline" disabled={characteristics.fields.length >= MAX_CHARACTERISTICS} onClick={onAdd}>
          <ListPlus className="size-4" aria-hidden />
          {COPY.add}
        </Button>
      </ProductEditorCard>
    </ProductEditorSection>
  );
}
