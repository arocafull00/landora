"use client";

import type { LandingContent } from "@/lib/dashboard-data";

export function FloristeriaAbout({ content }: { content: LandingContent }) {
  const statement = content.about?.statement ?? content.story?.statement ?? "";
  const stats = content.stats ?? [];

  if (!statement && stats.length === 0) return null;

  return (
    <section id="story" className="scroll-mt-24 bg-[#FAFAF7] px-6 py-24 md:px-10 md:py-32 lg:px-16">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-start gap-16 lg:grid-cols-[1.4fr_1fr] lg:gap-24">
        {statement && (
          <p
            className="text-pretty text-2xl font-light leading-relaxed text-[#1a1a1a] sm:text-3xl md:text-[clamp(26px,3.2vw,40px)]"
            style={{
              fontFamily: "var(--font-cormorant)",
              letterSpacing: "-0.02em",
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
                  className="leading-[1.05] text-[#2D5016]"
                  style={{
                    fontFamily: "var(--font-cormorant)",
                    fontWeight: 700,
                    fontSize: "clamp(40px, 5vw, 64px)",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {stat.value}
                </div>
                <div
                  className="mt-2 text-[#1a1a1a]/60"
                  style={{
                    fontFamily: "var(--font-body)",
                    fontWeight: 400,
                    fontSize: "clamp(13px, 1.1vw, 15px)",
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
