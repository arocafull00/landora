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
    <div className="border-b border-[#2D5016]/10">
      <button
        className="flex w-full items-center justify-between py-5 text-left"
        onClick={() => setOpen((v) => !v)}
        type="button"
      >
        <span
          className="pr-4 text-base font-semibold text-[#1a1a1a]"
          style={{ fontFamily: "var(--font-body)" }}
        >
          {item.question}
        </span>
        <ChevronDown
          className={`h-5 w-5 shrink-0 text-[#2D5016] transition-transform duration-300 ${open ? "rotate-180" : ""}`}
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
            <p className="pb-5 text-sm leading-relaxed text-[#1a1a1a]/60">
              {item.answer}
            </p>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}
