import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function ProductEditorCard({
  title,
  description,
  children,
  className,
}: {
  title?: string;
  description?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("space-y-4 rounded-xl border border-border-subtle bg-surface p-5", className)}>
      {title ? (
        <div>
          <h3 className="text-sm font-semibold text-ink">{title}</h3>
          {description ? <p className="mt-1 text-xs text-ink-secondary">{description}</p> : null}
        </div>
      ) : null}
      {children}
    </div>
  );
}
