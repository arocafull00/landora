"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import type { NavLink } from "@/lib/dashboard-data";
import { TemplateNavBrand } from "@/components/templates/template-nav-brand";
import { useAnalytics } from "@/hooks/use-analytics";
import type { HeroNavTone } from "@/components/templates/shared/heroes/hero-variant-types";

export function OficioProNav({
  brand,
  brandLogoImage,
  brandLogoType,
  navLinks,
  ctaHref,
  heroNavTone,
  topOffset = 0,
}: {
  brand: string;
  brandLogoImage: string;
  brandLogoType: "text" | "image";
  navLinks: NavLink[];
  ctaHref: string;
  heroNavTone: HeroNavTone;
  topOffset?: number;
}) {
  const [open, setOpen] = useState(false);
  const [atHero, setAtHero] = useState(true);
  const { trackCtaClick } = useAnalytics();
  const useLightText = atHero && !open && heroNavTone === "light";

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
    useLightText
      ? "border-white/15 bg-transparent text-white shadow-none"
      : "border-[var(--site-border)] bg-[var(--site-surface)]/95 text-[var(--site-text)] shadow-lg";

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
              className={useLightText ? "text-white" : "text-[var(--site-text)]"}
            />
          </a>
          <div className="hidden items-center gap-1.5 font-semibold lg:flex">
            {navLinks.map((link) => (
              <a
                className={`rounded-xl px-3 py-2 text-[0.95rem] transition-all ${
                  useLightText
                    ? "text-white/90 hover:bg-[var(--site-surface)]/15 hover:text-white"
                    : "text-[var(--site-text-muted)] hover:bg-[var(--site-surface)] hover:text-[var(--site-primary)]"
                }`}
                href={link.href}
                key={link.id}
              >
                {link.label}
              </a>
            ))}
            <a
              className="ml-2 inline-flex items-center justify-center rounded-xl bg-[var(--site-primary)] px-4 py-2 text-sm font-semibold text-white shadow-[0_8px_20px_rgba(31,78,121,0.28)] transition-all hover:-translate-y-0.5 hover:bg-[var(--site-accent-bright)] hover:text-[var(--site-text)]"
              href={ctaHref}
              onClick={() => trackCtaClick()}
            >
              Contacto
            </a>
          </div>
          <button
            aria-controls="oficio-pro-mobile-nav"
            aria-expanded={open}
            aria-label={open ? "Cerrar menú de navegación" : "Abrir menú de navegación"}
            className={`inline-flex size-11 items-center justify-center rounded-xl border shadow-[0_6px_18px_rgba(31,78,121,0.12)] lg:hidden ${
              useLightText
                ? "border-white/35 bg-[var(--site-surface)]/10 text-white"
                : "border-[var(--site-primary)]/20 bg-[var(--site-surface)]/90 text-[var(--site-primary)]"
            }`}
            onClick={() => setOpen((value) => !value)}
            type="button"
          >
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </nav>
      </header>
      <button
        aria-label="Cerrar menú"
        className={`fixed inset-0 z-40 bg-slate-900/55 backdrop-blur-sm transition-opacity lg:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setOpen(false)}
        type="button"
      />
      <dialog
        aria-labelledby="oficio-pro-mobile-nav-title"
        className={`fixed inset-x-0 bottom-0 z-40 m-0 flex max-h-[calc(100dvh-72px)] w-full max-w-none flex-col border-0 bg-[var(--site-surface)] p-0 shadow-[0_-12px_48px_rgba(15,23,42,0.18)] transition-transform duration-300 lg:hidden ${
          open ? "translate-y-0" : "translate-y-full"
        }`}
        id="oficio-pro-mobile-nav"
        open={open}
        style={{ top: topOffset + 72 }}
      >
        <div className="flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto px-4 pb-8 pt-5">
          <p id="oficio-pro-mobile-nav-title" className="px-3 pb-2 text-sm font-semibold text-[var(--site-text)]">
            Menú
          </p>
          {navLinks.map((link) => (
            <a
              className="w-full rounded-xl px-3 py-3 text-lg font-semibold text-[var(--site-text)] transition-colors hover:bg-[var(--site-primary)]/10 hover:text-[var(--site-primary)]"
              href={link.href}
              key={link.id}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            className="mt-3 inline-flex w-full items-center justify-center rounded-xl bg-[var(--site-primary)] px-3 py-3 text-base font-semibold text-white shadow-[0_8px_20px_rgba(31,78,121,0.22)] transition-all hover:bg-[var(--site-accent-bright)] hover:text-[var(--site-text)]"
            href={ctaHref}
            onClick={() => {
              trackCtaClick();
              setOpen(false);
            }}
          >
            Contacto
          </a>
        </div>
      </dialog>
    </>
  );
}
