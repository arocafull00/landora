"use client";

import type { LandingContent } from "@/lib/dashboard-data";
import { FLORISTERIA_ASSETS } from "@/lib/floristeria-assets";

export function FloristeriaAbout({ content }: { content: LandingContent }) {
  const statement = content.about?.statement ?? content.story?.statement ?? "";
  const stats = content.stats ?? [];

  if (!statement && stats.length === 0) return null;

  const textHalo =
    "0 0 20px var(--site-surface), 0 0 6px var(--site-surface)";

  return (
    <section
      id="story"
      className="relative scroll-mt-24 overflow-hidden bg-[var(--site-surface)] px-6 py-24 md:px-10 md:py-32 lg:px-16"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[min(480px,58%)] bg-bottom bg-no-repeat"
        style={{
          backgroundImage: `url('${FLORISTERIA_ASSETS.aboutBg}')`,
          backgroundSize: "100% auto",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[min(480px,58%)] bg-linear-to-t from-[var(--site-surface)]/20 via-[var(--site-surface)]/75 to-[var(--site-surface)]"
      />

      <div className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 items-start gap-16 lg:grid-cols-[1.4fr_1fr] lg:gap-24">
        {statement && (
          <p
            className="text-pretty text-2xl font-normal leading-relaxed text-[var(--site-text)] sm:text-3xl md:text-[clamp(26px,3.2vw,40px)]"
            style={{
              fontFamily: "var(--font-cormorant)",
              letterSpacing: "-0.02em",
              textShadow: textHalo,
              textWrap: "balance",
            }}
            data-aos="fade-right"
          >
            {statement}
          </p>
        )}

        {stats.length > 0 && (
          <div
            className="grid grid-cols-1 gap-10 sm:grid-cols-3 lg:grid-cols-1 lg:gap-12"
            data-aos="fade-left"
            data-aos-delay="120"
          >
            {stats.map((stat) => (
              <div key={stat.id}>
                <div
                  className="leading-[1.05] text-[var(--site-dark)]"
                  style={{
                    fontFamily: "var(--font-cormorant)",
                    fontWeight: 700,
                    fontSize: "clamp(40px, 5vw, 64px)",
                    letterSpacing: "-0.02em",
                    textShadow: textHalo,
                  }}
                >
                  {stat.value}
                </div>
                <div
                  className="mt-2 font-medium text-[var(--site-text-muted)]"
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "clamp(13px, 1.1vw, 15px)",
                    textShadow: textHalo,
                  }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
