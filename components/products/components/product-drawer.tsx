"use client";

import { useWatch } from "react-hook-form";
import type { ProductDto } from "@/lib/domain/dtos";
import { Dialog, DialogSheetContent } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { useProductEditorSection } from "../hooks/use-product-editor-section";
import { useProductForm } from "../hooks/use-product-form";
import { PRODUCT_DRAWER_COPY } from "../product-drawer-copy";
import { invalidProductSections } from "../product-editor-sections";
import { ProductCharacteristicsPanel } from "./product-characteristics-panel";
import { ProductEditorFooter } from "./product-editor-footer";
import { ProductEditorHeader } from "./product-editor-header";
import { ProductEditorSidebar } from "./product-editor-sidebar";
import { ProductGeneralPanel } from "./product-general-panel";
import { ProductImagesPanel } from "./product-images-panel";
import { ProductSeoPanel } from "./product-seo-panel";
import { ProductStatusBadge } from "./product-status-badge";
import { ProductVariantsPanel } from "./product-variants-panel";

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
  const { section, setSection, showFirstInvalid } = useProductEditorSection();
  const { form, images, variants, characteristics, submit, publish, status, hasPendingChanges, canPublish, previewHref, publishing, generateSlug, addVariant, addImage, addCharacteristic } =
    useProductForm(landingId, product, () => onOpenChange(false), showFirstInvalid);
  const title = useWatch({ control: form.control, name: "title" });
  const { errors, isSubmitting, isDirty } = form.formState;
  const isEdit = product !== null;
  const close = () => {
    form.reset();
    onOpenChange(false);
  };
  const handleOpenChange = (next: boolean) => {
    if (!next) form.reset();
    onOpenChange(next);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogSheetContent showCloseButton={false} className="max-w-[980px]">
        <ProductEditorHeader
          title={title.trim() || (isEdit ? PRODUCT_DRAWER_COPY.editTitle : PRODUCT_DRAWER_COPY.newTitle)}
          description={isEdit ? PRODUCT_DRAWER_COPY.editDescription : PRODUCT_DRAWER_COPY.newDescription}
          status={status}
          hasPendingChanges={hasPendingChanges}
        />
        <Separator className="shrink-0" />
        <div className="flex min-h-0 flex-1 flex-col md:flex-row">
          <ProductEditorSidebar
            section={section}
            counts={{ images: images.fields.length, variants: variants.fields.length }}
            invalidSections={invalidProductSections(errors)}
            onSelect={setSection}
          >
            <ProductStatusBadge status={status} hasPendingChanges={hasPendingChanges} />
          </ProductEditorSidebar>
          <Separator className="md:hidden" />
          <Separator orientation="vertical" className="hidden md:block" />
          <main className="min-h-0 min-w-0 flex-1 overflow-y-auto bg-canvas">
            <form id={PRODUCT_FORM_ID} onSubmit={submit} className="mx-auto max-w-180 p-4 md:p-7">
              <fieldset disabled={isSubmitting} className="min-w-0 border-0 p-0">
                <ProductGeneralPanel
                  active={section === "general"}
                  register={form.register}
                  control={form.control}
                  errors={errors}
                  categories={categories}
                  brands={brands}
                  generateSlug={generateSlug}
                />
                <ProductImagesPanel
                  active={section === "images"}
                  images={images}
                  control={form.control}
                  register={form.register}
                  errors={errors.images}
                  onAdd={addImage}
                />
                <ProductVariantsPanel
                  active={section === "variants"}
                  variants={variants}
                  control={form.control}
                  register={form.register}
                  error={errors.variants}
                  onAdd={addVariant}
                />
                <ProductCharacteristicsPanel
                  active={section === "characteristics"}
                  characteristics={characteristics}
                  register={form.register}
                  errors={errors}
                  onAdd={addCharacteristic}
                />
                <ProductSeoPanel active={section === "seo"} register={form.register} errors={errors} />
              </fieldset>
            </form>
          </main>
        </div>
        <Separator className="shrink-0" />
        <ProductEditorFooter
          formId={PRODUCT_FORM_ID}
          dirty={isDirty}
          submitting={isSubmitting}
          publishing={publishing}
          hasPendingChanges={hasPendingChanges}
          canPublish={canPublish}
          previewHref={previewHref}
          onCancel={close}
          onPublish={publish}
        />
      </DialogSheetContent>
    </Dialog>
  );
}
