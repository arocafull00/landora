import type { InputHTMLAttributes } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";
import { Input } from "@/components/ui/input";

export function ProductField({ label, binding, error, ...props }: InputHTMLAttributes<HTMLInputElement> & { label: string; binding: UseFormRegisterReturn; error?: string }) {
  const id = `product-${binding.name}`;
  return <div className="space-y-1.5"><label htmlFor={id} className="text-sm font-medium">{label}</label><Input id={id} aria-invalid={Boolean(error)} aria-describedby={error ? `${id}-error` : undefined} {...binding} {...props} onBlur={(event) => { void binding.onBlur(event); props.onBlur?.(event); }} />{error ? <p id={`${id}-error`} className="text-sm text-danger">{error}</p> : null}</div>;
}
