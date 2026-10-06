import type { ComponentProps } from "react";
import { Dialog, DialogSheetContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import type { ProductTaxonomyField } from "@/lib/domain/dtos";
import { PRODUCT_TAXONOMY_COPY } from "../product-taxonomy-copy";
import { ProductTaxonomyForm } from "./product-taxonomy-form";
import { ProductTaxonomyRow } from "./product-taxonomy-row";

export function ProductTaxonomyDialog({ field, open, onOpenChange, entries, onEdit, onDelete, form }: {
  field: ProductTaxonomyField;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  entries: string[];
  onEdit: (name: string) => void;
  onDelete: (name: string) => void;
  form: Omit<ComponentProps<typeof ProductTaxonomyForm>, "field">;
}) {
  const copy = PRODUCT_TAXONOMY_COPY[field];
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogSheetContent id={`product-${field}-manager`} showCloseButton={!form.pending} className="text-ink">
        <DialogHeader className="shrink-0 px-6 py-4 pr-12 text-left">
          <DialogTitle>{copy.title}</DialogTitle>
          <DialogDescription className="text-ink-secondary">{copy.description}</DialogDescription>
        </DialogHeader>
        <Separator className="shrink-0" />
        <div className="min-h-0 flex-1 space-y-6 overflow-y-auto bg-canvas p-4 md:p-7">
          {entries.length ? (
            <ul className="space-y-2">
              {entries.map((name) => <ProductTaxonomyRow key={name} field={field} name={name} pending={form.pending} onEdit={onEdit} onDelete={onDelete} />)}
            </ul>
          ) : <p className="text-sm text-ink-muted">{copy.empty}</p>}
          <Separator />
          <ProductTaxonomyForm field={field} {...form} />
        </div>
      </DialogSheetContent>
    </Dialog>
  );
}
