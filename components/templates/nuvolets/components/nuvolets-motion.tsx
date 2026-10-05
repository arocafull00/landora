"use client";

import { useNuvoletsMotion } from "../hooks/use-nuvolets-motion";

export function NuvoletsMotion({ enabled }: { enabled: boolean }) {
  const ref = useNuvoletsMotion(enabled);
  return <span ref={ref} hidden />;
}
