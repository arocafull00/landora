"use client";

import Link from "next/link";
import type { ReactNode } from "react";

const baseClasses =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--site-primary)] focus-visible:ring-offset-2 transition-all duration-300 cursor-pointer font-[family-name:var(--font-syne)] font-medium tracking-widest rounded-full";

const sizeClasses = {
  sm: "h-10 px-6 py-2 text-xs",
  md: "h-11 px-8 py-6 text-sm",
  lg: "h-12 px-10 py-7 text-base",
};

const variantClasses = {
  primary:
    "border-2 border-transparent bg-[var(--site-primary)] hover:bg-[var(--site-dark)] text-[var(--site-on-dark)] hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] active:scale-[0.98]",
  secondary:
    "border-2 border-[var(--site-primary)] text-[var(--site-primary)] bg-transparent hover:bg-[var(--site-primary)] hover:text-[var(--site-on-dark)] active:scale-[0.98]",
};

export function VelarButton({
  href,
  variant = "primary",
  size = "md",
  icon,
  children,
  className = "",
  onClick,
}: {
  href: string;
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  const classes = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`;

  const isExternalLink =
    href.startsWith("http://") ||
    href.startsWith("https://") ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:");

  if (isExternalLink) {
    return (
      <a
        href={href}
        className={classes}
        onClick={onClick}
        target="_blank"
        rel="noopener noreferrer"
      >
        {icon}
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} onClick={onClick}>
      {icon}
      {children}
    </Link>
  );
}
