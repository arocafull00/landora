import type { LandingContent } from "@/lib/dashboard-data";
import { getSectionHeading, SECTION_HEADING_DEFAULTS } from "@/lib/section-headings";
import { SIGNAL_CHROME } from "@/components/templates/signal/signal-copy";
import { SignalIndexRow } from "@/components/templates/signal/signal-index-row";
import { SignalMedia } from "@/components/templates/signal/signal-media";

export function SignalIndexSection({ content }: { content: LandingContent }) {
  const heading = getSectionHeading(
    content,
    "indice",
    SECTION_HEADING_DEFAULTS.signal.indice,
  );
  const rows = content.benefits ?? [];
  const sideImage =
    content.gallery?.[3]?.image ||
    content.gallery?.[0]?.image ||
    content.hero.image ||
    "";

  if (rows.length === 0) return null;

  return (
    <section
      id="indice"
      data-signal-scene="indice"
      className="relative min-h-[100svh] overflow-hidden bg-[var(--site-dark)] px-4 py-24 text-[var(--site-on-dark)] md:px-8"
    >
      {sideImage ? (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 w-[38%] opacity-25 grayscale"
        >
          <SignalMedia
            alt=""
            className="object-cover"
            sizes="40vw"
            src={sideImage}
          />
          <div className="absolute inset-0 bg-[var(--site-dark)]/40" />
        </div>
      ) : null}
      <div className="relative z-10 grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
        <div>
          <p
            className="mb-6 uppercase tracking-[0.24em] text-[var(--site-accent)] text-site-content"
            style={{ fontFamily: "var(--site-font-body)" }}
          >
            {SIGNAL_CHROME.processLabel}
          </p>
          <h2
            className="max-w-2xl font-bold leading-[0.95] tracking-[-0.05em] text-[clamp(3rem,6vw,6rem)]"
            style={{ fontFamily: "var(--site-font-display)" }}
          >
            {heading.title}
          </h2>
          <p className="mt-8 max-w-md text-[var(--site-on-dark)]/75 text-[clamp(1rem,1.5vw,1.25rem)] leading-relaxed">
            {SIGNAL_CHROME.processIntro}
          </p>
        </div>
        <ul className="space-y-0 bg-[var(--site-dark)]/70 backdrop-blur-[2px]">
          {rows.map((item) => (
            <SignalIndexRow key={item.id} item={item} />
          ))}
        </ul>
      </div>
      {heading.subtitle ? (
        <p className="relative z-10 mt-12 max-w-3xl font-semibold leading-tight text-[var(--site-on-dark)] text-[clamp(1.5rem,3vw,3rem)]">
          {heading.subtitle}
        </p>
      ) : null}
    </section>
  );
}
