import type { ButtonHTMLAttributes, ReactNode } from "react";
import type { LandingStatus } from "@/lib/dashboard-data";
import { Icon } from "@/components/ui/icon";
import type { IconName } from "@/lib/dashboard-data";

export function IconButton({
  icon,
  label,
  className = "",
}: {
  icon: IconName;
  label: string;
  className?: string;
}) {
  return (
    <button
      aria-label={label}
      className={`inline-flex h-8 w-8 items-center justify-center rounded-md text-on-surface-variant transition-colors hover:bg-surface-variant hover:text-primary ${className}`}
      type="button"
    >
      <Icon name={icon} className="h-5 w-5" />
    </button>
  );
}

export function ActionButton({
  children,
  variant = "secondary",
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: "primary" | "secondary" | "danger";
}) {
  const styles = {
    primary: "bg-primary text-on-primary hover:bg-primary-fixed-variant",
    secondary:
      "border border-outline-variant bg-surface-container-lowest text-on-surface hover:bg-surface-variant",
    danger: "text-danger hover:bg-error-container",
  };

  return (
    <button
      className={`inline-flex h-9 items-center justify-center gap-2 rounded-md px-4 text-body-sm font-medium shadow-sm transition-colors ${styles[variant]} ${className}`}
      type="button"
      {...props}
    >
      {children}
    </button>
  );
}

export function StatusBadge({ status }: { status: LandingStatus | "Live" }) {
  const styles = {
    Published: "bg-success/10 text-success",
    Draft: "bg-surface-variant text-on-surface-variant",
    Changes: "bg-warning/10 text-warning",
    Live: "bg-success/10 text-success",
  };

  return (
    <span
      className={`inline-flex items-center rounded-md px-2 py-1 font-label text-label-md uppercase ${styles[status]}`}
    >
      {status}
    </span>
  );
}

export function Panel({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`rounded-lg border border-outline-variant bg-surface-container-lowest shadow-sm ${className}`}
    >
      {children}
    </section>
  );
}
