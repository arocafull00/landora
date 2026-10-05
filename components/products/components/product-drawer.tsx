"use client";

import Link from "next/link";
import { Controller } from "react-hook-form";
import type { ProductDto } from "@/lib/domain/dtos";
import {
  Dialog,
  DialogDescription,
  DialogHeader,
  DialogSheetContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useProductForm } from "../hooks/use-product-form";
import { OptionsSelect } from "./options-select";
import { PRODUCT_DRAWER_COPY } from "../product-drawer-copy";
import { ProductEditorSection } from "./product-editor-section";
import { ProductInformationGeneralForm } from "./product-information-general-form";
import { ProductInformationDataForm } from "./product-information-data-form";
import { ProductImageForm } from "./product-image-form";
import { ProductVariantForm } from "./product-variant-form";
import { ProductCharacteristicForm } from "./product-characteristic-form";

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
      <DialogSheetContent showCloseButton>
        <DialogHeader className="shrink-0 px-6 py-4 text-left">
          <DialogTitle>{isEdit ? PRODUCT_DRAWER_COPY.editTitle : PRODUCT_DRAWER_COPY.newTitle}</DialogTitle>
          <DialogDescription>
            {isEdit ? PRODUCT_DRAWER_COPY.editDescription : PRODUCT_DRAWER_COPY.newDescription}
          </DialogDescription>
        </DialogHeader>
        <Separator className="shrink-0 bg-border-subtle" />
        <div className="min-h-0 flex-1 overflow-y-auto px-6 py-4">
          <form id={PRODUCT_FORM_ID} onSubmit={submit}>
            <fieldset disabled={isSubmitting} className="min-w-0 border-0 p-0">
              <ProductEditorSection title={PRODUCT_DRAWER_COPY.sectionGeneral}>
                <ProductInformationGeneralForm register={form.register} errors={errors} generateSlug={generateSlug} />
              </ProductEditorSection>
              <Separator className="my-8 bg-border-subtle" />
              <ProductEditorSection title={PRODUCT_DRAWER_COPY.sectionData}>
                <ProductInformationDataForm
                  register={form.register}
                  control={form.control}
                  errors={errors}
                  categories={categories}
                  brands={brands}
                />
              </ProductEditorSection>
              <Separator className="my-8 bg-border-subtle" />
              <ProductEditorSection title={PRODUCT_DRAWER_COPY.sectionImages}>
                <div>
                  {images.fields.map((image, index) => (
                    <ProductImageForm
                      key={image.id}
                      index={index}
                      total={images.fields.length}
                      control={form.control}
                      register={form.register}
                      errors={errors.images}
                      move={images.move}
                      remove={() => images.remove(index)}
                    />
                  ))}
                </div>
                <Button type="button" variant="outline" className="mt-2" disabled={images.fields.length >= 20} onClick={addImage}>
                  {PRODUCT_DRAWER_COPY.addImage}
                </Button>
                {errors.images?.root?.message || errors.images?.message ? (
                  <p className="text-danger">{errors.images.root?.message ?? errors.images.message}</p>
                ) : null}
              </ProductEditorSection>
              <Separator className="my-8 bg-border-subtle" />
              <ProductEditorSection title={PRODUCT_DRAWER_COPY.sectionVariants}>
                <div className="space-y-10">
                  {variants.fields.map((variant, index) => (
                    <ProductVariantForm
                      key={variant.fieldKey}
                      index={index}
                      register={form.register}
                      error={errors.variants}
                      canRemove={variants.fields.length > 1}
                      remove={() => variants.remove(index)}
                    />
                  ))}
                </div>
                <Button type="button" variant="outline" className="mt-2" disabled={variants.fields.length >= 200} onClick={addVariant}>
                  {PRODUCT_DRAWER_COPY.addVariant}
                </Button>
                {errors.variants?.root?.message || errors.variants?.message ? (
                  <p className="text-danger">{errors.variants.root?.message ?? errors.variants.message}</p>
                ) : null}
              </ProductEditorSection>
              <Separator className="my-8 bg-border-subtle" />
              <ProductEditorSection title={PRODUCT_DRAWER_COPY.sectionCharacteristics}>
                <div className="space-y-4">
                  {characteristics.fields.map((field, index) => (
                    <ProductCharacteristicForm
                      key={field.id}
                      index={index}
                      register={form.register}
                      errors={errors.characteristics}
                      remove={() => characteristics.remove(index)}
                    />
                  ))}
                </div>
                <Button type="button" variant="outline" disabled={characteristics.fields.length >= 30} onClick={addCharacteristic}>
                  {PRODUCT_DRAWER_COPY.addCharacteristic}
                </Button>
              </ProductEditorSection>
            </fieldset>
          </form>
        </div>
        <Separator className="shrink-0 bg-border-subtle" />
        <footer className="flex shrink-0 flex-wrap items-center gap-3 bg-surface px-6 py-4">
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
      </DialogSheetContent>
    </Dialog>
  );
}
