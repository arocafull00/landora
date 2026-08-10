"use client";

import { Trash2 } from "lucide-react";
import { EditorTextArea } from "@/components/dashboard/editor-text-area";
import { EditorTextField } from "@/components/dashboard/editor-text-field";
import { PORTFOLIO_FAQ_EDITOR_COPY } from "@/components/dashboard/portfolio-faq-editor/portfolio-faq-editor-copy";
import type { FaqItem } from "@/lib/dashboard-data";

export function PortfolioFaqItemForm({
  item,
  onChange,
  onRemove,
}: {
  item: FaqItem;
  onChange: (patch: Partial<FaqItem>) => void;
  onRemove: () => void;
}) {
  return (
    <div className="space-y-4 border-t border-outline-variant bg-surface-container-lowest p-4">
      <EditorTextField
        label="Pregunta"
        onChange={(value) => onChange({ question: value })}
        value={item.question}
      />
      <EditorTextArea
        label="Respuesta"
        onChange={(value) => onChange({ answer: value })}
        rows={4}
        value={item.answer}
      />
      <button
        className="inline-flex h-9 w-full items-center justify-center gap-2 rounded-lg font-label text-label-sm font-medium text-error transition-colors hover:bg-error-container"
        onClick={onRemove}
        type="button"
      >
        <Trash2 aria-hidden className="size-4" />
        {PORTFOLIO_FAQ_EDITOR_COPY.deleteItem}
      </button>
    </div>
  );
}
