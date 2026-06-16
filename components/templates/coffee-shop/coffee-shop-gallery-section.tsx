"use client";

import type { LandingContent } from "@/lib/dashboard-data";
import { CoffeeShopGalleryItem } from "@/components/templates/coffee-shop/coffee-shop-gallery-item";
import { getSectionHeading, SECTION_HEADING_DEFAULTS } from "@/lib/section-headings";

export function CoffeeShopGallerySection({ content }: { content: LandingContent }) {
  const gallery = content.gallery ?? [];
  if (gallery.length === 0) return null;

  const heading = getSectionHeading(
    content,
    "galeria",
    SECTION_HEADING_DEFAULTS["coffee-shop"].galeria,
  );

  return (
    <section
      id="galeria"
      className="scroll-mt-24 bg-[var(--coffee-secondary)] px-6 py-[clamp(72px,10vw,120px)] md:px-10 lg:px-16"
    >
      <div className="mx-auto max-w-6xl">
        <h2
          className="mb-10 max-w-xl text-balance text-[clamp(32px,5vw,56px)] font-semibold leading-[1.05] text-[var(--coffee-foreground)]"
          style={{ fontFamily: "var(--font-coffee-display)", letterSpacing: "-0.03em" }}
        >
          {heading.title}
        </h2>
        {heading.subtitle ? (
          <p
            className="mb-10 max-w-lg text-pretty text-base leading-relaxed text-[var(--coffee-foreground)]/75"
            style={{ fontFamily: "var(--font-coffee-body)" }}
          >
            {heading.subtitle}
          </p>
        ) : null}

        <div className="grid auto-rows-fr grid-cols-2 gap-3 md:gap-4">
          {gallery.map((item, index) => (
            <CoffeeShopGalleryItem item={item} index={index} key={item.id} />
          ))}
        </div>
      </div>
    </section>
  );
}
