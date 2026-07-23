"use client";

import type { ReactNode } from "react";
import { PreviewBridgeContext } from "@/components/dashboard/preview-bridge-context";
import { usePreviewBridgeProvider } from "@/components/dashboard/hooks/use-preview-bridge-provider";

export function PreviewBridgeProvider({
  children,
  landingId,
}: {
  children: ReactNode;
  landingId: string;
}) {
  const value = usePreviewBridgeProvider(landingId);

  return (
    <PreviewBridgeContext.Provider value={value}>
      {children}
    </PreviewBridgeContext.Provider>
  );
}
