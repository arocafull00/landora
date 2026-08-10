"use client";

import { useEffect, useEffectEvent, useLayoutEffect } from "react";
import type {
  LandingContent,
  LandingSectionSelections,
  SitePageId,
  TemplateId,
} from "@/lib/dashboard-data";
import { usePreviewBridge } from "@/components/dashboard/hooks/use-preview-bridge";
import { VelarTemplate } from "@/components/templates/velar/velar-template";
import { StudioTemplate } from "@/components/templates/studio/studio-template";
import { PortfolioTemplate } from "@/components/templates/portfolio/portfolio-template";
import { RistoranteTemplate } from "@/components/templates/ristorante/ristorante-template";
import { FloristeriaTemplate } from "@/components/templates/floristeria/floristeria-template";
import { OficioProTemplate } from "@/components/templates/oficio-pro/oficio-pro-template";
import { CoffeeShopTemplate } from "@/components/templates/coffee-shop/coffee-shop-template";
import { SignalTemplate } from "@/components/templates/signal/signal-template";
import { PalletRossTemplate } from "@/components/templates/pallet-ross/pallet-ross-template";
import {
  getHashSectionId,
  scrollToSectionIdWhenReady,
} from "@/lib/scroll-to-section";
import { resolveSectionId } from "@/lib/template-sections";
import { WhatsappFloatButton } from "@/components/shared/whatsapp-float-button";
import { SiteThemeScope } from "@/components/templates/site-theme-scope";
import { resolveLandingAppearance } from "@/lib/site-appearance";
import { PortfolioAboutPage } from "@/components/templates/portfolio/portfolio-about-page";
import { PortfolioProjectPage } from "@/components/templates/portfolio/portfolio-project-page";
import { RistoranteMenuPage } from "@/components/templates/ristorante/ristorante-menu-page";

const TEMPLATE_COMPONENTS = {
  velar: VelarTemplate,
  studio: StudioTemplate,
  portfolio: PortfolioTemplate,
  ristorante: RistoranteTemplate,
  floristeria: FloristeriaTemplate,
  "oficio-pro": OficioProTemplate,
  "coffee-shop": CoffeeShopTemplate,
  signal: SignalTemplate,
  "pallet-ross": PalletRossTemplate,
} as const;

export function LandingPreviewFrame({
  initialContent,
  initialSectionSelections,
  template,
  slug,
  previewLandingId,
  sitePage = "home",
  previewProjectKey,
  bookingEnabled = false,
}: {
  initialContent: LandingContent;
  initialSectionSelections: LandingSectionSelections;
  template: TemplateId;
  slug: string;
  previewLandingId: string;
  sitePage?: SitePageId | "project" | "carta";
  previewProjectKey?: string;
  bookingEnabled: boolean;
}) {
  const previewBridge = usePreviewBridge();
  const livePreview = previewBridge?.livePreview;
  const content = livePreview?.content ?? initialContent;
  const activeTemplate = livePreview?.template ?? template;
  const sectionSelections =
    livePreview?.sectionSelections ?? initialSectionSelections;
  const heroVariantId = sectionSelections.hero;
  const highlightedEditorId = previewBridge?.highlightedEditorId ?? null;
  const highlightedSectionId = previewBridge?.highlightedSectionId ?? null;
  const scrollRequest = previewBridge?.scrollRequest ?? null;
  const copyrightYear = new Date().getFullYear();
  const renderedAt = new Date();

  useLayoutEffect(() => {
    for (const el of document.querySelectorAll(".template-element--highlighted")) {
      el.classList.remove("template-element--highlighted");
    }
    if (!highlightedEditorId) return;
    for (const el of document.querySelectorAll(
      `[data-editor-id="${highlightedEditorId}"]`,
    )) {
      el.classList.add("template-element--highlighted");
    }
  }, [content, highlightedEditorId]);

  useLayoutEffect(() => {
    for (const el of document.querySelectorAll(".template-section--highlighted")) {
      el.classList.remove("template-section--highlighted");
    }
    if (!highlightedSectionId) return;
    for (const el of document.querySelectorAll(
      `[data-section="${CSS.escape(highlightedSectionId)}"]`,
    )) {
      el.classList.add("template-section--highlighted");
    }
  }, [content, highlightedSectionId]);

  useEffect(() => {
    let secondFrame: number | undefined;
    const firstFrame = requestAnimationFrame(() => {
      secondFrame = requestAnimationFrame(() => {
        window.dispatchEvent(new Event("scroll"));
      });
    });
    return () => {
      cancelAnimationFrame(firstFrame);
      if (secondFrame !== undefined) cancelAnimationFrame(secondFrame);
    };
  }, [content, heroVariantId]);

  useEffect(() => {
    if (!scrollRequest) return;
    scrollToSectionIdWhenReady(scrollRequest.sectionId);
    window.history.replaceState(
      null,
      "",
      `${window.location.pathname}${window.location.search}#${scrollRequest.sectionId}`,
    );
  }, [scrollRequest]);

  const scrollToResolvedHash = useEffectEvent(() => {
    const sectionId = getHashSectionId();
    if (!sectionId) return;
    scrollToSectionIdWhenReady(resolveSectionId(activeTemplate, sectionId));
  });

  useEffect(() => {
    scrollToResolvedHash();
    const handleHashChange = () => scrollToResolvedHash();
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const Component = TEMPLATE_COMPONENTS[activeTemplate] ?? VelarTemplate;
  const appearance = resolveLandingAppearance(activeTemplate, content.appearance);
  const themeScopeKey = `${activeTemplate}-${appearance.paletteId}-${appearance.typographyId}-${appearance.buttonTextSize}-${appearance.titleTextSize}-${appearance.subtitleTextSize}-${appearance.contentTextSize}`;
  const previewProject =
    sitePage === "project"
      ? content.gallery?.find(
          (item) =>
            item.id === previewProjectKey ||
            item.projectSlug === previewProjectKey,
        )
      : undefined;

  return (
    <SiteThemeScope
      appearance={appearance}
      key={themeScopeKey}
      template={activeTemplate}
    >
      {sitePage === "project" &&
      activeTemplate === "portfolio" &&
      previewProject ? (
        <PortfolioProjectPage
          content={content}
          copyrightYear={copyrightYear}
          previewLandingId={previewLandingId}
          project={previewProject}
        />
      ) : sitePage === "about" && activeTemplate === "portfolio" ? (
        <PortfolioAboutPage
          content={content}
          copyrightYear={copyrightYear}
          previewLandingId={previewLandingId}
        />
      ) : sitePage === "carta" && activeTemplate === "ristorante" ? (
        <RistoranteMenuPage
          bookingEnabled={bookingEnabled}
          content={content}
          copyrightYear={copyrightYear}
          previewLandingId={previewLandingId}
          slug={slug}
        />
      ) : activeTemplate === "portfolio" ? (
        <PortfolioTemplate
          key={heroVariantId}
          bookingEnabled={bookingEnabled}
          content={content}
          copyrightYear={copyrightYear}
          renderedAt={renderedAt}
          previewLandingId={previewLandingId}
          sectionSelections={sectionSelections}
          slug={slug}
        />
      ) : (
        <Component
          key={heroVariantId}
          bookingEnabled={bookingEnabled}
          content={content}
          copyrightYear={copyrightYear}
          renderedAt={renderedAt}
          previewLandingId={previewLandingId}
          sectionSelections={sectionSelections}
          slug={slug}
        />
      )}
      {sitePage === "home" && content.contact.whatsappEnabled ? (
        <WhatsappFloatButton phone={content.contact.phone} />
      ) : null}
    </SiteThemeScope>
  );
}
