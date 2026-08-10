import type { LandingContent } from "@/lib/dashboard-data";
import { getSectionHeading, SECTION_HEADING_DEFAULTS } from "@/lib/section-headings";

export function SignalClimaxSection({ content }: { content: LandingContent }) {
  const heading = getSectionHeading(
    content,
    "climax",
    SECTION_HEADING_DEFAULTS.signal.climax,
  );
  const brand = (content.brand || content.hero.title).replace(/\.+$/, "");

  return (
    <section
      id="climax"
      data-signal-scene="climax"
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-[var(--site-accent)] px-4 py-24 text-[var(--site-on-accent)] md:px-8"
    >
      <div
        className="max-w-5xl text-center will-change-transform"
        data-signal-climax-type
      >
        <h2
          className="text-[clamp(2.4rem,8vw,6.5rem)] font-bold uppercase leading-[0.92] tracking-[-0.05em]"
          style={{ fontFamily: "var(--site-font-display)" }}
        >
          {heading.title}
          <span className="mt-3 block">{heading.subtitle}</span>
        </h2>
      </div>
      <p
        className="pointer-events-none absolute text-[clamp(3rem,12vw,8rem)] font-bold uppercase tracking-[-0.06em] opacity-0 [[data-signal-motion=reduced]_&]:hidden"
        data-signal-climax-brand
        style={{ fontFamily: "var(--site-font-display)" }}
      >
        {brand}
      </p>
    </section>
  );
}
