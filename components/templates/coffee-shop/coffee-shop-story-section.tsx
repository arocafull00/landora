"use client";

import type { LandingContent } from "@/lib/dashboard-data";

export function CoffeeShopStorySection({ content }: { content: LandingContent }) {
  const statement = content.about?.statement ?? content.story?.statement ?? "";
  const stats = content.stats ?? [];

  if (!statement && stats.length === 0) return null;

  return (
    <section
      id="story"
      className="scroll-mt-24 bg-[var(--coffee-primary)] px-6 py-[clamp(72px,10vw,120px)] md:px-10 lg:px-16"
    >
      <div className="mx-auto max-w-6xl lg:grid lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
        {statement ? (
          <p
            className="max-w-[24ch] text-pretty text-[clamp(26px,3.5vw,48px)] font-medium leading-[1.15] text-[var(--coffee-foreground)]"
            style={{
              fontFamily: "var(--font-coffee-display)",
              letterSpacing: "-0.03em",
            }}
          >
            {statement}
          </p>
        ) : null}

        {stats.length > 0 ? (
          <dl className={`grid gap-8 sm:grid-cols-3 lg:grid-cols-1 ${statement ? "mt-12 lg:mt-0" : ""}`}>
            {stats.map((stat) => (
              <div key={stat.id}>
                <dt
                  className="text-3xl font-semibold text-[var(--coffee-accent)]"
                  style={{ fontFamily: "var(--font-coffee-display)" }}
                >
                  {stat.value}
                </dt>
                <dd
                  className="mt-1 text-sm text-[var(--coffee-foreground)]/80"
                  style={{ fontFamily: "var(--font-coffee-body)" }}
                >
                  {stat.label}
                </dd>
              </div>
            ))}
          </dl>
        ) : null}
      </div>
    </section>
  );
}
