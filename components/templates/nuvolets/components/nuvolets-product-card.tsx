import type { CSSProperties } from "react";
import type { NuvoletsProduct } from "@/lib/schemas/nuvolets";
import { NUVOLETS_COPY as copy } from "@/lib/nuvolets-copy";
import { getNuvoletsProductAppearance } from "@/lib/nuvolets-product-appearance";
import { AssetImage } from "@/components/ui/asset-image";
import { NuvoletsProductColor } from "./nuvolets-product-color";

export function NuvoletsProductCard({ product, index, carousel = false }: { product: NuvoletsProduct; index: number; carousel?: boolean }) {
  const appearance = getNuvoletsProductAppearance(product);
  return <article data-product className={`nuvolets-reveal nuvolets-card group ${carousel ? "w-[62%] shrink-0 snap-start sm:w-[40%] md:w-[26%]" : ""}`} style={{ "--i": index % 4 } as CSSProperties}>
    <div className="nuvolets-zoom relative">
      <div data-tone={appearance.tone} className="nuvolets-tone nuvolets-photo aspect-[4/5] [--tone-angle:150deg]"><AssetImage src={product.image} alt={product.alt || product.name} fill sizes="(min-width:1024px) 25vw, (min-width:768px) 33vw, 50vw" className="object-cover" /></div>
      {appearance.badge ? <span data-badge={appearance.badge} className="nuvolets-badge absolute left-3 top-3 z-10 rounded-full px-3 py-1 text-xs font-semibold text-nuvolets-text">{appearance.badge}</span> : null}
    </div>
    <h3 className="mt-4 text-site-content font-semibold">{product.name}</h3>
    {product.price ? <p className="mt-0.5 text-site-content-sm opacity-80">{product.price}</p> : null}
    {appearance.colors.length ? <div className="mt-2 flex gap-1.5" role="group" aria-label={copy.colors}>{appearance.colors.map((tone, index) => <NuvoletsProductColor key={index} tone={tone} index={index} />)}</div> : null}
  </article>;
}
