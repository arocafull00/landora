"use client";

import { Clock } from "lucide-react";
import type { LandingContent } from "@/lib/dashboard-data";

export function StudioServicesSection({ content }: { content: LandingContent }) {
  const items = content.serviceMenu ?? [];
  if (items.length === 0) return null;

  const categories = [...new Set(items.map((s) => s.category).filter(Boolean))];

  return (
    <section id="servicios" className="bg-white px-6 py-24 md:px-10 md:py-32 lg:px-16">
      <div className="mx-auto max-w-5xl">
        <div className="mb-16 border-b border-[#e5e2dd] pb-8" data-aos="fade-up">
          <h2
            className="text-balance text-3xl font-extrabold text-[#1a1a1a] sm:text-4xl md:text-[clamp(32px,5vw,48px)]"
            style={{ fontFamily: "var(--font-syne)", letterSpacing: "-0.02em" }}
          >
            Carta de servicios
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
                className="mb-8 border-b border-[#e5e2dd] pb-3 text-lg font-bold text-[#1a1a1a]"
                style={{ fontFamily: "var(--font-syne)" }}
              >
                {category}
              </h3>
              <div className="space-y-0">
                {items
                  .filter((s) => s.category === category)
                  .map((service) => (
                    <div
                      className="flex items-baseline justify-between border-b border-[#f0ede8] py-4"
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
                          <p className="mt-0.5 text-sm text-[#6b6560]">
                            {service.description}
                          </p>
                        )}
                      </div>
                      <div className="flex shrink-0 items-center gap-4">
                        {service.duration && (
                          <span className="flex items-center gap-1 text-xs text-[#8b7355]">
                            <Clock className="h-3.5 w-3.5" />
                            {service.duration}
                          </span>
                        )}
                        <span
                          className="text-base font-bold text-[#1a1a1a]"
                          style={{ fontFamily: "var(--font-body)" }}
                        >
                          {service.price}
                        </span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))
        ) : (
          <div className="space-y-0" data-aos="fade-up">
            {items.map((service) => (
              <div
                className="flex items-baseline justify-between border-b border-[#f0ede8] py-4"
                key={service.id}
              >
                <div className="min-w-0 flex-1 pr-4">
                  <p className="text-base font-semibold text-[#1a1a1a]">
                    {service.name}
                  </p>
                  {service.description && (
                    <p className="mt-0.5 text-sm text-[#6b6560]">
                      {service.description}
                    </p>
                  )}
                </div>
                <div className="flex shrink-0 items-center gap-4">
                  {service.duration && (
                    <span className="flex items-center gap-1 text-xs text-[#8b7355]">
                      <Clock className="h-3.5 w-3.5" />
                      {service.duration}
                    </span>
                  )}
                  <span className="text-base font-bold text-[#1a1a1a]">
                    {service.price}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
