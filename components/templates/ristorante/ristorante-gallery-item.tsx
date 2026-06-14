"use client";

import { RistoranteGalleryMedia } from "@/components/templates/ristorante/ristorante-gallery-media";
import type { GalleryItem } from "@/lib/dashboard-data";

export function RistoranteGalleryItem({
  item,
  index,
  featured = false,
  heading,
}: {
  item: GalleryItem;
  index: number;
  featured?: boolean;
  heading?: string;
}) {
  const width = featured ? "min(85vw, 480px)" : "min(72vw, 340px)";
  const height = featured ? "clamp(320px, 55vh, 520px)" : index % 2 === 0 ? "clamp(280px, 45vh, 440px)" : "clamp(240px, 38vh, 380px)";

  return (
    <div
      className="group relative shrink-0 snap-start overflow-hidden rounded-md bg-[var(--ristorante-primary)]/30"
      style={{ width, height }}
    >
      <RistoranteGalleryMedia item={item} />
      {heading ? (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-[var(--ristorante-secondary)]/90 to-transparent px-6 pb-6 pt-16">
          <h2
            className="text-balance text-[clamp(28px,4vw,48px)] font-normal leading-[1.05] text-[var(--ristorante-foreground)]"
            style={{ fontFamily: "var(--font-ristorante-display)", letterSpacing: "-0.03em" }}
          >
            {heading}
          </h2>
        </div>
      ) : null}
    </div>
  );
}
