import Link from "next/link";
import type { PublicProductDto } from "@/lib/domain/dtos";
import { AssetImage } from "@/components/ui/asset-image";
import { formatProductPrice, productMinPrice } from "@/lib/products";

const COPY = { from: "Desde", available: "Disponible", out: "Agotado" } as const;
export function PublicProductCard({ product, basePath, selectedSize }: { product: PublicProductDto; basePath: string; selectedSize: string }) {
  const variants = selectedSize ? product.variants.filter((variant) => variant.size === selectedSize) : product.variants;
  const varied = new Set(variants.map((variant) => variant.priceCents ?? product.priceCents)).size > 1;
  return <Link href={`${basePath}/${product.slug}`} className="group overflow-hidden rounded-xl border border-border bg-surface transition-[box-shadow,transform] hover:shadow-md motion-safe:hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-primary">
    {product.images[0] ? <div className="relative aspect-[4/5] overflow-hidden"><AssetImage src={product.images[0].url} alt={product.images[0].alt || product.title} fill sizes="(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw" className="object-cover" /></div> : null}
    <div className="space-y-2 p-4"><p className="text-xs text-ink-muted">{[product.category, product.brand].filter(Boolean).join(" · ")}</p><h2 className="font-headline text-xl font-semibold">{product.title}</h2>{product.subtitle ? <p className="text-sm text-ink-secondary">{product.subtitle}</p> : null}<p className="font-semibold">{varied ? `${COPY.from} ` : ""}{product.priceCents === null ? formatProductPrice(null) : formatProductPrice(productMinPrice({ ...product, variants }))}</p><p className="text-sm text-ink-muted">{variants.some((variant) => variant.available) ? COPY.available : COPY.out}</p></div>
  </Link>;
}
