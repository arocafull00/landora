import { notFound } from "next/navigation";
import { getEffectiveClientId } from "@/lib/auth";
import { getLandingPageByUserId } from "@/data/landing-pages";
import { getAssetsByUserId } from "@/data/assets";
import { getProductById, getProductPage } from "@/data/products";
import { requireProductsAccess } from "@/lib/require-products-access";
import { resourceIdSchema } from "@/lib/schemas/api";
import { catalogQuerySchema } from "@/lib/schemas/products";
import { AssetsStoreProvider } from "@/stores/assets-store";
import { toAssetDto } from "@/lib/domain/mappers";
import { ProductEditor } from "./page.client";

export async function ProductEditorPage({ productId }: { productId: string | null }) {
  if (productId && !resourceIdSchema.safeParse(productId).success) notFound();
  const userId = await getEffectiveClientId();
  if (!userId) return null;
  const landing = await getLandingPageByUserId(userId);
  if (!landing || !await requireProductsAccess(landing.id)) return null;
  const [product, page, assets] = await Promise.all([productId ? getProductById(landing.id, productId) : null, getProductPage(landing.id, catalogQuerySchema.parse({}), false), getAssetsByUserId(userId)]);
  if (productId && !product) notFound();
  return <AssetsStoreProvider initialRows={assets.map(toAssetDto)}><ProductEditor key={`${product?.id ?? "new"}:${product?.version ?? 0}`} landingId={landing.id} product={product} categories={page.categories} brands={page.brands} /></AssetsStoreProvider>;
}
