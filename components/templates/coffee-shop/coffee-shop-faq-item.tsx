"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { m, AnimatePresence, useReducedMotion } from "motion/react";

export function CoffeeShopFaqItem({
  item,
  defaultOpen = false,
}: {
  item: { id: string; question: string; answer: string };
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const reduce = useReducedMotion();

  return (
    <div className="border-b border-[var(--coffee-secondary)]/10">
      <button
        className="flex w-full items-center justify-between py-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--coffee-accent)]"
        onClick={() => setOpen((v) => !v)}
        type="button"
        aria-expanded={open}
      >
        <span
          className="pr-4 text-base font-semibold text-[var(--coffee-secondary)]"
          style={{ fontFamily: "var(--font-coffee-body)" }}
        >
          {item.question}
        </span>
        <ChevronDown
          className={`h-5 w-5 shrink-0 text-[var(--coffee-primary)] transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <m.div
            initial={reduce ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p
              className="pb-5 text-sm leading-relaxed text-[var(--coffee-secondary)]/75"
              style={{ fontFamily: "var(--font-coffee-body)" }}
            >
              {item.answer}
            </p>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}
