"use client";

import Link from "next/link";
import { useEffect, useState, type RefObject } from "react";
import { X, Menu } from "lucide-react";
import { m, AnimatePresence, useReducedMotion } from "motion/react";
import type { BrandLogoType, EditorPageTarget, NavLink } from "@/lib/dashboard-data";
import { usePreviewBridge } from "@/components/dashboard/hooks/use-preview-bridge";
import { handleSectionNavClick } from "@/lib/scroll-to-section";
import { useAnalytics } from "@/hooks/use-analytics";
import { TemplateNavBrand } from "@/components/templates/template-nav-brand";
import { TemplateNavAnchor } from "@/components/templates/template-nav-anchor";
import { RistoranteNavLink } from "@/components/templates/ristorante/ristorante-nav-link";
import type { HeroNavTone } from "@/components/templates/shared/heroes/hero-variant-types";

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
  activePage = "home",
  brand,
  brandLogoImage,
  brandLogoType,
  cartaHref,
  cartaPageTarget,
  navLinks,
  ctaLabel,
  ctaHref,
  heroNavTone,
  homeHref = "#hero",
  homePageTarget,
  topOffset = 0,
  scrollRootRef,
}: {
  activePage?: "home" | "carta";
  brand: string;
  brandLogoImage: string;
  brandLogoType: BrandLogoType;
  cartaHref?: string;
  cartaPageTarget?: EditorPageTarget;
  navLinks: NavLink[];
  ctaLabel: string;
  ctaHref: string;
  heroNavTone: HeroNavTone;
  homeHref?: string;
  homePageTarget?: EditorPageTarget;
  topOffset?: number;
  scrollRootRef?: RefObject<HTMLElement | null>;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const reduce = useReducedMotion();
  const previewBridge = usePreviewBridge();
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
  const useLightText = navSolid || heroNavTone === "light";

  return (
    <>
      <nav
        className="fixed left-0 right-0 z-50 flex items-center justify-between px-6 py-5 transition-colors duration-300 md:px-10 lg:px-16"
        style={{
          ...(topOffset > 0 ? { top: topOffset } : { top: 0 }),
          backgroundColor: navSolid
            ? "var(--ristorante-secondary)"
            : heroNavTone === "dark"
              ? "color-mix(in srgb, var(--site-surface) 88%, transparent)"
              : "transparent",
        }}
      >
        <Link
          className={`text-2xl font-normal tracking-tight transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ristorante-accent)] focus-visible:ring-offset-2 ${
            useLightText ? "text-[var(--ristorante-foreground)]" : "text-[var(--site-text)]"
          }`}
          href={homeHref}
          onNavigate={() => {
            if (homePageTarget) {
              previewBridge?.announcePageTarget(homePageTarget);
            }
          }}
          prefetch={homePageTarget ? true : undefined}
          style={{ fontFamily: "var(--font-ristorante-display)" }}
        >
          <TemplateNavBrand
            brand={brand}
            brandLogoImage={brandLogoImage}
            brandLogoType={brandLogoType}
            className={brandLogoType === "image" ? "h-16 w-56" : undefined}
          />
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <RistoranteNavLink
              activePage={activePage}
              cartaHref={cartaHref}
              cartaPageTarget={cartaPageTarget}
              className={`text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ristorante-accent)] focus-visible:ring-offset-2 ${
                useLightText
                  ? "text-[var(--ristorante-foreground)]/80 hover:text-[var(--ristorante-accent)]"
                  : "text-[var(--site-text-muted)] hover:text-[var(--site-text)]"
              }`}
              homePageTarget={homePageTarget}
              href={link.href}
              key={link.id}
              label={link.label}
              style={{ fontFamily: "var(--font-ristorante-body)" }}
            />
          ))}
          <TemplateNavAnchor
            className="rounded-md bg-[var(--ristorante-primary)] px-5 py-2.5 text-xs font-semibold tracking-wide text-[var(--site-on-primary)] transition-colors hover:bg-[var(--ristorante-secondary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ristorante-accent)] focus-visible:ring-offset-2"
            href={ctaHref}
            onClick={() => trackCtaClick()}
          >
            {ctaLabel || "Reservar mesa"}
          </TemplateNavAnchor>
        </div>

        <button
          className={`relative z-[1] flex h-11 w-11 items-center justify-center rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ristorante-accent)] focus-visible:ring-offset-2 md:hidden ${
            useLightText
              ? "text-[var(--ristorante-foreground)] hover:bg-[var(--ristorante-foreground)]/10"
              : "text-[var(--site-text)] hover:bg-[var(--site-text)]/10"
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
              <m.div
                key={link.id}
                initial={reduce ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.06 }}
              >
                <RistoranteNavLink
                  activePage={activePage}
                  cartaHref={cartaHref}
                  cartaPageTarget={cartaPageTarget}
                  className="text-3xl font-normal text-[var(--ristorante-foreground)] transition-colors hover:text-[var(--ristorante-accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ristorante-accent)]"
                  homePageTarget={homePageTarget}
                  href={link.href}
                  label={link.label}
                  onNavigate={() => setMenuOpen(false)}
                  style={{
                    fontFamily: "var(--font-ristorante-display)",
                    lineHeight: 2.2,
                  }}
                />
              </m.div>
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
