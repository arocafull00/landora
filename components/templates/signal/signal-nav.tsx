import type { NavLink } from "@/lib/dashboard-data";
import { SignalNavItem } from "@/components/templates/signal/signal-nav-item";
import { getSignalMark } from "@/components/templates/signal/signal-copy";

function sceneFromHref(href: string) {
  if (!href.startsWith("#")) return "";
  return href.slice(1);
}

export function SignalNav({
  brand,
  navLinks,
  ctaLabel,
  ctaHref,
  topOffset = 0,
}: {
  brand: string;
  navLinks: NavLink[];
  ctaLabel: string;
  ctaHref: string;
  topOffset?: number;
}) {
  const mark = getSignalMark(brand);

  return (
    <header
      className="pointer-events-none fixed inset-x-0 z-40"
      style={{ top: topOffset }}
    >
      <div className="pointer-events-auto flex items-center justify-between gap-4 px-4 py-4 md:px-8">
        <a
          className="font-bold uppercase tracking-[0.22em] text-[var(--site-on-dark)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--site-accent)] text-site-content"
          href="#hero"
          style={{ fontFamily: "var(--site-font-display)" }}
        >
          {mark}
        </a>
        <nav
          aria-label="Secciones"
          className="hidden items-center gap-5 lg:flex"
        >
          {navLinks.map((link) => (
            <SignalNavItem
              key={link.id}
              href={link.href}
              label={link.label}
              scene={sceneFromHref(link.href)}
            />
          ))}
        </nav>
        <a
          className="font-semibold uppercase tracking-[0.18em] text-[var(--site-on-dark)] underline decoration-transparent underline-offset-4 transition-[text-decoration-color] hover:decoration-current focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--site-accent)] text-site-content"
          href={ctaHref}
          style={{ fontFamily: "var(--site-font-body)" }}
        >
          {ctaLabel || "Proyecto"} ↗
        </a>
      </div>
      <div
        aria-hidden
        className="mx-4 h-px origin-left bg-[var(--site-on-dark)]/25 md:mx-8"
      >
        <div
          className="h-full origin-left scale-x-0 bg-[var(--site-accent)] transition-transform duration-300"
          data-signal-progress-fill
        />
      </div>
    </header>
  );
}
