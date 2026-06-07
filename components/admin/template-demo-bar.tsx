"use client";

import Link from "next/link";

export const TEMPLATE_DEMO_BAR_HEIGHT = 52;

export function TemplateDemoBar({ label }: { label: string }) {
  return (
    <div className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between bg-inverse-surface px-6 py-3 shadow-md">
      <div className="flex items-center gap-3">
        <span className="rounded bg-primary px-2 py-0.5 font-label text-label-sm font-bold uppercase tracking-wide text-on-primary">
          Demo
        </span>
        <span className="font-body text-body-sm font-medium text-inverse-on-surface">
          {label}
        </span>
      </div>
      <Link
        className="inline-flex h-8 items-center gap-1.5 rounded-md border border-surface-dim px-3 font-label text-label-md text-surface-dim transition-colors hover:bg-surface-variant hover:text-on-surface"
        href="/admin?view=templates"
      >
        ← Volver
      </Link>
    </div>
  );
}
