"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { m, AnimatePresence } from "motion/react";

export function FloristeriaFaqItem({
  item,
  defaultOpen = false,
}: {
  item: { id: string; question: string; answer: string };
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-[var(--site-primary)]/10">
      <button
        className="flex w-full items-center justify-between py-5 text-left"
        onClick={() => setOpen((v) => !v)}
        type="button"
      >
        <span
          className="pr-4 text-base font-semibold text-[var(--site-text)]"
          style={{ fontFamily: "var(--font-body)" }}
        >
          {item.question}
        </span>
        <ChevronDown
          className={`h-5 w-5 shrink-0 text-[var(--site-primary)] transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <m.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-sm leading-relaxed text-[var(--site-text)]/60">
              {item.answer}
            </p>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}
