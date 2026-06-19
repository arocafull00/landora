"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useDashboardChrome } from "@/components/dashboard/dashboard-chrome-context";

export function DashboardPageHeader({
  title,
  description,
  actions,
}: {
  title: string;
  description?: string;
  actions?: ReactNode;
}) {
  const { isAdmin } = useDashboardChrome();

  return (
    <header
      className={cn(
        "flex shrink-0 flex-wrap items-center justify-between gap-3 border-b border-outline-variant bg-surface-container-lowest px-unit-lg py-unit-md",
        isAdmin && "pt-12",
      )}
    >
      <div className="min-w-0">
        <h2 className="font-headline text-headline-lg font-semibold text-on-surface">
          {title}
        </h2>
        {description ? (
          <p className="mt-0.5 font-body text-body-sm text-on-surface-variant">
            {description}
          </p>
        ) : null}
      </div>
      {actions ? <div className="flex shrink-0 flex-wrap items-center gap-2">{actions}</div> : null}
    </header>
  );
}
