import Link from "next/link";
import { getEffectiveClientId } from "@/lib/auth";
import { getLandingPageByUserId } from "@/data/landing-pages";
import { requireProductsAccess } from "@/lib/require-products-access";
import { getProductPage } from "@/data/products";
import { getAssetsByUserId } from "@/data/assets";
import { catalogQuerySchema } from "@/lib/schemas/products";
import { PRODUCTS_COPY } from "@/lib/products";
import { toAssetDto } from "@/lib/domain/mappers";
import { AssetsStoreProvider } from "@/stores/assets-store";
import { ProductsListClient } from "@/components/products/products-list.client";

export default async function ProductsPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const userId = await getEffectiveClientId();
  if (!userId) return null;
  const landing = await getLandingPageByUserId(userId);
  if (!landing || !await requireProductsAccess(landing.id)) return null;
  const parsed = catalogQuerySchema.safeParse(await searchParams);
  if (!parsed.success) {
    return (
      <main id="products-main" className="p-8">
        <p>{PRODUCTS_COPY.invalidFilters}</p>
        <Link href="/products">{PRODUCTS_COPY.resetFilters}</Link>
      </main>
    );
  }
  const [page, assets] = await Promise.all([
    getProductPage(landing.id, parsed.data, false),
    getAssetsByUserId(userId),
  ]);
  return (
    <div className="min-h-full bg-page">
      <main id="products-main" className="mx-auto max-w-[1280px] space-y-7 px-4 py-6 md:px-8 md:py-8">
        <AssetsStoreProvider initialRows={assets.map(toAssetDto)}>
          <ProductsListClient
            landingId={landing.id}
            query={parsed.data}
            products={page.products}
            categories={page.categories}
            brands={page.brands}
            sizes={page.sizes}
            total={page.total}
            page={page.page}
          />
        </AssetsStoreProvider>
      </main>
    </div>
  );
}
