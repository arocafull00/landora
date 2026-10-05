import type { UseFormRegisterReturn } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function CompanyField({ label, binding, error, type = "text", placeholder, autoComplete }: {
  label: string;
  binding: UseFormRegisterReturn;
  error: string | undefined;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
}) {
  const id = `company-${binding.name}`;
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-ink">{label}</Label>
      <Input {...binding} id={id} type={type} placeholder={placeholder} autoComplete={autoComplete} className="bg-surface text-ink" aria-invalid={!!error} aria-describedby={error ? `${id}-error` : undefined} />
      {error ? <p id={`${id}-error`} className="text-sm text-danger">{error}</p> : null}
    </div>
  );
}
