"use client";

import type { LandingContent } from "@/lib/dashboard-data";
import { getSectionHeading, SECTION_HEADING_DEFAULTS } from "@/lib/section-headings";
import { FloristeriaFaqItem } from "@/components/templates/floristeria/floristeria-faq-item";

export function FloristeriaFaqSection({ content }: { content: LandingContent }) {
  const faq = content.faq ?? [];
  if (faq.length === 0) return null;

  const heading = getSectionHeading(content, "faq", SECTION_HEADING_DEFAULTS.floristeria.faq);

  return (
    <section id="faq" className="scroll-mt-24 bg-[#FAFAF7] px-6 py-24 md:px-10 md:py-32 lg:px-16">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
        <div data-aos="fade-right">
          <h2
            className="mb-6 text-balance text-3xl font-extrabold text-[#1a1a1a] sm:text-4xl md:text-[clamp(32px,5vw,48px)]"
            style={{ fontFamily: "var(--font-cormorant)", letterSpacing: "-0.02em" }}
          >
            {heading.title}
          </h2>
          {heading.subtitle ? (
            <p
              className="max-w-sm text-pretty text-base leading-relaxed text-[#1a1a1a]/60"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {heading.subtitle}
            </p>
          ) : null}
        </div>

        <div className="space-y-0" data-aos="fade-left" data-aos-delay="100">
          {faq.map((item, index) => (
            <FloristeriaFaqItem item={item} key={item.id} defaultOpen={index === 0} />
          ))}
        </div>
      </div>
    </section>
  );
}
