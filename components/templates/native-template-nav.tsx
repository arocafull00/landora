import { Menu, X } from "lucide-react";
import type {
  BrandLogoType,
  EditorPageTarget,
  NavLink,
} from "@/lib/dashboard-data";
import { getPreviewTargetAttributes } from "@/lib/preview-target-attributes";
import { TemplateNavBrand } from "@/components/templates/template-nav-brand";

export type NativeTemplateNavLink = NavLink & {
  pageTarget?: EditorPageTarget;
};

export function NativeTemplateNav({
  brand,
  brandLogoImage,
  brandLogoType,
  ctaHref,
  ctaLabel,
  homeHref = "#hero",
  homePageTarget,
  navLinks,
  topOffset = 0,
}: {
  brand: string;
  brandLogoImage: string;
  brandLogoType: BrandLogoType;
  ctaHref: string;
  ctaLabel: string;
  homeHref?: string;
  homePageTarget?: EditorPageTarget;
  navLinks: NativeTemplateNavLink[];
  topOffset?: number;
}) {
  return (
    <nav
      aria-label="Principal"
      className="fixed inset-x-0 z-50 border-b border-[var(--site-border)]/40 bg-[var(--site-surface)]/90 px-5 py-3 text-[var(--site-text)] backdrop-blur-md md:px-10 lg:px-16"
      style={{ top: topOffset }}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6">
        <a
          className="min-w-0 font-bold tracking-tight text-site-content"
          href={homeHref}
          {...getPreviewTargetAttributes(homePageTarget)}
        >
          <TemplateNavBrand
            brand={brand}
            brandLogoImage={brandLogoImage}
            brandLogoType={brandLogoType}
          />
        </a>

        <div className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <a
              className="font-medium text-[var(--site-text-muted)] transition-colors hover:text-[var(--site-text)] text-site-content"
              href={link.href}
              key={link.id}
              {...getPreviewTargetAttributes(link.pageTarget)}
            >
              {link.label}
            </a>
          ))}
          <a
            className="rounded-full bg-[var(--site-primary)] px-5 py-2.5 font-semibold text-[var(--site-on-primary)] transition-colors hover:bg-[var(--site-primary-hover)] text-site-button"
            data-analytics-event="cta_click"
            href={ctaHref}
          >
            {ctaLabel}
          </a>
        </div>

        <details className="group relative md:hidden">
          <summary className="flex size-11 cursor-pointer list-none items-center justify-center rounded-full border border-[var(--site-border)] bg-[var(--site-surface)]">
            <span className="sr-only">Abrir menú</span>
            <Menu aria-hidden className="size-5 group-open:hidden" />
            <X aria-hidden className="hidden size-5 group-open:block" />
          </summary>
          <div className="absolute right-0 top-14 flex min-w-64 flex-col gap-1 rounded-2xl border border-[var(--site-border)] bg-[var(--site-surface)] p-3 shadow-xl">
            {navLinks.map((link) => (
              <a
                className="rounded-xl px-4 py-3 font-semibold transition-colors hover:bg-[var(--site-primary)]/10 text-site-content"
                href={link.href}
                key={link.id}
                {...getPreviewTargetAttributes(link.pageTarget)}
              >
                {link.label}
              </a>
            ))}
            <a
              className="mt-2 rounded-xl bg-[var(--site-primary)] px-4 py-3 text-center font-semibold text-[var(--site-on-primary)] text-site-button"
              data-analytics-event="cta_click"
              href={ctaHref}
            >
              {ctaLabel}
            </a>
          </div>
        </details>
      </div>
    </nav>
  );
}
