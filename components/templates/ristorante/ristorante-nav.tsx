"use client";

import { useState } from "react";
import { X, Menu } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import type { NavLink } from "@/lib/dashboard-data";

export function RistoranteNav({
  brand,
  navLinks,
  ctaLabel,
  topOffset = 0,
}: {
  brand: string;
  navLinks: NavLink[];
  ctaLabel: string;
  topOffset?: number;
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <nav
        className="fixed left-0 right-0 z-50 flex items-center justify-between px-6 py-5 md:px-10 lg:px-16"
        style={{
          ...(topOffset > 0 ? { top: topOffset } : { top: 0 }),
          background: "linear-gradient(to bottom, rgba(250,247,242,0.95), rgba(250,247,242,0.85))",
          backdropFilter: "blur(12px)",
        }}
      >
        <a
          className="text-xl font-bold tracking-tight text-[#1C1917]"
          href="#"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          {brand}
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              className="text-sm font-medium text-[#1C1917]/70 transition-colors hover:text-[#8B2500]"
              href={link.href}
              key={link.id}
              style={{ fontFamily: "var(--font-body)" }}
            >
              {link.label}
            </a>
          ))}
          <a
            className="rounded-full bg-[#8B2500] px-5 py-2.5 text-xs font-semibold tracking-wide text-white transition-colors hover:bg-[#7a1f00]"
            href="#contacto"
          >
            {ctaLabel || "Reservar mesa"}
          </a>
        </div>

        <button
          className="relative z-[1] flex items-center justify-center md:hidden"
          onClick={() => setMenuOpen((v) => !v)}
          type="button"
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-[#FAF7F2]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {navLinks.map((link, i) => (
              <motion.a
                className="text-2xl font-semibold text-[#1C1917] transition-colors hover:text-[#8B2500]"
                href={link.href}
                key={link.id}
                onClick={() => setMenuOpen(false)}
                style={{
                  fontFamily: "var(--font-playfair)",
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
              className="mt-6 rounded-full bg-[#8B2500] px-8 py-3 text-sm font-semibold text-white"
              href="#contacto"
              onClick={() => setMenuOpen(false)}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: navLinks.length * 0.06 }}
            >
              {ctaLabel || "Reservar mesa"}
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
