"use client";

import { Controller } from "react-hook-form";
import type { NuvoletsProduct } from "@/lib/schemas/nuvolets";
import { ImageField } from "@/components/dashboard/image-field";
import { NUVOLETS_EDITOR_COPY as copy } from "../nuvolets-copy";
import { useNuvoletsProductForm } from "../hooks/use-nuvolets-product-form";
import { NuvoletsProductSummary } from "./nuvolets-product-summary";

export function NuvoletsProductForm({ products, onAdd }: { products: NuvoletsProduct[]; onAdd: (product: NuvoletsProduct) => void }) {
  const { form, submit } = useNuvoletsProductForm(onAdd);
  return <section className="space-y-6 py-6"><div><h2 className="text-xl font-semibold text-ink">{copy.productsTitle}</h2><p className="mt-2 text-ink-secondary">{copy.productsDescription}</p></div>
    <form onSubmit={submit} className="space-y-4">
      <label className="block space-y-2 text-ink-secondary"><span>{copy.name}</span><input {...form.register("name")} maxLength={160} className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-ink" />{form.formState.errors.name ? <span className="block text-danger">{form.formState.errors.name.message}</span> : null}</label>
      <label className="block space-y-2 text-ink-secondary"><span>{copy.price}</span><input {...form.register("price")} maxLength={80} className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-ink" /></label>
      <Controller name="image" control={form.control} render={({ field }) => <ImageField label={copy.image} templateId="nuvolets" value={field.value} onChange={field.onChange} />} />
      {form.formState.errors.image ? <p className="text-danger">{form.formState.errors.image.message}</p> : null}
      <label className="block space-y-2 text-ink-secondary"><span>{copy.alt}</span><input {...form.register("alt")} maxLength={200} className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-ink" /></label>
      <button type="submit" disabled={form.formState.isSubmitting || products.length >= 200} className="rounded-lg bg-primary px-4 py-2 text-on-primary">{copy.addProduct}</button>
    </form>
    {products.length ? <ul>{products.map((product) => <NuvoletsProductSummary key={product.id} product={product} />)}</ul> : <p className="text-ink-muted">{copy.empty}</p>}
  </section>;
}
