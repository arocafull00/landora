"use client";
import Link from "next/link";
import { Controller } from "react-hook-form";
import type { ProductDto } from "@/lib/domain/dtos";
import { Button } from "@/components/ui/button";
import { useProductForm } from "./hooks/use-product-form";
import { ProductInformationForm } from "./components/product-information-form";
import { ProductImageForm } from "./components/product-image-form";
import { ProductVariantForm } from "./components/product-variant-form";
import { ProductCharacteristicForm } from "./components/product-characteristic-form";
import { OptionsSelect } from "./components/options-select";

const COPY = { new: "Nuevo producto", save: "Guardar", saving: "Guardando…", back: "Volver a productos", images: "Imágenes", variants: "Variantes y existencias", characteristics: "Otras características", addImage: "Añadir imagen", addVariant: "Añadir variante", addCharacteristic: "Añadir característica", state: "Estado", preview: "Vista previa" } as const;
const STATES = [{ value: "draft", label: "Borrador" }, { value: "published", label: "Publicado" }, { value: "archived", label: "Archivado" }];
export function ProductEditor({ landingId, product, categories, brands }: { landingId: string; product: ProductDto | null; categories: string[]; brands: string[] }) {
  const { form, images, variants, characteristics, submit, generateSlug, addVariant, addImage, addCharacteristic } = useProductForm(landingId, product);
  const { errors, isSubmitting } = form.formState;
  return <main id="products-main" className="mx-auto max-w-5xl p-5 md:p-8">
    <Link href="/products" className="text-sm underline">{COPY.back}</Link><h1 className="my-5 text-3xl font-semibold">{product?.title ?? COPY.new}</h1>
    <form onSubmit={submit} className="space-y-6"><fieldset disabled={isSubmitting} className="space-y-6">
      <ProductInformationForm register={form.register} control={form.control} errors={errors} categories={categories} brands={brands} generateSlug={generateSlug} />
      <section className="space-y-4 rounded-xl border border-border bg-surface p-5"><h2 className="text-lg font-semibold">{COPY.images}</h2><div className="grid gap-4 sm:grid-cols-2">{images.fields.map((image, index) => <ProductImageForm key={image.id} index={index} total={images.fields.length} control={form.control} register={form.register} errors={errors.images} move={images.move} remove={() => images.remove(index)} />)}</div><Button type="button" variant="outline" disabled={images.fields.length >= 20} onClick={addImage}>{COPY.addImage}</Button>{errors.images?.root?.message || errors.images?.message ? <p className="text-danger">{errors.images.root?.message ?? errors.images.message}</p> : null}</section>
      <section className="space-y-4 rounded-xl border border-border bg-surface p-5"><h2 className="text-lg font-semibold">{COPY.variants}</h2>{variants.fields.map((variant, index) => <ProductVariantForm key={variant.fieldKey} index={index} register={form.register} error={errors.variants} canRemove={variants.fields.length > 1} remove={() => variants.remove(index)} />)}<Button type="button" variant="outline" disabled={variants.fields.length >= 200} onClick={addVariant}>{COPY.addVariant}</Button>{errors.variants?.root?.message || errors.variants?.message ? <p className="text-danger">{errors.variants.root?.message ?? errors.variants.message}</p> : null}</section>
      <section className="space-y-4 rounded-xl border border-border bg-surface p-5"><h2 className="text-lg font-semibold">{COPY.characteristics}</h2>{characteristics.fields.map((field, index) => <ProductCharacteristicForm key={field.id} index={index} register={form.register} errors={errors.characteristics} remove={() => characteristics.remove(index)} />)}<Button type="button" variant="outline" disabled={characteristics.fields.length >= 30} onClick={addCharacteristic}>{COPY.addCharacteristic}</Button></section>
      <div className="flex flex-wrap items-center gap-3"><Controller name="status" control={form.control} render={({ field }) => <OptionsSelect label={COPY.state} value={field.value} onChange={field.onChange} options={STATES} />} /><Button type="submit" disabled={isSubmitting}>{isSubmitting ? COPY.saving : COPY.save}</Button>{product ? <Button asChild variant="outline"><Link href={`/preview/${landingId}/productos/${product.slug}`} target="_blank">{COPY.preview}</Link></Button> : null}</div>
    </fieldset></form>
  </main>;
}
