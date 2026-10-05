"use client";

import { ChevronLeft, ChevronRight, Trash2 } from "lucide-react";
import { Controller, type Control, type FieldErrors, type UseFormRegister } from "react-hook-form";
import type { ProductFormValues, ProductValues } from "@/lib/schemas/products";
import { ImageField } from "@/components/dashboard/image-field";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProductField } from "./product-field";

const COPY = {
  primary: "Principal",
  image: "Imagen",
  alt: "Texto alternativo",
  previous: "Mover antes",
  next: "Mover después",
  remove: "Eliminar imagen",
} as const;

export function ProductImageTile({
  index,
  total,
  control,
  register,
  errors,
  move,
  remove,
}: {
  index: number;
  total: number;
  control: Control<ProductFormValues, unknown, ProductValues>;
  register: UseFormRegister<ProductFormValues>;
  errors: FieldErrors<ProductFormValues>["images"];
  move: (index: number, next: number) => void;
  remove: () => void;
}) {
  const label = index === 0 ? COPY.primary : `${COPY.image} ${index + 1}`;
  const imageErrors = errors?.[index];
  return (
    <div className="space-y-2">
      <div className="relative">
        <Controller
          name={`images.${index}.url`}
          control={control}
          render={({ field }) => (
            <ImageField
              hideLabel
              label={label}
              showAssetName={false}
              value={field.value}
              onChange={field.onChange}
              previewClassName={index === 0 ? "aspect-square h-auto w-full rounded-xl border-2 border-primary" : "aspect-square h-auto w-full rounded-xl"}
            />
          )}
        />
        {index === 0 ? <Badge className="pointer-events-none absolute top-2 left-2 rounded">{COPY.primary}</Badge> : null}
      </div>
      {imageErrors?.url ? <p className="text-sm text-danger">{imageErrors.url.message}</p> : null}
      <ProductField label={COPY.alt} binding={register(`images.${index}.alt`)} error={imageErrors?.alt?.message} />
      <div className="flex items-center gap-1">
        <Button type="button" variant="ghost" size="icon-sm" aria-label={COPY.previous} disabled={index === 0} onClick={() => move(index, index - 1)}>
          <ChevronLeft aria-hidden />
        </Button>
        <Button type="button" variant="ghost" size="icon-sm" aria-label={COPY.next} disabled={index === total - 1} onClick={() => move(index, index + 1)}>
          <ChevronRight aria-hidden />
        </Button>
        <Button type="button" variant="destructive" size="icon-sm" className="ml-auto" aria-label={COPY.remove} onClick={remove}>
          <Trash2 aria-hidden />
        </Button>
      </div>
    </div>
  );
}
