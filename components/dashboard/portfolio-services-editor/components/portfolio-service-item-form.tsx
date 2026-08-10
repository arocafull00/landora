"use client";

import { Trash2 } from "lucide-react";
import { EditorTextArea } from "@/components/dashboard/editor-text-area";
import { EditorTextField } from "@/components/dashboard/editor-text-field";
import { PORTFOLIO_SERVICES_EDITOR_COPY } from "@/components/dashboard/portfolio-services-editor/portfolio-services-editor-copy";
import type { ServiceMenuItem } from "@/lib/dashboard-data";

export function PortfolioServiceItemForm({
  item,
  onChange,
  onRemove,
}: {
  item: ServiceMenuItem;
  onChange: (patch: Partial<ServiceMenuItem>) => void;
  onRemove: () => void;
}) {
  return (
    <div className="space-y-4 border-t border-outline-variant bg-surface-container-lowest p-4">
      <EditorTextField
        label="Categoría"
        onChange={(value) => onChange({ category: value })}
        value={item.category}
      />
      <EditorTextField
        label="Nombre"
        onChange={(value) => onChange({ name: value })}
        value={item.name}
      />
      <EditorTextArea
        label="Descripción"
        onChange={(value) => onChange({ description: value })}
        value={item.description}
      />
      <EditorTextField
        label="Precio"
        onChange={(value) => onChange({ price: value })}
        value={item.price}
      />
      <button
        className="inline-flex h-9 w-full items-center justify-center gap-2 rounded-lg font-label text-label-sm font-medium text-error transition-colors hover:bg-error-container"
        onClick={onRemove}
        type="button"
      >
        <Trash2 aria-hidden className="size-4" />
        {PORTFOLIO_SERVICES_EDITOR_COPY.deleteItem}
      </button>
    </div>
  );
}
