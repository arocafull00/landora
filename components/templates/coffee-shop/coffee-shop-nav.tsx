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

export function CoffeeShopNav({
  brand,
  brandLogoImage,
  brandLogoType,
  navLinks,
  ctaLabel,
  topOffset = 0,
  scrollRootRef,
}: {
  brand: string;
  brandLogoImage: string;
  brandLogoType: BrandLogoType;
  navLinks: NavLink[];
  ctaLabel: string;
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
      setScrolled(getScrollTop(targets) > 60);
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
        className="fixed left-0 right-0 z-50 flex items-center justify-between px-6 py-4 transition-colors duration-300 md:px-10 lg:px-16"
        style={{
          ...(topOffset > 0 ? { top: topOffset } : { top: 0 }),
          backgroundColor: navSolid ? "var(--coffee-secondary)" : "transparent",
        }}
      >
        <TemplateNavAnchor
          className="text-xl font-semibold tracking-tight text-[var(--coffee-foreground)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--coffee-accent)] focus-visible:ring-offset-2"
          href="#hero"
          style={{ fontFamily: "var(--font-coffee-display)" }}
        >
          <TemplateNavBrand
            brand={brand}
            brandLogoImage={brandLogoImage}
            brandLogoType={brandLogoType}
          />
        </TemplateNavAnchor>

        <div className="hidden items-center gap-7 md:flex">
          {navLinks.map((link) => (
            <TemplateNavAnchor
              className="text-sm font-medium text-[var(--coffee-foreground)]/85 transition-colors hover:text-[var(--coffee-accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--coffee-accent)] focus-visible:ring-offset-2"
              href={link.href}
              key={link.id}
              style={{ fontFamily: "var(--font-coffee-body)" }}
            >
              {link.label}
            </TemplateNavAnchor>
          ))}
          <TemplateNavAnchor
            className="rounded-xl bg-[var(--coffee-accent)] px-5 py-2.5 text-xs font-semibold text-[var(--coffee-foreground)] transition-colors hover:bg-[var(--coffee-accent)]/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--coffee-accent)] focus-visible:ring-offset-2"
            href="#contacto"
            style={{ fontFamily: "var(--font-coffee-body)" }}
            onClick={() => trackCtaClick()}
          >
            {ctaLabel || "Ver carta"}
          </TemplateNavAnchor>
        </div>

        <button
          className="relative z-[1] flex h-11 w-11 items-center justify-center rounded-xl text-[var(--coffee-foreground)] transition-colors hover:bg-[var(--coffee-foreground)]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--coffee-accent)] focus-visible:ring-offset-2 md:hidden"
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
            className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-[var(--coffee-primary)]"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {navLinks.map((link, i) => (
              <m.a
                className="text-2xl font-semibold text-[var(--coffee-foreground)] transition-colors hover:text-[var(--coffee-accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--coffee-accent)]"
                href={link.href}
                key={link.id}
                onClick={(event) =>
                  handleSectionNavClick(event, link.href, () => setMenuOpen(false))
                }
                style={{
                  fontFamily: "var(--font-coffee-display)",
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
              className="mt-6 rounded-xl bg-[var(--coffee-accent)] px-8 py-3 text-sm font-semibold text-[var(--coffee-foreground)] transition-colors hover:bg-[var(--coffee-accent)]/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--coffee-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--coffee-primary)]"
              href="#contacto"
              onClick={(event) => {
                trackCtaClick();
                handleSectionNavClick(event, "#contacto", () => setMenuOpen(false));
              }}
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: navLinks.length * 0.06 }}
            >
              {ctaLabel || "Ver carta"}
            </m.a>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}
