"use client";

import { Tags } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCategoriesDialog } from "./components/product-categories-dialog";
import { useProductCategories } from "./hooks/use-product-categories";
import { PRODUCT_CATEGORIES_COPY } from "./product-categories-copy";

export function ProductCategoriesClient({ landingId, categories }: { landingId: string; categories: string[] }) {
  const manager = useProductCategories(landingId);
  return (
    <>
      <Button type="button" variant="outline" className="h-10 gap-2 rounded-lg" onClick={() => manager.onOpenChange(true)}>
        <Tags className="size-4" aria-hidden />
        {PRODUCT_CATEGORIES_COPY.title}
      </Button>
      <ProductCategoriesDialog
        open={manager.open} onOpenChange={manager.onOpenChange} categories={categories} onEdit={manager.edit}
        form={{ binding: manager.binding, error: manager.error, editing: manager.editing, pending: manager.pending, onSubmit: manager.submit, onCancel: manager.reset }}
      />
    </>
  );
}
