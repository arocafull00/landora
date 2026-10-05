import type { CSSProperties } from "react";
import { ArrowRight } from "lucide-react";
import type { NuvoletsContent } from "@/lib/schemas/nuvolets";
import { NUVOLETS_COPY as copy } from "@/lib/nuvolets-copy";
import { AssetImage } from "@/components/ui/asset-image";
import { NuvoletsCloud } from "./nuvolets-cloud";
import { NuvoletsLink } from "./nuvolets-link";

export function NuvoletsCategoryCard({ category, index }: { category: NuvoletsContent["categories"][number]; index: number }) {
  return <article className="nuvolets-reveal w-[78%] shrink-0 snap-start sm:w-[60%] md:w-auto" data-tone={category.tone} style={{ "--i": index } as CSSProperties}>
    <NuvoletsLink href={category.href} className="group block">
      <div className="nuvolets-zoom nuvolets-arch"><div data-tone={category.tone} className="nuvolets-tone nuvolets-photo aspect-[3/4]"><AssetImage src={category.image} alt={category.alt} fill priority={index === 0} sizes="(min-width:768px) 33vw, 78vw" className="object-cover" /></div></div>
      <h3 className="nuvolets-title mb-1 mt-5 text-site-title-sm">{category.title}<NuvoletsCloud className="nuvolets-category-cloud nuvolets-tone-text -mt-1 ml-2 inline w-9" /></h3>
      <p className="mb-2 text-site-content opacity-75">{category.description}</p>
      <span className="nuvolets-link">{copy.collection} <ArrowRight aria-hidden className="nuvolets-arrow inline h-4 w-4" /></span>
    </NuvoletsLink>
  </article>;
}
