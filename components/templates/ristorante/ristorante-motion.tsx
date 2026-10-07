"use client";

import type { CSSProperties, ReactNode } from "react";
import { useRistoranteMotion } from "@/components/templates/ristorante/hooks/use-ristorante-motion";

export function RistoranteMotion({ children, topOffset }: { children: ReactNode; topOffset: number }) {
  const rootRef = useRistoranteMotion(topOffset);
  return <div ref={rootRef} className="ristorante relative overflow-x-clip bg-ristorante-cream font-ristorante-body text-ristorante-olive antialiased" style={{ "--ristorante-offset": `${topOffset}px` } as CSSProperties}>{children}</div>;
}
