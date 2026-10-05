import type { CSSProperties } from "react";
import type { NuvoletsProduct } from "@/lib/schemas/nuvolets";

export function NuvoletsProductColor({ tone, index }: { tone: NonNullable<NuvoletsProduct["tone"]>; index: number }) {
  return <i aria-hidden="true" data-tone={tone} className="nuvolets-dot h-3.5 w-3.5 rounded-full border border-nuvolets-border" style={{ "--j": index } as CSSProperties} />;
}
