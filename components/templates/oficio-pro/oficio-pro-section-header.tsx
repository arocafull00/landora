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
      <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-[#1F4E79]">
        {subtitle}
      </p>
      <h2 className="text-balance text-4xl font-black uppercase leading-[1.05] tracking-normal text-[#17212B] sm:text-5xl lg:text-6xl">
        {children}
        {accent ? <span className="text-[#F59E0B]"> {accent}</span> : null}
      </h2>
    </header>
  );
}
