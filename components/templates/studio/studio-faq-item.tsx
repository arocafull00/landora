"use client";

import { useId, useState } from "react";
import { ChevronDown } from "lucide-react";

export function StudioFaqItem({
  item,
  defaultOpen = false,
}: {
  item: { id: string; question: string; answer: string };
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const contentId = useId();

  return (
    <div className="border-b border-[var(--site-border)]">
      <button
        className="flex w-full items-center justify-between py-5 text-left"
        onClick={() => setOpen((v) => !v)}
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
          className={`h-5 w-5 shrink-0 text-[var(--site-primary)] transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open ? (
          <div id={contentId}>
            <p className="pb-5 text-sm leading-relaxed text-[var(--site-text-muted)]">
              {item.answer}
            </p>
          </div>
      ) : null}
    </div>
  );
}
