"use client";

import type { LandingContent } from "@/lib/dashboard-data";
import { getSectionHeading, SECTION_HEADING_DEFAULTS } from "@/lib/section-headings";

export function FloristeriaServicesSection({ content }: { content: LandingContent }) {
  const items = content.serviceMenu ?? [];
  if (items.length === 0) return null;

  const heading = getSectionHeading(
    content,
    "servicios",
    SECTION_HEADING_DEFAULTS.floristeria.servicios,
  );
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
    <section id="servicios" className="scroll-mt-24 bg-white px-6 py-24 md:px-10 md:py-32 lg:px-16">
      <div className="mx-auto max-w-5xl">
        <div className="mb-16 border-b border-[#2D5016]/10 pb-8" data-aos="fade-up">
          <h2
            className="text-balance text-3xl font-extrabold text-[#1a1a1a] sm:text-4xl md:text-[clamp(32px,5vw,48px)]"
            style={{ fontFamily: "var(--font-cormorant)", letterSpacing: "-0.02em" }}
          >
            {heading.title}
          </h2>
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
                className="mb-8 border-b border-[#2D5016]/10 pb-3 text-lg font-bold text-[#2D5016]"
                style={{ fontFamily: "var(--font-cormorant)" }}
              >
                {category}
              </h3>
              <div className="space-y-0">
                {(servicesByCategory.get(category) ?? []).map((service) => (
                    <div
                      className="flex items-baseline justify-between border-b border-[#2D5016]/[0.06] py-4"
                      key={service.id}
                    >
                      <div className="min-w-0 flex-1 pr-4">
                        <p
                          className="text-base font-semibold text-[#1a1a1a]"
                          style={{ fontFamily: "var(--font-body)" }}
                        >
                          {service.name}
                        </p>
                        {service.description && (
                          <p className="mt-0.5 text-sm text-[#1a1a1a]/60">
                            {service.description}
                          </p>
                        )}
                      </div>
                      <span
                        className="shrink-0 text-base font-bold text-[#2D5016]"
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
                className="flex items-baseline justify-between border-b border-[#2D5016]/[0.06] py-4"
                key={service.id}
              >
                <div className="min-w-0 flex-1 pr-4">
                  <p className="text-base font-semibold text-[#1a1a1a]">
                    {service.name}
                  </p>
                  {service.description && (
                    <p className="mt-0.5 text-sm text-[#1a1a1a]/60">
                      {service.description}
                    </p>
                  )}
                </div>
                <span className="shrink-0 text-base font-bold text-[#2D5016]">
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
