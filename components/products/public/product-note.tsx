import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

export function ProductNote({ icon: Icon, title, children }: { icon: LucideIcon; title: string; children: ReactNode }) {
  return (
    <section>
      <Icon aria-hidden className="mb-2 size-5 text-primary" />
      <h2 className="text-sm font-semibold">{title}</h2>
      <div className="mt-2 text-sm leading-6 text-ink/60">{children}</div>
    </section>
  );
}
