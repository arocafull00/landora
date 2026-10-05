"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AssetImage } from "@/components/ui/asset-image";
import type { ProductDto } from "@/lib/domain/dtos";
import { formatProductPrice, productMinPrice, PRODUCT_STATUS_LABELS } from "@/lib/products";
import { useProductCommand } from "../hooks/use-product-command";

const COPY = { edit: "Editar", duplicate: "Duplicar", publish: "Publicar", unpublish: "Retirar", archive: "Archivar", restore: "Restaurar", pending: "Stock pendiente" } as const;
export function ProductListItem({ product }: { product: ProductDto }) {
  const { pending, command } = useProductCommand(product.landingId);
  const stock = product.variants.some((variant) => variant.stock === null) ? COPY.pending : `${product.variants.reduce((sum, variant) => sum + (variant.stock ?? 0), 0)} uds.`;
  return <article className="flex flex-wrap items-center gap-4 border-b border-border p-4">
    <Link href={`/products/${product.id}`} className="flex min-w-0 flex-1 items-center gap-4">
      {product.images[0] ? <div className="relative h-20 w-16 shrink-0 overflow-hidden rounded-lg"><AssetImage src={product.images[0].url} alt={product.images[0].alt || product.title} fill sizes="64px" className="object-cover" /></div> : null}
      <div><h2 className="font-semibold">{product.title}</h2><p className="text-sm text-on-surface-variant">{product.category} {product.brand}</p><p className="text-sm">{product.priceCents === null ? formatProductPrice(null) : formatProductPrice(productMinPrice(product))} · {stock}</p></div>
    </Link>
    <span className="rounded-full bg-surface-container px-3 py-1 text-xs">{PRODUCT_STATUS_LABELS[product.status]}</span>
    <div className="flex flex-wrap gap-2">
      <Button asChild size="sm" variant="outline"><Link href={`/products/${product.id}`}>{COPY.edit}</Link></Button>
      <Button size="sm" variant="outline" disabled={pending} onClick={() => command(product, "duplicate")}>{COPY.duplicate}</Button>
      {product.status === "archived" ? <Button size="sm" disabled={pending} onClick={() => command(product, "restore")}>{COPY.restore}</Button> : <>
        <Button size="sm" variant="outline" disabled={pending} onClick={() => command(product, product.status === "published" ? "unpublish" : "publish")}>{product.status === "published" ? COPY.unpublish : COPY.publish}</Button>
        <Button size="sm" variant="outline" disabled={pending} onClick={() => command(product, "archive")}>{COPY.archive}</Button>
      </>}
    </div>
  </article>;
}
