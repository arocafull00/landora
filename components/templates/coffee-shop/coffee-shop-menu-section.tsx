"use client";

import type { LandingContent } from "@/lib/dashboard-data";
import { CoffeeShopMenuItem } from "@/components/templates/coffee-shop/coffee-shop-menu-item";
import { getSectionHeading, SECTION_HEADING_DEFAULTS } from "@/lib/section-headings";

export function CoffeeShopMenuSection({ content }: { content: LandingContent }) {
  const items = content.serviceMenu ?? [];
  if (items.length === 0) return null;

  const heading = getSectionHeading(content, "carta", SECTION_HEADING_DEFAULTS["coffee-shop"].carta);
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
      className="scroll-mt-24 bg-[var(--coffee-surface)] px-6 py-[clamp(72px,10vw,120px)] md:px-10 lg:px-16"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-14 max-w-2xl">
          <h2
            className="text-balance text-[clamp(32px,5vw,56px)] font-semibold leading-[1.05] text-[var(--coffee-secondary)]"
            style={{ fontFamily: "var(--font-coffee-display)", letterSpacing: "-0.03em" }}
          >
            {heading.title}
          </h2>
          {heading.subtitle ? (
            <p
              className="mt-4 max-w-lg text-pretty text-base leading-relaxed text-[var(--coffee-secondary)]/75"
              style={{ fontFamily: "var(--font-coffee-body)" }}
            >
              {heading.subtitle}
            </p>
          ) : null}
        </div>

        {categories.length > 0 ? (
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-x-16">
            {categories.map((category) => (
              <div key={category}>
                <h3
                  className="mb-4 text-xl font-semibold text-[var(--coffee-primary)]"
                  style={{ fontFamily: "var(--font-coffee-display)" }}
                >
                  {category}
                </h3>
                <div>
                  {(servicesByCategory.get(category) ?? []).map((service) => (
                    <CoffeeShopMenuItem service={service} key={service.id} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div>
            {items.map((service) => (
              <CoffeeShopMenuItem service={service} key={service.id} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
