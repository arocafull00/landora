import { AssetImage } from "@/components/ui/asset-image";

const SIGNAL_HERO_ASSETS = {
  texture: "/templates/signal/hero-texture.png",
  flowersBack: "/templates/signal/hero-flowers-back.png",
  statue: "/templates/signal/hero-statue.png",
  flowersFront: "/templates/signal/hero-flowers-front.png",
} as const;

export function SignalHeroArt() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 -bottom-12 overflow-hidden" data-signal-hero-art>
      <div className="absolute -inset-4" data-signal-hero-layer="texture">
        <AssetImage alt="" className="object-cover object-right" fill priority sizes="100vw" src={SIGNAL_HERO_ASSETS.texture} />
      </div>
      <div className="absolute -inset-4" data-signal-hero-layer="flowers-back">
        <AssetImage alt="" className="object-cover object-right" fill sizes="100vw" src={SIGNAL_HERO_ASSETS.flowersBack} />
      </div>
      <div className="absolute -inset-4" data-signal-hero-layer="statue">
        <AssetImage alt="" className="object-cover object-right" fill priority sizes="100vw" src={SIGNAL_HERO_ASSETS.statue} />
      </div>
      <div className="absolute -inset-4" data-signal-hero-layer="flowers-front">
        <AssetImage alt="" className="object-cover object-right" fill sizes="100vw" src={SIGNAL_HERO_ASSETS.flowersFront} />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-[var(--site-dark)] via-[var(--site-dark)]/80 to-transparent lg:via-[var(--site-dark)]/45" />
      <div className="absolute inset-0 bg-[var(--site-dark)] opacity-0" data-signal-hero-shade />
      <div className="signal-hero-light absolute inset-0" data-signal-hero-light />
    </div>
  );
}
