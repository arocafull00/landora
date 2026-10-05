"use client";

import Link from "next/link";
import { Controller } from "react-hook-form";
import type { ProductDto } from "@/lib/domain/dtos";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useProductForm } from "../hooks/use-product-form";
import { ProductEditorForm } from "../product-editor-form";
import { OptionsSelect } from "./options-select";
import { PRODUCT_DRAWER_COPY } from "../product-drawer-copy";

const STATES = [
  { value: "draft", label: "Borrador" },
  { value: "published", label: "Publicado" },
  { value: "archived", label: "Archivado" },
];

const PRODUCT_FORM_ID = "product-form";

export function ProductDrawer({
  open,
  onOpenChange,
  landingId,
  product,
  categories,
  brands,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  landingId: string;
  product: ProductDto | null;
  categories: string[];
  brands: string[];
}) {
  const { form, images, variants, characteristics, submit, generateSlug, addVariant, addImage, addCharacteristic } =
    useProductForm(landingId, product, () => onOpenChange(false));
  const close = () => {
    form.reset();
    onOpenChange(false);
  };
  const handleOpenChange = (next: boolean) => {
    if (!next) form.reset();
    onOpenChange(next);
  };
  const { errors, isSubmitting } = form.formState;
  const isEdit = product !== null;

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        showCloseButton
        className={cn(
          "flex h-full max-h-dvh w-full max-w-2xl flex-col gap-0 overflow-hidden rounded-none border-l p-0",
          "inset-y-0 top-0 right-0 left-auto translate-x-0 translate-y-0",
          "data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right",
          "data-[state=closed]:zoom-out-100 data-[state=open]:zoom-in-100"
        )}
      >
        <DialogHeader className="shrink-0 border-b border-border-subtle px-6 py-4 text-left">
          <DialogTitle>{isEdit ? PRODUCT_DRAWER_COPY.editTitle : PRODUCT_DRAWER_COPY.newTitle}</DialogTitle>
          <DialogDescription>
            {isEdit ? PRODUCT_DRAWER_COPY.editDescription : PRODUCT_DRAWER_COPY.newDescription}
          </DialogDescription>
        </DialogHeader>
        <div className="min-h-0 flex-1 overflow-y-auto px-6 py-4">
          <ProductEditorForm
            formId={PRODUCT_FORM_ID}
            form={form}
            images={images}
            variants={variants}
            characteristics={characteristics}
            errors={errors}
            categories={categories}
            brands={brands}
            generateSlug={generateSlug}
            addVariant={addVariant}
            addImage={addImage}
            addCharacteristic={addCharacteristic}
            submit={submit}
            isSubmitting={isSubmitting}
          />
        </div>
        <footer className="flex shrink-0 flex-wrap items-center gap-3 border-t border-border-subtle bg-surface px-6 py-4">
          <Controller
            name="status"
            control={form.control}
            render={({ field }) => (
              <OptionsSelect label={PRODUCT_DRAWER_COPY.state} value={field.value} onChange={field.onChange} options={STATES} />
            )}
          />
          <div className="ml-auto flex flex-wrap gap-2">
            <Button type="button" variant="outline" disabled={isSubmitting} onClick={close}>
              {PRODUCT_DRAWER_COPY.cancel}
            </Button>
            {isEdit ? (
              <Button asChild variant="outline">
                <Link href={`/preview/${landingId}/productos/${product.slug}`} target="_blank">
                  {PRODUCT_DRAWER_COPY.preview}
                </Link>
              </Button>
            ) : null}
            <Button type="submit" form={PRODUCT_FORM_ID} disabled={isSubmitting}>
              {isSubmitting ? PRODUCT_DRAWER_COPY.saving : PRODUCT_DRAWER_COPY.save}
            </Button>
          </div>
        </footer>
      </DialogContent>
    </Dialog>
  );
}
