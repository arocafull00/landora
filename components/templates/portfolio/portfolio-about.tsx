"use client";

import type { LandingContent } from "@/lib/dashboard-data";

export function PortfolioAbout({ content }: { content: LandingContent }) {
  const statement = content.about?.statement ?? content.story?.statement ?? "";

  if (!statement) return null;

  return (
    <section id="story" className="scroll-mt-24 bg-[#0a0a0a] px-6 py-24 md:px-10 md:py-32 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <p
          className="text-pretty text-2xl font-light leading-relaxed text-white/90 sm:text-3xl md:text-[clamp(26px,3.2vw,40px)]"
          style={{
            fontFamily: "var(--font-syne)",
            letterSpacing: "-0.02em",
            textWrap: "balance",
          }}
          data-aos="fade-right"
        >
          {statement}
        </p>
      </div>
    </section>
  );
}
