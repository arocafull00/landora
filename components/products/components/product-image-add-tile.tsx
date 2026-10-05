"use client";

import { Plus } from "lucide-react";

const COPY = { add: "Añadir imagen" } as const;

export function ProductImageAddTile({ onAdd }: { onAdd: () => void }) {
  return (
    <button
      type="button"
      onClick={onAdd}
      className="flex aspect-square flex-col items-center justify-center gap-2 self-start rounded-xl border border-dashed border-border bg-surface-subtle text-ink-secondary transition-colors hover:bg-surface-container focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
    >
      <Plus className="size-5" aria-hidden />
      <span className="text-xs font-medium">{COPY.add}</span>
    </button>
  );
}
