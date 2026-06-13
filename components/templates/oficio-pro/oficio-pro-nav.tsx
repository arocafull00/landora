"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import type { NavLink } from "@/lib/dashboard-data";
import { TemplateNavBrand } from "@/components/templates/template-nav-brand";

export function OficioProNav({
  brand,
  brandLogoImage,
  brandLogoType,
  navLinks,
  topOffset = 0,
}: {
  brand: string;
  brandLogoImage: string;
  brandLogoType: "text" | "image";
  navLinks: NavLink[];
  topOffset?: number;
}) {
  const [open, setOpen] = useState(false);
  const [atHero, setAtHero] = useState(true);

  useEffect(() => {
    const update = () => {
      const hero = document.getElementById("hero");
      setAtHero(Boolean(hero && hero.getBoundingClientRect().bottom > 56 + topOffset));
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [topOffset]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const headerClass =
    atHero && !open
      ? "border-white/15 bg-transparent text-white shadow-none"
      : "border-white/50 bg-[#FEFCFD]/95 text-[#17212B] shadow-[0_12px_40px_rgba(15,23,42,0.14)]";

  return (
    <>
      <header
        className={`fixed left-0 right-0 z-50 h-[72px] border-b px-4 backdrop-blur-xl transition-all duration-300 sm:px-6 lg:px-10 ${headerClass}`}
        style={{ top: topOffset }}
      >
        <nav className="mx-auto flex h-full max-w-7xl items-center justify-between gap-8">
          <a className="flex h-11 items-center" href="#hero">
            <TemplateNavBrand
              brand={brand}
              brandLogoImage={brandLogoImage}
              brandLogoType={brandLogoType}
              className={atHero && !open ? "text-white" : "text-[#17212B]"}
            />
          </a>
          <div className="hidden items-center gap-1.5 font-semibold lg:flex">
            {navLinks.map((link) => (
              <a
                className={`rounded-xl px-3 py-2 text-[0.95rem] transition-all ${
                  atHero
                    ? "text-white/90 hover:bg-white/15 hover:text-white"
                    : "text-[#4A4A4A] hover:bg-white hover:text-[#1F4E79]"
                }`}
                href={link.href}
                key={link.id}
              >
                {link.label}
              </a>
            ))}
            <a
              className="ml-2 inline-flex items-center justify-center rounded-xl bg-[#1F4E79] px-4 py-2 text-sm font-semibold text-white shadow-[0_8px_20px_rgba(31,78,121,0.28)] transition-all hover:-translate-y-0.5 hover:bg-[#F59E0B] hover:text-[#17212B]"
              href="#contacto"
            >
              Contacto
            </a>
          </div>
          <button
            aria-controls="oficio-pro-mobile-nav"
            aria-expanded={open}
            aria-label={open ? "Cerrar menú de navegación" : "Abrir menú de navegación"}
            className={`inline-flex size-11 items-center justify-center rounded-xl border shadow-[0_6px_18px_rgba(31,78,121,0.12)] lg:hidden ${
              atHero && !open
                ? "border-white/35 bg-white/10 text-white"
                : "border-[#1F4E79]/20 bg-white/90 text-[#1F4E79]"
            }`}
            onClick={() => setOpen((value) => !value)}
            type="button"
          >
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </nav>
      </header>
      <div
        className={`fixed inset-0 z-40 bg-slate-900/55 backdrop-blur-sm transition-opacity lg:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setOpen(false)}
      />
      <div
        className={`fixed inset-x-0 bottom-0 z-40 flex max-h-[calc(100dvh-72px)] flex-col bg-[#FEFCFD] shadow-[0_-12px_48px_rgba(15,23,42,0.18)] transition-transform duration-300 lg:hidden ${
          open ? "translate-y-0" : "translate-y-full"
        }`}
        id="oficio-pro-mobile-nav"
        role="dialog"
        style={{ top: topOffset + 72 }}
      >
        <div className="flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto px-4 pb-8 pt-5">
          {navLinks.map((link) => (
            <a
              className="w-full rounded-xl px-3 py-3 text-lg font-semibold text-[#17212B] transition-colors hover:bg-[#1F4E79]/10 hover:text-[#1F4E79]"
              href={link.href}
              key={link.id}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            className="mt-3 inline-flex w-full items-center justify-center rounded-xl bg-[#1F4E79] px-3 py-3 text-base font-semibold text-white shadow-[0_8px_20px_rgba(31,78,121,0.22)] transition-all hover:bg-[#F59E0B] hover:text-[#17212B]"
            href="#contacto"
            onClick={() => setOpen(false)}
          >
            Contacto
          </a>
        </div>
      </div>
    </>
  );
}
