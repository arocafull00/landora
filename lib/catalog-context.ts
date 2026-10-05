import "server-only";
import { cache } from "react";
import { getPublishedLandingBySlug } from "@/data/landing-publications";
import { getPreviewLanding } from "@/lib/api/landing-auth";
import { requireProductsAccess } from "@/lib/require-products-access";
import { hasProductsAccess } from "@/data/product-access";
import { getCatalogConfig } from "@/data/products";
import { toLandingContent } from "@/lib/landing-mapper";
import { catalogRouteSchema } from "@/lib/schemas/products";
import { resourceIdSchema } from "@/lib/schemas/api";

export const getPublicCatalog = cache(async (slug: string) => {
  if (!catalogRouteSchema.safeParse({ slug }).success) return null;
  const landing = await getPublishedLandingBySlug(slug);
  if (!landing || !await hasProductsAccess(landing.userId)) return null;
  const config = await getCatalogConfig(landing.id);
  return config.enabled ? { landing, config } : null;
});

export const getPreviewCatalog = cache(async (id: string) => {
  if (!resourceIdSchema.safeParse(id).success || !await requireProductsAccess(id)) return null;
  const [landing, config] = await Promise.all([getPreviewLanding(id), getCatalogConfig(id)]);
  return { landing: { ...landing, content: toLandingContent(landing) }, config };
});
