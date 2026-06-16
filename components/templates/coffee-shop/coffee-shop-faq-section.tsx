"use client";

import type { LandingContent } from "@/lib/dashboard-data";
import { getSectionHeading, SECTION_HEADING_DEFAULTS } from "@/lib/section-headings";
import { CoffeeShopFaqItem } from "@/components/templates/coffee-shop/coffee-shop-faq-item";

export function CoffeeShopFaqSection({ content }: { content: LandingContent }) {
  const faq = content.faq ?? [];
  if (faq.length === 0) return null;

  const heading = getSectionHeading(content, "faq", SECTION_HEADING_DEFAULTS["coffee-shop"].faq);

  return (
    <section
      id="faq"
      className="scroll-mt-24 bg-[var(--coffee-surface)] px-6 py-[clamp(72px,10vw,120px)] md:px-10 lg:px-16"
    >
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
        <div>
          <h2
            className="text-balance text-[clamp(32px,5vw,48px)] font-semibold leading-[1.05] text-[var(--coffee-secondary)]"
            style={{ fontFamily: "var(--font-coffee-display)", letterSpacing: "-0.03em" }}
          >
            {heading.title}
          </h2>
          {heading.subtitle ? (
            <p
              className="mt-4 max-w-sm text-pretty text-base leading-relaxed text-[var(--coffee-secondary)]/75"
              style={{ fontFamily: "var(--font-coffee-body)" }}
            >
              {heading.subtitle}
            </p>
          ) : null}
        </div>

        <div>
          {faq.map((item, index) => (
            <CoffeeShopFaqItem item={item} key={item.id} defaultOpen={index === 0} />
          ))}
        </div>
      </div>
    </section>
  );
}
