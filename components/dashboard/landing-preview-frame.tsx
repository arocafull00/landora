"use client";

import { useEffect, useEffectEvent, useLayoutEffect, useMemo } from "react";
import dynamic from "next/dynamic";
import type {
  LandingContent,
  LandingSectionSelections,
  SitePageId,
  TemplateId,
} from "@/lib/dashboard-data";
import { usePreviewBridge } from "@/components/dashboard/hooks/use-preview-bridge";
import {
  getHashSectionId,
  scrollToSectionIdWhenReady,
} from "@/lib/scroll-to-section";
import { resolveSectionId } from "@/lib/template-sections";
import { WhatsappFloatButton } from "@/components/shared/whatsapp-float-button";
import { SiteThemeScope } from "@/components/templates/site-theme-scope";
import { resolveLandingAppearance } from "@/lib/site-appearance";
import { VELAR_WHATSAPP_MESSAGE } from "@/lib/velar-links";
import { resolveGalleryItems } from "@/lib/gallery-content";
import { findSignalCaseBySlug } from "@/lib/signal-cases";
import { getPreviewLandingPath } from "@/lib/public-site-url";
import { applyCatalogPresentation, type CatalogPresentation } from "@/lib/catalog-presentation";

const NuvoletsTemplate = dynamic(
  () => import("@/components/templates/nuvolets/nuvolets-template").then((module) => module.NuvoletsTemplate),
);
const VelarTemplate = dynamic(
  () => import("@/components/templates/velar/velar-template").then((module) => module.VelarTemplate),
);
const StudioTemplate = dynamic(
  () => import("@/components/templates/studio/studio-template").then((module) => module.StudioTemplate),
);
const PortfolioTemplate = dynamic(
  () => import("@/components/templates/portfolio/portfolio-template").then((module) => module.PortfolioTemplate),
);
const RistoranteTemplate = dynamic(
  () => import("@/components/templates/ristorante/ristorante-template").then((module) => module.RistoranteTemplate),
);
const FloristeriaTemplate = dynamic(
  () => import("@/components/templates/floristeria/floristeria-template").then((module) => module.FloristeriaTemplate),
);
const OficioProTemplate = dynamic(
  () => import("@/components/templates/oficio-pro/oficio-pro-template").then((module) => module.OficioProTemplate),
);
const CoffeeShopTemplate = dynamic(
  () => import("@/components/templates/coffee-shop/coffee-shop-template").then((module) => module.CoffeeShopTemplate),
);
const SignalTemplate = dynamic(
  () => import("@/components/templates/signal/signal-template").then((module) => module.SignalTemplate),
);
const SignalCasePage = dynamic(
  () => import("@/components/templates/signal/signal-case-page").then((module) => module.SignalCasePage),
);
const PalletRossTemplate = dynamic(
  () => import("@/components/templates/pallet-ross/pallet-ross-template").then((module) => module.PalletRossTemplate),
);
const PortfolioAboutPage = dynamic(
  () => import("@/components/templates/portfolio/portfolio-about-page").then((module) => module.PortfolioAboutPage),
);
const PortfolioProjectPage = dynamic(
  () => import("@/components/templates/portfolio/portfolio-project-page").then((module) => module.PortfolioProjectPage),
);
const RistoranteMenuPage = dynamic(
  () => import("@/components/templates/ristorante/ristorante-menu-page").then((module) => module.RistoranteMenuPage),
);

const TEMPLATE_COMPONENTS = {
  nuvolets: NuvoletsTemplate,
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
  initialCaseSlug,
  bookingEnabled = false,
  catalog,
}: {
  initialContent: LandingContent;
  initialSectionSelections: LandingSectionSelections;
  template: TemplateId;
  slug: string;
  previewLandingId: string;
  sitePage?: SitePageId | "project" | "carta";
  previewProjectKey?: string;
  initialCaseSlug?: string;
  bookingEnabled: boolean;
  catalog?: CatalogPresentation;
}) {
  const previewBridge = usePreviewBridge();
  const livePreview = previewBridge?.livePreview;
  const sourceContent = livePreview?.content ?? initialContent;
  const content = useMemo(() => catalog ? applyCatalogPresentation(sourceContent, catalog) : sourceContent, [sourceContent, catalog]);
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
    const sectionId = resolveSectionId(activeTemplate, scrollRequest.sectionId);
    scrollToSectionIdWhenReady(sectionId);
    window.history.replaceState(
      null,
      "",
      `${window.location.pathname}${window.location.search}#${sectionId}`,
    );
  }, [scrollRequest, activeTemplate]);

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
  const previewProject =
    sitePage === "project"
      ? content.gallery?.find(
          (item) =>
            item.id === previewProjectKey ||
            item.projectSlug === previewProjectKey,
        )
      : undefined;
  const previewSignalCase = initialCaseSlug && activeTemplate === "signal"
    ? findSignalCaseBySlug(resolveGalleryItems("signal", content.gallery ?? []), initialCaseSlug)
    : undefined;

  return (
    <SiteThemeScope
      appearance={appearance}
      template={activeTemplate}
    >
      {previewSignalCase ? (
        <SignalCasePage
          content={content}
          copyrightYear={copyrightYear}
          homeHref={getPreviewLandingPath(previewLandingId)}
          item={previewSignalCase}
          previewMode
          slug={slug}
        />
      ) : sitePage === "project" &&
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
        <WhatsappFloatButton
          message={
            activeTemplate === "velar" ? VELAR_WHATSAPP_MESSAGE : undefined
          }
          phone={content.contact.phone}
        />
      ) : null}
    </SiteThemeScope>
  );
}
