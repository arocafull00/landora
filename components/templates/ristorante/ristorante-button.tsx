"use client";

import { ArrowRight } from "lucide-react";

const base =
  "inline-flex items-center justify-center gap-2 rounded-md font-semibold tracking-wide transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ristorante-accent)] focus-visible:ring-offset-2";

const variants = {
  primary:
    "bg-[var(--ristorante-primary)] text-[var(--ristorante-foreground)] hover:bg-[var(--ristorante-secondary)] active:bg-[var(--ristorante-secondary)]",
  secondary:
    "border border-[var(--ristorante-primary)] text-[var(--ristorante-primary)] bg-transparent hover:bg-[var(--ristorante-primary)] hover:text-[var(--ristorante-foreground)]",
  accent:
    "bg-[var(--ristorante-accent)] text-[var(--ristorante-secondary)] hover:bg-[var(--ristorante-accent)]/90 active:bg-[var(--ristorante-accent)]/80",
};

const sizes = {
  sm: "px-5 py-2.5 text-xs",
  md: "px-7 py-3 text-sm",
  lg: "px-9 py-4 text-sm",
};

export function RistoranteButton({
  children,
  href,
  variant = "primary",
  size = "md",
  icon,
  className = "",
  onClick,
}: {
  children: React.ReactNode;
  href?: string;
  variant?: "primary" | "secondary" | "accent";
  size?: "sm" | "md" | "lg";
  icon?: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`;

  if (href) {
    return (
      <a
        className={classes}
        href={href}
        onClick={onClick}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
        style={{ fontFamily: "var(--font-ristorante-body)" }}
      >
        {children}
        {icon ?? <ArrowRight className="h-4 w-4" />}
      </a>
    );
  }

  return (
    <button className={classes} type="button" style={{ fontFamily: "var(--font-ristorante-body)" }}>
      {children}
      {icon}
    </button>
  );
}
