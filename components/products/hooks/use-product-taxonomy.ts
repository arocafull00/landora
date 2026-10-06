"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { saveProductTaxonomyAction, deleteProductTaxonomyAction } from "@/app/actions/products";
import { productTaxonomyFormSchema } from "@/lib/schemas/products";
import type { ProductTaxonomyField } from "@/lib/domain/dtos";
import { PRODUCT_TAXONOMY_COPY } from "../product-taxonomy-copy";

export function useProductTaxonomy(landingId: string, field: ProductTaxonomyField) {
  const copy = PRODUCT_TAXONOMY_COPY[field];
  const [open, setOpen] = useState(false);
  const [previousName, setPreviousName] = useState<string | null>(null);
  const [deleteName, setDeleteName] = useState<string | null>(null);
  const [deleting, startDelete] = useTransition();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const form = useForm({ resolver: zodResolver(productTaxonomyFormSchema), defaultValues: { name: "" } });
  const pending = form.formState.isSubmitting || deleting;
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
    if (pending) return;
    reset();
    setDeleteName(null);
    setOpen(next);
  };
  const refresh = (previous: string | null, name: string) => {
    if (previous !== null && searchParams.get(field) === previous && name !== previous) {
      const params = new URLSearchParams(searchParams.toString());
      if (name) params.set(field, name);
      else params.delete(field);
      params.delete("page");
      const query = params.toString();
      router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
      return;
    }
    router.refresh();
  };
  const submit = form.handleSubmit(async ({ name }) => {
    try {
      const result = await saveProductTaxonomyAction({ landingId, field, previousName, name });
      if ("error" in result) { toast.error(result.error); return; }
      toast.success(previousName === null ? copy.created : copy.updated);
      reset();
      refresh(previousName, name);
    } catch { toast.error(copy.error); }
  }, () => toast.error(copy.invalid));
  const onDeleteOpenChange = (next: boolean) => {
    if (!pending && !next) setDeleteName(null);
  };
  const requestDelete = (name: string) => {
    if (!pending) setDeleteName(name);
  };
  const confirmDelete = () => {
    if (deleteName === null || pending) return;
    startDelete(async () => {
      try {
        const result = await deleteProductTaxonomyAction({ landingId, field, name: deleteName });
        if ("error" in result) { toast.error(result.error); return; }
        toast.success(copy.deleted);
        setDeleteName(null);
        if (previousName === deleteName) reset();
        refresh(deleteName, "");
      } catch { toast.error(copy.deleteError); }
    });
  };

  return {
    open, onOpenChange, edit, reset, submit, deleteName, onDeleteOpenChange, requestDelete, confirmDelete, deleting,
    editing: previousName !== null,
    binding: form.register("name"),
    error: form.formState.errors.name?.message,
    pending,
  };
}
