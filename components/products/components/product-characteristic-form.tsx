import type { FieldErrors, UseFormRegister } from "react-hook-form";
import type { ProductFormValues } from "@/lib/schemas/products";
import { ProductField } from "./product-field";
import { Button } from "@/components/ui/button";
const COPY = { name: "Característica", value: "Valor", remove: "Eliminar característica" } as const;
export function ProductCharacteristicForm({ index, register, errors, remove }: { index: number; register: UseFormRegister<ProductFormValues>; errors: FieldErrors<ProductFormValues>["characteristics"]; remove: () => void }) {
  return <div className="grid items-end gap-3 sm:grid-cols-3"><ProductField label={COPY.name} binding={register(`characteristics.${index}.name`)} error={errors?.[index]?.name?.message} /><ProductField label={COPY.value} binding={register(`characteristics.${index}.value`)} error={errors?.[index]?.value?.message} /><Button variant="outline" type="button" onClick={remove}>{COPY.remove}</Button></div>;
}
