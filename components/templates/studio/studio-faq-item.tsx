import { ChevronDown } from "lucide-react";

export function StudioFaqItem({
  item,
  defaultOpen = false,
}: {
  item: { id: string; question: string; answer: string };
  defaultOpen?: boolean;
}) {
  return (
    <details className="group border-b border-[var(--site-border)]" open={defaultOpen}>
      <summary className="flex cursor-pointer list-none items-center justify-between py-5 text-left">
        <span className="pr-4 text-base font-semibold text-[var(--site-text)]">
          {item.question}
        </span>
        <ChevronDown aria-hidden className="size-5 shrink-0 text-[var(--site-primary)] transition-transform group-open:rotate-180" />
      </summary>
      <p className="pb-5 text-sm leading-relaxed text-[var(--site-text-muted)]">
        {item.answer}
      </p>
    </details>
  );
}
