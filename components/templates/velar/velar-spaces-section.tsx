import type { LandingContent } from "@/lib/dashboard-data";
import { VelarSpaceCard } from "@/components/templates/velar/velar-space-card";
import { getSectionHeading, SECTION_HEADING_DEFAULTS } from "@/lib/section-headings";

export function VelarSpacesSection({ content }: { content: LandingContent }) {

  if (!content.spaces || content.spaces.length === 0) return null;

  const heading = getSectionHeading(
    content,
    "residences",
    SECTION_HEADING_DEFAULTS.velar.residences,
  );

  return (
    <section
      data-section="residences"
      data-section-label="Espacios"
      id="espacios"
      className="relative z-[25] scroll-mt-24 bg-[var(--site-surface)] px-6 py-20 md:px-10 lg:px-16"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-16" data-aos="fade-up">
          <p
            className="mb-6 text-center uppercase tracking-widest text-[var(--site-accent)] text-site-content"
            style={{ fontFamily: "var(--font-body)" }}
          >
            ESPACIOS ÚNICOS PARA MOMENTOS ESPECIALES
          </p>
          <div className="text-center text-site-content lg:text-left">
            {heading.subtitle ? (
              <p
                data-editor-id="residences:heading:subtitle"
                className="mb-6 leading-relaxed text-[var(--site-text)]/80 text-site-subtitle"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {heading.subtitle}
              </p>
            ) : null}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {(content.spaces ?? []).map((space, index) => (
            <VelarSpaceCard index={index} key={space.id} space={space} />
          ))}
        </div>
      </div>
    </section>
  );
}
