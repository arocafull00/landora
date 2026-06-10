"use client";

import { useState } from "react";
import { X, Menu } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import type { BrandLogoType, NavLink } from "@/lib/dashboard-data";
import { handleSectionNavClick } from "@/lib/scroll-to-section";
import { TemplateNavBrand } from "@/components/templates/template-nav-brand";
import { TemplateNavAnchor } from "@/components/templates/template-nav-anchor";

export function StudioNav({
  brand,
  brandLogoImage,
  brandLogoType,
  navLinks,
  ctaLabel,
  overHero,
  topOffset = 0,
}: {
  brand: string;
  brandLogoImage: string;
  brandLogoType: BrandLogoType;
  navLinks: NavLink[];
  ctaLabel: string;
  overHero: boolean;
  topOffset?: number;
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <motion.nav
        className={`fixed left-0 right-0 z-50 flex items-center justify-between px-6 py-5 md:px-10 lg:px-16${topOffset > 0 ? "" : " top-0"}`}
        style={{
          ...(topOffset > 0 ? { top: topOffset } : {}),
          background: overHero
            ? "transparent"
            : "linear-gradient(to bottom, rgba(255,255,255,0.95), rgba(255,255,255,0.8))",
          backdropFilter: overHero ? "none" : "blur(12px)",
          transition: "background 0.35s ease, backdrop-filter 0.35s ease",
        }}
      >
        <a
          className={`text-xl font-bold tracking-tight transition-colors duration-300 ease-out ${overHero ? "text-white" : "text-[#1a1a1a]"}`}
          href="#"
          style={{ fontFamily: "var(--font-syne)" }}
        >
          <TemplateNavBrand
            brand={brand}
            brandLogoImage={brandLogoImage}
            brandLogoType={brandLogoType}
          />
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <TemplateNavAnchor
              className={`text-sm font-medium transition-colors duration-300 ease-out ${overHero ? "text-white/75 hover:text-white" : "text-[#1a1a1a]/70 hover:text-[#1a1a1a]"}`}
              href={link.href}
              key={link.id}
              style={{ fontFamily: "var(--font-body)" }}
            >
              {link.label}
            </TemplateNavAnchor>
          ))}
          <TemplateNavAnchor
            className={`rounded-full px-5 py-2.5 text-xs font-semibold tracking-wide transition-colors duration-300 ease-out ${overHero ? "bg-[#c99d43] text-black hover:bg-[#d9ad54]" : "bg-[#1a1a1a] text-white hover:bg-[#333]"}`}
            href="#contacto"
          >
            {ctaLabel || "Reservar cita"}
          </TemplateNavAnchor>
        </div>

        <button
          className={`relative z-[1] flex items-center justify-center transition-colors duration-300 ease-out md:hidden ${overHero ? "text-white" : "text-[#1a1a1a]"}`}
          onClick={() => setMenuOpen((v) => !v)}
          type="button"
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {navLinks.map((link, i) => (
              <motion.a
                className="text-2xl font-semibold text-[#1a1a1a] transition-colors hover:text-[#8b7355]"
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
              </motion.a>
            ))}
            <motion.a
              className="mt-6 rounded-full bg-[#1a1a1a] px-8 py-3 text-sm font-semibold text-white"
              href="#contacto"
              onClick={(event) =>
                handleSectionNavClick(event, "#contacto", () => setMenuOpen(false))
              }
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: navLinks.length * 0.06 }}
            >
              {ctaLabel || "Reservar cita"}
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
