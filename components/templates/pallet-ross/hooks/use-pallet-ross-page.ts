"use client";

import { useRef } from "react";
import { useScrollCards } from "@/components/templates/pallet-ross/hooks/use-scroll-cards";
import { useViewportSize } from "@/components/templates/pallet-ross/hooks/use-viewport-size";

export function usePalletRossPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewport = useViewportSize();
  const scrollCards = useScrollCards(containerRef);

  return {
    containerRef,
    viewport,
    ...scrollCards,
  };
}
