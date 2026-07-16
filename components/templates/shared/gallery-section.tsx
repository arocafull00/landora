"use client";

import type { LandingContent, TemplateId } from "@/lib/dashboard-data";
import { GalleryItem } from "@/components/templates/shared/gallery-item";
import { getSectionHeading, SECTION_HEADING_DEFAULTS } from "@/lib/section-headings";

export function GallerySection({
  content,
  templateId,
}: {
  content: LandingContent;
  templateId: TemplateId;
}) {
  const gallery = content.gallery ?? [];
  if (gallery.length === 0) return null;

  const headingFallback =
    SECTION_HEADING_DEFAULTS[templateId]?.galeria ??
    SECTION_HEADING_DEFAULTS.floristeria.galeria;

  const heading = getSectionHeading(content, "galeria", headingFallback);

  return (
    <section id="galeria" className="scroll-mt-24 bg-[var(--site-surface)] px-6 py-24 md:px-10 md:py-32 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 border-b border-[var(--site-primary)]/10 pb-8" data-aos="fade-up">
          <h2
            className="text-balance text-3xl font-extrabold text-[var(--site-text)] sm:text-4xl md:text-[clamp(32px,5vw,48px)]"
            style={{ fontFamily: "var(--font-cormorant)", letterSpacing: "-0.02em" }}
          >
            {heading.title}
          </h2>
          {heading.subtitle ? (
            <p
              className="mt-4 max-w-lg text-pretty text-base leading-relaxed text-[var(--site-text)]/60"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {heading.subtitle}
            </p>
          ) : null}
        </div>

        <div
          className="grid grid-flow-dense grid-cols-2 gap-3 md:grid-cols-4 md:gap-4"
          aria-label="Galería de creaciones"
        >
          {gallery.map((item, index) => (
            <GalleryItem
              aosDelay={Math.min(index * 60, 300)}
              featured={index === 0}
              index={index}
              item={item}
              key={item.id}
              total={gallery.length}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
