"use client";

import type { LandingContent } from "@/lib/dashboard-data";

export function RistoranteStorySection({ content }: { content: LandingContent }) {
  const statement = content.about?.statement ?? content.story?.statement ?? "";
  const stats = content.stats ?? [];

  if (!statement && stats.length === 0) return null;

  return (
    <section id="story" className="scroll-mt-24 bg-[#FAF7F2] px-6 py-24 md:px-10 md:py-32 lg:px-16">
      <div className="mx-auto max-w-5xl">
        {statement && (
          <p
            className="mb-16 text-center text-pretty text-2xl font-light leading-relaxed text-[#1C1917] sm:text-3xl md:text-[clamp(26px,3.2vw,40px)]"
            style={{
              fontFamily: "var(--font-playfair)",
              letterSpacing: "-0.02em",
              textWrap: "balance",
            }}
            data-aos="fade-up"
          >
            {statement}
          </p>
        )}

        {stats.length > 0 && (
          <div
            className="grid grid-cols-3 gap-8 border-t border-[#1C1917]/10 pt-12"
            data-aos="fade-up"
            data-aos-delay="120"
          >
            {stats.map((stat) => (
              <div className="text-center" key={stat.id}>
                <div
                  className="text-[#8B2500]"
                  style={{
                    fontFamily: "var(--font-playfair)",
                    fontWeight: 700,
                    fontSize: "clamp(36px, 5vw, 56px)",
                    letterSpacing: "-0.02em",
                    lineHeight: 1.1,
                  }}
                >
                  {stat.value}
                </div>
                <div
                  className="mt-2 text-[#1C1917]/70"
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
