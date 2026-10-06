"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { nuvoletsContentSchema, type NuvoletsContent } from "@/lib/schemas/nuvolets";
import { NUVOLETS_EDITOR_COPY } from "../nuvolets-copy";

export function useNuvoletsSettings(config: NuvoletsContent, onChange: (value: NuvoletsContent) => void) {
  const form = useForm<NuvoletsContent>({ defaultValues: { ...config, navigation: config.navigation ?? { instagramLabel: "Instagram", instagramHref: "", directionsLabel: config.store.ctaLabel, directionsHref: "" }, categories: config.categories.map((item) => ({ ...item, category: item.category ?? item.title.trim().slice(0, 160) })) }, resolver: zodResolver(nuvoletsContentSchema) });
  const sync = () => onChange(form.getValues());
  const submit = form.handleSubmit((value) => { onChange(value); toast.success(NUVOLETS_EDITOR_COPY.applied); }, () => toast.error(NUVOLETS_EDITOR_COPY.invalid));
  return { form, sync, submit };
}
