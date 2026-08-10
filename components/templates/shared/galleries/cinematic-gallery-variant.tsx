import { CinematicGalleryCard } from "@/components/templates/shared/galleries/cinematic-gallery-card";
import type { GalleryVariantProps } from "@/components/templates/shared/galleries/gallery-variant-types";
import {
  getSectionHeading,
  SECTION_HEADING_DEFAULTS,
} from "@/lib/section-headings";

export function CinematicGalleryVariant({
  content,
  templateId,
}: GalleryVariantProps) {
  const gallery = content.gallery ?? [];
  if (gallery.length === 0) return null;

  const fallback =
    SECTION_HEADING_DEFAULTS[templateId]?.galeria ??
    SECTION_HEADING_DEFAULTS.ristorante.galeria;
  const heading = getSectionHeading(content, "galeria", fallback);

  return (
    <section
      className="scroll-mt-24 bg-[var(--site-surface)] px-4 py-20 sm:px-6 md:py-28 lg:px-10"
      id="galeria"
    >
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-[var(--site-dark)] py-8 text-[var(--site-on-dark)] shadow-[0_24px_70px_color-mix(in_srgb,var(--site-dark)_18%,transparent)] sm:py-10">
        <div className="flex flex-col items-start justify-between gap-7 px-5 sm:px-8 lg:flex-row lg:items-end lg:px-10">
          <div className="max-w-4xl">
            <span className="inline-flex rounded-full bg-[var(--site-on-dark)]/10 px-3 py-2 font-mono font-medium uppercase tracking-[0.08em] text-[var(--site-accent)] text-site-chip">
              Cinematic scroll
            </span>
            <h2 className="mt-4 max-w-3xl text-balance font-heading font-bold leading-[0.98] tracking-[-0.04em] text-site-title">
              {heading.title}
            </h2>
            {heading.subtitle ? (
              <p className="mt-4 max-w-2xl text-pretty font-body leading-relaxed text-[var(--site-on-dark)]/65 text-site-subtitle">
                {heading.subtitle}
              </p>
            ) : null}
          </div>
        </div>

        <div
          aria-label="Galería de imágenes"
          className="mt-8 grid auto-cols-[84vw] grid-flow-col gap-4 overflow-x-auto px-5 pb-5 [scroll-snap-type:x_mandatory] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:auto-cols-[minmax(310px,42vw)] sm:px-8 lg:px-10"
        >
          {gallery.map((item, index) => (
            <CinematicGalleryCard
              index={index}
              item={item}
              key={item.id}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
