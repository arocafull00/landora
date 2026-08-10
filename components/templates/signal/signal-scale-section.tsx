import type { LandingContent } from "@/lib/dashboard-data";
import { getSectionHeading, SECTION_HEADING_DEFAULTS } from "@/lib/section-headings";
import { SignalScaleLabel } from "@/components/templates/signal/signal-scale-label";
import { SignalScaleFragment } from "@/components/templates/signal/signal-scale-fragment";

function buildScaleSequence(values: string[]) {
  if (values.length === 0) return ["1", "10", "100"];
  return values;
}

export function SignalScaleSection({ content }: { content: LandingContent }) {
  const heading = getSectionHeading(
    content,
    "escala",
    SECTION_HEADING_DEFAULTS.signal.escala,
  );
  const values = content.stats.map((stat) => stat.value);
  const sequence = buildScaleSequence(values);
  const labels = content.stats.map((stat) => stat.label).filter(Boolean);
  const fragments = (content.gallery ?? [])
    .map((item) => ({
      id: item.id,
      title: item.title,
      image: item.image ?? "",
    }))
    .filter((item) => item.image)
    .slice(0, 3);

  return (
    <section
      id="escala"
      data-signal-scene="escala"
      data-signal-scale-values={sequence.join("|")}
      className="relative min-h-[100svh] overflow-hidden bg-[var(--site-surface)] px-4 py-24 text-[var(--site-text)] md:px-8"
    >
      {fragments.map((item, index) => (
        <SignalScaleFragment
          key={item.id}
          alt={item.title || `Fragmento ${index + 1}`}
          index={index}
          src={item.image}
        />
      ))}
      <p
        className="relative z-10 mb-8 uppercase tracking-[0.24em] text-[var(--site-text-muted)] text-site-content"
        style={{ fontFamily: "var(--site-font-body)" }}
      >
        {heading.title}
      </p>
      <div className="relative z-10 flex min-h-[50vh] items-center">
        <p
          className="font-bold leading-none tracking-[-0.08em] tabular-nums text-[var(--site-text)] will-change-transform text-site-content"
          data-signal-scale-number
          style={{ fontFamily: "var(--site-font-display)" }}
        >
          {sequence[0]}
        </p>
      </div>
      <ul className="relative z-10 mt-8 grid gap-3 md:grid-cols-2 lg:max-w-xl">
        {labels.map((label) => (
          <SignalScaleLabel key={label} label={label} />
        ))}
      </ul>
      {heading.subtitle ? (
        <p
          className="relative z-10 mt-10 max-w-md text-[var(--site-text-muted)] text-site-content"
          style={{ fontFamily: "var(--site-font-body)" }}
        >
          {heading.subtitle}
        </p>
      ) : null}
    </section>
  );
}
