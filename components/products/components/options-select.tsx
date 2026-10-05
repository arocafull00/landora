"use client";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

export function OptionsSelect({ label, value, options, onChange, className }: { label: string; value: string; options: { value: string; label: string }[]; onChange: (value: string) => void; className?: string }) {
  return <Select value={`option:${value}`} onValueChange={(next) => onChange(next.slice(7))}>
    <SelectTrigger aria-label={label} className={cn("w-full bg-surface", className)}><SelectValue placeholder={label} /></SelectTrigger>
    <SelectContent>{options.map((option) => <SelectItem key={option.value} value={`option:${option.value}`}>{option.label}</SelectItem>)}</SelectContent>
  </Select>;
}
