import type { FormEventHandler } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { ProductTaxonomyField } from "@/lib/domain/dtos";
import { PRODUCT_TAXONOMY_COPY } from "../product-taxonomy-copy";

export function ProductTaxonomyForm({ field, binding, error, editing, pending, onSubmit, onCancel }: {
  field: ProductTaxonomyField;
  binding: UseFormRegisterReturn<"name">;
  error: string | undefined;
  editing: boolean;
  pending: boolean;
  onSubmit: FormEventHandler<HTMLFormElement>;
  onCancel: () => void;
}) {
  const copy = PRODUCT_TAXONOMY_COPY[field];
  const inputId = `product-${field}-name`;
  const errorId = `product-${field}-error`;
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <h3 className="font-medium text-ink">{editing ? copy.edit : copy.new}</h3>
      <div className="flex flex-col gap-2">
        <Label htmlFor={inputId} className="text-ink">{copy.name}</Label>
        <Input {...binding} id={inputId} maxLength={160} disabled={pending} placeholder={copy.placeholder} aria-invalid={Boolean(error)} aria-describedby={error ? errorId : undefined} />
        {error ? <p id={errorId} className="text-sm text-danger">{error}</p> : null}
      </div>
      <div className="flex flex-wrap justify-end gap-2">
        {editing ? <Button type="button" variant="outline" disabled={pending} onClick={onCancel}>{copy.cancel}</Button> : null}
        <Button type="submit" disabled={pending}>{pending ? copy.saving : editing ? copy.save : copy.create}</Button>
      </div>
    </form>
  );
}
