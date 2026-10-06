import { Cloud, ShoppingBag } from "lucide-react";
import type { HeroVariantProps } from "@/components/templates/shared/heroes/hero-variant-types";
import { AssetImage } from "@/components/ui/asset-image";
import { NuvoletsCloud } from "./components/nuvolets-cloud";
import { NuvoletsMascot } from "./components/nuvolets-mascot";
import { NuvoletsLink } from "./components/nuvolets-link";
import { NuvoletsHeroWord } from "./components/nuvolets-hero-word";
import { NuvoletsSun } from "./components/nuvolets-sun";

export function NuvoletsHeroVariant({ content, heroRef, primaryCtaHref, secondaryCtaHref }: HeroVariantProps) {
  const config = content.nuvolets;
  return (
    <section ref={heroRef} data-nuvolets-hero className="relative overflow-hidden bg-linear-to-b from-nuvolets-blue-soft to-nuvolets-background">
      {config?.effects.decorations ? <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div data-depth=".5" className="absolute left-[3%] top-8 w-20 md:w-32"><NuvoletsCloud className="nuvolets-drift w-full text-nuvolets-surface opacity-90" /></div>
        <div data-depth=".3" className="absolute right-[5%] top-28 w-16 md:w-28"><NuvoletsCloud className="nuvolets-drift w-full text-nuvolets-surface opacity-80 [animation-delay:-6s]" /></div>
        <div data-depth=".8" className="absolute bottom-10 left-[42%] w-14 md:w-20"><NuvoletsCloud className="nuvolets-drift w-full text-nuvolets-pink-soft [animation-delay:-10s]" /></div>
        <div data-depth=".2" className="absolute left-[24%] top-[80%] hidden w-10 md:block md:w-14"><NuvoletsCloud className="nuvolets-drift w-full text-nuvolets-surface opacity-70 [animation-delay:-3s]" /></div>
      </div> : null}
      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 pb-24 pt-10 md:grid-cols-2 md:gap-16 md:px-8 md:pb-32 md:pt-16">
        <div className="relative z-20 pb-28 md:order-1 md:pb-0">
          <p data-editor-id="hero:eyebrow" className="nuvolets-intro mb-5 text-site-chip font-semibold tracking-[.2em] [--d:.05s]">{content.hero.eyebrow}</p>
          <h1 data-editor-id="hero:title" className="nuvolets-title mb-6 whitespace-pre-line text-site-title-xl leading-[1.02]">{content.hero.title.split(/(\s+)/).map((word, index) => <NuvoletsHeroWord key={index} word={word} index={index / 2} />)}</h1>
          <p data-editor-id="hero:subtitle" className="nuvolets-intro mb-9 max-w-md whitespace-pre-line text-site-subtitle leading-relaxed md:opacity-85 [--d:.7s]">{content.hero.subtitle}</p>
          {content.hero.description ? <p className="nuvolets-intro mb-6 text-site-content [--d:.7s]">{content.hero.description}</p> : null}
          <div className="nuvolets-intro flex flex-wrap gap-3 [--d:.85s]">
            <NuvoletsLink href={primaryCtaHref} className="nuvolets-button w-full gap-2 sm:w-auto"><ShoppingBag aria-hidden size={18} className="shrink-0" />{content.hero.ctaLabel}</NuvoletsLink>
            {config?.heroDetails.secondaryLabel ? <NuvoletsLink href={secondaryCtaHref} className="nuvolets-button nuvolets-button-ghost w-full gap-2 max-md:bg-nuvolets-surface! sm:w-auto"><Cloud aria-hidden size={18} className="shrink-0" />{config.heroDetails.secondaryLabel}</NuvoletsLink> : null}
          </div>
        </div>
        <div className="absolute inset-0 md:relative md:inset-auto md:order-2 md:w-auto">
          {config?.effects.decorations ? <div className="nuvolets-intro absolute right-0 top-2 z-0 w-28 [--d:.9s] md:-right-12 md:-top-12 md:w-44"><NuvoletsSun /></div> : null}
          <div className="nuvolets-photo nuvolets-blob nuvolets-hero-photo relative z-10 h-full max-md:animate-none! max-md:rounded-none! max-md:bg-none! md:aspect-[5/6] md:h-auto"><AssetImage src={content.hero.image} alt={config?.heroDetails.alt ?? content.hero.title} fill priority sizes="(min-width:768px) 45vw, 100vw" className="object-cover object-center opacity-15 md:opacity-100" /></div>
          {config ? <NuvoletsMascot config={config.mascot} /> : null}
        </div>
      </div>
    </section>
  );
}
