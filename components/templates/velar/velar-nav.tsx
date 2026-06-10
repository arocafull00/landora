"use client";

import { X } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import type { BrandLogoType, NavLink } from "@/lib/dashboard-data";
import { handleSectionNavClick } from "@/lib/scroll-to-section";
import { TemplateNavBrand } from "@/components/templates/template-nav-brand";

const easeOut = [0.16, 1, 0.3, 1] as const;

export function VelarNav({
  brand,
  brandLogoImage,
  brandLogoType,
  navColor,
  menuOpen,
  onToggleMenu,
  navLinks,
  topOffset = 0,
}: {
  brand: string;
  brandLogoImage: string;
  brandLogoType: BrandLogoType;
  navColor: string;
  menuOpen: boolean;
  onToggleMenu: () => void;
  navLinks: NavLink[];
  topOffset?: number;
}) {
  const reduce = useReducedMotion();

  return (
    <>
      <motion.nav
        className={`fixed left-0 right-0 z-50 flex items-center justify-between px-6 py-5 before:pointer-events-none before:absolute before:inset-0 before:from-white/30 before:to-transparent md:px-10 md:py-6 lg:px-16${topOffset > 0 ? "" : " top-0"}`}
        style={{
          color: navColor,
          transition: "color 0.35s ease",
          ...(topOffset > 0 ? { top: topOffset } : {}),
        }}
        initial={reduce ? false : { opacity: 0, y: -18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.08, ease: easeOut }}
      >
        <div
          className="relative z-[1] text-xl drop-shadow-[0_1px_8px_rgba(255,255,255,0.5)]"
          style={{ fontFamily: "var(--font-syne)", letterSpacing: "-0.02em", color: navColor, transition: "color 0.35s ease" }}
        >
          <TemplateNavBrand
            animated
            brand={brand}
            brandLogoImage={brandLogoImage}
            brandLogoType={brandLogoType}
          />
        </div>

        <motion.button
          type="button"
          onClick={onToggleMenu}
          className="group relative z-[1] flex items-center justify-center drop-shadow-[0_1px_8px_rgba(255,255,255,0.5)]"
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
          style={{ color: navColor, transition: "color 0.35s ease" }}
          initial={reduce ? false : { opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.45, delay: 0.35, ease: easeOut }}
          whileTap={reduce ? undefined : { scale: 0.96 }}
        >
          {menuOpen ? (
            <X size={24} />
          ) : (
            <div className="flex flex-col gap-[6px]">
              <span
                className="block h-px w-7 transition-all duration-300 group-hover:w-5"
                style={{ backgroundColor: navColor }}
              />
              <span
                className="block h-px w-7"
                style={{ backgroundColor: navColor }}
              />
            </div>
          )}
        </motion.button>
      </motion.nav>

      {menuOpen && (
        <motion.div
          className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-[#f5f0ea]"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {navLinks.map((link, i) => (
            <motion.a
              key={link.id}
              className="uppercase text-black transition-colors hover:text-gray-500"
              href={link.href}
              onClick={(event) => handleSectionNavClick(event, link.href, onToggleMenu)}
              style={{
                fontFamily: "var(--font-syne)",
                fontSize: "clamp(28px, 5vw, 40px)",
                fontWeight: 300,
                letterSpacing: "0.12em",
                lineHeight: 1.6,
              }}
              initial={reduce ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 + i * 0.08, ease: easeOut }}
            >
              {link.label}
            </motion.a>
          ))}
        </motion.div>
      )}
    </>
  );
}
