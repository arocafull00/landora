import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import type { ProductTaxonomyField } from "@/lib/domain/dtos";
import { PRODUCT_TAXONOMY_COPY } from "../product-taxonomy-copy";

export function ProductTaxonomyDeleteDialog({ field, name, pending, onOpenChange, onConfirm }: {
  field: ProductTaxonomyField;
  name: string | null;
  pending: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}) {
  const copy = PRODUCT_TAXONOMY_COPY[field];
  return (
    <Dialog open={name !== null} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton={false} className="bg-surface text-ink">
        <DialogHeader>
          <DialogTitle>{copy.deleteTitle}</DialogTitle>
          <DialogDescription className="text-ink-secondary">{copy.deleteDescription(name ?? "")}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button type="button" variant="outline" disabled={pending} onClick={() => onOpenChange(false)}>{copy.cancelDelete}</Button>
          <Button type="button" variant="destructive" disabled={pending} onClick={onConfirm}>{pending ? copy.deleting : copy.delete}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
