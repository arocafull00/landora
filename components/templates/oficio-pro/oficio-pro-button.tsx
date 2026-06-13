import type { ReactNode } from "react";

export function OficioProButton({
  children,
  className = "",
  href,
  variant = "primary",
}: {
  children: ReactNode;
  className?: string;
  href: string;
  variant?: "primary" | "secondary";
}) {
  const classes =
    variant === "primary"
      ? "bg-[#1F4E79] text-white shadow-[0_12px_30px_rgba(31,78,121,0.25)] hover:bg-[#F59E0B] hover:text-[#17212B]"
      : "border border-white/35 bg-black/25 text-white backdrop-blur-md hover:bg-black/40";

  return (
    <a
      className={`inline-flex min-h-[3.25rem] items-center justify-center gap-2 rounded-xl px-8 py-4 text-center text-base font-bold transition-all hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-[#F59E0B]/35 sm:text-lg ${classes} ${className}`}
      href={href}
    >
      {children}
    </a>
  );
}
