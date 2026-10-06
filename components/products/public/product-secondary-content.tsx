import { Suspense } from "react";
import type { PublicProductDto } from "@/lib/domain/dtos";
import type { CatalogStore } from "@/lib/catalog-presentation";
import { RelatedProductsContent } from "./related-products-content";
import { StoreVisit } from "./store-visit";

export async function ProductSecondaryContent({ productPromise, landingId, store, preview, catalogHref }: { productPromise: Promise<PublicProductDto | null>; landingId: string; store: CatalogStore | null; preview: boolean; catalogHref: string }) {
  const product = await productPromise;
  if (!product) return null;

  return (
    <>
      {store ? <StoreVisit store={store} /> : null}
      <Suspense fallback={null}>
        <RelatedProductsContent landingId={landingId} productId={product.id} category={product.category} preview={preview} basePath={catalogHref} />
      </Suspense>
    </>
  );
}
