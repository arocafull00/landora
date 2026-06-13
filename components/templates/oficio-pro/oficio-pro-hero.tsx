import { ArrowRight, ChevronDown } from "lucide-react";
import type { RefObject } from "react";
import type { LandingContent } from "@/lib/dashboard-data";
import { AssetImage } from "@/components/ui/asset-image";
import { OficioProButton } from "@/components/templates/oficio-pro/oficio-pro-button";

export function OficioProHero({
  content,
  heroRef,
}: {
  content: LandingContent;
  heroRef: RefObject<HTMLElement | null>;
}) {
  return (
    <main
      className="relative isolate flex min-h-screen items-center overflow-hidden pb-28 pt-[72px]"
      id="hero"
      ref={heroRef}
    >
      <AssetImage
        alt=""
        className="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover"
        fill
        priority
        sizes="100vw"
        src={content.hero.image}
      />
      <div className="pointer-events-none absolute inset-0 z-[1] bg-black/60" />
      <div className="relative z-[2] mx-auto w-full max-w-7xl px-5 py-12 sm:px-8 lg:pb-12 lg:pt-20">
        <div className="max-w-5xl text-left">
          <p className="mb-5 text-sm font-bold uppercase tracking-[0.24em] text-[#F59E0B]">
            {content.hero.eyebrow}
          </p>
          <h1 className="mb-8 max-w-5xl text-balance text-5xl font-black uppercase leading-[1.08] tracking-normal text-white md:text-7xl lg:text-[clamp(3.5rem,7vw,5.5rem)]">
            {content.hero.title}
          </h1>
          <p className="mb-5 max-w-2xl text-xl font-semibold text-white md:text-2xl">
            {content.hero.subtitle}
          </p>
          <p className="mb-12 max-w-2xl text-lg font-light leading-relaxed text-white/85 md:text-xl">
            {content.hero.description}
          </p>
          <div className="flex flex-col gap-5 sm:flex-row sm:flex-wrap">
            <OficioProButton className="sm:min-w-[17rem]" href="#contacto">
              {content.hero.ctaLabel || "Déjanos ayudarte"}
              <ArrowRight className="size-5" />
            </OficioProButton>
            <OficioProButton href="#servicios" variant="secondary">
              Ver servicios
            </OficioProButton>
          </div>
        </div>
      </div>
      <a
        aria-label="Ir al contenido siguiente"
        className="absolute bottom-8 left-1/2 z-[2] flex -translate-x-1/2 flex-col items-center gap-1 text-white/50 transition-colors hover:text-white/80"
        href="#servicios"
      >
        <span className="text-[10px] font-bold uppercase tracking-[0.35em]">
          Descubrir
        </span>
        <ChevronDown className="size-6 animate-bounce" />
      </a>
    </main>
  );
}
