import { SocialPlatformIcon } from "@/components/templates/shared/social-platform-icon";
import { NUVOLETS_COPY as copy } from "@/lib/nuvolets-copy";
import type { HeroVariantId, LandingContent } from "@/lib/dashboard-data";
import type { NuvoletsContent } from "@/lib/schemas/nuvolets";
import { HeroRenderer } from "@/components/templates/shared/heroes/hero-renderer";
import { NuvoletsCategoryCard } from "./nuvolets-category-card";
import { NuvoletsProductCard } from "./nuvolets-product-card";
import { NuvoletsFavorites } from "./nuvolets-favorites";
import { NuvoletsEditorial } from "./nuvolets-editorial";
import { NuvoletsStore } from "./nuvolets-store";
import { NuvoletsInstagramCard } from "./nuvolets-instagram-card";
import { NuvoletsMarqueeItem } from "./nuvolets-marquee-item";
import { NuvoletsLink } from "./nuvolets-link";
import { NuvoletsNewsletter } from "./nuvolets-newsletter";

export function NuvoletsSection({ anchor, content, config, slug, preview, heroVariant }: { anchor: string; content: LandingContent; config: NuvoletsContent; slug?: string; preview: boolean; heroVariant: HeroVariantId }) {
  return (
    <div id={anchor} data-section={anchor} className="scroll-mt-24">
      {anchor === "hero" ? <HeroRenderer variantId={heroVariant} content={content} primaryCtaHref={config.heroDetails.primaryHref} secondaryCtaHref={config.heroDetails.secondaryHref} /> : null}
      {anchor === "franja" ? <div className="nuvolets-marquee-container overflow-hidden border-y border-nuvolets-border bg-nuvolets-surface py-4 md:py-5"><div className="nuvolets-marquee flex w-max"><ul className="flex shrink-0 items-center gap-8 pr-8 md:gap-12 md:pr-12">{config.marquee.map((item, index) => <NuvoletsMarqueeItem key={item.id} text={item.text} index={index} />)}</ul><ul aria-hidden className="flex shrink-0 items-center gap-8 pr-8 md:gap-12 md:pr-12">{config.marquee.map((item, index) => <NuvoletsMarqueeItem key={item.id} text={item.text} index={index} />)}</ul></div></div> : null}
      {anchor === "categorias" ? <section aria-label={copy.categories} className="mx-auto max-w-7xl px-5 pb-20 pt-16 md:px-8 md:pb-28 md:pt-24"><div className="nuvolets-snap -mx-5 flex gap-5 overflow-x-auto px-5 md:mx-0 md:grid md:grid-cols-3 md:gap-8 md:px-0">{config.categories.map((category, index) => <NuvoletsCategoryCard key={category.id} category={category} index={index} />)}</div></section> : null}
      {anchor === "coleccion" ? <section className="mx-auto max-w-7xl px-5 pb-20 md:px-8 md:pb-28"><div className="nuvolets-reveal mb-10 max-w-xl"><h2 className="nuvolets-title mb-3 whitespace-pre-line text-site-title">{config.collection.title}</h2><p className="text-site-content opacity-75">{config.collection.subtitle}</p></div><div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 md:gap-x-6 lg:grid-cols-4">{config.products.slice(0, 4).map((product, index) => <NuvoletsProductCard key={product.id} product={product} index={index} />)}</div><p className="nuvolets-reveal mt-12 text-center text-site-content opacity-80">{config.collection.note} <NuvoletsLink href={config.collection.href} className="nuvolets-link">{config.collection.linkLabel}</NuvoletsLink>.</p></section> : null}
      {anchor === "historia" ? <NuvoletsEditorial config={config.story} /> : null}
      {anchor === "favoritos" ? <NuvoletsFavorites config={config.favorites} products={config.favorites.productIds.flatMap((id) => { const product = config.products.find((item) => item.id === id); return product ? [product] : []; })} /> : null}
      {anchor === "tienda" ? <NuvoletsStore config={config.store} /> : null}
      {anchor === "instagram" ? <section className="mx-auto max-w-7xl px-5 pb-20 md:px-8 md:pb-28"><div className="nuvolets-reveal mb-10 text-center"><h2 className="nuvolets-title mb-3 text-site-title">{config.instagram.title}</h2><p className="text-site-content opacity-75">{config.instagram.text}</p></div><div className="mb-10 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-6">{config.instagram.images.map((item, index) => <NuvoletsInstagramCard key={item.id} item={item} index={index} />)}</div><div className="text-center"><NuvoletsLink href={config.instagram.url} className="nuvolets-button nuvolets-button-ghost gap-2"><SocialPlatformIcon platform="instagram" className="size-[18px] shrink-0" />{config.instagram.buttonLabel}</NuvoletsLink></div></section> : null}
      {anchor === "newsletter" ? <NuvoletsNewsletter config={config.newsletter} slug={slug ?? ""} preview={preview} /> : null}
    </div>
  );
}
