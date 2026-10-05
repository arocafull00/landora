"use client";

import { Controller, type UseFormReturn } from "react-hook-form";
import type { NuvoletsContent } from "@/lib/schemas/nuvolets";
import { ImageField } from "@/components/dashboard/image-field";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { NUVOLETS_TONES, type NuvoletsField } from "../nuvolets-copy";

export function NuvoletsFormField({ definition, form, sync }: { definition: NuvoletsField; form: UseFormReturn<NuvoletsContent>; sync: () => void }) {
  const { name, label, type } = definition;
  const error = form.getFieldState(name, form.formState).error?.message;
  const inputClass = "w-full rounded-lg border border-border bg-surface px-3 py-2 text-ink focus:outline-none focus:ring-1 focus:ring-primary";
  if (type === "image" || type === "tone" || type === "boolean") return <div className="space-y-2"><Controller control={form.control} name={name} render={({ field }) => {
    if (type === "image") return <ImageField label={label} templateId="nuvolets" value={String(field.value ?? "")} onChange={(value) => { field.onChange(value); sync(); }} />;
    if (type === "boolean") return <label className="flex items-center justify-between gap-4 text-ink-secondary">{label}<Switch checked={!!field.value} onCheckedChange={(value) => { field.onChange(value); sync(); }} aria-label={label} /></label>;
    return <div><label htmlFor={name} className="mb-2 block text-ink-secondary">{label}</label><Select value={String(field.value)} onValueChange={(value) => { field.onChange(value); sync(); }}><SelectTrigger id={name}><SelectValue /></SelectTrigger><SelectContent>{NUVOLETS_TONES.map((tone) => <SelectItem key={tone.value} value={tone.value}>{tone.label}</SelectItem>)}</SelectContent></Select></div>;
  }} />{error ? <p className="text-sm text-danger">{error}</p> : null}</div>;
  return <label className="block space-y-2 text-ink-secondary"><span>{label}</span>{type === "textarea" ? <textarea {...form.register(name)} className={inputClass} rows={4} maxLength={2000} /> : <input {...form.register(name)} type={type === "color" ? "color" : "text"} className={inputClass} maxLength={2048} />}{error ? <span className="block text-sm text-danger">{error}</span> : null}</label>;
}
