"use client";

import type { LandingContent } from "@/lib/dashboard-data";
import { getSectionHeading, SECTION_HEADING_DEFAULTS } from "@/lib/section-headings";

export function RistoranteMenuSection({ content }: { content: LandingContent }) {
  const items = content.serviceMenu ?? [];
  if (items.length === 0) return null;

  const heading = getSectionHeading(content, "carta", SECTION_HEADING_DEFAULTS.ristorante.carta);
  const categories = [...new Set(items.map((s) => s.category).filter(Boolean))];

  return (
    <section id="carta" className="bg-white px-6 py-24 md:px-10 md:py-32 lg:px-16">
      <div className="mx-auto max-w-5xl">
        <div className="mb-16 text-center" data-aos="fade-up">
          <h2
            className="text-balance text-3xl font-extrabold text-[#1C1917] sm:text-4xl md:text-[clamp(32px,5vw,48px)]"
            style={{ fontFamily: "var(--font-playfair)", letterSpacing: "-0.02em" }}
          >
            {heading.title}
          </h2>
          {heading.subtitle ? (
            <p
              className="mx-auto mt-4 max-w-md text-base leading-relaxed text-[#1C1917]/60"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {heading.subtitle}
            </p>
          ) : null}
        </div>

        {categories.length > 0 ? (
          categories.map((category, catIndex) => (
            <div
              className={catIndex > 0 ? "mt-16" : ""}
              data-aos="fade-up"
              data-aos-delay={catIndex * 80}
              key={category}
            >
              <h3
                className="mb-8 border-b border-[#1C1917]/10 pb-3 text-center text-lg font-bold text-[#8B2500]"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                {category}
              </h3>
              <div className="space-y-0">
                {items
                  .filter((s) => s.category === category)
                  .map((service) => (
                    <div
                      className="flex items-baseline justify-between border-b border-[#1C1917]/[0.06] py-4"
                      key={service.id}
                    >
                      <div className="min-w-0 flex-1 pr-4">
                        <p
                          className="text-base font-semibold text-[#1C1917]"
                          style={{ fontFamily: "var(--font-body)" }}
                        >
                          {service.name}
                        </p>
                        {service.description && (
                          <p className="mt-0.5 text-sm text-[#1C1917]/50">
                            {service.description}
                          </p>
                        )}
                      </div>
                      <span
                        className="shrink-0 text-base font-bold text-[#8B2500]"
                        style={{ fontFamily: "var(--font-body)" }}
                      >
                        {service.price}
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          ))
        ) : (
          <div className="space-y-0" data-aos="fade-up">
            {items.map((service) => (
              <div
                className="flex items-baseline justify-between border-b border-[#1C1917]/[0.06] py-4"
                key={service.id}
              >
                <div className="min-w-0 flex-1 pr-4">
                  <p className="text-base font-semibold text-[#1C1917]">
                    {service.name}
                  </p>
                  {service.description && (
                    <p className="mt-0.5 text-sm text-[#1C1917]/50">
                      {service.description}
                    </p>
                  )}
                </div>
                <span className="shrink-0 text-base font-bold text-[#8B2500]">
                  {service.price}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
