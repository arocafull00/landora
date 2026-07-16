"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import type { GalleryItem } from "@/lib/dashboard-data";
import { AssetImage } from "@/components/ui/asset-image";

export function OficioProCarousel({ images }: { images: GalleryItem[] }) {
  const [active, setActive] = useState(0);
  if (images.length === 0) return null;

  const current = images[active] ?? images[0];
  const goPrev = () => setActive((value) => (value === 0 ? images.length - 1 : value - 1));
  const goNext = () => setActive((value) => (value + 1) % images.length);

  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-[var(--site-dark)] shadow-[0_24px_70px_rgba(23,33,43,0.18)] xl:max-w-[56%]">
      <AssetImage
        alt={current.title ?? "Servicio técnico"}
        className="h-full w-full object-cover"
        fill
        sizes="(min-width: 1280px) 56vw, 100vw"
        src={current.image ?? ""}
      />
      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/50 to-transparent" />
      {images.length > 1 ? (
        <div className="absolute bottom-5 right-5 flex gap-2">
          <button
            aria-label="Imagen anterior"
            className="inline-flex size-10 items-center justify-center rounded-full border border-white/30 bg-black/30 text-white backdrop-blur transition-colors hover:bg-black/50"
            onClick={goPrev}
            type="button"
          >
            <ChevronLeft className="size-5" />
          </button>
          <button
            aria-label="Imagen siguiente"
            className="inline-flex size-10 items-center justify-center rounded-full border border-white/30 bg-black/30 text-white backdrop-blur transition-colors hover:bg-black/50"
            onClick={goNext}
            type="button"
          >
            <ChevronRight className="size-5" />
          </button>
        </div>
      ) : null}
    </div>
  );
}
