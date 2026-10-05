import type { CSSProperties } from "react";
import { SocialPlatformIcon } from "@/components/templates/shared/social-platform-icon";
import { AssetImage } from "@/components/ui/asset-image";
import type { NuvoletsContent } from "@/lib/schemas/nuvolets";
import { NUVOLETS_COPY as copy } from "@/lib/nuvolets-copy";

export function NuvoletsInstagramCard({ item, index }: { item: NuvoletsContent["instagram"]["images"][number]; index: number }) {
  return <a href={item.href || undefined} aria-label={copy.instagramPost} target="_blank" rel="noopener noreferrer" className="nuvolets-reveal nuvolets-reveal-soft nuvolets-zoom nuvolets-instagram group relative block" style={{ "--i": index % 6 } as CSSProperties}>
    <div data-tone={item.tone} className="nuvolets-tone nuvolets-photo aspect-square rounded-[38%]! [--tone-angle:140deg]"><AssetImage src={item.image} alt={item.alt} fill sizes="(min-width:1024px) 16vw, (min-width:768px) 33vw, 50vw" className="object-cover" /></div>
    <span className="nuvolets-instagram-overlay absolute inset-0 z-10 grid place-items-center rounded-[38%] text-nuvolets-on-overlay opacity-0"><SocialPlatformIcon className="size-7" platform="instagram" /></span>
  </a>;
}
