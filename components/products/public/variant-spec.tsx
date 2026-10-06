import type { LucideIcon } from "lucide-react";

export function VariantSpec({ icon: Icon, label, value }: { icon: LucideIcon; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-surface-container-high">
        <Icon aria-hidden className="size-6 text-ink" />
      </span>
      <div className="min-w-0">
        <p className="text-[11px] font-medium uppercase tracking-[0.1em] text-ink-secondary">{label}</p>
        <p className="mt-1 break-words text-base font-semibold text-ink">{value}</p>
      </div>
    </div>
  );
}
