"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { saveProductCategoryAction } from "@/app/actions/products";
import { productCategoryFormSchema } from "@/lib/schemas/products";
import { PRODUCT_CATEGORIES_COPY } from "../product-categories-copy";

export function useProductCategories(landingId: string) {
  const [open, setOpen] = useState(false);
  const [previousName, setPreviousName] = useState<string | null>(null);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const form = useForm({ resolver: zodResolver(productCategoryFormSchema), defaultValues: { name: "" } });
  const reset = () => {
    setPreviousName(null);
    form.reset({ name: "" });
  };
  const edit = (name: string) => {
    setPreviousName(name);
    form.reset({ name });
    form.setFocus("name");
  };
  const onOpenChange = (next: boolean) => {
    if (form.formState.isSubmitting) return;
    reset();
    setOpen(next);
  };
  const submit = form.handleSubmit(async ({ name }) => {
    try {
      const result = await saveProductCategoryAction({ landingId, previousName, name });
      if ("error" in result) { toast.error(result.error); return; }
      toast.success(previousName === null ? PRODUCT_CATEGORIES_COPY.created : PRODUCT_CATEGORIES_COPY.updated);
      reset();
      if (previousName !== null && searchParams.get("category") === previousName && name !== previousName) {
        const params = new URLSearchParams(searchParams.toString());
        params.set("category", name);
        params.delete("page");
        router.replace(`${pathname}?${params.toString()}`);
        return;
      }
      router.refresh();
    } catch { toast.error(PRODUCT_CATEGORIES_COPY.error); }
  }, () => toast.error(PRODUCT_CATEGORIES_COPY.invalid));

  return {
    open, onOpenChange, edit, reset, submit,
    editing: previousName !== null,
    binding: form.register("name"),
    error: form.formState.errors.name?.message,
    pending: form.formState.isSubmitting,
  };
}
