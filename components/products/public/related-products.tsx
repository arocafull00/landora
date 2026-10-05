import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { PublicProductDto } from "@/lib/domain/dtos";
import { RelatedProductCard } from "./related-product-card";

const COPY = { eyebrow: "Más productos", title: "También te pueden gustar", all: "Ver catálogo" } as const;

export function RelatedProducts({ products, basePath }: { products: PublicProductDto[]; basePath: string }) {
  if (!products.length) return null;
  return (
    <section className="px-5 py-20 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-ink/45">{COPY.eyebrow}</p>
            <h2 className="mt-3 font-headline text-4xl font-normal">{COPY.title}</h2>
          </div>
          <Link href={basePath} className="hidden items-center gap-2 text-sm font-semibold underline decoration-border underline-offset-4 sm:inline-flex">
            {COPY.all}
            <ArrowRight aria-hidden className="size-4" />
          </Link>
        </div>
        <ul className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3">
          {products.map((product, index) => (
            <RelatedProductCard key={product.id} product={product} href={`${basePath}/${product.slug}`} index={index} />
          ))}
        </ul>
      </div>
    </section>
  );
}
