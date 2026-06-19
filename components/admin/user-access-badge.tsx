import { KeyRound, Lock } from "lucide-react";
import type { AccessType } from "@/db/schema";
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

export function UserAccessBadge({ accessType }: { accessType: AccessType }) {
  const config = ACCESS_CONFIG[accessType];
  const Icon = config.icon;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 font-body text-body-sm font-medium",
        config.className,
      )}
    >
      <Icon className="size-3.5" />
      {config.label}
    </span>
  );
}
