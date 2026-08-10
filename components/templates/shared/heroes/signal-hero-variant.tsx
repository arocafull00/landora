import type { HeroVariantProps } from "@/components/templates/shared/heroes/hero-variant-types";
import { SignalHero } from "@/components/templates/signal/signal-hero";

export function SignalHeroVariant({
  content,
  heroRef,
}: HeroVariantProps) {
  return <SignalHero content={content} heroRef={heroRef} />;
}
