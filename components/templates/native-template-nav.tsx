import type { ReactNode } from "react";
import { Menu, X } from "lucide-react";
import type {
  BrandLogoType,
  EditorPageTarget,
  NavLink,
} from "@/lib/dashboard-data";
import { getPreviewTargetAttributes } from "@/lib/preview-target-attributes";
import { NativeTemplateNavCta } from "@/components/templates/native-template-nav-cta";
import { NativeTemplateNavLink } from "@/components/templates/native-template-nav-link";
import { TemplateNavBrand } from "@/components/templates/template-nav-brand";
import type { HeroNavTone } from "@/components/templates/shared/heroes/hero-variant-types";
import { cn } from "@/lib/utils";

export type NativeTemplateNavLinkItem = NavLink & {
  pageTarget?: EditorPageTarget;
};

export function NativeTemplateNav({
  brand,
  brandLogoImage,
  brandLogoType,
  ctaAnalyticsEvent = "cta_click",
  ctaClassName,
  ctaHref,
  ctaIcon,
  ctaLabel,
  ctaLabelClassName,
  homeHref = "#hero",
  homePageTarget,
  navLinks,
  overlay = false,
  tone = "dark",
  topOffset = 0,
}: {
  brand: string;
  brandLogoImage: string;
  brandLogoType: BrandLogoType;
  ctaAnalyticsEvent?: string;
  ctaClassName?: string;
  ctaHref: string;
  ctaIcon?: ReactNode;
  ctaLabel: string;
  ctaLabelClassName?: string;
  homeHref?: string;
  homePageTarget?: EditorPageTarget;
  navLinks: NativeTemplateNavLinkItem[];
  overlay?: boolean;
  tone?: HeroNavTone;
  topOffset?: number;
}) {
  const linkClassName = cn(
    "font-medium transition-colors text-site-content",
    overlay && tone === "light"
      ? "text-[var(--site-on-dark)]/80 hover:text-[var(--site-on-dark)]"
      : overlay
        ? "text-[var(--site-primary)]/75 hover:text-[var(--site-primary)]"
        : "text-[var(--site-text-muted)] hover:text-[var(--site-text)]",
  );

  return (
    <nav
      aria-label="Principal"
      className={cn(
        "fixed inset-x-0 z-50 px-5 py-3 transition-colors duration-300 md:px-10 lg:px-16",
        overlay
          ? "border-b border-transparent bg-transparent"
          : "border-b border-[var(--site-border)]/40 bg-[var(--site-surface)]/90 text-[var(--site-text)] backdrop-blur-md",
        overlay &&
          (tone === "light"
            ? "text-[var(--site-on-dark)]"
            : "text-[var(--site-primary)]"),
      )}
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
            <NativeTemplateNavLink
              className={linkClassName}
              href={link.href}
              key={link.id}
              pageTarget={link.pageTarget}
            >
              {link.label}
            </NativeTemplateNavLink>
          ))}
          <NativeTemplateNavCta
            analyticsEvent={ctaAnalyticsEvent}
            className={cn(
              "inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full bg-[var(--site-primary)] px-5 py-2.5 font-semibold text-[var(--site-on-primary)] transition-colors hover:bg-[var(--site-primary-hover)]",
              ctaClassName,
            )}
            href={ctaHref}
            icon={ctaIcon}
            label={ctaLabel}
            labelClassName={cn("text-site-button", ctaLabelClassName)}
          />
        </div>

        <details className="group relative md:hidden">
          <summary className="flex size-11 cursor-pointer list-none items-center justify-center rounded-full border border-[var(--site-border)] bg-[var(--site-surface)]">
            <span className="sr-only">Abrir menú</span>
            <Menu aria-hidden className="size-5 group-open:hidden" />
            <X aria-hidden className="hidden size-5 group-open:block" />
          </summary>
          <div className="absolute right-0 top-14 flex min-w-64 flex-col gap-1 rounded-2xl border border-[var(--site-border)] bg-[var(--site-surface)] p-3 shadow-xl">
            {navLinks.map((link) => (
              <NativeTemplateNavLink
                className="rounded-xl px-4 py-3 font-semibold transition-colors hover:bg-[var(--site-primary)]/10 text-site-content"
                href={link.href}
                key={link.id}
                pageTarget={link.pageTarget}
              >
                {link.label}
              </NativeTemplateNavLink>
            ))}
            <NativeTemplateNavCta
              analyticsEvent={ctaAnalyticsEvent}
              className={cn(
                "mt-2 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-[var(--site-primary)] px-4 py-3 text-center font-semibold text-[var(--site-on-primary)]",
                ctaClassName,
              )}
              href={ctaHref}
              icon={ctaIcon}
              label={ctaLabel}
              labelClassName={cn("text-site-button", ctaLabelClassName)}
            />
          </div>
        </details>
      </div>
    </nav>
  );
}
