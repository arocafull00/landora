import type { NuvoletsProduct } from "@/lib/schemas/nuvolets";

export function NuvoletsProductSummary({ product }: { product: NuvoletsProduct }) {
  return <li className="flex justify-between gap-4 border-b border-border-subtle py-3 text-ink"><span>{product.name}</span><span className="text-ink-secondary">{product.price}</span></li>;
}
