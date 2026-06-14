import type { ButtonHTMLAttributes, ReactNode } from "react";
import type { LandingStatus } from "@/lib/dashboard-data";
import { Icon } from "@/components/ui/icon";
import type { IconName } from "@/lib/dashboard-data";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const ACTION_BUTTON_STYLES = {
  primary: "bg-primary text-on-primary hover:bg-primary-fixed-variant",
  secondary:
    "border border-outline-variant bg-surface-container-lowest text-on-surface hover:bg-surface-variant",
  danger: "text-danger hover:bg-error-container",
} as const;

const STATUS_BADGE_STYLES = {
  Published: "bg-success/10 text-success",
  Draft: "bg-surface-variant text-on-surface-variant",
  Changes: "bg-warning/10 text-warning",
  Live: "bg-success/10 text-success",
} as const;

export function IconButton({
  icon,
  id,
  label,
  className = "",
  onClick,
}: {
  icon: IconName;
  id?: string;
  label: string;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          aria-label={label}
          className={`inline-flex h-8 w-8 items-center justify-center rounded-md text-on-surface-variant transition-colors hover:bg-surface-variant hover:text-primary ${className}`}
          id={id}
          onClick={onClick}
          type="button"
        >
          <Icon name={icon} className="h-5 w-5" />
        </button>
      </TooltipTrigger>
      <TooltipContent>
        <p>{label}</p>
      </TooltipContent>
    </Tooltip>
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
  return (
    <button
      className={`inline-flex h-9 items-center justify-center gap-2 rounded-md px-4 text-body-sm font-medium shadow-sm transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${ACTION_BUTTON_STYLES[variant]} ${className}`}
      type="button"
      {...props}
    >
      {children}
    </button>
  );
}

export function StatusBadge({ status }: { status: LandingStatus | "Live" }) {
  return (
    <span
      className={`inline-flex items-center rounded-md px-2 py-1 font-label text-label-md uppercase ${STATUS_BADGE_STYLES[status]}`}
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
