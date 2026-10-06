import { notFound } from "next/navigation";
import type { PublicProductDto } from "@/lib/domain/dtos";
import { ProductDetail } from "./product-detail";

export async function ProductDetailContent({ productPromise, phone, siteUrl, catalogHref, preview, hasStore }: { productPromise: Promise<PublicProductDto | null>; phone: string; siteUrl: string; catalogHref: string; preview: boolean; hasStore: boolean }) {
  const product = await productPromise;
  if (!product) notFound();

  return <ProductDetail product={product} phone={phone} publicUrl={`${siteUrl}/productos/${product.slug}`} catalogHref={catalogHref} preview={preview} hasStore={hasStore} />;
}
