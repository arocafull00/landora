"use client";

import { useContext } from "react";
import { PreviewBridgeContext } from "@/components/dashboard/preview-bridge-context";

export function usePreviewBridge() {
  return useContext(PreviewBridgeContext);
}
