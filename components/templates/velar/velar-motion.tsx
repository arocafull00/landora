"use client";

import type { ReactNode } from "react";
import { useVelarMotion } from "@/components/templates/velar/hooks/use-velar-motion";
import "aos/dist/aos.css";

export function VelarMotion({ children }: { children: ReactNode }) {
  const rootRef = useVelarMotion();

  return (
    <div
      className="relative overflow-x-clip bg-[var(--site-surface)]"
      ref={rootRef}
    >
      {children}
    </div>
  );
}
