import type { ReactNode } from "react";
import { Info, Lightbulb } from "lucide-react";
import { cn } from "@/lib/utils";

export function BookingCallout({
  variant,
  children,
  className,
}: {
  variant: "info" | "tip";
  children: ReactNode;
  className?: string;
}) {
  const Icon = variant === "info" ? Info : Lightbulb;

  return (
    <div
      className={cn(
        "flex gap-2.5 rounded-lg border px-3 py-2.5 font-body text-body-sm",
        variant === "info"
          ? "border-primary/20 bg-primary/5 text-on-surface"
          : "border-warning/30 bg-warning/10 text-on-surface",
        className,
      )}
    >
      <Icon
        className={cn(
          "mt-0.5 h-4 w-4 shrink-0",
          variant === "info" ? "text-primary" : "text-warning",
        )}
        aria-hidden
      />
      <p>{children}</p>
    </div>
  );
}
