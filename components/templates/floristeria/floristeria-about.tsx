"use client";

import type { LandingContent } from "@/lib/dashboard-data";
import { FLORISTERIA_ASSETS } from "@/lib/floristeria-assets";

export function FloristeriaAbout({ content }: { content: LandingContent }) {
  const statement = content.about?.statement ?? content.story?.statement ?? "";
  const stats = content.stats ?? [];

  if (!statement && stats.length === 0) return null;

  const textHalo = "0 0 20px #FAFAF7, 0 0 6px #FAFAF7";

  return (
    <section
      id="story"
      className="relative scroll-mt-24 overflow-hidden bg-[#FAFAF7] px-6 py-24 md:px-10 md:py-32 lg:px-16"
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
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[min(480px,58%)] bg-linear-to-t from-[#FAFAF7]/20 via-[#FAFAF7]/75 to-[#FAFAF7]"
      />

      <div className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 items-start gap-16 lg:grid-cols-[1.4fr_1fr] lg:gap-24">
        {statement && (
          <p
            className="text-pretty text-2xl font-normal leading-relaxed text-[#0f0f0f] sm:text-3xl md:text-[clamp(26px,3.2vw,40px)]"
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
                  className="leading-[1.05] text-[#1F3A0F]"
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
                  className="mt-2 font-medium text-[#333333]"
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
