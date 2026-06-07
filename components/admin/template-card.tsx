"use client";

import { Icon } from "@/components/ui/icon";
import type { TemplateDefinition } from "@/lib/template-registry";

export function TemplateCard({
  template,
  isActive,
  onClick,
}: {
  template: TemplateDefinition;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      className={`w-full rounded-lg border px-4 py-3 text-left transition-colors ${
        isActive
          ? "border-primary bg-primary/5 text-primary"
          : "border-outline-variant bg-surface-container-lowest text-on-surface hover:bg-surface-variant"
      }`}
      onClick={onClick}
      type="button"
    >
      <div className="flex items-start gap-3">
        <div
          className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md ${
            isActive ? "bg-primary/10 text-primary" : "bg-surface-variant text-on-surface-variant"
          }`}
        >
          <Icon className="h-4 w-4" name="web" />
        </div>
        <div className="min-w-0">
          <p className="font-body text-body-sm font-semibold">{template.label}</p>
          <p className="mt-0.5 font-body text-body-sm text-on-surface-variant line-clamp-2">
            {template.description}
          </p>
        </div>
      </div>
    </button>
  );
}
