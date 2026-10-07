import { ArrowDown, MoveDownRight } from "lucide-react";
import type { HeroVariantProps } from "@/components/templates/shared/heroes/hero-variant-types";
import { AssetImage } from "@/components/ui/asset-image";
import { RistoranteButton } from "@/components/templates/ristorante/ristorante-button";
import { RISTORANTE_COPY } from "@/components/templates/ristorante/ristorante-copy";
import "@/components/templates/ristorante/ristorante.css";

export function RistoranteHero({ content, primaryCtaHref, secondaryCtaHref, heroRef }: HeroVariantProps) {
  return (
    <section ref={heroRef} id="inicio" data-section="hero" className="ristorante ristorante-noise relative min-h-[90svh] overflow-hidden bg-ristorante-cream pt-28">
      <div aria-hidden="true" className="pointer-events-none absolute left-[6%] top-[18%] hidden h-20 w-20 rounded-full border-2 border-ristorante-olive/40 lg:block" />
      <div className="ristorante-chip ristorante-shadow-5 pointer-events-none absolute right-[6%] top-[18%] rotate-12 bg-ristorante-mustard px-4 py-2 text-[11px] font-black tracking-[.15em]">{content.hero.eyebrow}</div>
      <div className="ristorante-chip pointer-events-none absolute bottom-[13%] left-[5%] hidden -rotate-6 rounded-full border-2 border-ristorante-tomato bg-ristorante-cream px-4 py-2 text-[10px] font-black tracking-[.15em] text-ristorante-tomato md:block">{RISTORANTE_COPY.appetite}</div>
      <div className="relative mx-auto flex min-h-[76svh] max-w-[1600px] flex-col justify-between px-5 pb-12 md:px-8 lg:px-12">
        <div className="relative z-10"><h1 className="ristorante-title ristorante-hero-word font-ristorante-display">{content.hero.title}</h1></div>
        <div className="ristorante-hero-pizza absolute left-1/2 top-[48%] z-20 w-[58vw] max-w-[760px] -translate-x-1/2 -translate-y-1/2">
          <div data-parallax="18"><div className="ristorante-cursor relative">
            <div className="ristorante-organic ristorante-shadow-hero relative aspect-square overflow-hidden border-[10px] border-ristorante-cream md:border-[14px]"><AssetImage src={content.hero.image} alt={RISTORANTE_COPY.heroAlt} fill priority quality={95} sizes="(max-width: 768px) 78vw, (max-width: 1310px) 58vw, 760px" className="object-cover" /></div>
            <div className="ristorante-shadow-6 absolute -right-5 top-12 grid h-24 w-24 place-items-center rounded-full bg-ristorante-tomato text-center text-ristorante-cream md:h-32 md:w-32">
              <div aria-hidden="true" className="ristorante-spin absolute inset-2 rounded-full border border-dashed border-ristorante-cream/80" />
              <span className="relative whitespace-pre-line font-ristorante-display text-xs leading-tight md:text-sm">{RISTORANTE_COPY.handmade}</span>
            </div>
          </div></div>
        </div>
        <div className="relative z-30 mt-auto grid items-end gap-8 md:grid-cols-2">
          <div className="max-w-sm">
            <p className="whitespace-pre-line text-lg font-medium leading-snug md:text-2xl">{content.hero.subtitle}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <RistoranteButton href={secondaryCtaHref} tone="olive">{RISTORANTE_COPY.menu}<ArrowDown aria-hidden="true" /></RistoranteButton>
              <RistoranteButton href={primaryCtaHref} tone="outline" className="py-3">{RISTORANTE_COPY.reserve}</RistoranteButton>
            </div>
          </div>
          <div className="justify-self-end text-right"><p className="mb-2 text-xs font-bold uppercase tracking-[.24em] text-ristorante-olive/60">{content.hero.description}</p><MoveDownRight aria-hidden="true" className="ml-auto h-12 w-28 text-ristorante-tomato" strokeWidth={1.5} /></div>
        </div>
      </div>
    </section>
  );
}
