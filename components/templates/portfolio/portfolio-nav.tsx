"use client";

import { useState } from "react";
import { X, Menu } from "lucide-react";
import { m, AnimatePresence } from "motion/react";
import type { BrandLogoType, HeroVariantId, NavLink } from "@/lib/dashboard-data";
import { handleSectionNavClick } from "@/lib/scroll-to-section";
import { useAnalytics } from "@/hooks/use-analytics";
import { TemplateNavBrand } from "@/components/templates/template-nav-brand";
import { TemplateNavAnchor } from "@/components/templates/template-nav-anchor";
import type { HeroNavTone } from "@/components/templates/shared/heroes/hero-variant-types";

export function PortfolioNav({
  brand,
  brandLogoImage,
  brandLogoType,
  navLinks,
  ctaLabel,
  ctaHref,
  heroVariantId,
  heroNavTone,
  overHero,
  topOffset = 0,
}: {
  brand: string;
  brandLogoImage: string;
  brandLogoType: BrandLogoType;
  navLinks: NavLink[];
  ctaLabel: string;
  ctaHref: string;
  heroVariantId: HeroVariantId;
  heroNavTone: HeroNavTone;
  overHero: boolean;
  topOffset?: number;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { trackCtaClick } = useAnalytics();
  const usePaletteText = !overHero || heroVariantId === "portfolio";
  const useLightText = !usePaletteText && heroNavTone === "light";

  return (
    <>
      <nav
        className={`fixed left-0 right-0 z-50 flex items-center justify-between border-b px-6 py-5 transition-colors md:px-10 lg:px-16 ${
          overHero && heroNavTone === "dark"
            ? "border-[var(--site-border)] bg-[var(--site-surface)]/85 backdrop-blur-md"
            : "border-portfolio-line bg-portfolio-canvas/90 md:border-transparent md:bg-transparent"
        }`}
        style={{
          ...(topOffset > 0 ? { top: topOffset } : { top: 0 }),
        }}
      >
        <button
          type="button"
          className={`text-xl font-bold tracking-tight ${useLightText ? "text-white" : "text-portfolio-ink"}`}
          style={{ fontFamily: "var(--font-syne)" }}
        >
          <TemplateNavBrand
            brand={brand}
            brandLogoImage={brandLogoImage}
            brandLogoType={brandLogoType}
          />
        </button>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <TemplateNavAnchor
              className={`text-sm font-medium transition-colors ${
                useLightText
                  ? "text-white/60 hover:text-white"
                  : "text-portfolio-ink-muted hover:text-portfolio-ink"
              }`}
              href={link.href}
              key={link.id}
              style={{ fontFamily: "var(--font-body)" }}
            >
              {link.label}
            </TemplateNavAnchor>
          ))}
          <TemplateNavAnchor
            className="rounded-full bg-portfolio-accent px-5 py-2.5 text-xs font-semibold tracking-wide text-portfolio-accent-ink transition-[background-color,transform] hover:-translate-y-0.5 hover:bg-[var(--portfolio-accent-hover)]"
            href={ctaHref}
            onClick={() => trackCtaClick()}
          >
            {ctaLabel || "Ver proyectos"}
          </TemplateNavAnchor>
        </div>

        <button
          className={`relative z-[1] flex items-center justify-center md:hidden ${useLightText ? "text-white" : "text-portfolio-ink"}`}
          onClick={() => setMenuOpen((v) => !v)}
          type="button"
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <m.div
            className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-portfolio-canvas"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {navLinks.map((link, i) => (
              <m.a
                className="text-2xl font-semibold text-portfolio-ink transition-colors hover:text-portfolio-ink-muted"
                href={link.href}
                key={link.id}
                onClick={(event) =>
                  handleSectionNavClick(event, link.href, () => setMenuOpen(false))
                }
                style={{
                  fontFamily: "var(--font-syne)",
                  lineHeight: 2.2,
                }}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.06 }}
              >
                {link.label}
              </m.a>
            ))}
            <m.a
              className="mt-6 rounded-full bg-portfolio-accent px-8 py-3 text-sm font-semibold text-portfolio-accent-ink transition-colors hover:bg-[var(--portfolio-accent-hover)]"
              href={ctaHref}
              onClick={(event) => {
                trackCtaClick();
                handleSectionNavClick(event, ctaHref, () => setMenuOpen(false));
              }}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: navLinks.length * 0.06 }}
            >
              {ctaLabel || "Ver proyectos"}
            </m.a>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}
