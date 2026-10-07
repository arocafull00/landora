import type { LandingContent } from "@/lib/dashboard-data";
import { getVisibleNav } from "@/lib/template-sections";
import { AssetImage } from "@/components/ui/asset-image";
import { RistoranteButton } from "@/components/templates/ristorante/ristorante-button";
import { RistoranteNavItem } from "@/components/templates/ristorante/ristorante-nav-item";

export function RistoranteNav({ content, topOffset, ctaHref }: { content: LandingContent; topOffset: number; ctaHref: string }) {
  const links = getVisibleNav(content.nav, content.hiddenSections, "ristorante").filter((item) => !(content.hiddenSections?.includes("nosotros") && item.href === "#galeria"));
  return (
    <nav className="ristorante-nav fixed inset-x-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-300" style={{ top: topOffset }}>
      <div className="mx-auto flex max-w-[1600px] items-center justify-between px-5 py-4 md:px-8 lg:px-12">
        <a href="#inicio" className="font-ristorante-display text-xl tracking-[-.04em] md:text-2xl">
          {content.brandLogoType === "image" && content.brandLogoImage ? <span className="relative block h-9 w-32"><AssetImage src={content.brandLogoImage} alt={content.brand} fill sizes="128px" className="object-contain" /></span> : content.brand}
        </a>
        <div className="hidden items-center gap-7 text-[12px] font-bold tracking-[.16em] md:flex">{links.map((item) => <RistoranteNavItem key={item.id} item={item} />)}</div>
        <RistoranteButton href={ctaHref} className="px-5 py-3 font-bold hover:-translate-y-0.5">{content.hero.ctaLabel}</RistoranteButton>
      </div>
    </nav>
  );
}
