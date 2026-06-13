import type { LucideIcon } from "lucide-react";

export function OficioProContactItem({
  href,
  icon: Icon,
  label,
  value,
}: {
  href?: string;
  icon: LucideIcon;
  label: string;
  value: string;
}) {
  const content = (
    <div className="flex items-start gap-4 rounded-2xl border border-[#1F4E79]/10 bg-white p-5 shadow-[0_10px_28px_rgba(31,78,121,0.08)] transition-all hover:-translate-y-0.5 hover:shadow-[0_16px_36px_rgba(31,78,121,0.12)]">
      <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#1F4E79]/10 text-[#1F4E79]">
        <Icon className="size-5" />
      </div>
      <div className="min-w-0">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#1F4E79]">
          {label}
        </p>
        <p className="mt-1 break-words text-sm font-semibold text-[#17212B]">
          {value}
        </p>
      </div>
    </div>
  );

  if (!href) return content;

  return (
    <a href={href} rel="noreferrer" target={href.startsWith("http") ? "_blank" : undefined}>
      {content}
    </a>
  );
}
