"use client";
import { useFieldArray, useForm, type FieldErrors } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { saveProductAction } from "@/app/actions/products";
import { productFormSchema, type ProductFormValues, type ProductValues } from "@/lib/schemas/products";
import type { ProductDto } from "@/lib/domain/dtos";
import { newProductValues, productSlug } from "@/lib/products";

function defaults(product: ProductDto | null): ProductFormValues {
  const values = product ?? newProductValues();
  const amount = (value: number | null) => value === null ? "" : (value / 100).toFixed(2);
  return { title: values.title, subtitle: values.subtitle, slug: values.slug, description: values.description, category: values.category, brand: values.brand, tags: values.tags.join(", "), featured: values.featured, images: values.images, priceCents: amount(values.priceCents), previousPriceCents: amount(values.previousPriceCents), material: values.material, composition: values.composition, dimensions: values.dimensions, weight: values.weight, characteristics: values.characteristics, status: values.status, variants: values.variants.map((variant) => ({ ...variant, stock: variant.stock === null ? "" : String(variant.stock), priceCents: amount(variant.priceCents), previousPriceCents: amount(variant.previousPriceCents) })) };
}
export function useProductForm(landingId: string, product: ProductDto | null, onSaved: () => void, onInvalid?: (errors: FieldErrors<ProductFormValues>) => void) {
  const router = useRouter();
  const [defaultValues] = useState(() => defaults(product));
  const form = useForm<ProductFormValues, unknown, ProductValues>({ resolver: zodResolver(productFormSchema), defaultValues });
  const images = useFieldArray({ control: form.control, name: "images" });
  const variants = useFieldArray({ control: form.control, name: "variants", keyName: "fieldKey" });
  const characteristics = useFieldArray({ control: form.control, name: "characteristics" });
  const submit = form.handleSubmit(async (values) => {
    try {
      const result = await saveProductAction({ landingId, productId: product?.id ?? null, version: product?.version ?? 0, product: values });
      if ("error" in result) { toast.error(result.error); return; }
      toast.success("Producto guardado");
      router.refresh();
      onSaved();
    } catch { toast.error("No se pudo guardar el producto"); }
  }, (errors) => { toast.error("Revisa los campos del producto"); onInvalid?.(errors); });
  const generateSlug = () => { if (!form.getValues("slug")) form.setValue("slug", productSlug(form.getValues("title")), { shouldDirty: true }); };
  const addVariant = () => variants.append({ id: crypto.randomUUID(), size: "", color: "", sku: "", stock: "", priceCents: "", previousPriceCents: "" });
  const addImage = () => images.append({ url: "", alt: "" });
  const addCharacteristic = () => characteristics.append({ name: "", value: "" });
  return { form, images, variants, characteristics, submit, generateSlug, addVariant, addImage, addCharacteristic };
}
