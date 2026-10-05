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
      className="py-3"
      onOpenChange={onToggle}
      open={open}
    >
      <CollapsibleTrigger asChild>
        <button
          className="flex w-full min-w-0 items-center justify-between gap-3 py-3 text-left outline-none transition-colors hover:bg-surface-container-low focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary"
          type="button"
        >
          {header}
        </button>
      </CollapsibleTrigger>
      <CollapsibleContent>{children}</CollapsibleContent>
    </Collapsible>
  );
}
