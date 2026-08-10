"use client";

import type { ReactNode } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Collapsible } from "@/components/ui/collapsible";
import { CollapsibleContent } from "@/components/ui/collapsible-content";
import { CollapsibleTrigger } from "@/components/ui/collapsible-trigger";

export function EditorCollapsibleItemCard({
  canMoveDown,
  canMoveUp,
  children,
  header,
  moveDownAriaLabel,
  moveUpAriaLabel,
  onMoveDown,
  onMoveUp,
  onToggle,
  open,
}: {
  canMoveDown: boolean;
  canMoveUp: boolean;
  children: ReactNode;
  header: ReactNode;
  moveDownAriaLabel: string;
  moveUpAriaLabel: string;
  onMoveDown: () => void;
  onMoveUp: () => void;
  onToggle: () => void;
  open: boolean;
}) {
  return (
    <Collapsible
      className="overflow-hidden rounded-xl border border-outline-variant bg-surface transition-[border-color,box-shadow] data-[state=open]:border-primary/40 data-[state=open]:shadow-sm"
      onOpenChange={onToggle}
      open={open}
    >
      <div className="flex items-stretch">
        <CollapsibleTrigger asChild>
          <button
            className="flex min-w-0 flex-1 items-center gap-3 p-2.5 text-left outline-none transition-colors hover:bg-surface-container-low focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary"
            type="button"
          >
            {header}
          </button>
        </CollapsibleTrigger>
        <div className="flex flex-col justify-center gap-0.5 border-l border-outline-variant px-1.5 py-2">
          <button
            aria-label={moveUpAriaLabel}
            className="rounded-md p-1 text-on-surface-variant transition-colors hover:bg-surface-container-low hover:text-on-surface disabled:cursor-not-allowed disabled:opacity-40"
            disabled={!canMoveUp}
            onClick={onMoveUp}
            type="button"
          >
            <ChevronUp aria-hidden className="size-4" />
          </button>
          <button
            aria-label={moveDownAriaLabel}
            className="rounded-md p-1 text-on-surface-variant transition-colors hover:bg-surface-container-low hover:text-on-surface disabled:cursor-not-allowed disabled:opacity-40"
            disabled={!canMoveDown}
            onClick={onMoveDown}
            type="button"
          >
            <ChevronDown aria-hidden className="size-4" />
          </button>
        </div>
      </div>
      <CollapsibleContent>{children}</CollapsibleContent>
    </Collapsible>
  );
}
