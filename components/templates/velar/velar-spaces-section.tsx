"use client";

import type { LandingContent } from "@/lib/dashboard-data";
import { VelarButton } from "@/components/templates/velar/velar-button";
import { VelarSpaceCard } from "@/components/templates/velar/velar-space-card";
import { getSectionHeading, SECTION_HEADING_DEFAULTS } from "@/lib/section-headings";
import { useEditorHighlight } from "@/lib/use-editor-highlight";
import { cn } from "@/lib/utils";

export function VelarSpacesSection({ content }: { content: LandingContent }) {
  const isHighlighted = useEditorHighlight("residences");

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
      id="residences"
      className={cn(
        "relative z-[25] scroll-mt-24 bg-[#f5f0ea] px-6 py-20 md:px-10 lg:px-16",
        isHighlighted && "template-section--highlighted",
      )}
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-16" data-aos="fade-up">
          <p
            className="mb-6 text-center text-xs uppercase tracking-widest text-[#8a8278]"
            style={{ fontFamily: "var(--font-body)" }}
          >
            ESPACIOS ÚNICOS PARA MOMENTOS ESPECIALES
          </p>
          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2">
            <div className="text-center lg:text-left">
              <h2
                className="mb-6 font-extrabold leading-tight text-[#171717]"
                style={{
                  fontFamily: "var(--font-syne)",
                  fontSize: "clamp(32px, 5vw, 56px)",
                  letterSpacing: "-0.02em",
                }}
              >
                {heading.title}
              </h2>
            </div>
            <div className="text-center lg:text-left">
              {heading.subtitle ? (
                <p
                  className="mb-6 text-lg leading-relaxed text-[#171717]/80"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {heading.subtitle}
                </p>
              ) : null}
              <div className="flex justify-center lg:justify-start">
                <VelarButton
                  href={content.mapsUrl || "#residences"}
                  variant="secondary"
                  size="sm"
                  className="uppercase"
                >
                  DESCUBRE NUESTROS ESPACIOS
                </VelarButton>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {(content.spaces ?? []).map((space, index) => (
            <VelarSpaceCard key={space.id} space={space} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
