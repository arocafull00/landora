"use client";

import { Trash2 } from "lucide-react";
import type { FieldErrors, UseFormRegister } from "react-hook-form";
import type { ProductFormValues } from "@/lib/schemas/products";
import { Button } from "@/components/ui/button";
import { ProductField } from "./product-field";

const COPY = { name: "Característica", value: "Valor", remove: "Eliminar característica" } as const;

export function ProductCharacteristicRow({
  index,
  register,
  errors,
  remove,
}: {
  index: number;
  register: UseFormRegister<ProductFormValues>;
  errors: FieldErrors<ProductFormValues>["characteristics"];
  remove: () => void;
}) {
  return (
    <div className="grid items-start gap-3 sm:grid-cols-[1fr_1fr_auto]">
      <ProductField label={COPY.name} binding={register(`characteristics.${index}.name`)} error={errors?.[index]?.name?.message} />
      <ProductField label={COPY.value} binding={register(`characteristics.${index}.value`)} error={errors?.[index]?.value?.message} />
      <Button type="button" variant="destructive" size="icon" className="sm:mt-6" aria-label={COPY.remove} onClick={remove}>
        <Trash2 aria-hidden />
      </Button>
    </div>
  );
}
