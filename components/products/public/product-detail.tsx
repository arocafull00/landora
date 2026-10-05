"use client";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { PublicProductDto } from "@/lib/domain/dtos";
import { usePublicProduct } from "../hooks/use-public-product";
import { ProductGallery } from "./product-gallery";
import { ProductHeading } from "./product-heading";
import { ProductPrice } from "./product-price";
import { VariantPicker } from "./variant-picker";
import { ProductActions } from "./product-actions";
import { ProductNotes } from "./product-notes";

const COPY = { back: "Volver al catálogo", preview: "Vista previa del producto", featured: "Destacado" } as const;

export function ProductDetail({ product, phone, publicUrl, catalogHref, preview, hasStore }: { product: PublicProductDto; phone: string; publicUrl: string; catalogHref: string; preview: boolean; hasStore: boolean }) {
  const view = usePublicProduct(product, phone, publicUrl);
  return (
    <>
      <div className="mx-auto max-w-7xl px-5 pt-8 md:px-8">
        <Link href={catalogHref} className="inline-flex items-center gap-2 text-sm text-ink/55 transition-colors hover:text-ink">
          <ArrowLeft aria-hidden className="size-4" />
          {COPY.back}
        </Link>
        {preview ? <p className="mt-3 text-sm text-warning">{COPY.preview}</p> : null}
      </div>
      <section className="px-5 pb-20 pt-8 md:px-8 lg:pb-28">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.08fr_.92fr] lg:gap-16">
          <ProductGallery images={product.images} title={product.title} activeIndex={view.imageIndex} badge={product.featured ? COPY.featured : null} onSelect={view.setImageIndex} />
          <div className="flex flex-col justify-center lg:py-6">
            <ProductHeading eyebrow={view.eyebrow} titleLead={view.titleLead} titleAccent={view.titleAccent} subtitle={product.subtitle} tags={view.tags} />
            <ProductPrice price={view.price} previousPrice={view.previousPrice} discounted={view.discounted} available={view.available} />
            <VariantPicker variants={product.variants} variantId={view.variantId} size={view.size} color={view.color} onSelect={view.setVariantId} />
            <ProductActions whatsappHref={view.whatsappHref} hasStore={hasStore} />
            <ProductNotes description={product.description} characteristics={view.characteristics} />
          </div>
        </div>
      </section>
    </>
  );
}
