import type { FormEventHandler } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PRODUCT_CATEGORIES_COPY } from "../product-categories-copy";

export function ProductCategoryForm({ binding, error, editing, pending, onSubmit, onCancel }: {
  binding: UseFormRegisterReturn<"name">;
  error: string | undefined;
  editing: boolean;
  pending: boolean;
  onSubmit: FormEventHandler<HTMLFormElement>;
  onCancel: () => void;
}) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <h3 className="font-medium text-ink">{editing ? PRODUCT_CATEGORIES_COPY.edit : PRODUCT_CATEGORIES_COPY.new}</h3>
      <div className="space-y-2">
        <Label htmlFor="product-category-name">{PRODUCT_CATEGORIES_COPY.name}</Label>
        <Input {...binding} id="product-category-name" maxLength={160} disabled={pending} placeholder={PRODUCT_CATEGORIES_COPY.placeholder} aria-invalid={Boolean(error)} aria-describedby={error ? "product-category-error" : undefined} />
        {error ? <p id="product-category-error" className="text-sm text-danger">{error}</p> : null}
      </div>
      <div className="flex flex-wrap justify-end gap-2">
        {editing ? <Button type="button" variant="outline" disabled={pending} onClick={onCancel}>{PRODUCT_CATEGORIES_COPY.cancel}</Button> : null}
        <Button type="submit" disabled={pending}>{pending ? PRODUCT_CATEGORIES_COPY.saving : editing ? PRODUCT_CATEGORIES_COPY.save : PRODUCT_CATEGORIES_COPY.create}</Button>
      </div>
    </form>
  );
}
