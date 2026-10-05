"use client";
import { Controller, type Control, type FieldErrors, type UseFormRegister } from "react-hook-form";
import type { ProductFormValues, ProductValues } from "@/lib/schemas/products";
import { ImageField } from "@/components/dashboard/image-field";
import { ProductField } from "./product-field";
import { Button } from "@/components/ui/button";

const COPY = { primary: "Imagen principal", image: "Imagen", alt: "Texto alternativo", up: "Subir", down: "Bajar", remove: "Eliminar" } as const;
export function ProductImageForm({ index, total, control, register, errors, move, remove }: { index: number; total: number; control: Control<ProductFormValues, unknown, ProductValues>; register: UseFormRegister<ProductFormValues>; errors: FieldErrors<ProductFormValues>["images"]; move: (index: number, next: number) => void; remove: () => void }) {
  return <div className="space-y-3 rounded-lg border border-border p-4">
    <Controller name={`images.${index}.url`} control={control} render={({ field }) => <ImageField label={index === 0 ? COPY.primary : `${COPY.image} ${index + 1}`} value={field.value} onChange={field.onChange} />} />
    {errors?.[index]?.url ? <p className="text-sm text-danger">{errors[index]?.url?.message}</p> : null}
    <ProductField label={COPY.alt} binding={register(`images.${index}.alt`)} error={errors?.[index]?.alt?.message} />
    <div className="flex gap-2"><Button type="button" variant="outline" size="sm" disabled={index === 0} onClick={() => move(index, index - 1)}>{COPY.up}</Button><Button type="button" variant="outline" size="sm" disabled={index === total - 1} onClick={() => move(index, index + 1)}>{COPY.down}</Button><Button type="button" variant="outline" size="sm" onClick={remove}>{COPY.remove}</Button></div>
  </div>;
}
