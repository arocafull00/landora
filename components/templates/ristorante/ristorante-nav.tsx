"use client";

import { useState } from "react";
import { X, Menu } from "lucide-react";
import { m, AnimatePresence, useReducedMotion } from "motion/react";
import type { BrandLogoType, NavLink } from "@/lib/dashboard-data";
import { handleSectionNavClick } from "@/lib/scroll-to-section";
import { TemplateNavBrand } from "@/components/templates/template-nav-brand";
import { TemplateNavAnchor } from "@/components/templates/template-nav-anchor";

export function RistoranteNav({
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
  const reduce = useReducedMotion();

  return (
    <>
      <nav
        className="fixed left-0 right-0 z-50 flex items-center justify-between px-6 py-5 md:px-10 lg:px-16"
        style={{
          ...(topOffset > 0 ? { top: topOffset } : { top: 0 }),
          background: "linear-gradient(to bottom, rgba(250,247,242,0.95), rgba(250,247,242,0.85))",
          backdropFilter: "blur(8px)",
        }}
      >
        <TemplateNavAnchor
          className="text-xl font-bold tracking-tight text-[#1C1917] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B2500] focus-visible:ring-offset-2"
          href="#hero"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          <TemplateNavBrand
            brand={brand}
            brandLogoImage={brandLogoImage}
            brandLogoType={brandLogoType}
          />
        </TemplateNavAnchor>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <TemplateNavAnchor
              className="text-sm font-medium text-[#1C1917]/75 transition-colors hover:text-[#8B2500] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B2500] focus-visible:ring-offset-2"
              href={link.href}
              key={link.id}
              style={{ fontFamily: "var(--font-body)" }}
            >
              {link.label}
            </TemplateNavAnchor>
          ))}
          <TemplateNavAnchor
            className="rounded-full bg-[#8B2500] px-5 py-2.5 text-xs font-semibold tracking-wide text-white transition-colors hover:bg-[#7a1f00] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B2500] focus-visible:ring-offset-2"
            href="#contacto"
          >
            {ctaLabel || "Reservar mesa"}
          </TemplateNavAnchor>
        </div>

        <button
          className="relative z-[1] flex h-11 w-11 items-center justify-center rounded-full text-[#1C1917] transition-colors hover:bg-[#1C1917]/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B2500] focus-visible:ring-offset-2 md:hidden"
          onClick={() => setMenuOpen((v) => !v)}
          type="button"
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <m.div
            className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-[#FAF7F2]"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {navLinks.map((link, i) => (
              <m.a
                className="text-2xl font-semibold text-[#1C1917] transition-colors hover:text-[#8B2500] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B2500]"
                href={link.href}
                key={link.id}
                onClick={(event) =>
                  handleSectionNavClick(event, link.href, () => setMenuOpen(false))
                }
                style={{
                  fontFamily: "var(--font-playfair)",
                  lineHeight: 2.2,
                }}
                initial={reduce ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.06 }}
              >
                {link.label}
              </m.a>
            ))}
            <m.a
              className="mt-6 rounded-full bg-[#8B2500] px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#7a1f00] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#FAF7F2]"
              href="#contacto"
              onClick={(event) =>
                handleSectionNavClick(event, "#contacto", () => setMenuOpen(false))
              }
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: navLinks.length * 0.06 }}
            >
              {ctaLabel || "Reservar mesa"}
            </m.a>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}
