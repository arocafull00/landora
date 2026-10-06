import "server-only";
import { cacheLife, cacheTag } from "next/cache";
import { getCatalogConfig, getProductBySlug, getRelatedProducts } from "@/data/products";

export async function getPublicCatalogConfig(landingId: string) {
  "use cache";

  cacheLife("minutes");
  cacheTag(`catalog:${landingId}`);

  return getCatalogConfig(landingId);
}

export async function getPublicProductBySlug(landingId: string, slug: string) {
  "use cache";

  cacheLife("minutes");
  cacheTag(`catalog:${landingId}`);

  return getProductBySlug(landingId, slug, false);
}

export async function getPublicRelatedProducts(landingId: string, productId: string, category: string) {
  "use cache";

  cacheLife("minutes");
  cacheTag(`catalog:${landingId}`);

  return getRelatedProducts(landingId, productId, category, false);
}
