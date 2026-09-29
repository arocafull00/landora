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
import { SignalClimaxSection } from "@/components/templates/signal/signal-climax-section";
import { SignalCtaSection } from "@/components/templates/signal/signal-cta-section";
import { SignalContactSection } from "@/components/templates/signal/signal-contact-section";
import { useSignalScroll } from "@/components/templates/signal/hooks/use-signal-scroll";
import { useSignalHeroMotion } from "@/components/templates/signal/hooks/use-signal-hero-motion";
import { useSignalCaseOverlay } from "@/components/templates/signal/hooks/use-signal-case-overlay";
import { getSignalCaseContent } from "@/components/templates/signal/signal-case-content";
import { SignalCaseStudy } from "@/components/templates/signal/signal-case-study";
import type { GalleryItem } from "@/lib/dashboard-data";

function renderSignalBodySection(
  anchor: string,
  content: LandingContent,
  ctaHref: string,
  onOpenCase: (item: GalleryItem, trigger: HTMLElement) => void,
) {
  if (anchor === "capacidades") {
    return (
      <SignalCapabilitiesSection content={content} onOpenCase={onOpenCase} />
    );
  }
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
  initialCaseSlug,
}: {
  content: LandingContent;
  copyrightYear: number;
  renderedAt: Date;
  topOffset?: number;
  slug?: string;
  previewLandingId?: string;
  bookingEnabled?: boolean;
  sectionSelections?: LandingSectionSelections;
  initialCaseSlug?: string;
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
    (link) => link.href !== "#escala" && link.href !== "#portal" && link.href !== "#studio",
  );

  useSignalScroll(rootRef, {
    enabled: true,
    previewMode: Boolean(previewLandingId),
    content,
  });
  useSignalHeroMotion(rootRef);
  const { cases } = getSignalCaseContent(content);
  const { activeCase, closeCase, goToContact, openCase } = useSignalCaseOverlay({
    cases,
    initialCaseSlug,
    previewLandingId,
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
          {renderSignalBodySection(section.anchor, content, primaryCtaHref, openCase)}
        </div>
      ))}

      <SignalContactSection
        content={content}
        copyrightYear={copyrightYear}
        slug={slug ?? ""}
        previewMode={Boolean(previewLandingId)}
      />

      {activeCase ? (
        <SignalCaseStudy
          item={activeCase}
          onClose={closeCase}
          onContact={goToContact}
        />
      ) : null}
    </div>
  );
}
