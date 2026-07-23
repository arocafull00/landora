import { CalendarDays, KeyRound, Lock } from "lucide-react";
import type { AccessType } from "@/lib/domain/dtos";
import { cn } from "@/lib/utils";

const ACCESS_CONFIG: Record<
  AccessType,
  { label: string; icon: typeof Lock; className: string }
> = {
  subscription: {
    label: "Por suscripción",
    icon: Lock,
    className: "bg-success/10 text-success",
  },
  manual: {
    label: "Acceso manual",
    icon: KeyRound,
    className: "bg-primary-fixed text-primary-fixed-variant",
  },
};

export function UserAccessBadge({
  accessType,
  bookingManualAccess,
}: {
  accessType: AccessType;
  bookingManualAccess: boolean;
}) {
  const config = ACCESS_CONFIG[accessType];
  const Icon = config.icon;

  return (
    <div className="flex flex-col items-start gap-1.5">
      <span
        className={cn(
          "inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 font-body text-body-sm font-medium",
          config.className,
        )}
      >
        <Icon aria-hidden className="size-3.5" />
        {config.label}
      </span>
      {accessType === "manual" && bookingManualAccess ? (
        <span className="inline-flex items-center gap-1.5 rounded-md bg-primary-subtle px-2 py-0.5 font-body text-body-sm font-medium text-primary-light">
          <CalendarDays aria-hidden className="size-3.5" />
          Reservas
        </span>
      ) : null}
    </div>
  );
}
