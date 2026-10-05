import type { NuvoletsProduct } from "@/lib/schemas/nuvolets";
import { NUVOLETS_DEFAULT_CONFIG } from "@/lib/nuvolets-defaults";

export function getNuvoletsProductAppearance(product: NuvoletsProduct) {
  const original = NUVOLETS_DEFAULT_CONFIG.products.find((item) => item.image.split("?")[0] === product.image.split("?")[0]);
  return {
    badge: product.badge ?? original?.badge ?? "",
    tone: product.tone ?? original?.tone ?? "blue",
    colors: product.colors ?? original?.colors ?? [],
  };
}
