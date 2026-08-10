import type { LandingContent } from "@/lib/dashboard-data";
import { getSectionHeading, SECTION_HEADING_DEFAULTS } from "@/lib/section-headings";
import { getSignalMark } from "@/components/templates/signal/signal-copy";
import { SignalIndexRow } from "@/components/templates/signal/signal-index-row";
import { SignalMedia } from "@/components/templates/signal/signal-media";

export function SignalIndexSection({ content }: { content: LandingContent }) {
  const heading = getSectionHeading(
    content,
    "indice",
    SECTION_HEADING_DEFAULTS.signal.indice,
  );
  const rows = content.benefits ?? [];
  const mark = getSignalMark(content.brand || content.hero.title);
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
      <p
        className="relative z-10 mb-10 uppercase tracking-[0.24em] text-[var(--site-accent)] text-site-content"
        style={{ fontFamily: "var(--site-font-body)" }}
      >
        {heading.title}
      </p>
      <div className="relative z-10 grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
        <p
          className="font-bold leading-none tracking-[-0.08em] text-[var(--site-on-dark)] text-site-content"
          style={{ fontFamily: "var(--site-font-display)" }}
        >
          {mark}
        </p>
        <ul className="space-y-0 bg-[var(--site-dark)]/70 backdrop-blur-[2px]">
          {rows.map((item) => (
            <SignalIndexRow key={item.id} item={item} />
          ))}
        </ul>
      </div>
    </section>
  );
}
