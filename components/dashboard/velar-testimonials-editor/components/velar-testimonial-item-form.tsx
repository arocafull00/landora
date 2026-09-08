"use client";

import { Trash2 } from "lucide-react";
import { EditorTextArea } from "@/components/dashboard/editor-text-area";
import { EditorTextField } from "@/components/dashboard/editor-text-field";
import { VELAR_TESTIMONIALS_EDITOR_COPY } from "@/components/dashboard/velar-testimonials-editor/velar-testimonials-editor-copy";
import type { TestimonialContent } from "@/lib/dashboard-data";

export function VelarTestimonialItemForm({
  item,
  onChange,
  onRemove,
}: {
  item: TestimonialContent;
  onChange: (patch: Partial<TestimonialContent>) => void;
  onRemove: () => void;
}) {
  return (
    <div className="space-y-4 border-t border-outline-variant bg-surface-container-lowest p-4">
      <EditorTextField
        editorId={`testimonios:${item.id}:author`}
        label="Autor de la reseña"
        onChange={(value) => onChange({ author: value })}
        value={item.author}
      />
      <EditorTextArea
        editorId={`testimonios:${item.id}:comment`}
        label="Reseña"
        onChange={(value) => onChange({ comment: value })}
        rows={4}
        value={item.comment}
      />
      <button
        className="inline-flex h-9 w-full items-center justify-center gap-2 rounded-lg font-label text-label-sm font-medium text-error transition-colors hover:bg-error-container"
        onClick={onRemove}
        type="button"
      >
        <Trash2 aria-hidden className="size-4" />
        {VELAR_TESTIMONIALS_EDITOR_COPY.deleteItem}
      </button>
    </div>
  );
}
