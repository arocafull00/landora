import Link from "next/link";
import type { ReactNode } from "react";
import type { LandingContent, TemplateId } from "@/lib/dashboard-data";
import { SiteThemeScope } from "@/components/templates/site-theme-scope";
import { AssetImage } from "@/components/ui/asset-image";
import { getCatalogBrandStyle } from "@/lib/catalog-presentation";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Cloud } from "lucide-react";

const COPY = { skip: "Saltar al contenido", home: "Inicio", products: "Productos", navigation: "Navegación del catálogo", visit: "Ven a vernos" } as const;
export function CatalogShell({ content, template, siteName, homeHref, catalogHref, hasStore, isProductDetail, children }: { content: LandingContent; template: TemplateId; siteName: string; homeHref: string; catalogHref: string; hasStore: boolean; isProductDetail: boolean; children: ReactNode }) {
  const brand = content.brand || siteName;
  return <SiteThemeScope appearance={content.appearance} template={template} style={template === "nuvolets" ? getCatalogBrandStyle(content) : undefined} className="min-h-screen bg-catalog-canvas font-body text-ink">
    <a href="#catalog-main" className="sr-only focus:not-sr-only focus:block focus:p-4">{COPY.skip}</a>
    <header className="sticky top-0 z-50 bg-catalog-canvas/90 backdrop-blur-xl">
      <div className="mx-auto flex min-h-[74px] max-w-7xl flex-wrap items-center justify-between gap-x-4 gap-y-3 px-4 py-3 sm:px-6 lg:px-8">
        <Link href={homeHref} className="flex items-center gap-2 font-headline text-2xl sm:text-3xl">{content.brandLogoType === "image" && content.brandLogoImage ? <span className="relative block h-12 w-36"><AssetImage src={content.brandLogoImage} alt={brand} fill sizes="140px" className="object-contain" /></span> : <>{template === "nuvolets" ? <Cloud aria-hidden className="h-7 w-10 fill-tone-1 text-tone-1" strokeWidth={0} /> : null}{brand}</>}</Link>
        <nav aria-label={COPY.navigation} className="order-last flex w-full justify-center gap-8 text-sm sm:order-none sm:w-auto">
          <Link href={homeHref} className="transition-opacity hover:opacity-60">{COPY.home}</Link>
          <Link href={catalogHref} aria-current={isProductDetail ? undefined : "page"} className="font-semibold text-ink underline decoration-primary decoration-2 underline-offset-8">{COPY.products}</Link>
        </nav>
        {hasStore ? <Button asChild variant="outline" className="h-10 rounded-full border-primary bg-transparent px-4 font-semibold text-ink hover:bg-tone-1"><a href="#tienda">{COPY.visit}</a></Button> : null}
      </div>
      <Separator className="bg-border/70" />
    </header>
    <main id="catalog-main">{children}</main>
    <Separator className="bg-border" />
    <footer className="px-5 py-8 text-center text-xs text-ink/55">{brand}</footer>
  </SiteThemeScope>;
}
