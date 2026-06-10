"use client";

import type { LandingContent } from "@/lib/dashboard-data";
import { RistoranteGalleryItem } from "@/components/templates/ristorante/ristorante-gallery-item";
import { getSectionHeading, SECTION_HEADING_DEFAULTS } from "@/lib/section-headings";

export function RistoranteGallerySection({ content }: { content: LandingContent }) {
  const gallery = content.gallery ?? [];
  if (gallery.length === 0) return null;

  const heading = getSectionHeading(
    content,
    "galeria",
    SECTION_HEADING_DEFAULTS.ristorante.galeria,
  );

  return (
    <section id="galeria" className="scroll-mt-24 bg-[#FAF7F2] py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
        <h2
          className="mb-12 text-center text-balance text-3xl font-extrabold text-[#1C1917] sm:text-4xl md:mb-16 md:text-[clamp(32px,5vw,48px)]"
          style={{ fontFamily: "var(--font-playfair)", letterSpacing: "-0.02em" }}
          data-aos="fade-up"
        >
          {heading.title}
        </h2>
      </div>

      <div
        className="flex gap-4 overflow-x-auto px-6 pb-4 [-ms-overflow-style:none] [scrollbar-width:none] md:hidden [&::-webkit-scrollbar]:hidden"
        style={{ scrollSnapType: "x mandatory" }}
        data-aos="fade-up"
      >
        {gallery.map((item, index) => (
          <RistoranteGalleryItem
            item={item}
            index={index}
            variant="scroll"
            key={item.id}
          />
        ))}
      </div>

      <div
        className="mx-auto hidden max-w-7xl grid-cols-3 gap-4 px-10 md:grid md:auto-rows-[200px] lg:px-16"
        data-aos="fade-up"
      >
        {gallery.map((item, index) => (
          <RistoranteGalleryItem
            item={item}
            index={index}
            variant="masonry"
            key={item.id}
          />
        ))}
      </div>
    </section>
  );
}
