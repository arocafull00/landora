import type { ReactNode } from "react";

export function OficioProSectionHeader({
  accent,
  children,
  className = "",
  subtitle,
}: {
  accent?: string;
  children: ReactNode;
  className?: string;
  subtitle: string;
}) {
  return (
    <header className={`mx-auto mb-10 max-w-4xl ${className}`}>
      <p className="mb-3 font-bold uppercase tracking-[0.2em] text-[var(--site-primary)] text-site-content">
        {subtitle}
      </p>
      <h2 className="text-balance font-black uppercase leading-[1.05] tracking-normal text-[var(--site-text)] text-site-title">
        {children}
        {accent ? <span className="text-[var(--site-accent-bright)]"> {accent}</span> : null}
      </h2>
    </header>
  );
}
