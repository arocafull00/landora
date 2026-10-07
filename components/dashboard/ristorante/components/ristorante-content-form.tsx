"use client";

import { useId } from "react";
import { Controller } from "react-hook-form";
import type { RistoranteEditorValues } from "@/lib/schemas/ristorante-editor";
import { Button } from "@/components/ui/button";
import { ImageField } from "@/components/dashboard/image-field";
import { RistoranteTextField } from "@/components/dashboard/ristorante/components/ristorante-text-field";
import { useRistoranteForm } from "@/components/dashboard/ristorante/hooks/use-ristorante-form";
import { RISTORANTE_EDITOR_COPY } from "@/components/dashboard/ristorante/ristorante-editor-copy";

export function RistoranteContentForm({ values, fields, onApply }: { values: RistoranteEditorValues; fields: Array<keyof RistoranteEditorValues>; onApply: (values: RistoranteEditorValues) => void }) {
  const id = useId();
  const { register, control, formState: { errors, isSubmitting }, onSubmit } = useRistoranteForm(values, onApply);
  return <form onSubmit={onSubmit} className="space-y-4">{fields.filter((field) => field !== "image").map((field) => <RistoranteTextField key={field} field={field as Exclude<keyof RistoranteEditorValues, "image">} register={register} error={errors[field]?.message} id={`${id}-${field}`} />)}{fields.includes("image") ? <Controller name="image" control={control} render={({ field, fieldState }) => <div><ImageField label={RISTORANTE_EDITOR_COPY.image} value={field.value} onChange={field.onChange} templateId="ristorante" />{fieldState.error ? <p className="text-sm text-danger">{fieldState.error.message}</p> : null}</div>} /> : null}<Button type="submit" disabled={isSubmitting}>{RISTORANTE_EDITOR_COPY.apply}</Button></form>;
}
