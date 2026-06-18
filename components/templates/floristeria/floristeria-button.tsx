"use client";

import { ArrowRight } from "lucide-react";
import { m, useReducedMotion } from "motion/react";
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
  onClick,
}: {
  children: React.ReactNode;
  href?: string;
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  icon?: React.ReactNode | null;
  className?: string;
  onClick?: () => void;
}) {
  const reduce = useReducedMotion();
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`;

  const trailingIcon =
    icon === null ? null : icon ?? <ArrowRight className="h-4 w-4" />;

  const spring = reduce
    ? {}
    : {
        whileHover: { scale: 1.03 },
        whileTap: { scale: 0.97 },
        transition: { type: "spring" as const, stiffness: 400, damping: 20 },
      };

  const content = (
    <>
      {children}
      {trailingIcon}
    </>
  );

  if (href) {
    const isExternal = href.startsWith("http");

    if (isExternal) {
      return (
        <m.a
          className={classes}
          href={href}
          onClick={onClick}
          rel="noopener noreferrer"
          target="_blank"
          {...spring}
        >
          {content}
        </m.a>
      );
    }

    const wrapperClassName = className.includes("w-full")
      ? "flex w-full sm:inline-flex sm:w-auto"
      : "inline-flex";

    return (
      <m.div className={wrapperClassName} {...spring}>
        <TemplateNavAnchor className={classes} href={href} onClick={onClick}>
          {content}
        </TemplateNavAnchor>
      </m.div>
    );
  }

  return (
    <m.button className={classes} type="button" {...spring}>
      {content}
    </m.button>
  );
}
