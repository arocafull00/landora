"use client";
import Link from "next/link";
import { Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { ProductField } from "./product-field";
import { useCatalogConfig } from "../hooks/use-catalog-config";
import type { CatalogConfigDto } from "@/lib/domain/dtos";

const COPY = { back: "Volver a productos", title: "Configurar catálogo", enabled: "Activar catálogo público", name: "Título del catálogo", description: "Descripción", phone: "WhatsApp con prefijo internacional", save: "Guardar configuración", saving: "Guardando…", note: "Activar el catálogo sustituirá los productos antiguos de la portada de Nuvolets por los productos publicados aquí." } as const;
export function CatalogConfigForm({ landingId, config, suggestedPhone, nuvolets }: { landingId: string; config: CatalogConfigDto; suggestedPhone: string; nuvolets: boolean }) {
  const { form, submit } = useCatalogConfig(landingId, config, suggestedPhone);
  const { errors, isSubmitting } = form.formState;
  return <main id="products-main" className="mx-auto max-w-2xl p-5 md:p-8"><Link href="/products" className="text-sm underline">{COPY.back}</Link><h1 className="my-6 text-3xl font-semibold">{COPY.title}</h1><form onSubmit={submit} className="space-y-5 rounded-xl border border-border bg-surface p-5"><fieldset disabled={isSubmitting} className="space-y-5">
    <Controller name="enabled" control={form.control} render={({ field }) => <div className="flex items-center gap-3"><Switch id="catalog-enabled" checked={field.value} onCheckedChange={field.onChange} /><label htmlFor="catalog-enabled">{COPY.enabled}</label></div>} />
    {nuvolets && !config.adopted ? <p className="text-sm text-on-surface-variant">{COPY.note}</p> : null}
    <ProductField label={COPY.name} binding={form.register("title")} error={errors.title?.message} />
    <div className="space-y-2"><label htmlFor="catalog-description">{COPY.description}</label><textarea id="catalog-description" className="min-h-24 w-full rounded-md border border-border bg-surface p-3" {...form.register("description")} />{errors.description ? <p className="text-danger">{errors.description.message}</p> : null}</div>
    <ProductField label={COPY.phone} binding={form.register("whatsappPhone")} error={errors.whatsappPhone?.message} />
    <Button type="submit" disabled={isSubmitting}>{isSubmitting ? COPY.saving : COPY.save}</Button>
  </fieldset></form></main>;
}
