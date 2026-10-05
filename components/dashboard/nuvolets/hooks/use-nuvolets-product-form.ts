"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { nuvoletsProductFormSchema, type NuvoletsProductForm, type NuvoletsProduct } from "@/lib/schemas/nuvolets";
import { NUVOLETS_EDITOR_COPY } from "../nuvolets-copy";

export function useNuvoletsProductForm(onAdd: (product: NuvoletsProduct) => void) {
  const form = useForm<NuvoletsProductForm>({ resolver: zodResolver(nuvoletsProductFormSchema), defaultValues: { name: "", price: "", image: "", alt: "" } });
  const submit = form.handleSubmit((value) => { onAdd({ ...value, id: crypto.randomUUID() }); form.reset(); }, () => toast.error(NUVOLETS_EDITOR_COPY.invalid));
  return { form, submit };
}
