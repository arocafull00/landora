import { getRelatedProducts } from "@/data/products";
import { getPublicRelatedProducts } from "@/data/public-products";
import { RelatedProducts } from "./related-products";

export async function RelatedProductsContent({ landingId, productId, category, preview, basePath }: { landingId: string; productId: string; category: string; preview: boolean; basePath: string }) {
  const products = preview
    ? await getRelatedProducts(landingId, productId, category, true)
    : await getPublicRelatedProducts(landingId, productId, category);

  return <RelatedProducts products={products} basePath={basePath} />;
}
