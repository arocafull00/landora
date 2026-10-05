import type { LandingContent } from "@/lib/dashboard-data";
import type { NuvoletsProduct } from "@/lib/schemas/nuvolets";
import type { CSSProperties } from "react";
import { syncCompanyContent } from "@/lib/company-details";

export type CatalogPresentation = { enabled: boolean; href: string; products: NuvoletsProduct[]; favoriteIds: string[] };

export type CatalogStore = { eyebrow: string; title: string; text: string; image: string; alt: string; primaryLabel: string; primaryHref: string; secondaryLabel: string; secondaryHref: string };

const STORE_COPY = { eyebrow: "Visítanos", title: "Ven a verlo, tocarlo y probarlo en tienda", directions: "Cómo llegar" } as const;

export function getCatalogStore(content: LandingContent): CatalogStore | null {
  const store = syncCompanyContent(content).nuvolets?.store;
  if (store) return { eyebrow: store.eyebrow, title: store.title, text: store.text, image: store.image, alt: store.alt, primaryLabel: store.ctaLabel, primaryHref: store.mapsUrl, secondaryLabel: store.secondaryLabel, secondaryHref: store.secondaryHref };
  const address = content.contact.address.trim();
  if (!address) return null;
  return { eyebrow: STORE_COPY.eyebrow, title: STORE_COPY.title, text: address, image: content.hero.image, alt: content.brand, primaryLabel: STORE_COPY.directions, primaryHref: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`, secondaryLabel: "", secondaryHref: "" };
}

export function getCatalogBrandStyle(content: LandingContent): CSSProperties | undefined {
  const colors = content.nuvolets?.colors;
  if (!colors?.enabled) return undefined;
  return { "--site-surface": colors.background, "--site-surface-alt": colors.surface, "--surface": colors.surface, "--site-text": colors.text, "--site-text-muted": colors.text, "--site-border": colors.border, "--site-primary": colors.blue, "--site-primary-hover": colors.blue, "--site-on-primary": colors.text } as CSSProperties;
}

export function applyCatalogPresentation(content: LandingContent, catalog: CatalogPresentation): LandingContent {
  const nav = content.nav.filter((item) => !/^\/(?:preview\/[^/]+\/)?productos(?:[/?#]|$)/.test(item.href));
  if (catalog.enabled) nav.push({ id: "store-catalog", label: "Productos", href: catalog.href });
  if (!content.nuvolets) return { ...content, nav };
  const products = catalog.enabled ? catalog.products : [];
  return { ...content, nav, nuvolets: { ...content.nuvolets, products, favorites: { ...content.nuvolets.favorites, productIds: catalog.enabled ? catalog.favoriteIds : [] } } };
}
