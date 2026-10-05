"use client";

import { useId } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function FooterEditorField({ label, onChange, placeholder, value }: {
  label: string;
  onChange: (value: string) => void;
  placeholder?: string;
  value: string;
}) {
  const id = useId();
  return <div className="space-y-2"><Label htmlFor={id} className="text-ink-secondary">{label}</Label><Input id={id} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} value={value} className="bg-surface text-ink" /></div>;
}
