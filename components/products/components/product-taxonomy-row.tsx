import { Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ProductTaxonomyField } from "@/lib/domain/dtos";
import { PRODUCT_TAXONOMY_COPY } from "../product-taxonomy-copy";

export function ProductTaxonomyRow({ field, name, pending, onEdit, onDelete }: { field: ProductTaxonomyField; name: string; pending: boolean; onEdit: (name: string) => void; onDelete: (name: string) => void }) {
  const copy = PRODUCT_TAXONOMY_COPY[field];
  return (
    <li className="flex items-center justify-between gap-3 rounded-lg bg-canvas px-3 py-2">
      <span className="min-w-0 break-words text-sm text-ink">{name}</span>
      <div className="flex shrink-0 gap-1">
        <Button type="button" variant="ghost" size="icon-sm" disabled={pending} onClick={() => onEdit(name)} aria-label={copy.editLabel(name)}>
          <Pencil className="size-4" aria-hidden />
        </Button>
        <Button type="button" variant="ghost" size="icon-sm" className="text-danger" disabled={pending} onClick={() => onDelete(name)} aria-label={copy.deleteLabel(name)}>
          <Trash2 className="size-4" aria-hidden />
        </Button>
      </div>
    </li>
  );
}
