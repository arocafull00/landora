"use client";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function OptionsSelect({ label, value, options, onChange }: { label: string; value: string; options: { value: string; label: string }[]; onChange: (value: string) => void }) {
  return <Select value={`option:${value}`} onValueChange={(next) => onChange(next.slice(7))}>
    <SelectTrigger aria-label={label} className="w-full bg-surface"><SelectValue placeholder={label} /></SelectTrigger>
    <SelectContent>{options.map((option) => <SelectItem key={option.value} value={`option:${option.value}`}>{option.label}</SelectItem>)}</SelectContent>
  </Select>;
}
