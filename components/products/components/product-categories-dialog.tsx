import type { ComponentProps } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { PRODUCT_CATEGORIES_COPY } from "../product-categories-copy";
import { ProductCategoryForm } from "./product-category-form";
import { ProductCategoryRow } from "./product-category-row";

export function ProductCategoriesDialog({ open, onOpenChange, categories, onEdit, form }: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  categories: string[];
  onEdit: (name: string) => void;
  form: ComponentProps<typeof ProductCategoryForm>;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[85dvh] overflow-y-auto bg-surface text-ink">
        <DialogHeader>
          <DialogTitle>{PRODUCT_CATEGORIES_COPY.title}</DialogTitle>
          <DialogDescription className="text-ink-secondary">{PRODUCT_CATEGORIES_COPY.description}</DialogDescription>
        </DialogHeader>
        {categories.length ? (
          <ul className="max-h-64 space-y-2 overflow-y-auto">
            {categories.map((name) => <ProductCategoryRow key={name} name={name} pending={form.pending} onEdit={onEdit} />)}
          </ul>
        ) : <p className="text-sm text-ink-muted">{PRODUCT_CATEGORIES_COPY.empty}</p>}
        <Separator />
        <ProductCategoryForm {...form} />
      </DialogContent>
    </Dialog>
  );
}
