"use client";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

const COPY = { add: "Añadir imagen" } as const;

export function ProductImageAddTile({ onAdd }: { onAdd: () => void }) {
  return (
    <Button
      type="button"
      variant="ghost"
      onClick={onAdd}
      className="aspect-square h-auto flex-col gap-2 self-start text-ink-secondary"
    >
      <Plus className="size-5" aria-hidden />
      <span className="text-xs font-medium">{COPY.add}</span>
    </Button>
  );
}
