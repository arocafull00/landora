"use client";

import { NUVOLETS_COPY as copy } from "@/lib/nuvolets-copy";
import type { NuvoletsContent } from "@/lib/schemas/nuvolets";
import { AssetImage } from "@/components/ui/asset-image";
import { useNuvoletsMascot } from "../hooks/use-nuvolets-mascot";
import { NuvoletsCloud } from "./nuvolets-cloud";

export function NuvoletsMascot({ config }: { config: NuvoletsContent["mascot"] }) {
  const { message, next } = useNuvoletsMascot(config);
  if (!config.enabled) return null;
  return (
    <button type="button" onClick={next} aria-label={`${copy.talk} ${config.name}`} className="absolute bottom-0 right-5 z-20 w-28 text-left md:-bottom-8 md:-left-10 md:right-auto md:w-40">
      <span aria-live="polite" className="absolute bottom-full right-0 mb-1 w-44 rounded-2xl border border-nuvolets-border bg-nuvolets-surface px-3 py-2 text-xs leading-snug md:left-5 md:right-auto">{message}</span>
      {config.image ? <span className="relative block aspect-[12/7]"><AssetImage src={config.image} alt={config.alt} fill sizes="160px" className="object-contain" /></span> : <NuvoletsCloud face className="nuvolets-bob text-nuvolets-surface" />}
    </button>
  );
}
