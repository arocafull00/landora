"use client";

import type { LandingContent } from "@/lib/dashboard-data";

export function VelarHero({
  content,
  heroRef,
  heroVisible,
}: {
  content: LandingContent;
  heroRef: React.RefObject<HTMLElement | null>;
  heroVisible: boolean;
}) {
  return (
    <section
      ref={heroRef}
      className="relative overflow-visible"
      style={{ minHeight: "100vh" }}
    >
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${content.hero.image})` }}
      />

      <div
        className="relative z-10"
        style={{
          opacity: heroVisible ? 1 : 0,
          transform: heroVisible ? "translateY(0)" : "translateY(-28px)",
          transition: heroVisible
            ? "opacity 0.7s cubic-bezier(0.22,1,0.36,1) 0.1s, transform 0.7s cubic-bezier(0.22,1,0.36,1) 0.1s"
            : "none",
          paddingTop: "calc(28vh - 50px)",
        }}
      >
        <div
          className="flex items-end justify-between px-6 md:px-10 lg:px-16"
          style={{ marginBottom: "-0.04em" }}
        >
          <h1
            className="uppercase text-black"
            style={{
              fontFamily: "var(--font-syne)",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              lineHeight: 1,
              fontSize: "clamp(22px, 3vw, 3vw)",
            }}
          >
            {content.hero.eyebrow}
          </h1>

          <p
            className="hidden lg:block max-w-[300px] text-right text-black/70"
            style={{
              fontFamily: "var(--font-syne)",
              fontWeight: 700,
              fontSize: "clamp(10px, 0.95vw, 14px)",
              lineHeight: 1.6,
              marginBottom: "0.2em",
              letterSpacing: "0.02em",
            }}
          >
            {content.hero.subtitle}
          </p>
        </div>

        <div className="overflow-hidden">
          <h2
            className="uppercase text-black px-6 md:px-10 lg:px-16"
            style={{
              fontFamily: "var(--font-syne)",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              lineHeight: 0.88,
              fontSize: "clamp(38px, 6.5vw, 9vw)",
              whiteSpace: "nowrap",
            }}
          >
            {content.hero.title}
          </h2>
        </div>

        <p
          className="lg:hidden px-6 text-black/65"
          style={{
            fontFamily: "var(--font-syne)",
            fontWeight: 600,
            fontSize: "clamp(12px, 3vw, 15px)",
            marginTop: "0.9em",
          }}
        >
          {content.hero.subtitle}
        </p>
      </div>
    </section>
  );
}
