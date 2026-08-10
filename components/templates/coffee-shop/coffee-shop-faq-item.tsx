import { ChevronDown } from "lucide-react";

export function CoffeeShopFaqItem({
  item,
  defaultOpen = false,
}: {
  item: { id: string; question: string; answer: string };
  defaultOpen?: boolean;
}) {
  return (
    <details className="group border-b border-[var(--coffee-secondary)]/10" open={defaultOpen}>
      <summary className="flex cursor-pointer list-none items-center justify-between py-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--coffee-accent)]">
        <span className="pr-4 font-semibold text-[var(--coffee-secondary)] text-site-content">
          {item.question}
        </span>
        <ChevronDown aria-hidden className="size-5 shrink-0 text-[var(--coffee-primary)] transition-transform group-open:rotate-180" />
      </summary>
      <p className="pb-5 leading-relaxed text-[var(--coffee-secondary)]/75 text-site-content">
        {item.answer}
      </p>
    </details>
  );
}
