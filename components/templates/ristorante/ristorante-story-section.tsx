"use client";

import type { LandingContent } from "@/lib/dashboard-data";

export function RistoranteStorySection({ content }: { content: LandingContent }) {
  const statement = content.about?.statement ?? content.story?.statement ?? "";
  const stats = content.stats ?? [];

  if (!statement && stats.length === 0) return null;

  return (
    <section
      id="story"
      className="scroll-mt-24 bg-[var(--ristorante-secondary)] px-6 py-[clamp(80px,12vw,160px)] md:px-10 lg:px-16"
    >
      <div className="mx-auto max-w-6xl">
        {statement ? (
          <p
            className="max-w-[22ch] text-pretty text-[clamp(28px,4vw,56px)] font-light leading-[1.2] text-[var(--ristorante-foreground)]"
            style={{
              fontFamily: "var(--font-ristorante-display)",
              letterSpacing: "-0.03em",
              textWrap: "balance",
            }}
          >
            {statement}
          </p>
        ) : null}

        {stats.length > 0 ? (
          <p
            className={`${statement ? "mt-16" : ""} text-sm font-semibold tracking-wide text-[var(--ristorante-accent)] md:text-base`}
            style={{ fontFamily: "var(--font-ristorante-body)" }}
          >
            {stats.map((stat, index) => (
              <span key={stat.id}>
                {index > 0 ? (
                  <span className="mx-3 text-[var(--ristorante-foreground)]/40">·</span>
                ) : null}
                <span className="text-[var(--ristorante-foreground)]">{stat.value}</span>{" "}
                <span className="font-normal text-[var(--ristorante-foreground)]/75">
                  {stat.label}
                </span>
              </span>
            ))}
          </p>
        ) : null}
      </div>
    </section>
  );
}
