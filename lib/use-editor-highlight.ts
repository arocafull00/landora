"use client";

import { useEffect, useState } from "react";
import { isPreviewHighlightSectionMessage } from "@/lib/preview-messaging";

export function useEditorHighlight(sectionId: string) {
  const [isHighlighted, setIsHighlighted] = useState(false);

  useEffect(() => {
    const handler = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return;
      if (!isPreviewHighlightSectionMessage(event.data)) return;
      setIsHighlighted(event.data.sectionId === sectionId);
    };

    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, [sectionId]);

  return isHighlighted;
}
