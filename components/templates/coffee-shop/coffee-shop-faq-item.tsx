"use client";

import { useId, useState } from "react";
import { ChevronDown } from "lucide-react";

export function CoffeeShopFaqItem({
  item,
  defaultOpen = false,
}: {
  item: { id: string; question: string; answer: string };
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const contentId = useId();

  return (
    <div className="border-b border-[var(--coffee-secondary)]/10">
      <button
        className="flex w-full items-center justify-between py-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--coffee-accent)]"
        onClick={() => setOpen((v) => !v)}
        type="button"
        aria-controls={contentId}
        aria-expanded={open}
      >
        <span
          className="pr-4 text-base font-semibold text-[var(--coffee-secondary)]"
          style={{ fontFamily: "var(--font-coffee-body)" }}
        >
          {item.question}
        </span>
        <ChevronDown
          aria-hidden
          className={`h-5 w-5 shrink-0 text-[var(--coffee-primary)] transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open ? (
          <div id={contentId}>
            <p
              className="pb-5 text-sm leading-relaxed text-[var(--coffee-secondary)]/75"
              style={{ fontFamily: "var(--font-coffee-body)" }}
            >
              {item.answer}
            </p>
          </div>
      ) : null}
    </div>
  );
}
