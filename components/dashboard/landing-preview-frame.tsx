"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import type { LandingContent, TemplateId } from "@/lib/dashboard-data";
import { VelarTemplate } from "@/components/templates/velar/velar-template";
import { StudioTemplate } from "@/components/templates/studio/studio-template";
import { PortfolioTemplate } from "@/components/templates/portfolio/portfolio-template";
import { RistoranteTemplate } from "@/components/templates/ristorante/ristorante-template";
import { FloristeriaTemplate } from "@/components/templates/floristeria/floristeria-template";
import { OficioProTemplate } from "@/components/templates/oficio-pro/oficio-pro-template";
import { CoffeeShopTemplate } from "@/components/templates/coffee-shop/coffee-shop-template";
import {
  isPreviewContentMessage,
  isPreviewHighlightElementMessage,
  isPreviewScrollToMessage,
  PREVIEW_CONTENT_UPDATE,
} from "@/lib/preview-messaging";
import {
  getHashSectionId,
  scrollToSectionIdWhenReady,
} from "@/lib/scroll-to-section";
import { resolveSectionId } from "@/lib/template-sections";
import { usePreviewScrollContainer } from "@/lib/preview-scroll-context";
import { WhatsappFloatButton } from "@/components/shared/whatsapp-float-button";

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
  template,
  slug,
  bookingEnabled = false,
}: {
  initialContent: LandingContent;
  template: TemplateId;
  slug?: string;
  bookingEnabled?: boolean;
}) {
  const [livePreview, setLivePreview] = useState<{
    content: LandingContent;
    template: TemplateId;
  } | null>(null);
  const highlightedEditorIdRef = useRef<string | null>(null);
  const scrollContainer = usePreviewScrollContainer();
  const content = livePreview?.content ?? initialContent;
  const activeTemplate = livePreview?.template ?? template;

  useLayoutEffect(() => {
    const editorId = highlightedEditorIdRef.current;
    if (!editorId) return;
    for (const el of document.querySelectorAll(`[data-editor-id="${editorId}"]`)) {
      el.classList.add("template-element--highlighted");
    }
  }, [content]);

  const refreshScrollPosition = useCallback(() => {
    if (scrollContainer) {
      scrollContainer.dispatchEvent(new Event("scroll"));
      return;
    }
    window.dispatchEvent(new Event("scroll"));
  }, [scrollContainer]);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.source !== window.parent) return;

      if (isPreviewScrollToMessage(event.data)) {
        const { sectionId } = event.data;
        scrollToSectionIdWhenReady(sectionId);
        window.history.replaceState(
          null,
          "",
          `${window.location.pathname}${window.location.search}#${sectionId}`,
        );
        return;
      }

      if (isPreviewHighlightElementMessage(event.data)) {
        for (const el of document.querySelectorAll(".template-element--highlighted")) {
          el.classList.remove("template-element--highlighted");
        }
        highlightedEditorIdRef.current = event.data.editorId;
        if (event.data.editorId) {
          for (const el of document.querySelectorAll(`[data-editor-id="${event.data.editorId}"]`)) {
            el.classList.add("template-element--highlighted");
          }
        }
        return;
      }

      if (!isPreviewContentMessage(event.data)) return;
      setLivePreview({
        content: event.data.content,
        template: event.data.template,
      });
      requestAnimationFrame(() => {
        requestAnimationFrame(refreshScrollPosition);
      });
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [refreshScrollPosition]);

  useEffect(() => {
    if (window.parent === window) return;
    window.parent.postMessage(
      { type: `${PREVIEW_CONTENT_UPDATE}:ready` },
      "*"
    );
  }, []);

  const scrollToResolvedHash = useCallback(() => {
    const sectionId = getHashSectionId();
    if (!sectionId) return;
    scrollToSectionIdWhenReady(resolveSectionId(activeTemplate, sectionId));
  }, [activeTemplate]);

  useEffect(() => {
    scrollToResolvedHash();
    window.addEventListener("hashchange", scrollToResolvedHash);
    return () => window.removeEventListener("hashchange", scrollToResolvedHash);
  }, [scrollToResolvedHash]);

  const Component = TEMPLATE_COMPONENTS[activeTemplate] ?? VelarTemplate;

  return (
    <>
      <Component content={content} slug={slug} bookingEnabled={bookingEnabled} />
      {content.contact.whatsappEnabled ? (
        <WhatsappFloatButton phone={content.contact.phone} />
      ) : null}
    </>
  );
}
