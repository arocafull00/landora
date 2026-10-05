import "server-only";
import { cache } from "react";
import { getCatalogConfig, getCatalogHighlights } from "@/data/products";
import { hasProductsAccess } from "@/data/product-access";
import { formatProductPrice } from "@/lib/products";
import { getPreviewLandingPath } from "@/lib/public-site-url";
import type { CatalogPresentation } from "@/lib/catalog-presentation";

export const getCatalogPresentation = cache(async (landingId: string, userId: string, preview: boolean): Promise<CatalogPresentation> => {
  const [access, config] = await Promise.all([hasProductsAccess(userId), getCatalogConfig(landingId)]);
  const enabled = access && (preview || config.enabled);
  const href = preview ? getPreviewLandingPath(landingId, "/productos") : "/productos";
  const rows = enabled ? await getCatalogHighlights(landingId, preview) : [];
  return { enabled, href,
    products: rows.map(({ product, legacyId, appearance }) => ({ ...appearance, id: legacyId ?? product.id, name: product.title, price: formatProductPrice(product.priceCents), image: product.images[0]?.url ?? "", alt: product.images[0]?.alt ?? product.title, href: `${href}/${product.slug}` })),
    favoriteIds: rows.toSorted((a, b) => a.favoriteOrder - b.favoriteOrder).flatMap((row) => row.featured ? [row.legacyId ?? row.product.id] : []),
  };
});
