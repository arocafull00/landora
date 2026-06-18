"use client";

import { ArrowRight } from "lucide-react";

const base =
  "inline-flex items-center justify-center gap-2 rounded-xl font-semibold tracking-wide transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--coffee-accent)] focus-visible:ring-offset-2";

const variants = {
  primary:
    "bg-[var(--coffee-primary)] text-[var(--coffee-foreground)] hover:bg-[var(--coffee-secondary)]",
  secondary:
    "border border-[var(--coffee-primary)] text-[var(--coffee-primary)] bg-transparent hover:bg-[var(--coffee-primary)] hover:text-[var(--coffee-foreground)]",
  accent:
    "bg-[var(--coffee-accent)] text-[var(--coffee-foreground)] hover:bg-[var(--coffee-accent)]/90",
};

const sizes = {
  sm: "px-5 py-2.5 text-xs",
  md: "px-7 py-3 text-sm",
  lg: "px-9 py-4 text-sm",
};

export function CoffeeShopButton({
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
        style={{ fontFamily: "var(--font-coffee-body)" }}
      >
        {children}
        {icon ?? <ArrowRight className="h-4 w-4" />}
      </a>
    );
  }

  return (
    <button className={classes} type="button" style={{ fontFamily: "var(--font-coffee-body)" }}>
      {children}
      {icon}
    </button>
  );
}
