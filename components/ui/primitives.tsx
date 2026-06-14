import type { ButtonHTMLAttributes, ReactNode } from "react";
import type { LandingStatus } from "@/lib/dashboard-data";
import { Icon } from "@/components/ui/icon";
import type { IconName } from "@/lib/dashboard-data";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const ACTION_BUTTON_STYLES = {
  primary:
    "h-10 bg-primary font-semibold text-on-primary transition-colors duration-150 hover:bg-primary-fixed-variant",
  secondary:
    "h-10 border border-outline-variant bg-surface-container-lowest text-on-surface transition-colors duration-150 hover:bg-surface-container-high",
  danger:
    "h-10 text-danger transition-colors duration-150 hover:bg-error-container",
} as const;

const STATUS_BADGE_STYLES = {
  Published: "bg-success/10 text-success",
  Draft: "bg-surface-variant text-on-surface-variant",
  Changes: "bg-warning/10 text-warning",
  Live: "bg-success/10 text-success",
} as const;

const STATUS_DOT_STYLES = {
  Published: "bg-success",
  Draft: "bg-outline",
  Changes: "bg-warning",
  Live: "bg-success",
} as const;

const STATUS_LABELS: Record<LandingStatus | "Live", string> = {
  Published: "Publicada",
  Draft: "Borrador",
  Changes: "Cambios",
  Live: "Activo",
};

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
          className={`inline-flex h-8 w-8 items-center justify-center rounded-md text-on-surface-variant transition-colors duration-150 hover:bg-surface-container-high hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${className}`}
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
      className={`inline-flex items-center justify-center gap-2 rounded-md px-4 text-body-sm font-medium disabled:cursor-not-allowed disabled:opacity-50 ${ACTION_BUTTON_STYLES[variant]} ${className}`}
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
      className={`inline-flex items-center gap-1.5 rounded-md px-2 py-1 font-body text-body-sm ${STATUS_BADGE_STYLES[status]}`}
    >
      <span
        aria-hidden
        className={`h-1.5 w-1.5 shrink-0 rounded-full ${STATUS_DOT_STYLES[status]}`}
      />
      {STATUS_LABELS[status]}
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
      className={`rounded-lg border border-outline-variant bg-surface-container-lowest ${className}`}
    >
      {children}
    </section>
  );
}
