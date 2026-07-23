"use client";

import { useId } from "react";
import { ChevronDown } from "lucide-react";

export function PortfolioFaqItem({
  item,
  open,
  onOpenChange,
}: {
  item: { id: string; question: string; answer: string };
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const contentId = useId();

  return (
    <div className="border-b border-[var(--site-border)]">
      <button
        className="flex w-full items-center justify-between py-5 text-left"
        onClick={() => onOpenChange(!open)}
        type="button"
        aria-controls={contentId}
        aria-expanded={open}
      >
        <span
          className="pr-4 text-base font-semibold text-[var(--site-text)]"
          style={{ fontFamily: "var(--font-body)" }}
        >
          {item.question}
        </span>
        <ChevronDown
          aria-hidden
          className={`h-5 w-5 shrink-0 text-[var(--site-text-muted)] transition-transform duration-300 motion-reduce:transition-none ${open ? "rotate-180" : ""}`}
        />
      </button>
      <div
        className={`grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
      >
        <div className="overflow-hidden" id={contentId}>
          <p className="pb-5 text-sm leading-relaxed text-[var(--site-text-muted)]">
            {item.answer}
          </p>
        </div>
      </div>
    </div>
  );
}
