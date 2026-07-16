import type { LucideIcon } from "lucide-react";

export function OficioProContactItem({
  href,
  icon: Icon,
  label,
  value,
  onClick,
}: {
  href?: string;
  icon: LucideIcon;
  label: string;
  value: string;
  onClick?: () => void;
}) {
  const content = (
    <div className="flex items-start gap-4 rounded-2xl border border-[var(--site-primary)]/10 bg-[var(--site-surface)] p-5 shadow-[0_10px_28px_rgba(31,78,121,0.08)] transition-all hover:-translate-y-0.5 hover:shadow-[0_16px_36px_rgba(31,78,121,0.12)]">
      <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[var(--site-primary)]/10 text-[var(--site-primary)]">
        <Icon className="size-5" />
      </div>
      <div className="min-w-0">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--site-primary)]">
          {label}
        </p>
        <p className="mt-1 break-words text-sm font-semibold text-[var(--site-text)]">
          {value}
        </p>
      </div>
    </div>
  );

  if (!href) return content;

  return (
    <a href={href} onClick={onClick} rel="noreferrer" target={href.startsWith("http") ? "_blank" : undefined}>
      {content}
    </a>
  );
}
