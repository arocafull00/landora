import type { UseFormRegister } from "react-hook-form";
import type { RistoranteEditorValues } from "@/lib/schemas/ristorante-editor";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RISTORANTE_EDITOR_COPY } from "@/components/dashboard/ristorante/ristorante-editor-copy";

export function RistoranteTextField({ field, register, error, id }: { field: Exclude<keyof RistoranteEditorValues, "image">; register: UseFormRegister<RistoranteEditorValues>; error: string | undefined; id: string }) {
  return <div className="space-y-2"><Label htmlFor={id}>{RISTORANTE_EDITOR_COPY[field]}</Label>{field === "title" || field === "subtitle" || field === "description" ? <Textarea id={id} rows={field === "title" ? 2 : 3} {...register(field)} aria-invalid={Boolean(error)} aria-describedby={error ? `${id}-error` : undefined} /> : <Input id={id} {...register(field)} aria-invalid={Boolean(error)} aria-describedby={error ? `${id}-error` : undefined} />}{error ? <p id={`${id}-error`} className="text-sm text-danger">{error}</p> : null}</div>;
}
