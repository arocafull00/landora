import type { NavLink } from "@/lib/dashboard-data";
import { SignalNavItem } from "@/components/templates/signal/signal-nav-item";

function sceneFromHref(href: string) {
  if (!href.startsWith("#")) return "";
  return href.slice(1);
}

export function SignalNav({
  brand,
  navLinks,
  topOffset = 0,
}: {
  brand: string;
  navLinks: NavLink[];
  topOffset?: number;
}) {
  return (
    <header
      className="pointer-events-none fixed inset-x-0 z-40 bg-[var(--site-dark)]/95 backdrop-blur-sm"
      style={{ top: topOffset }}
    >
      <div className="pointer-events-auto mx-auto flex max-w-[100rem] flex-col gap-4 px-5 py-4 sm:px-8 md:flex-row md:items-center md:justify-between md:gap-8 lg:px-12">
        <a
          className="shrink-0 font-bold uppercase tracking-[0.12em] text-[var(--site-on-dark)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--site-accent)]"
          href="#hero"
          style={{ fontFamily: "var(--site-font-display)" }}
        >
          {brand}
        </a>
        <nav
          aria-label="Secciones"
          className="flex max-w-full items-center gap-5 overflow-x-auto whitespace-nowrap md:gap-7"
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
      </div>
      <div
        aria-hidden
        className="h-px origin-left bg-[var(--site-on-dark)]/15"
      >
        <div
          className="h-full origin-left scale-x-0 bg-[var(--site-accent)] transition-transform duration-300"
          data-signal-progress-fill
        />
      </div>
    </header>
  );
}
