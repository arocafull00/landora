"use client";

import { NUVOLETS_COPY as copy } from "@/lib/nuvolets-copy";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { NuvoletsContent } from "@/lib/schemas/nuvolets";
import { useNuvoletsCarousel } from "../hooks/use-nuvolets-carousel";
import { NuvoletsProductCard } from "./nuvolets-product-card";

export function NuvoletsFavorites({ config, products }: { config: NuvoletsContent["favorites"]; products: NuvoletsContent["products"] }) {
  const { ref, edges, scroll } = useNuvoletsCarousel();
  return <section className="py-20 md:py-28"><div className="mx-auto max-w-7xl px-5 md:px-8">
    <div className="nuvolets-reveal mb-10 flex items-end justify-between gap-6"><div className="max-w-xl"><h2 className="nuvolets-title mb-3 text-site-title">{config.title}</h2><p className="text-site-content opacity-75">{config.subtitle}</p></div>
      <div className="hidden shrink-0 gap-2 md:flex"><button type="button" className="nuvolets-carousel-button" onClick={() => scroll(-1)} disabled={edges.start} aria-label={copy.previousFavorites} aria-controls="nuvolets-favorites"><ChevronLeft aria-hidden size={18} strokeWidth={1.6} /></button><button type="button" className="nuvolets-carousel-button" onClick={() => scroll(1)} disabled={edges.end || products.length === 0} aria-label={copy.nextFavorites} aria-controls="nuvolets-favorites"><ChevronRight aria-hidden size={18} strokeWidth={1.6} /></button></div>
    </div>
    <div ref={ref} id="nuvolets-favorites" className="nuvolets-snap flex gap-4 overflow-x-auto pb-8 pt-3 -me-5 pe-5 md:mx-0 md:gap-6 md:px-0 md:pt-2">{products.map((product, index) => <NuvoletsProductCard key={product.id} product={product} index={index} carousel />)}</div>
  </div></section>;
}
