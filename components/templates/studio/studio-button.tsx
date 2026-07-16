"use client";

import { ArrowRight } from "lucide-react";

const base =
  "inline-flex items-center justify-center gap-2 font-semibold tracking-wide transition-all duration-300";

const variants = {
  primary: "bg-[var(--site-dark)] text-white hover:bg-[var(--site-text-muted)] active:bg-[var(--site-dark)]",
  secondary:
    "border border-[var(--site-text)] text-[var(--site-text)] bg-transparent hover:bg-[var(--site-dark)] hover:text-white",
};

const sizes = {
  sm: "px-5 py-2.5 text-xs",
  md: "px-7 py-3 text-sm",
  lg: "px-9 py-4 text-sm",
};

export function StudioButton({
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
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  icon?: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`;

  if (href) {
    return (
      <a className={classes} href={href} onClick={onClick} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noopener noreferrer" : undefined}>
        {children}
        {icon ?? <ArrowRight className="h-4 w-4" />}
      </a>
    );
  }

  return (
    <button className={classes} type="button">
      {children}
      {icon}
    </button>
  );
}
