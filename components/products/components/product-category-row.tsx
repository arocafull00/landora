import { Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PRODUCT_CATEGORIES_COPY } from "../product-categories-copy";

export function ProductCategoryRow({ name, pending, onEdit }: { name: string; pending: boolean; onEdit: (name: string) => void }) {
  return (
    <li className="flex items-center justify-between gap-3 rounded-lg bg-canvas px-3 py-2">
      <span className="min-w-0 break-words text-sm text-ink">{name}</span>
      <Button type="button" variant="ghost" size="icon-sm" disabled={pending} onClick={() => onEdit(name)} aria-label={PRODUCT_CATEGORIES_COPY.editLabel(name)}>
        <Pencil className="size-4" aria-hidden />
      </Button>
    </li>
  );
}
