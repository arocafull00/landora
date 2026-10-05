"use client";

import type { Control, FieldErrors, UseFieldArrayReturn, UseFormRegister } from "react-hook-form";
import type { ProductFormValues, ProductValues } from "@/lib/schemas/products";
import { PRODUCT_DRAWER_COPY } from "../product-drawer-copy";
import { productPanelId } from "../product-editor-sections";
import { ProductEditorCard } from "./product-editor-card";
import { ProductEditorSection } from "./product-editor-section";
import { ProductImageAddTile } from "./product-image-add-tile";
import { ProductImageTile } from "./product-image-tile";

const MAX_IMAGES = 20;
const COPY = { hint: "Usa las flechas para reordenar las imágenes." } as const;

export function ProductImagesPanel({
  active,
  images,
  control,
  register,
  errors,
  onAdd,
}: {
  active: boolean;
  images: UseFieldArrayReturn<ProductFormValues, "images">;
  control: Control<ProductFormValues, unknown, ProductValues>;
  register: UseFormRegister<ProductFormValues>;
  errors: FieldErrors<ProductFormValues>["images"];
  onAdd: () => void;
}) {
  const message = errors?.root?.message ?? errors?.message;
  return (
    <ProductEditorSection
      id={productPanelId("images")}
      title={PRODUCT_DRAWER_COPY.sectionImages}
      description={PRODUCT_DRAWER_COPY.sectionImagesDescription}
      active={active}
    >
      <ProductEditorCard>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {images.fields.map((image, index) => (
            <ProductImageTile
              key={image.id}
              index={index}
              total={images.fields.length}
              control={control}
              register={register}
              errors={errors}
              move={images.move}
              remove={() => images.remove(index)}
            />
          ))}
          {images.fields.length < MAX_IMAGES ? <ProductImageAddTile onAdd={onAdd} /> : null}
        </div>
        <p className="text-xs text-ink-faint">{COPY.hint}</p>
        {message ? <p className="text-sm text-danger">{message}</p> : null}
      </ProductEditorCard>
    </ProductEditorSection>
  );
}
