"use client";
import { Controller, type Control, type FieldErrors, type UseFormRegister } from "react-hook-form";
import type { ProductFormValues, ProductValues } from "@/lib/schemas/products";
import { ProductField } from "./product-field";
import { CreatableProductSelect } from "./creatable-product-select";
import { Switch } from "@/components/ui/switch";

const COPY = { title: "Título", subtitle: "Subtítulo", slug: "URL de la ficha", description: "Descripción", category: "Categoría", brand: "Marca", tags: "Etiquetas separadas por comas", featured: "Producto destacado", price: "Precio (€)", previous: "Precio anterior (€)", other: "Elegir otro valor", material: "Material", composition: "Composición", dimensions: "Medidas", weight: "Peso" } as const;
export function ProductInformationForm({ register, control, errors, categories, brands, generateSlug }: { register: UseFormRegister<ProductFormValues>; control: Control<ProductFormValues, unknown, ProductValues>; errors: FieldErrors<ProductFormValues>; categories: string[]; brands: string[]; generateSlug: () => void }) {
  return <section className="space-y-5 rounded-xl border border-border bg-surface p-5">
    <div className="grid gap-4 sm:grid-cols-2"><ProductField label={COPY.title} binding={register("title")} onBlur={generateSlug} error={errors.title?.message} /><ProductField label={COPY.subtitle} binding={register("subtitle")} error={errors.subtitle?.message} /></div>
    <ProductField label={COPY.slug} binding={register("slug")} error={errors.slug?.message} />
    <div className="space-y-2"><label htmlFor="product-description" className="text-sm font-medium">{COPY.description}</label><textarea id="product-description" {...register("description")} className="min-h-36 w-full rounded-md border border-border bg-surface p-3 outline-none focus-visible:ring-2 focus-visible:ring-primary" />{errors.description ? <p className="text-sm text-danger">{errors.description.message}</p> : null}</div>
    <div className="grid gap-4 sm:grid-cols-2">
      <Controller name="category" control={control} render={({ field }) => <CreatableProductSelect label={COPY.category} value={field.value} onChange={field.onChange} options={categories} error={errors.category?.message} />} />
      <Controller name="brand" control={control} render={({ field }) => <CreatableProductSelect label={COPY.brand} value={field.value} onChange={field.onChange} options={brands} error={errors.brand?.message} />} />
      <ProductField label={COPY.price} binding={register("priceCents")} inputMode="decimal" error={errors.priceCents?.message} />
      <ProductField label={COPY.previous} binding={register("previousPriceCents")} inputMode="decimal" error={errors.previousPriceCents?.message} />
    </div>
    <ProductField label={COPY.tags} binding={register("tags")} error={errors.tags?.message} />
    <Controller name="featured" control={control} render={({ field }) => <div className="flex items-center gap-3"><Switch id="product-featured" checked={field.value} onCheckedChange={field.onChange} /><label htmlFor="product-featured">{COPY.featured}</label></div>} />
    <div className="grid gap-4 sm:grid-cols-2"><ProductField label={COPY.material} binding={register("material")} error={errors.material?.message} /><ProductField label={COPY.composition} binding={register("composition")} error={errors.composition?.message} /><ProductField label={COPY.dimensions} binding={register("dimensions")} error={errors.dimensions?.message} /><ProductField label={COPY.weight} binding={register("weight")} error={errors.weight?.message} /></div>
  </section>;
}
