"use client";

import { useCallback, useEffect, useState } from "react";
import type { LandingContent, TemplateId } from "@/lib/dashboard-data";
import { VelarTemplate } from "@/components/templates/velar/velar-template";
import { StudioTemplate } from "@/components/templates/studio/studio-template";
import { PortfolioTemplate } from "@/components/templates/portfolio/portfolio-template";
import { RistoranteTemplate } from "@/components/templates/ristorante/ristorante-template";
import { FloristeriaTemplate } from "@/components/templates/floristeria/floristeria-template";
import {
  isPreviewContentMessage,
  isPreviewScrollToMessage,
  PREVIEW_CONTENT_UPDATE,
} from "@/lib/preview-messaging";
import {
  getHashSectionId,
  scrollToSectionIdWhenReady,
} from "@/lib/scroll-to-section";
import { resolveSectionId } from "@/lib/template-sections";
import { usePreviewScrollContainer } from "@/lib/preview-scroll-context";

const TEMPLATE_COMPONENTS = {
  velar: VelarTemplate,
  studio: StudioTemplate,
  portfolio: PortfolioTemplate,
  ristorante: RistoranteTemplate,
  floristeria: FloristeriaTemplate,
} as const;

export function LandingPreviewFrame({
  initialContent,
  template,
}: {
  initialContent: LandingContent;
  template: TemplateId;
}) {
  const [content, setContent] = useState(initialContent);
  const [activeTemplate, setActiveTemplate] = useState(template);
  const scrollContainer = usePreviewScrollContainer();

  const refreshScrollPosition = useCallback(() => {
    if (scrollContainer) {
      scrollContainer.dispatchEvent(new Event("scroll"));
      return;
    }
    window.dispatchEvent(new Event("scroll"));
  }, [scrollContainer]);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return;

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

      if (!isPreviewContentMessage(event.data)) return;
      setContent(event.data.content);
      setActiveTemplate(event.data.template);
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
      window.location.origin
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

  useEffect(() => {
    scrollToResolvedHash();
  }, [content, scrollToResolvedHash]);

  const Component = TEMPLATE_COMPONENTS[activeTemplate] ?? VelarTemplate;

  return <Component content={content} />;
}
