"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import type {
  LandingContent,
  LandingSectionSelections,
  TemplateId,
} from "@/lib/dashboard-data";
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
  PREVIEW_CHANNEL_INIT,
  PREVIEW_CHANNEL_READY,
} from "@/lib/preview-messaging";
import {
  getHashSectionId,
  scrollToSectionIdWhenReady,
} from "@/lib/scroll-to-section";
import { resolveSectionId } from "@/lib/template-sections";
import { WhatsappFloatButton } from "@/components/shared/whatsapp-float-button";
import { SiteThemeScope } from "@/components/templates/site-theme-scope";

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
  bookingEnabled = false,
}: {
  initialContent: LandingContent;
  initialSectionSelections: LandingSectionSelections;
  template: TemplateId;
  slug?: string;
  bookingEnabled?: boolean;
}) {
  const [livePreview, setLivePreview] = useState<{
    content: LandingContent;
    sectionSelections: LandingSectionSelections;
    template: TemplateId;
  } | null>(null);
  const highlightedEditorIdRef = useRef<string | null>(null);
  const portRef = useRef<MessagePort | null>(null);
  const content = livePreview?.content ?? initialContent;
  const activeTemplate = livePreview?.template ?? template;
  const sectionSelections =
    livePreview?.sectionSelections ?? initialSectionSelections;

  useLayoutEffect(() => {
    const editorId = highlightedEditorIdRef.current;
    if (!editorId) return;
    for (const el of document.querySelectorAll(`[data-editor-id="${editorId}"]`)) {
      el.classList.add("template-element--highlighted");
    }
  }, [content]);

  const refreshScrollPosition = useCallback(() => {
    window.dispatchEvent(new Event("scroll"));
  }, []);

  useEffect(() => {
    const handlePreviewMessage = (data: unknown) => {
      if (isPreviewScrollToMessage(data)) {
        const { sectionId } = data;
        scrollToSectionIdWhenReady(sectionId);
        window.history.replaceState(
          null,
          "",
          `${window.location.pathname}${window.location.search}#${sectionId}`,
        );
        return;
      }

      if (isPreviewHighlightElementMessage(data)) {
        for (const el of document.querySelectorAll(".template-element--highlighted")) {
          el.classList.remove("template-element--highlighted");
        }
        highlightedEditorIdRef.current = data.editorId;
        if (data.editorId) {
          for (const el of document.querySelectorAll(`[data-editor-id="${data.editorId}"]`)) {
            el.classList.add("template-element--highlighted");
          }
        }
        return;
      }

      if (!isPreviewContentMessage(data)) return;
      setLivePreview({
        content: data.content,
        sectionSelections: data.sectionSelections,
        template: data.template,
      });
      requestAnimationFrame(() => {
        requestAnimationFrame(refreshScrollPosition);
      });
    };

    const connectChannel = (event: MessageEvent) => {
      if (event.source !== window.parent) return;
      if (event.data?.type !== PREVIEW_CHANNEL_INIT) return;
      const port = event.ports[0];
      if (!port) return;

      portRef.current?.close();
      portRef.current = port;
      port.onmessage = (messageEvent) => handlePreviewMessage(messageEvent.data);
      port.start();
      port.postMessage({ type: PREVIEW_CHANNEL_READY });
    };

    window.addEventListener("message", connectChannel);
    return () => {
      window.removeEventListener("message", connectChannel);
      portRef.current?.close();
      portRef.current = null;
    };
  }, [refreshScrollPosition]);

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
    <SiteThemeScope appearance={content.appearance} template={activeTemplate}>
      <Component
        bookingEnabled={bookingEnabled}
        content={content}
        sectionSelections={sectionSelections}
        slug={slug}
      />
      {content.contact.whatsappEnabled ? (
        <WhatsappFloatButton phone={content.contact.phone} />
      ) : null}
    </SiteThemeScope>
  );
}
