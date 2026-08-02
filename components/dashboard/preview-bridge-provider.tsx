"use client";

import { useEffect, type ReactNode } from "react";
import { PreviewBridgeContext } from "@/components/dashboard/preview-bridge-context";
import { usePreviewBridgeProvider } from "@/components/dashboard/hooks/use-preview-bridge-provider";
import { parsePreviewTarget } from "@/lib/preview-target-attributes";

export function PreviewBridgeProvider({
  children,
  landingId,
}: {
  children: ReactNode;
  landingId: string;
}) {
  const value = usePreviewBridgeProvider(landingId);
  const announcePageTarget = value.announcePageTarget;

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const source = event.target;
      if (!(source instanceof Element)) return;
      const targetElement = source.closest<HTMLElement>(
        "[data-preview-page-target]",
      );
      if (!targetElement) return;

      const target = parsePreviewTarget(targetElement);
      if (target) announcePageTarget(target);
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [announcePageTarget]);

  return (
    <PreviewBridgeContext.Provider value={value}>
      {children}
    </PreviewBridgeContext.Provider>
  );
}
