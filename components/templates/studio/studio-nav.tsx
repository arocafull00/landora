"use client";

import { useState } from "react";
import { X, Menu } from "lucide-react";
import { m, AnimatePresence } from "motion/react";
import type { BrandLogoType, NavLink } from "@/lib/dashboard-data";
import { handleSectionNavClick } from "@/lib/scroll-to-section";
import { useAnalytics } from "@/hooks/use-analytics";
import { TemplateNavBrand } from "@/components/templates/template-nav-brand";
import { TemplateNavAnchor } from "@/components/templates/template-nav-anchor";
import type { HeroNavTone } from "@/components/templates/shared/heroes/hero-variant-types";

export function StudioNav({
  brand,
  brandLogoImage,
  brandLogoType,
  navLinks,
  ctaLabel,
  ctaHref,
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
  heroNavTone: HeroNavTone;
  overHero: boolean;
  topOffset?: number;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { trackCtaClick } = useAnalytics();
  const useLightText = overHero && heroNavTone === "light";

  return (
    <>
      <m.nav
        className={`fixed left-0 right-0 z-50 flex items-center justify-between px-6 py-5 md:px-10 lg:px-16${topOffset > 0 ? "" : " top-0"}`}
        style={{
          ...(topOffset > 0 ? { top: topOffset } : {}),
          background: overHero
            ? "transparent"
            : "linear-gradient(to bottom, color-mix(in srgb, var(--site-surface-raised) 95%, transparent), color-mix(in srgb, var(--site-surface-raised) 80%, transparent))",
          backdropFilter: overHero ? "none" : "blur(9px)",
          transition: "background 0.35s ease, backdrop-filter 0.35s ease",
        }}
      >
        <button
          type="button"
          className={`text-xl font-bold tracking-tight transition-colors duration-300 ease-out ${useLightText ? "text-white" : "text-[var(--site-text)]"}`}
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
              className={`text-sm font-medium transition-colors duration-300 ease-out ${useLightText ? "text-white/75 hover:text-white" : "text-[var(--site-text)]/70 hover:text-[var(--site-text)]"}`}
              href={link.href}
              key={link.id}
              style={{ fontFamily: "var(--font-body)" }}
            >
              {link.label}
            </TemplateNavAnchor>
          ))}
          <TemplateNavAnchor
            className={`rounded-full px-5 py-2.5 text-xs font-semibold tracking-wide transition-colors duration-300 ease-out ${overHero ? "bg-[var(--site-accent-bright)] text-black hover:bg-[var(--site-accent-bright)]" : "bg-[var(--site-dark)] text-white hover:bg-[var(--site-text-muted)]"}`}
            href={ctaHref}
            onClick={() => trackCtaClick()}
          >
            {ctaLabel || "Reservar cita"}
          </TemplateNavAnchor>
        </div>

        <button
          className={`relative z-[1] flex items-center justify-center transition-colors duration-300 ease-out md:hidden ${useLightText ? "text-white" : "text-[var(--site-text)]"}`}
          onClick={() => setMenuOpen((v) => !v)}
          type="button"
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </m.nav>

      <AnimatePresence>
        {menuOpen && (
          <m.div
            className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-[var(--site-surface-raised)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {navLinks.map((link, i) => (
              <m.a
                className="text-2xl font-semibold text-[var(--site-text)] transition-colors hover:text-[var(--site-primary)]"
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
              className="mt-6 rounded-full bg-[var(--site-dark)] px-8 py-3 text-sm font-semibold text-white"
              href={ctaHref}
              onClick={(event) => {
                trackCtaClick();
                handleSectionNavClick(event, ctaHref, () => setMenuOpen(false));
              }}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: navLinks.length * 0.06 }}
            >
              {ctaLabel || "Reservar cita"}
            </m.a>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}
