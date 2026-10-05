"use client";
import { Controller, type Control, type FieldErrors, type UseFormRegister } from "react-hook-form";
import type { ProductFormValues, ProductValues } from "@/lib/schemas/products";
import { ImageField } from "@/components/dashboard/image-field";
import { ProductField } from "./product-field";
import { Button } from "@/components/ui/button";

const COPY = { primary: "Imagen principal", image: "Imagen", alt: "Texto alternativo", up: "Subir", down: "Bajar", remove: "Eliminar" } as const;

export function ProductImageForm({ index, total, control, register, errors, move, remove }: { index: number; total: number; control: Control<ProductFormValues, unknown, ProductValues>; register: UseFormRegister<ProductFormValues>; errors: FieldErrors<ProductFormValues>["images"]; move: (index: number, next: number) => void; remove: () => void }) {
  const heading = index === 0 ? COPY.primary : `${COPY.image} ${index + 1}`;
  const imageLabel = heading;

  return (
    <div className="space-y-5 pb-10 last:pb-0">
      <p className="text-sm font-medium text-ink-secondary">{heading}</p>
      <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-8">
        <Controller
          name={`images.${index}.url`}
          control={control}
          render={({ field }) => (
            <ImageField
              hideLabel
              label={imageLabel}
              showAssetName={false}
              value={field.value}
              onChange={field.onChange}
              previewClassName="h-28 w-28 shrink-0 rounded-lg border border-border-subtle bg-canvas sm:h-32 sm:w-32"
            />
          )}
        />
        <div className="min-w-0 flex-1 space-y-5">
          {errors?.[index]?.url ? <p className="text-sm text-danger">{errors[index]?.url?.message}</p> : null}
          <ProductField label={COPY.alt} binding={register(`images.${index}.alt`)} error={errors?.[index]?.alt?.message} />
          <div className="flex flex-wrap gap-2 pt-1">
            <Button type="button" variant="ghost" size="sm" disabled={index === 0} onClick={() => move(index, index - 1)}>
              {COPY.up}
            </Button>
            <Button type="button" variant="ghost" size="sm" disabled={index === total - 1} onClick={() => move(index, index + 1)}>
              {COPY.down}
            </Button>
            <Button type="button" variant="ghost" size="sm" className="text-danger hover:text-danger" onClick={remove}>
              {COPY.remove}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
