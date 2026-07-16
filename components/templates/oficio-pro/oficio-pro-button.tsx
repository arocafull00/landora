import type { ReactNode } from "react";

export function OficioProButton({
  children,
  className = "",
  href,
  variant = "primary",
  onClick,
}: {
  children: ReactNode;
  className?: string;
  href: string;
  variant?: "primary" | "secondary";
  onClick?: () => void;
}) {
  const classes =
    variant === "primary"
      ? "bg-[var(--site-primary)] text-white shadow-[0_12px_30px_rgba(31,78,121,0.25)] hover:bg-[var(--site-accent-bright)] hover:text-[var(--site-text)]"
      : "border border-white/35 bg-black/25 text-white backdrop-blur-md hover:bg-black/40";

  return (
    <a
      className={`inline-flex min-h-[3.25rem] items-center justify-center gap-2 rounded-xl px-8 py-4 text-center text-base font-bold transition-[color,background-color,border-color,box-shadow,transform] hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-[var(--site-accent-bright)]/35 sm:text-lg ${classes} ${className}`}
      href={href}
      onClick={onClick}
    >
      {children}
    </a>
  );
}
