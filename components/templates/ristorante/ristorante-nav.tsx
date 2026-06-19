"use client";

import { useEffect, useState, type RefObject } from "react";
import { X, Menu } from "lucide-react";
import { m, AnimatePresence, useReducedMotion } from "motion/react";
import type { BrandLogoType, NavLink } from "@/lib/dashboard-data";
import { handleSectionNavClick } from "@/lib/scroll-to-section";
import { useAnalytics } from "@/hooks/use-analytics";
import { TemplateNavBrand } from "@/components/templates/template-nav-brand";
import { TemplateNavAnchor } from "@/components/templates/template-nav-anchor";

function getScrollTargets(el: HTMLElement | null) {
  const targets: (Window | Element)[] = [window];
  let node = el?.parentElement;

  while (node) {
    const { overflowY, overflow } = getComputedStyle(node);
    if (
      overflowY === "auto" ||
      overflowY === "scroll" ||
      overflow === "auto" ||
      overflow === "scroll"
    ) {
      targets.push(node);
    }
    node = node.parentElement;
  }

  return targets;
}

function getScrollTop(targets: (Window | Element)[]) {
  let max = 0;
  for (const target of targets) {
    const top = target === window ? window.scrollY : (target as Element).scrollTop;
    if (top > max) max = top;
  }
  return max;
}

export function RistoranteNav({
  brand,
  brandLogoImage,
  brandLogoType,
  navLinks,
  ctaLabel,
  ctaHref,
  topOffset = 0,
  scrollRootRef,
}: {
  brand: string;
  brandLogoImage: string;
  brandLogoType: BrandLogoType;
  navLinks: NavLink[];
  ctaLabel: string;
  ctaHref: string;
  topOffset?: number;
  scrollRootRef?: RefObject<HTMLElement | null>;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const reduce = useReducedMotion();
  const { trackCtaClick } = useAnalytics();

  useEffect(() => {
    const targets = getScrollTargets(scrollRootRef?.current ?? null);

    const handleScroll = () => {
      setScrolled(getScrollTop(targets) > 80);
    };

    handleScroll();
    for (const target of targets) {
      target.addEventListener("scroll", handleScroll, { passive: true });
    }

    return () => {
      for (const target of targets) {
        target.removeEventListener("scroll", handleScroll);
      }
    };
  }, [scrollRootRef]);

  const navSolid = scrolled || menuOpen;

  return (
    <>
      <nav
        className="fixed left-0 right-0 z-50 flex items-center justify-between px-6 py-5 transition-colors duration-300 md:px-10 lg:px-16"
        style={{
          ...(topOffset > 0 ? { top: topOffset } : { top: 0 }),
          backgroundColor: navSolid ? "var(--ristorante-secondary)" : "transparent",
        }}
      >
        <TemplateNavAnchor
          className={`text-2xl font-normal tracking-tight transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ristorante-accent)] focus-visible:ring-offset-2 ${
            navSolid ? "text-[var(--ristorante-foreground)]" : "text-[var(--ristorante-foreground)]"
          }`}
          href="#hero"
          style={{ fontFamily: "var(--font-ristorante-display)" }}
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
              className={`text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ristorante-accent)] focus-visible:ring-offset-2 ${
                navSolid
                  ? "text-[var(--ristorante-foreground)]/80 hover:text-[var(--ristorante-accent)]"
                  : "text-[var(--ristorante-foreground)]/90 hover:text-[var(--ristorante-accent)]"
              }`}
              href={link.href}
              key={link.id}
              style={{ fontFamily: "var(--font-ristorante-body)" }}
            >
              {link.label}
            </TemplateNavAnchor>
          ))}
          <TemplateNavAnchor
            className="rounded-md bg-[var(--ristorante-primary)] px-5 py-2.5 text-xs font-semibold tracking-wide text-[var(--ristorante-foreground)] transition-colors hover:bg-[var(--ristorante-secondary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ristorante-accent)] focus-visible:ring-offset-2"
            href={ctaHref}
            onClick={() => trackCtaClick()}
          >
            {ctaLabel || "Reservar mesa"}
          </TemplateNavAnchor>
        </div>

        <button
          className={`relative z-[1] flex h-11 w-11 items-center justify-center rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ristorante-accent)] focus-visible:ring-offset-2 md:hidden ${
            navSolid
              ? "text-[var(--ristorante-foreground)] hover:bg-[var(--ristorante-foreground)]/10"
              : "text-[var(--ristorante-foreground)] hover:bg-[var(--ristorante-foreground)]/10"
          }`}
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
            className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-[var(--ristorante-primary)]"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {navLinks.map((link, i) => (
              <m.a
                className="text-3xl font-normal text-[var(--ristorante-foreground)] transition-colors hover:text-[var(--ristorante-accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ristorante-accent)]"
                href={link.href}
                key={link.id}
                onClick={(event) =>
                  handleSectionNavClick(event, link.href, () => setMenuOpen(false))
                }
                style={{
                  fontFamily: "var(--font-ristorante-display)",
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
              className="mt-6 rounded-md bg-[var(--ristorante-secondary)] px-8 py-3 text-sm font-semibold text-[var(--ristorante-foreground)] transition-colors hover:bg-[var(--ristorante-secondary)]/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ristorante-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--ristorante-primary)]"
              href={ctaHref}
              onClick={(event) => {
                trackCtaClick();
                handleSectionNavClick(event, ctaHref, () => setMenuOpen(false));
              }}
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
