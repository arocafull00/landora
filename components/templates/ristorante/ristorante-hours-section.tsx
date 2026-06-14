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
    <section
      id="horarios"
      className="scroll-mt-24 bg-[var(--ristorante-primary)] px-6 py-[clamp(80px,12vw,140px)] md:px-10 lg:px-16"
    >
      <div className="mx-auto max-w-3xl">
        <div className="mb-12 text-center">
          <Clock className="mx-auto mb-4 h-8 w-8 text-[var(--ristorante-accent)]" />
          <h2
            className="text-balance text-[clamp(32px,5vw,56px)] font-normal leading-[1.05] text-[var(--ristorante-foreground)]"
            style={{ fontFamily: "var(--font-ristorante-display)", letterSpacing: "-0.03em" }}
          >
            {heading.title}
          </h2>
        </div>

        <div className="space-y-0">
          {hours.map((item) => (
            <div
              className="flex items-center justify-between border-b border-[var(--ristorante-foreground)]/15 py-6"
              key={item.id}
            >
              <span
                className="text-base font-semibold text-[var(--ristorante-foreground)]"
                style={{ fontFamily: "var(--font-ristorante-body)" }}
              >
                {item.number}
              </span>
              <div className="text-right">
                <p
                  className="text-base font-semibold text-[var(--ristorante-foreground)]"
                  style={{ fontFamily: "var(--font-ristorante-body)" }}
                >
                  {item.title}
                </p>
                {item.description ? (
                  <p
                    className="mt-0.5 text-sm text-[var(--ristorante-foreground)]/80"
                    style={{ fontFamily: "var(--font-ristorante-body)", fontWeight: 300 }}
                  >
                    {item.description}
                  </p>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
