import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

export function ProductNote({ icon: Icon, title, children }: { icon: LucideIcon; title: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="flex items-center gap-2 text-sm font-semibold text-ink">
        <Icon aria-hidden className="size-4 text-ink-secondary" />
        {title}
      </h2>
      <div className="mt-2 max-w-prose text-pretty text-sm leading-6 text-ink-secondary">{children}</div>
    </section>
  );
}
