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
import {
  getHashSectionId,
  scrollToSectionIdWhenReady,
} from "@/lib/scroll-to-section";
import { resolveSectionId } from "@/lib/template-sections";
import { WhatsappFloatButton } from "@/components/shared/whatsapp-float-button";
import { SiteThemeScope } from "@/components/templates/site-theme-scope";
import { PortfolioAboutPage } from "@/components/templates/portfolio/portfolio-about-page";
import { PortfolioProjectPage } from "@/components/templates/portfolio/portfolio-project-page";

const TEMPLATE_COMPONENTS = {
  velar: VelarTemplate,
  studio: StudioTemplate,
  portfolio: PortfolioTemplate,
  ristorante: RistoranteTemplate,
  floristeria: FloristeriaTemplate,
  "oficio-pro": OficioProTemplate,
  "coffee-shop": CoffeeShopTemplate,
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
  slug?: string;
  previewLandingId?: string;
  sitePage?: SitePageId | "project";
  previewProjectKey?: string;
  bookingEnabled?: boolean;
}) {
  const previewBridge = usePreviewBridge();
  const livePreview = previewBridge?.livePreview;
  const content = livePreview?.content ?? initialContent;
  const activeTemplate = livePreview?.template ?? template;
  const sectionSelections =
    livePreview?.sectionSelections ?? initialSectionSelections;
  const highlightedEditorId = previewBridge?.highlightedEditorId ?? null;
  const scrollRequest = previewBridge?.scrollRequest ?? null;

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
  }, [content]);

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
  const previewProject =
    sitePage === "project"
      ? content.gallery?.find(
          (item) =>
            item.id === previewProjectKey ||
            item.projectSlug === previewProjectKey,
        )
      : undefined;

  return (
    <SiteThemeScope appearance={content.appearance} template={activeTemplate}>
      {sitePage === "project" &&
      activeTemplate === "portfolio" &&
      previewProject ? (
        <PortfolioProjectPage
          content={content}
          landingSlug={slug ?? ""}
          previewLandingId={previewLandingId}
          project={previewProject}
        />
      ) : sitePage === "about" && activeTemplate === "portfolio" ? (
        <PortfolioAboutPage
          content={content}
          landingSlug={slug ?? ""}
          previewLandingId={previewLandingId}
        />
      ) : activeTemplate === "portfolio" ? (
        <PortfolioTemplate
          bookingEnabled={bookingEnabled}
          content={content}
          previewLandingId={previewLandingId}
          sectionSelections={sectionSelections}
          slug={slug}
        />
      ) : (
        <Component
          bookingEnabled={bookingEnabled}
          content={content}
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
