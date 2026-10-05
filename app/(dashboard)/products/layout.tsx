import { getEffectiveClientId } from "@/lib/auth";
import { hasProductsAccess } from "@/data/product-access";
import { PRODUCTS_COPY } from "@/lib/products";

export default async function ProductsLayout({ children }: { children: React.ReactNode }) {
  const userId = await getEffectiveClientId();
  if (!userId || !await hasProductsAccess(userId)) return <div className="flex-1 overflow-auto"><a href="#products-main" className="sr-only focus:not-sr-only">{PRODUCTS_COPY.skip}</a><main id="products-main" className="p-8"><h1 className="text-2xl font-semibold">{PRODUCTS_COPY.title}</h1><p className="mt-4">{PRODUCTS_COPY.disabled}</p></main></div>;
  return <div className="min-w-0 flex-1 overflow-y-auto"><a href="#products-main" className="sr-only focus:not-sr-only">{PRODUCTS_COPY.skip}</a>{children}</div>;
}
