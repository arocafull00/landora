"use client";
import { Input } from "@/components/ui/input";
import { OptionsSelect } from "./options-select";

const COPY = { choose: "Elegir un valor existente", input: "Selecciona o escribe un nuevo valor" } as const;
export function CreatableProductSelect({ label, value, options, onChange, error }: { label: string; value: string; options: string[]; onChange: (value: string) => void; error?: string }) {
  const id = `product-taxonomy-${label}`;
  return <div className="space-y-2"><label htmlFor={id} className="text-sm font-medium">{label}</label>
    <OptionsSelect label={`${label}: ${COPY.choose}`} value={options.includes(value) ? value : ""} onChange={onChange} options={[{ value: "", label: COPY.choose }, ...options.map((value) => ({ value, label: value }))]} />
    <Input id={id} value={value} onChange={(event) => onChange(event.target.value)} placeholder={COPY.input} aria-invalid={Boolean(error)} aria-describedby={error ? `${id}-error` : undefined} />
    {error ? <p id={`${id}-error`} className="text-sm text-danger">{error}</p> : null}
  </div>;
}
