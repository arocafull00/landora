"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { GalleryItem } from "@/lib/dashboard-data";
import {
  findSignalCaseBySlug,
  getSignalCaseHref,
  hasSignalCaseStudy,
} from "@/lib/signal-cases";

function getBasePath(previewLandingId?: string) {
  if (previewLandingId) {
    return `/preview/${previewLandingId}`;
  }
  return "";
}

export function useSignalCaseOverlay({
  cases,
  initialCaseSlug,
  previewLandingId,
}: {
  cases: GalleryItem[];
  initialCaseSlug?: string;
  previewLandingId?: string;
}) {
  const [activeSlug, setActiveSlug] = useState<string | null>(() => {
    if (!initialCaseSlug) return null;
    return findSignalCaseBySlug(cases, initialCaseSlug) ? initialCaseSlug : null;
  });
  const triggerRef = useRef<HTMLElement | null>(null);
  const basePath = getBasePath(previewLandingId);

  const activeCase =
    activeSlug ? findSignalCaseBySlug(cases, activeSlug) ?? null : null;

  const syncUrl = useCallback(
    (caseSlug: string | null) => {
      const nextPath = caseSlug
        ? `${basePath}/casos/${caseSlug}`
        : basePath
          ? `${basePath}/`
          : "/";
      const currentPath = `${window.location.pathname}`.replace(/\/$/, "") || "/";
      const normalizedNext = nextPath.replace(/\/$/, "") || "/";
      if (currentPath === normalizedNext) return;
      window.history.pushState({ signalCase: caseSlug }, "", nextPath);
    },
    [basePath],
  );

  const openCase = useCallback(
    (item: GalleryItem, trigger?: HTMLElement | null) => {
      if (!hasSignalCaseStudy(item) || !item.projectSlug) return;
      triggerRef.current = trigger ?? null;
      setActiveSlug(item.projectSlug);
      syncUrl(item.projectSlug);
    },
    [syncUrl],
  );

  const closeCase = useCallback(() => {
    setActiveSlug(null);
    syncUrl(null);
    requestAnimationFrame(() => {
      triggerRef.current?.focus();
      triggerRef.current = null;
    });
  }, [syncUrl]);

  const goToContact = useCallback(() => {
    closeCase();
    requestAnimationFrame(() => {
      const target = document.getElementById("contacto");
      target?.scrollIntoView({ behavior: "smooth", block: "start" });
      window.history.replaceState(null, "", `${basePath}/#contacto`);
    });
  }, [basePath, closeCase]);

  useEffect(() => {
    const handlePopState = () => {
      const match = window.location.pathname.match(/\/casos\/([^/]+)\/?$/);
      if (match?.[1]) {
        setActiveSlug(
          findSignalCaseBySlug(cases, match[1]) ? match[1] : null,
        );
        return;
      }
      setActiveSlug(null);
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [cases]);

  useEffect(() => {
    if (!activeCase) return;
    const previousOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = previousOverflow;
    };
  }, [activeCase]);

  useEffect(() => {
    if (!activeCase) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      event.preventDefault();
      closeCase();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeCase, closeCase]);

  return {
    activeCase,
    closeCase,
    getCaseHref: (item: GalleryItem) =>
      item.projectSlug
        ? getSignalCaseHref({
            previewLandingId,
            projectSlug: item.projectSlug,
          })
        : null,
    goToContact,
    openCase,
  };
}
