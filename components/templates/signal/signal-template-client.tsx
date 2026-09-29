"use client";

import { useRef } from "react";
import type { LandingContent, LandingSectionSelections } from "@/lib/dashboard-data";
import { getHeroCtaTargets } from "@/lib/hero-cta-targets";
import { getOrderedVisibleBodySections, getVisibleNav } from "@/lib/template-sections";
import { HeroRenderer } from "@/components/templates/shared/heroes/hero-renderer";
import { ActiveOffersRenderer } from "@/components/shared/active-offers-renderer";
import { SIGNAL_CHROME } from "@/components/templates/signal/signal-copy";
import { SignalNav } from "@/components/templates/signal/signal-nav";
import { SignalCapabilitiesSection } from "@/components/templates/signal/signal-capabilities-section";
import { SignalIndexSection } from "@/components/templates/signal/signal-index-section";
import { SignalCtaSection } from "@/components/templates/signal/signal-cta-section";
import { SignalContactSection } from "@/components/templates/signal/signal-contact-section";
import { useSignalScroll } from "@/components/templates/signal/hooks/use-signal-scroll";
import { useSignalHeroMotion } from "@/components/templates/signal/hooks/use-signal-hero-motion";

function renderSignalBodySection(
  anchor: string,
  content: LandingContent,
  ctaHref: string,
  previewLandingId?: string,
  demoMode = false,
) {
  if (anchor === "capacidades") {
    return (
      <SignalCapabilitiesSection content={content} previewLandingId={previewLandingId} demoMode={demoMode} />
    );
  }
  if (anchor === "indice") return <SignalIndexSection content={content} />;
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
  demoMode = false,
}: {
  content: LandingContent;
  copyrightYear: number;
  renderedAt: Date;
  topOffset?: number;
  slug?: string;
  previewLandingId?: string;
  bookingEnabled?: boolean;
  sectionSelections?: LandingSectionSelections;
  demoMode?: boolean;
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
  const navLinks = getVisibleNav(content.nav, content.hiddenSections, "signal").filter(
    (link) => link.href !== "#escala" && link.href !== "#portal" && link.href !== "#studio" && link.href !== "#climax",
  );

  useSignalScroll(rootRef, {
    enabled: true,
    previewMode: Boolean(previewLandingId),
    content,
  });
  useSignalHeroMotion(rootRef);

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
        brand={content.brand || content.hero.title}
        navLinks={navLinks}
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
          {renderSignalBodySection(section.anchor, content, primaryCtaHref, previewLandingId, demoMode)}
        </div>
      ))}

      <SignalContactSection
        content={content}
        copyrightYear={copyrightYear}
        slug={slug ?? ""}
        previewMode={Boolean(previewLandingId)}
      />

    </div>
  );
}
