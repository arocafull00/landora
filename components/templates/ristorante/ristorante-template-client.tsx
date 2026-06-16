"use client";

import { useRef } from "react";
import type { CSSProperties } from "react";
import type { LandingContent } from "@/lib/dashboard-data";
import { getVisibleNav, isSectionVisible } from "@/lib/template-sections";
import { getTemplatePalette } from "@/lib/template-palettes";
import { TemplateLazyMotion } from "@/components/templates/template-lazy-motion";
import { RistoranteNav } from "@/components/templates/ristorante/ristorante-nav";
import { RistoranteHero } from "@/components/templates/ristorante/ristorante-hero";
import { RistoranteStorySection } from "@/components/templates/ristorante/ristorante-story-section";
import { RistoranteMenuSection } from "@/components/templates/ristorante/ristorante-menu-section";
import { GallerySection } from "@/components/templates/shared/gallery-section";
import { RistoranteChefSection } from "@/components/templates/ristorante/ristorante-chef-section";
import { RistoranteHoursSection } from "@/components/templates/ristorante/ristorante-hours-section";
import { RistoranteTestimonialsSection } from "@/components/templates/ristorante/ristorante-testimonials-section";
import { RistoranteContactSection } from "@/components/templates/ristorante/ristorante-contact-section";

function getRistoranteThemeVars(palette: ReturnType<typeof getTemplatePalette>): CSSProperties {
  return {
    ["--ristorante-primary" as string]: palette.primary,
    ["--ristorante-secondary" as string]: palette.secondary,
    ["--ristorante-accent" as string]: palette.accent,
    ["--ristorante-muted" as string]: palette.muted,
    ["--ristorante-surface" as string]: palette.surface,
    ["--ristorante-foreground" as string]: palette.foreground,
    backgroundColor: palette.surface,
    overflowX: "clip",
  };
}

export function RistoranteTemplateClient({
  content,
  topOffset = 0,
}: {
  content: LandingContent;
  topOffset?: number;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const palette = getTemplatePalette("ristorante");

  return (
    <TemplateLazyMotion>
      <div ref={rootRef} className="relative" style={getRistoranteThemeVars(palette)}>
        <RistoranteNav
          brand={content.brand || "Osteria da Luca."}
          brandLogoType={content.brandLogoType ?? "text"}
          brandLogoImage={content.brandLogoImage ?? ""}
          navLinks={getVisibleNav(content.nav, content.hiddenSections, "ristorante")}
          ctaLabel={content.hero.ctaLabel ?? ""}
          topOffset={topOffset}
          scrollRootRef={rootRef}
        />

        <RistoranteHero content={content} heroRef={heroRef} />

        {isSectionVisible(content, "story") ? (
          <RistoranteStorySection content={content} />
        ) : null}

        {isSectionVisible(content, "carta") ? <RistoranteMenuSection content={content} /> : null}

        {isSectionVisible(content, "galeria") ? (
          <GallerySection content={content} />
        ) : null}

        {isSectionVisible(content, "equipo") ? <RistoranteChefSection content={content} /> : null}

        {isSectionVisible(content, "horarios") ? (
          <RistoranteHoursSection content={content} />
        ) : null}

        {isSectionVisible(content, "testimonios") ? (
          <RistoranteTestimonialsSection content={content} />
        ) : null}

        <RistoranteContactSection content={content} />
      </div>
    </TemplateLazyMotion>
  );
}
