import { PolaroidGalleryItem } from "@/components/templates/shared/galleries/polaroid-gallery-item";
import type { GalleryVariantProps } from "@/components/templates/shared/galleries/gallery-variant-types";
import {
  getSectionHeading,
  SECTION_HEADING_DEFAULTS,
} from "@/lib/section-headings";

const POLAROID_POSITIONS = [
  "lg:left-[1%] lg:top-[8%] lg:-rotate-6",
  "lg:left-[29%] lg:top-0 lg:rotate-3",
  "lg:right-[1%] lg:top-[9%] lg:-rotate-2",
  "lg:left-[8%] lg:bottom-[2%] lg:rotate-3",
  "lg:right-[34%] lg:bottom-0 lg:-rotate-5",
  "lg:right-[2%] lg:bottom-[3%] lg:rotate-4",
  "lg:left-[36%] lg:bottom-[11%] lg:rotate-2",
] as const;

export function PolaroidGalleryVariant({
  content,
  templateId,
}: GalleryVariantProps) {
  const gallery = content.gallery ?? [];
  if (gallery.length === 0) return null;

  const fallback =
    SECTION_HEADING_DEFAULTS[templateId]?.galeria ??
    SECTION_HEADING_DEFAULTS.ristorante.galeria;
  const heading = getSectionHeading(content, "galeria", fallback);
  const story = content.about?.statement || heading.subtitle;

  return (
    <section
      className="scroll-mt-24 bg-[var(--site-surface)] px-4 py-20 sm:px-6 md:py-28 lg:px-10"
      id="galeria"
    >
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-[var(--site-border)] bg-[var(--site-surface-muted)] p-5 shadow-[0_24px_70px_color-mix(in_srgb,var(--site-dark)_9%,transparent)] [background-image:repeating-linear-gradient(0deg,transparent,transparent_38px,color-mix(in_srgb,var(--site-text)_8%,transparent)_39px)] sm:p-8 lg:p-10">
        <div className="max-w-4xl">
          <span className="inline-flex rounded-full bg-[var(--site-primary)]/10 px-3 py-2 font-mono font-medium uppercase tracking-[0.08em] text-[var(--site-primary)] text-site-content">
            Polaroid storytelling
          </span>
          <h2 className="mt-4 max-w-3xl text-balance font-heading font-bold leading-[0.98] tracking-[-0.04em] text-[var(--site-text)] text-site-title">
            {heading.title}
          </h2>
          {heading.subtitle ? (
            <p className="mt-4 max-w-2xl text-pretty font-body leading-relaxed text-[var(--site-text-muted)] text-site-subtitle">
              {heading.subtitle}
            </p>
          ) : null}
        </div>

        <div className="relative mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:block lg:min-h-[760px]">
          {gallery.map((item, index) => (
            <PolaroidGalleryItem
              index={index}
              item={item}
              key={item.id}
              positionClass={
                POLAROID_POSITIONS[index % POLAROID_POSITIONS.length]
              }
            />
          ))}
          <div className="relative z-20 rounded-2xl bg-[var(--site-dark)] p-6 text-[var(--site-on-dark)] shadow-[0_24px_50px_color-mix(in_srgb,var(--site-dark)_20%,transparent)] md:col-span-2 lg:absolute lg:left-[39%] lg:top-[43%] lg:w-[36%] lg:-rotate-1">
            <strong className="block font-heading font-bold text-site-title">
              Más que una carta.
            </strong>
            {story ? (
              <p className="mt-2 line-clamp-4 font-body leading-relaxed text-[var(--site-on-dark)]/70 text-site-content">
                {story}
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
