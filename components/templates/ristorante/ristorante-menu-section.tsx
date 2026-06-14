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
    <section
      id="carta"
      className="scroll-mt-24 bg-[var(--ristorante-surface)] px-6 py-[clamp(80px,12vw,140px)] md:px-10 lg:px-16"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 max-w-2xl">
          <h2
            className="text-balance text-[clamp(32px,5vw,56px)] font-normal leading-[1.05] text-[var(--ristorante-secondary)]"
            style={{ fontFamily: "var(--font-ristorante-display)", letterSpacing: "-0.03em" }}
          >
            {heading.title}
          </h2>
          {heading.subtitle ? (
            <p
              className="mt-4 max-w-md text-base leading-relaxed text-[var(--ristorante-secondary)]/75"
              style={{ fontFamily: "var(--font-ristorante-body)", fontWeight: 300 }}
            >
              {heading.subtitle}
            </p>
          ) : null}
        </div>

        {categories.length > 0 ? (
          categories.map((category, catIndex) => (
            <div className={catIndex > 0 ? "mt-20" : ""} key={category}>
              <div className="lg:grid lg:grid-cols-[35%_65%] lg:gap-16">
                <div className="mb-8 lg:sticky lg:top-28 lg:mb-0 lg:self-start">
                  <h3
                    className="rounded-md bg-[var(--ristorante-primary)] px-4 py-3 text-lg font-normal text-[var(--ristorante-foreground)] lg:bg-transparent lg:px-0 lg:py-0 lg:text-[clamp(24px,3vw,36px)] lg:text-[var(--ristorante-primary)]"
                    style={{ fontFamily: "var(--font-ristorante-display)" }}
                  >
                    {category}
                  </h3>
                </div>
                <div className="space-y-0 border-t border-[var(--ristorante-secondary)]/10 lg:border-t-0">
                  {(servicesByCategory.get(category) ?? []).map((service) => (
                    <RistoranteMenuItem service={service} key={service.id} />
                  ))}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="space-y-0 border-t border-[var(--ristorante-secondary)]/10">
            {items.map((service) => (
              <RistoranteMenuItem service={service} key={service.id} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
