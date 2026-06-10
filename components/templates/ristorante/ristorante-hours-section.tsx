"use client";

import { Clock } from "lucide-react";
import type { LandingContent } from "@/lib/dashboard-data";
import { getSectionHeading, SECTION_HEADING_DEFAULTS } from "@/lib/section-headings";

export function RistoranteHoursSection({ content }: { content: LandingContent }) {
  const hours = content.workflow ?? [];
  if (hours.length === 0) return null;

  const heading = getSectionHeading(
    content,
    "horarios",
    SECTION_HEADING_DEFAULTS.ristorante.horarios,
  );

  return (
    <section id="horarios" className="scroll-mt-24 bg-[#1C1917] px-6 py-24 md:px-10 md:py-32 lg:px-16">
      <div className="mx-auto max-w-3xl text-center">
        <div className="mb-12" data-aos="fade-up">
          <Clock className="mx-auto mb-4 h-8 w-8 text-[#8B2500]" />
          <h2
            className="text-balance text-3xl font-extrabold text-white sm:text-4xl md:text-[clamp(32px,5vw,48px)]"
            style={{ fontFamily: "var(--font-playfair)", letterSpacing: "-0.02em" }}
          >
            {heading.title}
          </h2>
        </div>

        <div
          className="space-y-0"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          {hours.map((item) => (
            <div
              className="flex items-center justify-between border-b border-white/10 py-5"
              key={item.id}
            >
              <span
                className="text-base font-semibold text-white"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {item.number}
              </span>
              <div className="text-right">
                <p
                  className="text-base font-semibold text-white"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {item.title}
                </p>
                {item.description && (
                  <p className="mt-0.5 text-sm text-white/50">{item.description}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
