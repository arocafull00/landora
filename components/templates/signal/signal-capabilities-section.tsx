import type { LandingContent } from "@/lib/dashboard-data";
import { getSectionHeading, SECTION_HEADING_DEFAULTS } from "@/lib/section-headings";
import { SignalCapabilityScene } from "@/components/templates/signal/signal-capability-scene";

export function SignalCapabilitiesSection({ content }: { content: LandingContent }) {
  const heading = getSectionHeading(
    content,
    "capacidades",
    SECTION_HEADING_DEFAULTS.signal.capacidades,
  );
  const items = (content.serviceMenu ?? []).slice(0, 3);
  const galleryImages = (content.gallery ?? [])
    .map((item) => item.image)
    .filter(Boolean);

  if (items.length === 0) return null;

  return (
    <section
      id="capacidades"
      data-signal-scene="capacidades"
      className="relative min-h-[100svh] overflow-hidden bg-[var(--site-dark)]"
    >
      <p
        className="absolute left-4 top-24 z-20 text-[10px] uppercase tracking-[0.24em] text-[var(--site-accent)] md:left-8"
        style={{ fontFamily: "var(--site-font-body)" }}
      >
        {heading.title}
      </p>
      <div className="relative min-h-[100svh]">
        {items.map((item, index) => (
          <SignalCapabilityScene
            key={item.id}
            item={item}
            index={index}
            image={item.image || galleryImages[index] || content.hero.image || ""}
          />
        ))}
      </div>
    </section>
  );
}
