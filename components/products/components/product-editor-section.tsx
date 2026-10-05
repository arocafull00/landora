import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function ProductEditorSection({
  id,
  title,
  description,
  active,
  action,
  children,
  className,
}: {
  id: string;
  title: string;
  description: string;
  active: boolean;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} hidden={!active} className={cn("space-y-6", className)}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 id={`${id}-title`} className="text-xl font-semibold text-ink">
            {title}
          </h2>
          <p className="mt-1 text-sm text-ink-secondary">{description}</p>
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}
