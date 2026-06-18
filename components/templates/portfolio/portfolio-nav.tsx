"use client";

import { useState } from "react";
import { X, Menu } from "lucide-react";
import { m, AnimatePresence } from "motion/react";
import type { BrandLogoType, NavLink } from "@/lib/dashboard-data";
import { handleSectionNavClick } from "@/lib/scroll-to-section";
import { useAnalytics } from "@/hooks/use-analytics";
import { TemplateNavBrand } from "@/components/templates/template-nav-brand";
import { TemplateNavAnchor } from "@/components/templates/template-nav-anchor";

export function PortfolioNav({
  brand,
  brandLogoImage,
  brandLogoType,
  navLinks,
  ctaLabel,
  topOffset = 0,
}: {
  brand: string;
  brandLogoImage: string;
  brandLogoType: BrandLogoType;
  navLinks: NavLink[];
  ctaLabel: string;
  topOffset?: number;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { trackCtaClick } = useAnalytics();

  return (
    <>
      <nav
        className="fixed left-0 right-0 z-50 flex items-center justify-between px-6 py-5 md:px-10 lg:px-16"
        style={{
          ...(topOffset > 0 ? { top: topOffset } : { top: 0 }),
          background: "linear-gradient(to bottom, rgba(10,10,10,0.9), rgba(10,10,10,0.7))",
          backdropFilter: "blur(9px)",
        }}
      >
        <button
          type="button"
          className="text-xl font-bold tracking-tight text-white"
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
              className="text-sm font-medium text-white/60 transition-colors hover:text-white"
              href={link.href}
              key={link.id}
              style={{ fontFamily: "var(--font-body)" }}
            >
              {link.label}
            </TemplateNavAnchor>
          ))}
          <TemplateNavAnchor
            className="rounded-full bg-white px-5 py-2.5 text-xs font-semibold tracking-wide text-[#0a0a0a] transition-colors hover:bg-white/90"
            href="#contacto"
            onClick={() => trackCtaClick()}
          >
            {ctaLabel || "Ver proyectos"}
          </TemplateNavAnchor>
        </div>

        <button
          className="relative z-[1] flex items-center justify-center text-white md:hidden"
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
            className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-[#0a0a0a]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {navLinks.map((link, i) => (
              <m.a
                className="text-2xl font-semibold text-white transition-colors hover:text-white/70"
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
              className="mt-6 rounded-full bg-white px-8 py-3 text-sm font-semibold text-[#0a0a0a]"
              href="#contacto"
              onClick={(event) => {
                trackCtaClick();
                handleSectionNavClick(event, "#contacto", () => setMenuOpen(false));
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
