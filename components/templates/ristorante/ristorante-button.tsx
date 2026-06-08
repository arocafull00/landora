"use client";

import { ArrowRight } from "lucide-react";

export function RistoranteButton({
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
      "bg-[#8B2500] text-white hover:bg-[#7a1f00] active:bg-[#6b1b00]",
    secondary:
      "border border-[#8B2500] text-[#8B2500] bg-transparent hover:bg-[#8B2500] hover:text-white",
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
