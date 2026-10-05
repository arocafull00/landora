"use client";
import { useFieldArray, useForm, type FieldErrors } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { saveProductAction } from "@/app/actions/products";
import { productFormSchema, type ProductFormValues, type ProductValues } from "@/lib/schemas/products";
import type { ProductDto } from "@/lib/domain/dtos";
import { newProductValues, productSlug } from "@/lib/products";
import { PRODUCT_DRAWER_COPY } from "../product-drawer-copy";

function defaults(product: ProductDto | null): ProductFormValues {
  const values = product ?? newProductValues();
  const amount = (value: number | null) => value === null ? "" : (value / 100).toFixed(2);
  return { title: values.title, subtitle: values.subtitle, slug: values.slug, description: values.description, category: values.category, brand: values.brand, tags: values.tags.join(", "), featured: values.featured, images: values.images, priceCents: amount(values.priceCents), previousPriceCents: amount(values.previousPriceCents), material: values.material, composition: values.composition, dimensions: values.dimensions, weight: values.weight, characteristics: values.characteristics, status: "draft", variants: values.variants.map((variant) => ({ ...variant, stock: variant.stock === null ? "" : String(variant.stock) })) };
}
export function useProductForm(landingId: string, product: ProductDto | null, onSaved: () => void, onInvalid?: (errors: FieldErrors<ProductFormValues>) => void) {
  const router = useRouter();
  const [defaultValues] = useState(() => defaults(product));
  const [savedProduct, setSavedProduct] = useState<Pick<ProductDto, "id" | "version" | "status" | "hasPendingChanges"> | null>(product);
  const [savedSlug, setSavedSlug] = useState(product?.slug ?? "");
  const [intent, setIntent] = useState<"save" | "publish">("save");
  const form = useForm<ProductFormValues, unknown, ProductValues>({ resolver: zodResolver(productFormSchema), defaultValues });
  const images = useFieldArray({ control: form.control, name: "images" });
  const variants = useFieldArray({ control: form.control, name: "variants", keyName: "fieldKey" });
  const characteristics = useFieldArray({ control: form.control, name: "characteristics" });
  const submitWithIntent = (nextIntent: "save" | "publish") => {
    if (form.formState.isSubmitting) return;
    setIntent(nextIntent);
    form.setValue("status", nextIntent === "publish" ? "published" : "draft");
    return form.handleSubmit(async (values) => {
      try {
        const { status, ...content } = values;
        void status;
        const result = await saveProductAction({ landingId, productId: savedProduct?.id ?? null, version: savedProduct?.version ?? 0, intent: nextIntent, product: content });
        if ("error" in result) { toast.error(result.error); return; }
        setSavedProduct(result.product);
        setSavedSlug(values.slug);
        form.reset({ ...form.getValues(), slug: values.slug, status: "draft" });
        toast.success(nextIntent === "publish" ? PRODUCT_DRAWER_COPY.published : PRODUCT_DRAWER_COPY.saved);
        router.refresh();
        if (nextIntent === "publish") onSaved();
      } catch { toast.error(nextIntent === "publish" ? PRODUCT_DRAWER_COPY.publishError : PRODUCT_DRAWER_COPY.saveError); }
    }, (errors) => { toast.error(PRODUCT_DRAWER_COPY.invalid); onInvalid?.(errors); })();
  };
  const submit = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); return submitWithIntent("save"); };
  const publish = () => submitWithIntent("publish");
  const status = savedProduct?.status ?? "draft";
  const hasPendingChanges = savedProduct?.hasPendingChanges ?? false;
  const canPublish = status !== "published" || hasPendingChanges || form.formState.isDirty;
  const previewHref = savedProduct ? `/preview/${landingId}/productos/${savedSlug}` : null;
  const generateSlug = () => { if (!form.getValues("slug")) form.setValue("slug", productSlug(form.getValues("title")), { shouldDirty: true }); };
  const addVariant = () => variants.append({ id: crypto.randomUUID(), size: "", color: "", sku: "", stock: "" });
  const addImage = () => images.append({ url: "", alt: "" });
  const addCharacteristic = () => characteristics.append({ name: "", value: "" });
  return { form, images, variants, characteristics, submit, publish, status, hasPendingChanges, canPublish, previewHref, publishing: intent === "publish", generateSlug, addVariant, addImage, addCharacteristic };
}
