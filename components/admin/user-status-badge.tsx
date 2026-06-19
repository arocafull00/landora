import type { AdminUserDisplayStatus } from "@/lib/admin-user-display";
import { cn } from "@/lib/utils";

const STATUS_STYLES: Record<AdminUserDisplayStatus, string> = {
  active: "bg-success/10 text-success",
  trial: "bg-warning/10 text-warning",
  expired: "bg-danger/10 text-danger",
  cancelled: "bg-surface-container-high text-on-surface-variant",
  suspended: "bg-danger/10 text-danger",
};

const STATUS_LABELS: Record<AdminUserDisplayStatus, string> = {
  active: "Activo",
  trial: "Trial",
  expired: "Vencido",
  cancelled: "Cancelado",
  suspended: "Suspendido",
};

export function UserStatusBadge({ status }: { status: AdminUserDisplayStatus }) {
  return (
    <span
      className={cn(
        "inline-flex rounded-md px-2 py-0.5 font-body text-body-sm font-medium",
        STATUS_STYLES[status],
      )}
    >
      {STATUS_LABELS[status]}
    </span>
  );
}
