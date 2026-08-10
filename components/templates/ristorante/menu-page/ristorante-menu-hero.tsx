import Link from "next/link";
import type {
  BrandLogoType,
  EditorPageTarget,
  LandingAppearance,
} from "@/lib/dashboard-data";
import { TemplateNavAnchor } from "@/components/templates/template-nav-anchor";
import { TemplateNavBrand } from "@/components/templates/template-nav-brand";
import { HeroBackground } from "@/components/ui/hero-background";
import { getPreviewTargetAttributes } from "@/lib/preview-target-attributes";


export function RistoranteMenuHero({
  appearance,
  brand,
  brandLogoImage,
  brandLogoType,
  ctaHref,
  ctaLabel,
  eyebrow,
  homeHref,
  homePageTarget,
  image,
  subtitle,
  title,
}: {
  appearance: LandingAppearance;
  brand: string;
  brandLogoImage: string;
  brandLogoType: BrandLogoType;
  ctaHref: string;
  ctaLabel: string;
  eyebrow: string;
  homeHref: string;
  homePageTarget?: EditorPageTarget;
  image: string;
  subtitle: string;
  title: string;
}) {
  return (
    <header className="relative m-2 min-h-145 overflow-hidden rounded-[1.75rem] bg-(--ristorante-secondary) text-[var(--ristorante-foreground)] shadow-xl sm:m-4 sm:min-h-[540px] sm:rounded-[2.125rem]">
      <div
        className="absolute inset-0"
      >
        <HeroBackground
          appearance={appearance}
          className="bg-center"
          src={image}
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-[var(--ristorante-secondary)] via-[var(--ristorante-secondary)]/75 to-[var(--ristorante-secondary)]/15" />
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--ristorante-secondary)]/45 via-transparent to-transparent" />

      <nav
        aria-label="Navegación de la carta"
        className="relative z-10 flex items-center justify-between gap-4 px-5 py-5 sm:px-8 sm:py-7"
      >
        <Link
          className="inline-flex min-w-0 items-center gap-3 text-[var(--ristorante-foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ristorante-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--ristorante-secondary)]"
          href={homeHref}
          prefetch={homePageTarget ? true : undefined}
          {...getPreviewTargetAttributes(homePageTarget)}
        >
          <TemplateNavBrand
            brand={brand}
            brandLogoImage={brandLogoImage}
            brandLogoType={brandLogoType}
            className="max-w-40 truncate text-site-content sm:max-w-xs"
            style={{ fontFamily: "var(--font-ristorante-display)" }}
          />
        </Link>

        <TemplateNavAnchor
          className="shrink-0 rounded-full border border-[var(--ristorante-foreground)]/40 bg-[var(--ristorante-foreground)]/10 px-4 py-2.5 font-semibold text-[var(--ristorante-foreground)] backdrop-blur-md transition-[background-color,transform] hover:-translate-y-0.5 hover:bg-[var(--ristorante-foreground)]/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ristorante-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--ristorante-secondary)] motion-reduce:transform-none sm:px-5 text-site-button"
          href={ctaHref}
          data-analytics-event="cta_click"
          style={{ fontFamily: "var(--font-ristorante-body)" }}
        >
          {ctaLabel || "Reservar mesa"}
        </TemplateNavAnchor>
      </nav>

      <div
        className="relative z-10 max-w-3xl px-5 pb-12 pt-28 sm:px-8 sm:pb-16 sm:pt-24 lg:pt-20"
      >
        {eyebrow ? (
          <p
            className="mb-5 flex items-center gap-3 font-semibold uppercase tracking-[0.18em] text-[var(--ristorante-accent)] text-site-content"
            style={{ fontFamily: "var(--font-ristorante-body)" }}
          >
            <span
              aria-hidden
              className="h-px w-9 bg-[var(--ristorante-accent)]"
            />
            {eyebrow}
          </p>
        ) : null}
        <h1
          className="max-w-[9ch] text-balance font-normal leading-[0.9] text-[var(--ristorante-foreground)] text-site-title-lg"
          style={{
            fontFamily: "var(--font-ristorante-display)",
            letterSpacing: "-0.055em",
          }}
        >
          {title}
        </h1>
        {subtitle ? (
          <p
            className="mt-6 max-w-xl text-pretty leading-relaxed text-[var(--ristorante-foreground)]/78 text-site-subtitle"
            style={{
              fontFamily: "var(--font-ristorante-body)",
              fontWeight: 300,
            }}
          >
            {subtitle}
          </p>
        ) : null}
      </div>
    </header>
  );
}
