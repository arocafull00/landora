import { ArrowRight } from "lucide-react";

const base =
  "inline-flex items-center justify-center gap-2 rounded-md font-semibold tracking-wide transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ristorante-accent)] focus-visible:ring-offset-2";

const variants = {
  primary:
    "bg-[var(--ristorante-primary)] text-[var(--site-on-primary)] hover:bg-[var(--ristorante-secondary)] active:bg-[var(--ristorante-secondary)]",
  secondary:
    "border border-[var(--ristorante-primary)] text-[var(--ristorante-primary)] bg-transparent hover:bg-[var(--ristorante-primary)] hover:text-[var(--site-on-primary)]",
  accent:
    "bg-[var(--ristorante-accent)] text-[var(--site-on-accent)] hover:bg-[var(--ristorante-accent)]/90 active:bg-[var(--ristorante-accent)]/80",
};

const sizes = {
  sm: "px-5 py-2.5 text-site-button",
  md: "px-7 py-3 text-site-button",
  lg: "px-9 py-4 text-site-button",
};

export function RistoranteButton({
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
  variant?: "primary" | "secondary" | "accent";
  size?: "sm" | "md" | "lg";
  icon?: React.ReactNode;
  className?: string;
  "data-analytics-event"?: string;
}) {
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`;

  if (href?.startsWith("http")) {
    return (
      <a
        className={classes}
        href={href} {...analyticsProps}
        target="_blank"
        rel="noopener noreferrer"
        style={{ fontFamily: "var(--font-ristorante-body)" }}
      >
        {children}
        {icon ?? <ArrowRight aria-hidden className="h-4 w-4" />}
      </a>
    );
  }

  if (href) {
    return (
      <a
        className={classes}
        href={href} {...analyticsProps}
        style={{ fontFamily: "var(--font-ristorante-body)" }}
      >
        {children}
        {icon ?? <ArrowRight aria-hidden className="h-4 w-4" />}
      </a>
    );
  }

  return (
    <button className={classes} {...analyticsProps} type="button" style={{ fontFamily: "var(--font-ristorante-body)" }}>
      {children}
      {icon}
    </button>
  );
}
