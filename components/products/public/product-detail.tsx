"use client";
import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { AssetImage } from "@/components/ui/asset-image";
import type { PublicProductDto } from "@/lib/domain/dtos";
import { formatProductPrice } from "@/lib/products";
import { usePublicProduct } from "../hooks/use-public-product";
import { OptionsSelect } from "../components/options-select";
import { GalleryThumbnail } from "./gallery-thumbnail";
import { CharacteristicRow } from "./characteristic-row";

const COPY = { back: "Volver al catálogo", variant: "Talla y color", available: "Disponible", out: "Agotado", consult: "Consultar por WhatsApp", description: "Descripción", characteristics: "Características", preview: "Vista previa del producto" } as const;
export function ProductDetail({ product, phone, publicUrl, catalogHref, preview }: { product: PublicProductDto; phone: string; publicUrl: string; catalogHref: string; preview: boolean }) {
  const view = usePublicProduct(product, phone, publicUrl);
  const image = product.images[view.imageIndex] ?? product.images[0];
  return <div><Link href={catalogHref} className="text-sm underline">{COPY.back}</Link>{preview ? <p className="mt-3 text-warning">{COPY.preview}</p> : null}<div className="mt-8 grid gap-10 lg:grid-cols-2">
    <div className="space-y-4">{image ? <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-surface"><AssetImage src={image.url} alt={image.alt || product.title} fill sizes="(min-width:1024px) 50vw, 100vw" className="object-contain" /></div> : null}<div className="grid grid-cols-5 gap-3">{product.images.map((image, index) => <GalleryThumbnail key={`${image.url}:${index}`} image={image} index={index} active={view.imageIndex === index} onSelect={() => view.setImageIndex(index)} />)}</div></div>
    <div className="space-y-6"><header><p className="mb-2 text-sm text-ink-muted">{[product.category, product.brand].filter(Boolean).join(" · ")}</p><h1 className="font-headline text-4xl font-semibold">{product.title}</h1>{product.subtitle ? <p className="mt-3 text-xl text-ink-secondary">{product.subtitle}</p> : null}</header><div className="flex items-baseline gap-3"><p className="text-2xl font-semibold">{formatProductPrice(view.price)}</p>{view.previousPrice !== null && view.price !== null && view.previousPrice > view.price ? <del className="text-ink-muted">{formatProductPrice(view.previousPrice)}</del> : null}</div>
      <OptionsSelect label={COPY.variant} value={view.variantId} options={view.options} onChange={view.setVariantId} />
      <p className={view.variant?.available ? "text-success" : "text-ink-muted"}>{view.variant?.available ? COPY.available : COPY.out}</p>
      {view.whatsappHref ? <a href={view.whatsappHref} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 rounded-lg bg-primary px-5 py-3 font-semibold text-on-primary transition-colors hover:bg-primary-hover"><MessageCircle aria-hidden className="size-5" />{COPY.consult}</a> : null}
      {product.description ? <section><h2 className="mb-3 text-lg font-semibold">{COPY.description}</h2><p className="whitespace-pre-line leading-relaxed text-ink-secondary">{product.description}</p></section> : null}
      {view.characteristics.length ? <section><h2 className="text-lg font-semibold">{COPY.characteristics}</h2><dl>{view.characteristics.map((item, index) => <CharacteristicRow key={`${item.name}:${index}`} item={item} />)}</dl></section> : null}
    </div>
  </div></div>;
}
