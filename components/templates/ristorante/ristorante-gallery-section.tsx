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
    <section id="galeria" className="scroll-mt-24 bg-[var(--ristorante-secondary)] py-[clamp(64px,10vw,120px)]">
      <div
        className="flex gap-4 overflow-x-auto px-6 pb-4 [-ms-overflow-style:none] [scrollbar-width:none] md:px-10 lg:px-16 [&::-webkit-scrollbar]:hidden"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {gallery.map((item, index) => (
          <RistoranteGalleryItem
            item={item}
            index={index}
            featured={index === 0}
            heading={index === 0 ? heading.title : undefined}
            key={item.id}
          />
        ))}
      </div>
    </section>
  );
}
