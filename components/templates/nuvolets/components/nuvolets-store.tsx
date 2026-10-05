import { Navigation } from "lucide-react";
import type { NuvoletsContent } from "@/lib/schemas/nuvolets";
import { AssetImage } from "@/components/ui/asset-image";
import { NuvoletsLink } from "./nuvolets-link";

export function NuvoletsStore({ config }: { config: NuvoletsContent["store"] }) {
  return (
    <section className="mx-auto max-w-7xl px-5 pb-20 md:px-8 md:pb-28">
      <div className="nuvolets-reveal nuvolets-reveal-soft grid overflow-hidden rounded-[24px] bg-nuvolets-yellow-soft md:grid-cols-2">
        <div className="flex flex-col justify-center p-8 md:p-14">
          <p className="mb-5 text-site-chip font-semibold tracking-[.2em]">{config.eyebrow}</p>
          <h2 className="nuvolets-title mb-5 whitespace-pre-line text-site-title">{config.title}</h2>
          <p className="mb-8 whitespace-pre-line text-site-subtitle leading-relaxed opacity-85">{config.text}</p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
            <NuvoletsLink href={config.mapsUrl} className="nuvolets-button gap-2">
              <Navigation aria-hidden size={18} className="shrink-0" />
              {config.ctaLabel}
            </NuvoletsLink>
            {config.secondaryLabel ? (
              <NuvoletsLink href={config.secondaryHref} className="nuvolets-link inline-flex items-center gap-2">
                {config.secondaryLabel}
              </NuvoletsLink>
            ) : null}
          </div>
        </div>
        <div className="nuvolets-photo nuvolets-parallax nuvolets-store-photo min-h-[280px] rounded-none! md:min-h-[420px]">
          <AssetImage src={config.image} alt={config.alt} fill sizes="(min-width:768px) 45vw, 90vw" className="object-cover" />
        </div>
      </div>
    </section>
  );
}
