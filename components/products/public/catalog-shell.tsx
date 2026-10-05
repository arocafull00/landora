import Link from "next/link";
import type { ReactNode } from "react";
import type { LandingContent, TemplateId } from "@/lib/dashboard-data";
import { SiteThemeScope } from "@/components/templates/site-theme-scope";
import { AssetImage } from "@/components/ui/asset-image";
import { getCatalogBrandStyle } from "@/lib/catalog-presentation";

const COPY = { skip: "Saltar al contenido", home: "Inicio", products: "Productos", navigation: "Navegación del catálogo" } as const;
export function CatalogShell({ content, template, siteName, homeHref, catalogHref, children }: { content: LandingContent; template: TemplateId; siteName: string; homeHref: string; catalogHref: string; children: ReactNode }) {
  const brand = content.brand || siteName;
  return <SiteThemeScope appearance={content.appearance} template={template} style={template === "nuvolets" ? getCatalogBrandStyle(content) : undefined} className="min-h-screen bg-canvas font-body text-ink">
    <a href="#catalog-main" className="sr-only focus:not-sr-only focus:block focus:p-4">{COPY.skip}</a>
    <header className="sticky top-0 z-50 border-b border-border/80 bg-canvas/90 backdrop-blur-xl"><div className="mx-auto flex h-[74px] max-w-7xl items-center justify-between gap-6 px-5 md:px-8"><Link href={homeHref} className="font-headline text-3xl">{content.brandLogoType === "image" && content.brandLogoImage ? <span className="relative block h-12 w-36"><AssetImage src={content.brandLogoImage} alt={brand} fill sizes="140px" className="object-contain" /></span> : brand}</Link><nav aria-label={COPY.navigation} className="flex gap-5 text-sm"><Link href={homeHref}>{COPY.home}</Link><Link href={catalogHref} className="font-semibold text-primary">{COPY.products}</Link></nav></div></header>
    <main id="catalog-main">{children}</main>
    <footer className="border-t border-border px-5 py-8 text-center text-sm text-ink-muted">{brand}</footer>
  </SiteThemeScope>;
}
