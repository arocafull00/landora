"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import type { LandingContent } from "@/lib/dashboard-data";
import { getSectionHeading, SECTION_HEADING_DEFAULTS } from "@/lib/section-headings";

export function StudioFaqSection({ content }: { content: LandingContent }) {
  const faq = content.faq ?? [];
  if (faq.length === 0) return null;

  const heading = getSectionHeading(content, "faq", SECTION_HEADING_DEFAULTS.studio.faq);

  return (
    <section id="faq" className="bg-[#faf9f7] px-6 py-24 md:px-10 md:py-32 lg:px-16">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
        <div data-aos="fade-right">
          <h2
            className="mb-6 text-balance text-3xl font-extrabold text-[#1a1a1a] sm:text-4xl md:text-[clamp(32px,5vw,48px)]"
            style={{ fontFamily: "var(--font-syne)", letterSpacing: "-0.02em" }}
          >
            {heading.title}
          </h2>
          {heading.subtitle ? (
            <p
              className="max-w-sm text-pretty text-base leading-relaxed text-[#6b6560]"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {heading.subtitle}
            </p>
          ) : null}
        </div>

        <div className="space-y-0" data-aos="fade-left" data-aos-delay="100">
          {faq.map((item, index) => (
            <FaqItem item={item} key={item.id} defaultOpen={index === 0} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FaqItem({
  item,
  defaultOpen = false,
}: {
  item: { id: string; question: string; answer: string };
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-[#e5e2dd]">
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
          className={`h-5 w-5 shrink-0 text-[#8b7355] transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-sm leading-relaxed text-[#6b6560]">
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
