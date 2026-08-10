import { ArrowRight } from "lucide-react";

export function SignalCtaButton({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  return (
    <a
      className="group relative inline-flex items-center gap-3 overflow-hidden border border-[var(--site-on-dark)] bg-transparent px-6 py-4 font-semibold uppercase tracking-[0.2em] text-[var(--site-on-dark)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--site-accent)] text-site-button"
      href={href}
      style={{ fontFamily: "var(--site-font-body)" }}
      data-analytics-event="cta_click lead_generated"
    >
      <span
        aria-hidden
        className="absolute inset-0 origin-left scale-x-0 bg-[var(--site-on-dark)] transition-transform duration-300 group-hover:scale-x-100"
      />
      <span className="relative z-10 transition-colors group-hover:text-[var(--site-dark)]">
        {label}
      </span>
      <ArrowRight
        aria-hidden
        className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-2 group-hover:text-[var(--site-dark)]"
      />
    </a>
  );
}
