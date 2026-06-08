"use client";

import { ArrowRight } from "lucide-react";

export function PortfolioButton({
  children,
  href,
  variant = "primary",
  size = "md",
  icon,
  className = "",
}: {
  children: React.ReactNode;
  href?: string;
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  icon?: React.ReactNode;
  className?: string;
}) {
  const base =
    "inline-flex items-center justify-center gap-2 font-semibold tracking-wide transition-all duration-300";

  const variants = {
    primary:
      "bg-white text-[#0a0a0a] hover:bg-white/90 active:bg-white/80",
    secondary:
      "border border-white/30 text-white bg-transparent hover:bg-white/10",
  };

  const sizes = {
    sm: "px-5 py-2.5 text-xs",
    md: "px-7 py-3 text-sm",
    lg: "px-9 py-4 text-sm",
  };

  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`;

  if (href) {
    return (
      <a className={classes} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noopener noreferrer" : undefined}>
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
