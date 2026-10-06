"use client";

import { Tag, Tags } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ProductTaxonomyField } from "@/lib/domain/dtos";
import { ProductTaxonomyDialog } from "./components/product-taxonomy-dialog";
import { ProductTaxonomyDeleteDialog } from "./components/product-taxonomy-delete-dialog";
import { useProductTaxonomy } from "./hooks/use-product-taxonomy";
import { PRODUCT_TAXONOMY_COPY } from "./product-taxonomy-copy";

export function ProductTaxonomyClient({ landingId, field, entries }: { landingId: string; field: ProductTaxonomyField; entries: string[] }) {
  const manager = useProductTaxonomy(landingId, field);
  const Icon = field === "category" ? Tags : Tag;
  return (
    <>
      <Button type="button" variant="outline" className="h-10 gap-2 rounded-lg" aria-haspopup="dialog" aria-expanded={manager.open} aria-controls={`product-${field}-manager`} onClick={() => manager.onOpenChange(true)}>
        <Icon className="size-4" aria-hidden />
        {PRODUCT_TAXONOMY_COPY[field].title}
      </Button>
      <ProductTaxonomyDialog
        field={field} open={manager.open} onOpenChange={manager.onOpenChange} entries={entries} onEdit={manager.edit} onDelete={manager.requestDelete}
        form={{ binding: manager.binding, error: manager.error, editing: manager.editing, pending: manager.pending, onSubmit: manager.submit, onCancel: manager.reset }}
      />
      <ProductTaxonomyDeleteDialog field={field} name={manager.deleteName} pending={manager.deleting} onOpenChange={manager.onDeleteOpenChange} onConfirm={manager.confirmDelete} />
    </>
  );
}
