import { ArrowRight } from "lucide-react";
import { TemplateNavAnchor } from "@/components/templates/template-nav-anchor";

const base =
  "inline-flex items-center justify-center gap-2 font-semibold tracking-wide transition-[color,background-color,border-color,box-shadow,transform] duration-300";

const variants = {
  primary:
    "bg-[var(--site-primary)] text-[var(--site-on-primary)] hover:bg-[var(--site-primary-hover)]",
  secondary:
    "border border-[var(--site-primary)] text-[var(--site-primary)] hover:bg-[var(--site-primary)] hover:text-[var(--site-on-primary)]",
};

const sizes = {
  sm: "px-5 py-2.5 text-site-button",
  md: "px-7 py-3 text-site-button",
  lg: "px-9 py-4 text-site-button",
};

export function FloristeriaButton({
  children,
  href,
  variant = "primary",
  size = "md",
  icon,
  className = "",
  ...analyticsProps
}: {
  children: React.ReactNode;
  href?: string;
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  icon?: React.ReactNode | null;
  className?: string;
  "data-analytics-event"?: string;
}) {
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`;

  const trailingIcon =
    icon === null ? null : icon ?? <ArrowRight className="h-4 w-4" />;

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
        <a
          className={classes}
          href={href} {...analyticsProps}
          rel="noopener noreferrer"
          target="_blank"
        >
          {content}
        </a>
      );
    }

    const wrapperClassName = className.includes("w-full")
      ? "flex w-full sm:inline-flex sm:w-auto"
      : "inline-flex";

    return (
      <div className={wrapperClassName}>
        <TemplateNavAnchor className={classes} href={href} {...analyticsProps}>
          {content}
        </TemplateNavAnchor>
      </div>
    );
  }

  return (
    <button className={classes} {...analyticsProps} type="button">
      {content}
    </button>
  );
}
