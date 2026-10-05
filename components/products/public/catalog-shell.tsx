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
    <header className="border-b border-border bg-surface"><div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 py-5 md:px-8"><Link href={homeHref} className="font-headline text-2xl font-semibold">{content.brandLogoType === "image" && content.brandLogoImage ? <span className="relative block h-12 w-36"><AssetImage src={content.brandLogoImage} alt={brand} fill sizes="140px" className="object-contain" /></span> : brand}</Link><nav aria-label={COPY.navigation} className="flex gap-5 text-sm"><Link href={homeHref}>{COPY.home}</Link><Link href={catalogHref} className="font-semibold text-primary">{COPY.products}</Link></nav></div></header>
    <main id="catalog-main" className="mx-auto max-w-7xl px-5 py-10 md:px-8 md:py-16">{children}</main>
    <footer className="border-t border-border px-5 py-8 text-center text-sm text-ink-muted">{brand}</footer>
  </SiteThemeScope>;
}
