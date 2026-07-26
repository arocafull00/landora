"use client";

import type { LandingContent } from "@/lib/dashboard-data";
import { getHeroCtaTargets } from "@/lib/hero-cta-targets";
import { RistoranteMenuFooter } from "@/components/templates/ristorante/menu-page/ristorante-menu-footer";
import { RistoranteMenuHero } from "@/components/templates/ristorante/menu-page/ristorante-menu-hero";
import { RistoranteMenuSection } from "@/components/templates/ristorante/ristorante-menu-section";
import { TemplateLazyMotion } from "@/components/templates/template-lazy-motion";
import {
  getPreviewLandingPath,
  getPublicLandingPath,
} from "@/lib/public-site-url";
import {
  getSectionHeading,
  SECTION_HEADING_DEFAULTS,
} from "@/lib/section-headings";

export function RistoranteMenuPage({
  bookingEnabled = false,
  content,
  previewLandingId,
  slug,
}: {
  bookingEnabled?: boolean;
  content: LandingContent;
  previewLandingId?: string;
  slug?: string;
}) {
  const homeHref = previewLandingId
    ? getPreviewLandingPath(previewLandingId)
    : getPublicLandingPath();
  const { primaryCtaHref } = getHeroCtaTargets({
    bookingEnabled,
    content,
    previewLandingId,
    slug: slug ?? "",
    template: "ristorante",
  });
  const heading = getSectionHeading(
    content,
    "carta",
    SECTION_HEADING_DEFAULTS.ristorante.carta,
  );
  const brand = content.brand || "Osteria da Luca.";

  return (
    <TemplateLazyMotion>
      <div
        className="relative min-h-screen overflow-x-clip bg-[var(--ristorante-muted)]"
      >
        <div className="hidden md:block">
          <RistoranteMenuHero
            appearance={content.appearance}
            brand={brand}
            brandLogoImage={content.brandLogoImage ?? ""}
            brandLogoType={content.brandLogoType ?? "text"}
            ctaHref={primaryCtaHref}
            ctaLabel={content.hero.ctaLabel ?? ""}
            eyebrow={content.hero.eyebrow}
            homeHref={homeHref}
            homePageTarget={previewLandingId ? { type: "home" } : undefined}
            image={content.hero.image}
            subtitle={heading.subtitle}
            title={heading.title || "Nuestra carta"}
          />
        </div>
        <main>
          <RistoranteMenuSection content={content} />
        </main>
        <RistoranteMenuFooter brand={brand} contact={content.contact} />
      </div>
    </TemplateLazyMotion>
  );
}
