"use client";

import { Clock } from "lucide-react";
import type { LandingContent } from "@/lib/dashboard-data";
import { getSectionHeading, SECTION_HEADING_DEFAULTS } from "@/lib/section-headings";

export function CoffeeShopHoursSection({ content }: { content: LandingContent }) {
  const hours = content.workflow ?? [];
  if (hours.length === 0) return null;

  const heading = getSectionHeading(
    content,
    "horarios",
    SECTION_HEADING_DEFAULTS["coffee-shop"].horarios,
  );

  return (
    <section
      id="horarios"
      className="scroll-mt-24 bg-[var(--coffee-primary)] px-6 py-[clamp(72px,10vw,120px)] md:px-10 lg:px-16"
    >
      <div className="mx-auto max-w-3xl">
        <div className="mb-10 text-center">
          <Clock className="mx-auto mb-4 h-7 w-7 text-[var(--coffee-accent)]" />
          <h2
            className="text-balance text-[clamp(32px,5vw,56px)] font-semibold leading-[1.05] text-[var(--coffee-foreground)]"
            style={{ fontFamily: "var(--font-coffee-display)", letterSpacing: "-0.03em" }}
          >
            {heading.title}
          </h2>
        </div>

        <div>
          {hours.map((item) => (
            <div
              className="flex items-start justify-between gap-6 border-b border-[var(--coffee-foreground)]/15 py-5 last:border-b-0"
              key={item.id}
            >
              <span
                className="text-base font-semibold text-[var(--coffee-foreground)]"
                style={{ fontFamily: "var(--font-coffee-body)" }}
              >
                {item.number}
              </span>
              <div className="text-right">
                <p
                  className="text-base font-semibold text-[var(--coffee-foreground)]"
                  style={{ fontFamily: "var(--font-coffee-body)" }}
                >
                  {item.title}
                </p>
                {item.description ? (
                  <p
                    className="mt-0.5 text-sm text-[var(--coffee-foreground)]/75"
                    style={{ fontFamily: "var(--font-coffee-body)" }}
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
