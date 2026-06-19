import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function BookingFormField({
  label,
  htmlFor,
  description,
  children,
  className,
}: {
  label: string;
  htmlFor?: string;
  description?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("space-y-2", className)}>
      <div className="space-y-0.5">
        <label
          className="font-body text-body-sm font-medium text-on-surface"
          htmlFor={htmlFor}
        >
          {label}
        </label>
        {description ? (
          <p className="font-body text-body-sm text-on-surface-variant">{description}</p>
        ) : null}
      </div>
      {children}
    </div>
  );
}
