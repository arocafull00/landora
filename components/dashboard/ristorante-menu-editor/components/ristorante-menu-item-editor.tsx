"use client";

import { ChevronDown, Trash2 } from "lucide-react";
import { EditorTextArea } from "@/components/dashboard/editor-text-area";
import { EditorTextField } from "@/components/dashboard/editor-text-field";
import { ImageField } from "@/components/dashboard/image-field";
import { Button } from "@/components/ui/button";
import { Collapsible } from "@/components/ui/collapsible";
import { CollapsibleContent } from "@/components/ui/collapsible-content";
import { CollapsibleTrigger } from "@/components/ui/collapsible-trigger";
import type { ServiceMenuItem, TemplateId } from "@/lib/dashboard-data";
import { RISTORANTE_IMAGE_OPTIONS } from "@/lib/ristorante-assets";
import { cn } from "@/lib/utils";

export function RistoranteMenuItemEditor({
  item,
  onChange,
  onRemove,
  onToggle,
  open,
  templateId,
}: {
  item: ServiceMenuItem;
  onChange: (patch: Partial<ServiceMenuItem>) => void;
  onRemove: () => void;
  onToggle: () => void;
  open: boolean;
  templateId: TemplateId;
}) {
  const itemName = item.name.trim() || "Plato sin nombre";
  const category = item.category.trim() || "Sin categoría";

  return (
    <Collapsible
      className="overflow-hidden rounded-xl border border-outline-variant bg-surface transition-[border-color,box-shadow] data-[state=open]:border-primary/40 data-[state=open]:shadow-sm"
      onOpenChange={onToggle}
      open={open}
    >
      <div className="flex items-stretch">
        <CollapsibleTrigger asChild>
          <button
            className="flex min-w-0 flex-1 items-center justify-between gap-3 px-4 py-3 text-left outline-none transition-colors hover:bg-surface-container-low focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary"
            type="button"
          >
            <span className="min-w-0">
              <span className="block truncate font-body text-body-md font-semibold text-on-surface">
                {itemName}
              </span>
              <span className="mt-0.5 flex min-w-0 items-center gap-2 font-label text-label-sm text-on-surface-variant">
                <span className="truncate">{category}</span>
                {item.price.trim() ? (
                  <>
                    <span aria-hidden className="text-outline">
                      ·
                    </span>
                    <span className="shrink-0">{item.price}</span>
                  </>
                ) : null}
              </span>
            </span>
            <ChevronDown
              aria-hidden
              className={cn(
                "size-4 shrink-0 text-on-surface-variant transition-transform duration-200 motion-reduce:transition-none",
                open && "rotate-180",
              )}
            />
          </button>
        </CollapsibleTrigger>
        <div className="my-2 w-px bg-outline-variant" />
        <Button
          aria-label={`Eliminar ${itemName}`}
          className="h-auto rounded-none px-3"
          onClick={onRemove}
          type="button"
          variant="destructive"
        >
          <Trash2 aria-hidden />
        </Button>
      </div>

      <CollapsibleContent>
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
          <ImageField
            label="Imagen del plato"
            onChange={(value) => onChange({ image: value })}
            presets={RISTORANTE_IMAGE_OPTIONS}
            templateId={templateId}
            value={item.image ?? ""}
          />
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
