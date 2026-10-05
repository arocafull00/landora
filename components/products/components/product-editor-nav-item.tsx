"use client";

import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { PRODUCT_DRAWER_COPY } from "../product-drawer-copy";

export function ProductEditorNavItem({
  label,
  icon: Icon,
  panelId,
  active,
  invalid,
  count,
  onSelect,
}: {
  label: string;
  icon: LucideIcon;
  panelId: string;
  active: boolean;
  invalid: boolean;
  count: number | undefined;
  onSelect: () => void;
}) {
  return (
    <Button
      type="button"
      variant="ghost"
      aria-controls={panelId}
      aria-current={active ? "true" : undefined}
      onClick={onSelect}
      className={cn(
        "h-10 shrink-0 justify-start gap-2.5 px-3 md:w-full",
        active
          ? "bg-primary-subtle text-primary hover:bg-primary-subtle hover:text-primary"
          : "text-ink-secondary hover:bg-surface-container",
      )}
    >
      <Icon className="size-4" aria-hidden />
      {label}
      {invalid ? (
        <>
          <span className="size-1.5 rounded-full bg-danger" aria-hidden />
          <span className="sr-only">{PRODUCT_DRAWER_COPY.navInvalid}</span>
        </>
      ) : null}
      {count === undefined ? null : <span className="ml-auto text-xs font-normal text-ink-faint">{count}</span>}
    </Button>
  );
}
