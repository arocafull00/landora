"use client";

import { useState } from "react";
import { X, Menu } from "lucide-react";
import { m, AnimatePresence } from "motion/react";
import type { BrandLogoType, NavLink } from "@/lib/dashboard-data";
import { handleSectionNavClick } from "@/lib/scroll-to-section";
import { useAnalytics } from "@/hooks/use-analytics";
import { TemplateNavBrand } from "@/components/templates/template-nav-brand";
import { TemplateNavAnchor } from "@/components/templates/template-nav-anchor";
import { FloristeriaNavPillLink } from "@/components/templates/floristeria/floristeria-nav-pill-link";

export function FloristeriaNav({
  brand,
  brandLogoImage,
  brandLogoType,
  navLinks,
  ctaLabel,
  ctaHref,
  topOffset = 0,
}: {
  brand: string;
  brandLogoImage: string;
  brandLogoType: BrandLogoType;
  navLinks: NavLink[];
  ctaLabel: string;
  ctaHref: string;
  topOffset?: number;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { trackCtaClick } = useAnalytics();

  return (
    <>
      <nav
        className="fixed left-0 right-0 z-50 backdrop-blur-md"
        style={topOffset > 0 ? { top: topOffset } : { top: 0 }}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4 md:grid md:grid-cols-[1fr_auto_1fr] md:items-center md:px-8 md:py-5">
          <button
            type="button"
            className="shrink-0 text-left text-xl font-bold tracking-tight text-[#2D5016] md:justify-self-start"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            <TemplateNavBrand
              brand={brand}
              brandLogoImage={brandLogoImage}
              brandLogoType={brandLogoType}
            />
          </button>

          <div className="hidden md:flex md:justify-center">
            <nav
              className="rounded-full border border-[#2D5016]/10 bg-white px-1 py-1 shadow-sm"
              aria-label="Principal"
            >
              <ul className="flex items-center gap-0.5">
                {navLinks.map((link) => (
                  <FloristeriaNavPillLink key={link.id} link={link} />
                ))}
              </ul>
            </nav>
          </div>

          <div className="hidden md:flex md:justify-end">
            <TemplateNavAnchor
              className="inline-flex items-center justify-center rounded-full bg-[#2D5016] px-6 py-2.5 text-sm font-semibold tracking-wide text-white transition-colors hover:bg-[#234012]"
              href={ctaHref}
              onClick={() => trackCtaClick()}
            >
              {ctaLabel || "Hacer pedido"}
            </TemplateNavAnchor>
          </div>

          <button
            className="relative z-[1] flex items-center justify-center text-[#1a1a1a] md:hidden"
            onClick={() => setMenuOpen((v) => !v)}
            type="button"
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <m.div
            className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-[#FAFAF7]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {navLinks.map((link, i) => (
              <m.a
                className="text-2xl font-semibold text-[#1a1a1a] transition-colors hover:text-[#2D5016]"
                href={link.href}
                key={link.id}
                onClick={(event) =>
                  handleSectionNavClick(event, link.href, () => setMenuOpen(false))
                }
                style={{
                  fontFamily: "var(--font-cormorant)",
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
              className="mt-6 rounded-full bg-[#2D5016] px-8 py-3 text-sm font-semibold text-white"
              href={ctaHref}
              onClick={(event) => {
                trackCtaClick();
                handleSectionNavClick(event, ctaHref, () => setMenuOpen(false));
              }}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: navLinks.length * 0.06 }}
            >
              {ctaLabel || "Hacer pedido"}
            </m.a>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}
