"use client";

import { useDashboardStore } from "@/stores/dashboard-store";
import type { Landing } from "@/lib/dashboard-data";
import { LockIcon } from "lucide-react";

type AdminEditorPanelProps = {
  activeLanding: Landing;
};

export function AdminEditorPanel({ activeLanding }: AdminEditorPanelProps) {
  const { updateLandingMeta } = useDashboardStore();

  return (
    <section className="space-y-4 py-unit-lg">
      <div className="flex items-center gap-1.5 text-on-surface-variant">
        <LockIcon className="h-3.5 w-3.5" />
        <span className="font-label text-label-sm uppercase tracking-wide">
          Solo admin
        </span>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <TextField
          label="Nombre interno"
          onChange={(value) => updateLandingMeta(activeLanding.id, { name: value })}
          value={activeLanding.name}
        />
        <TextField
          label="Slug"
          onChange={(value) => updateLandingMeta(activeLanding.id, { slug: value })}
          value={activeLanding.slug}
        />
        <TextField
          className="md:col-span-2"
          label="Título SEO"
          onChange={(value) => updateLandingMeta(activeLanding.id, { seoTitle: value })}
          value={activeLanding.seoTitle}
        />
      </div>
    </section>
  );
}

function TextField({
  className,
  label,
  onChange,
  value,
}: {
  className?: string;
  label: string;
  onChange: (value: string) => void;
  value: string;
}) {
  return (
    <label className={className ?? "block"}>
      <span className="mb-2 block font-label text-label-md text-on-surface-variant">
        {label}
      </span>
      <input
        className="w-full rounded-lg border border-outline-variant bg-surface px-3 py-2 text-body-md text-on-surface outline-none transition-shadow focus:border-primary focus:ring-1 focus:ring-primary"
        onChange={(event) => onChange(event.target.value)}
        type="text"
        value={value}
      />
    </label>
  );
}
