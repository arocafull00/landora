import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function ProductEditorSection({
  title,
  children,
  className,
}: {
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("space-y-4", className)}>
      <h2 className="text-sm font-semibold text-ink">{title}</h2>
      {children}
    </section>
  );
}
