"use client";

import { ArrowRight } from "lucide-react";
import { TemplateNavAnchor } from "@/components/templates/template-nav-anchor";

const base =
  "inline-flex items-center justify-center gap-2 font-semibold tracking-wide transition-all duration-300";

const variants = {
  primary: "bg-[#2D5016] text-white hover:bg-[#234012] active:bg-[#1a300e]",
  secondary:
    "border border-[#2D5016] text-[#2D5016] bg-transparent hover:bg-[#2D5016] hover:text-white",
};

const sizes = {
  sm: "px-5 py-2.5 text-xs",
  md: "px-7 py-3 text-sm",
  lg: "px-9 py-4 text-sm",
};

export function FloristeriaButton({
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
  icon?: React.ReactNode | null;
  className?: string;
}) {
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`;

  const trailingIcon =
    icon === null ? null : icon ?? <ArrowRight className="h-4 w-4" />;

  if (href) {
    const isExternal = href.startsWith("http");

    if (isExternal) {
      return (
        <a
          className={classes}
          href={href}
          rel="noopener noreferrer"
          target="_blank"
        >
          {children}
          {trailingIcon}
        </a>
      );
    }

    return (
      <TemplateNavAnchor className={classes} href={href}>
        {children}
        {trailingIcon}
      </TemplateNavAnchor>
    );
  }

  return (
    <button className={classes} type="button">
      {children}
      {trailingIcon}
    </button>
  );
}
