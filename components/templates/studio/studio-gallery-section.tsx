"use client";

import type { LandingContent } from "@/lib/dashboard-data";
import { StudioGalleryItem } from "@/components/templates/studio/studio-gallery-item";

export function StudioGallerySection({ content }: { content: LandingContent }) {
  const gallery = content.gallery ?? [];
  if (gallery.length === 0) return null;

  return (
    <section id="galeria" className="scroll-mt-24 bg-white py-16 md:py-24">
      <div
        className="mx-auto grid max-w-7xl grid-cols-2 auto-rows-[min(42vw,180px)] gap-3 px-4 sm:px-6 md:grid-cols-3 md:auto-rows-[260px] md:gap-4 md:px-10 lg:px-16"
        data-aos="fade-up"
      >
        {gallery.map((item, index) => (
          <StudioGalleryItem
            item={item}
            index={index}
            total={gallery.length}
            key={item.id}
          />
        ))}
      </div>
    </section>
  );
}
