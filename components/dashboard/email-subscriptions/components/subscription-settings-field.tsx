import type { ReactNode } from "react";
import { Label } from "@/components/ui/label";

export function SubscriptionSettingsField({ id, label, help, error, children }: { id: string; label: string; help?: string; error?: string; children: ReactNode }) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-ink">{label}</Label>
      {children}
      {help ? <p id={`${id}-help`} className="text-sm text-ink-secondary">{help}</p> : null}
      {error ? <p id={`${id}-error`} className="text-sm text-danger">{error}</p> : null}
    </div>
  );
}
