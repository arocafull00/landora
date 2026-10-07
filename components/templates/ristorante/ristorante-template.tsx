import type { LandingContent, LandingSectionSelections } from "@/lib/dashboard-data";
import { getOrderedVisibleBodySections } from "@/lib/template-sections";
import { RistoranteMotion } from "@/components/templates/ristorante/ristorante-motion";
import { RistoranteNav } from "@/components/templates/ristorante/ristorante-nav";
import { RistoranteHero } from "@/components/templates/ristorante/ristorante-hero";
import { RistoranteBodySection } from "@/components/templates/ristorante/ristorante-body-section";
import { RistoranteContactSection } from "@/components/templates/ristorante/ristorante-contact-section";
import { RistoranteFooter } from "@/components/templates/ristorante/ristorante-footer";
import { RISTORANTE_COPY } from "@/components/templates/ristorante/ristorante-copy";
import { HeroRenderer } from "@/components/templates/shared/heroes/hero-renderer";
import { getBookingCtaHref } from "@/lib/booking/cta-href";
import "@/components/templates/ristorante/ristorante.css";

export function RistoranteTemplate({ content, copyrightYear, topOffset = 0, sectionSelections, bookingEnabled = false, slug = "", previewLandingId }: {
  content: LandingContent;
  copyrightYear: number;
  renderedAt: Date;
  topOffset?: number;
  sectionSelections?: LandingSectionSelections;
  bookingEnabled?: boolean;
  slug?: string;
  previewLandingId?: string;
}) {
  const primaryCtaHref = getBookingCtaHref(bookingEnabled, slug, "#contacto", previewLandingId);
  const secondaryCtaHref = content.hiddenSections?.includes("carta") ? "#contacto" : "#carta";
  const heroProps = { content, primaryCtaHref, secondaryCtaHref };
  return (
    <RistoranteMotion topOffset={topOffset}>
      <a href="#ristorante-main" className="ristorante-skip fixed left-4 top-4 z-50 -translate-y-40 rounded-full bg-ristorante-olive px-5 py-3 text-ristorante-cream focus:translate-y-0">{RISTORANTE_COPY.skip}</a>
      <RistoranteNav content={content} topOffset={topOffset} ctaHref={primaryCtaHref} />
      <main id="ristorante-main" tabIndex={-1}>
        {!sectionSelections || sectionSelections.hero === "ristorante" ? <RistoranteHero {...heroProps} /> : <HeroRenderer {...heroProps} variantId={sectionSelections.hero} />}
        {getOrderedVisibleBodySections("ristorante", content).map((section) => <RistoranteBodySection key={section.anchor} anchor={section.anchor} content={content} />)}
        <RistoranteContactSection content={content} />
      </main>
      <RistoranteFooter content={content} copyrightYear={copyrightYear} />
    </RistoranteMotion>
  );
}
