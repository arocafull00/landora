"use client";

import type { LandingContent } from "@/lib/dashboard-data";
import { StudioGalleryItem } from "@/components/templates/studio/studio-gallery-item";

export function StudioGallerySection({ content }: { content: LandingContent }) {
  const gallery = content.gallery ?? [];
  if (gallery.length === 0) return null;

  return (
    <section id="galeria" className="bg-white py-16 md:py-24">
      <div
        className="flex gap-4 overflow-x-auto px-6 pb-4 [-ms-overflow-style:none] [scrollbar-width:none] md:hidden [&::-webkit-scrollbar]:hidden"
        style={{ scrollSnapType: "x mandatory" }}
        data-aos="fade-up"
      >
        {gallery.map((item, index) => (
          <StudioGalleryItem
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
          <StudioGalleryItem
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
