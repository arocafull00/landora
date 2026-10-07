"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { ristoranteEditorSchema, type RistoranteEditorValues } from "@/lib/schemas/ristorante-editor";
import { RISTORANTE_EDITOR_COPY } from "@/components/dashboard/ristorante/ristorante-editor-copy";

export function useRistoranteForm(values: RistoranteEditorValues, onApply: (values: RistoranteEditorValues) => void) {
  const form = useForm<RistoranteEditorValues>({ resolver: zodResolver(ristoranteEditorSchema), defaultValues: values, values });
  const onSubmit = form.handleSubmit((next) => {
    onApply(next);
    form.reset(next);
    toast.success(RISTORANTE_EDITOR_COPY.applied);
  }, () => toast.error(RISTORANTE_EDITOR_COPY.invalid));
  return { ...form, onSubmit };
}
