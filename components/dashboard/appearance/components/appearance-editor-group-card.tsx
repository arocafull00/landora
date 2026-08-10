"use client";

import type { ReactNode } from "react";
import { Collapsible } from "@/components/ui/collapsible";
import { CollapsibleContent } from "@/components/ui/collapsible-content";
import { CollapsibleTrigger } from "@/components/ui/collapsible-trigger";

export function AppearanceEditorGroupCard({
  children,
  header,
  onToggle,
  open,
}: {
  children: ReactNode;
  header: ReactNode;
  onToggle: () => void;
  open: boolean;
}) {
  return (
    <Collapsible
      className="rounded-xl border border-outline-variant bg-surface transition-[border-color,box-shadow] data-[state=open]:border-primary/40 data-[state=open]:shadow-sm"
      onOpenChange={onToggle}
      open={open}
    >
      <CollapsibleTrigger asChild>
        <button
          className="flex w-full min-w-0 items-center gap-3 p-2.5 text-left outline-none transition-colors hover:bg-surface-container-low focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary"
          type="button"
        >
          {header}
        </button>
      </CollapsibleTrigger>
      <CollapsibleContent>{children}</CollapsibleContent>
    </Collapsible>
  );
}
