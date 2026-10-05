import type { LandingContent } from "@/lib/dashboard-data";
import type { NuvoletsProduct } from "@/lib/schemas/nuvolets";
import type { CSSProperties } from "react";

export type CatalogPresentation = { enabled: boolean; adopted: boolean; href: string; products: NuvoletsProduct[]; favoriteIds: string[] };

export function getCatalogBrandStyle(content: LandingContent): CSSProperties | undefined {
  const colors = content.nuvolets?.colors;
  if (!colors?.enabled) return undefined;
  return { "--site-surface": colors.background, "--site-surface-alt": colors.surface, "--surface": colors.surface, "--site-text": colors.text, "--site-text-muted": colors.text, "--site-border": colors.border, "--site-primary": colors.blue, "--site-primary-hover": colors.blue, "--site-on-primary": colors.text } as CSSProperties;
}

export function applyCatalogPresentation(content: LandingContent, catalog: CatalogPresentation): LandingContent {
  const nav = content.nav.filter((item) => !/^\/(?:preview\/[^/]+\/)?productos(?:[/?#]|$)/.test(item.href));
  if (catalog.enabled) nav.push({ id: "store-catalog", label: "Productos", href: catalog.href });
  if (!content.nuvolets || !catalog.adopted) return { ...content, nav };
  const products = catalog.enabled ? catalog.products : [];
  return { ...content, nav, nuvolets: { ...content.nuvolets, products, favorites: { ...content.nuvolets.favorites, productIds: catalog.enabled ? catalog.favoriteIds : [] } } };
}
