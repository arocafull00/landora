"use client";

import { useRef } from "react";
import type { LandingContent, LandingSectionSelections } from "@/lib/dashboard-data";
import { getHeroCtaTargets } from "@/lib/hero-cta-targets";
import { getOrderedVisibleBodySections, getVisibleNav } from "@/lib/template-sections";
import { HeroRenderer } from "@/components/templates/shared/heroes/hero-renderer";
import { ActiveOffersRenderer } from "@/components/shared/active-offers-renderer";
import { SIGNAL_CHROME } from "@/components/templates/signal/signal-copy";
import { SignalNav } from "@/components/templates/signal/signal-nav";
import { SignalInsideSection } from "@/components/templates/signal/signal-inside-section";
import { SignalScaleSection } from "@/components/templates/signal/signal-scale-section";
import { SignalCapabilitiesSection } from "@/components/templates/signal/signal-capabilities-section";
import { SignalIndexSection } from "@/components/templates/signal/signal-index-section";
import { SignalClimaxSection } from "@/components/templates/signal/signal-climax-section";
import { SignalCtaSection } from "@/components/templates/signal/signal-cta-section";
import { SignalContactSection } from "@/components/templates/signal/signal-contact-section";
import { useSignalScroll } from "@/components/templates/signal/hooks/use-signal-scroll";

function renderSignalBodySection(anchor: string, content: LandingContent, ctaHref: string) {
  if (anchor === "portal") return <SignalInsideSection content={content} />;
  if (anchor === "escala") return <SignalScaleSection content={content} />;
  if (anchor === "capacidades") return <SignalCapabilitiesSection content={content} />;
  if (anchor === "indice") return <SignalIndexSection content={content} />;
  if (anchor === "climax") return <SignalClimaxSection content={content} />;
  if (anchor === "cta") return <SignalCtaSection content={content} ctaHref={ctaHref} />;
  return null;
}

export function SignalTemplateClient({
  content,
  copyrightYear,
  renderedAt,
  topOffset = 0,
  slug,
  previewLandingId,
  bookingEnabled = false,
  sectionSelections,
}: {
  content: LandingContent;
  copyrightYear: number;
  renderedAt: Date;
  topOffset?: number;
  slug?: string;
  previewLandingId?: string;
  bookingEnabled?: boolean;
  sectionSelections?: LandingSectionSelections;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const heroVariantId = sectionSelections?.hero ?? "signal";
  const { primaryCtaHref, secondaryCtaHref } = getHeroCtaTargets({
    bookingEnabled,
    content,
    previewLandingId,
    slug: slug ?? "",
    template: "signal",
  });

  useSignalScroll(rootRef, {
    enabled: true,
    previewMode: Boolean(previewLandingId),
  });

  return (
    <div
      ref={rootRef}
      className="relative bg-[var(--site-dark)] text-[var(--site-on-dark)]"
      style={{ overflowX: "clip" }}
      data-signal-root
      data-signal-motion="reduced"
    >
      <a
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-[var(--site-accent)] focus:px-3 focus:py-2 focus:text-[var(--site-on-accent)]"
        href="#hero"
      >
        {SIGNAL_CHROME.skipLink}
      </a>

      <SignalNav
        brand={content.brand || content.hero.title || "Nova"}
        navLinks={getVisibleNav(content.nav, content.hiddenSections, "signal")}
        ctaLabel={content.hero.ctaLabel ?? ""}
        ctaHref={primaryCtaHref}
        topOffset={topOffset}
      />

      <HeroRenderer
        content={content}
        primaryCtaHref={primaryCtaHref}
        secondaryCtaHref={secondaryCtaHref}
        variantId={heroVariantId}
      />

      <ActiveOffersRenderer content={content} renderedAt={renderedAt} />

      {getOrderedVisibleBodySections("signal", content).map((section) => (
        <div key={section.anchor}>
          {renderSignalBodySection(section.anchor, content, primaryCtaHref)}
        </div>
      ))}

      <SignalContactSection content={content} copyrightYear={copyrightYear} />
    </div>
  );
}
