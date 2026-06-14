"use client";

import type { LandingContent } from "@/lib/dashboard-data";
import { RistoranteMenuItem } from "@/components/templates/ristorante/ristorante-menu-item";
import { getSectionHeading, SECTION_HEADING_DEFAULTS } from "@/lib/section-headings";

export function RistoranteMenuSection({ content }: { content: LandingContent }) {
  const items = content.serviceMenu ?? [];
  if (items.length === 0) return null;

  const heading = getSectionHeading(content, "carta", SECTION_HEADING_DEFAULTS.ristorante.carta);
  const servicesByCategory = items.reduce<Map<string, typeof items>>((map, service) => {
    if (!service.category) return map;
    const group = map.get(service.category);
    if (group) {
      group.push(service);
      return map;
    }
    map.set(service.category, [service]);
    return map;
  }, new Map());
  const categories = [...servicesByCategory.keys()];

  return (
    <section id="carta" className="scroll-mt-24 bg-white px-6 py-24 md:px-10 md:py-32 lg:px-16">
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
              className="mx-auto mt-4 max-w-md text-base leading-relaxed text-[#1C1917]/70"
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
                {(servicesByCategory.get(category) ?? []).map((service) => (
                  <RistoranteMenuItem service={service} key={service.id} />
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="space-y-0" data-aos="fade-up">
            {items.map((service) => (
              <RistoranteMenuItem service={service} key={service.id} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
