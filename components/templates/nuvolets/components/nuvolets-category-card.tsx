import type { CSSProperties } from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { NuvoletsContent } from "@/lib/schemas/nuvolets";
import { NUVOLETS_COPY as copy } from "@/lib/nuvolets-copy";
import { AssetImage } from "@/components/ui/asset-image";
import { NuvoletsCloud } from "./nuvolets-cloud";

export function NuvoletsCategoryCard({ category, index, catalogHref }: { category: NuvoletsContent["categories"][number]; index: number; catalogHref: string }) {
  const filter = category.category ?? category.title.trim().slice(0, 160);
  const href = filter ? `${catalogHref}?${new URLSearchParams({ category: filter })}` : catalogHref;
  return <article className="nuvolets-reveal min-w-0" data-tone={category.tone} style={{ "--i": index } as CSSProperties}>
    <Link href={href} className="group block">
      <div className="nuvolets-zoom nuvolets-arch"><div data-tone={category.tone} className="nuvolets-tone nuvolets-photo aspect-[3/4]"><AssetImage src={category.image} alt={category.alt} fill priority={index === 0} sizes="(min-width:1280px) 384px, (min-width:768px) calc((100vw - 128px) / 3), calc(100vw - 40px)" className="object-cover" /></div></div>
      <h3 className="nuvolets-title mb-1 mt-5 text-site-title-sm">{category.title}<NuvoletsCloud className="nuvolets-category-cloud nuvolets-tone-text -mt-1 ml-2 inline w-9" /></h3>
      <p className="mb-2 text-site-content opacity-75">{category.description}</p>
      <span className="nuvolets-link">{copy.collection} <ArrowRight aria-hidden className="nuvolets-arrow inline h-4 w-4" /></span>
    </Link>
  </article>;
}
