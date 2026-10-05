import type { NuvoletsContent } from "@/lib/schemas/nuvolets";
import { AssetImage } from "@/components/ui/asset-image";
import { NuvoletsLink } from "./nuvolets-link";

export function NuvoletsEditorial({ config }: { config: NuvoletsContent["story"] }) {
  return <section className="nuvolets-story">
    <div aria-hidden="true" className="nuvolets-bumps nuvolets-bumps-blue" />
    <div className="bg-nuvolets-blue-soft">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-16 md:grid-cols-2 md:gap-16 md:px-8 md:py-24">
        <div className="nuvolets-reveal nuvolets-reveal-soft nuvolets-photo nuvolets-blob nuvolets-parallax nuvolets-story-photo aspect-[4/3]"><AssetImage src={config.image} alt={config.alt} fill sizes="(min-width:768px) 45vw, 90vw" className="object-cover" /></div>
        <div className="nuvolets-reveal">
          <h2 className="nuvolets-title mb-6 whitespace-pre-line text-site-title-lg leading-[1.05]">{config.title}</h2>
          <p className="mb-8 max-w-md whitespace-pre-line text-site-subtitle leading-relaxed opacity-85">{config.text}</p>
          {config.secondaryText ? <p className="mb-8 max-w-md whitespace-pre-line text-site-content leading-relaxed opacity-85">{config.secondaryText}</p> : null}
          <NuvoletsLink href={config.ctaHref} className="nuvolets-button">{config.ctaLabel}</NuvoletsLink>
        </div>
      </div>
    </div>
  </section>;
}
