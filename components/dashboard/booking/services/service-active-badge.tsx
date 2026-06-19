import { cn } from "@/lib/utils";

export function ServiceActiveBadge({ active }: { active: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md px-2 py-1 font-body text-body-sm",
        active
          ? "bg-success/10 text-success"
          : "bg-surface-container-high text-on-surface-variant",
      )}
    >
      <span
        aria-hidden
        className={cn(
          "h-1.5 w-1.5 shrink-0 rounded-full",
          active ? "bg-success" : "bg-outline",
        )}
      />
      {active ? "Activo" : "Inactivo"}
    </span>
  );
}
