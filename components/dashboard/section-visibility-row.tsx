"use client";

import { ArrowDown, ArrowUp } from "lucide-react";

type SectionVisibilityRowProps = {
  label: string;
  canMoveUp: boolean;
  canMoveDown: boolean;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onHide: () => void;
};

export function SectionVisibilityRow({
  label,
  canMoveUp,
  canMoveDown,
  onMoveUp,
  onMoveDown,
  onHide,
}: SectionVisibilityRowProps) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-outline-variant bg-surface px-4 py-3">
      <span className="text-body-md text-on-surface">{label}</span>
      <div className="flex items-center gap-1">
        {canMoveUp ? (
          <button
            aria-label={`Subir sección ${label}`}
            className="inline-flex size-8 items-center justify-center rounded-lg text-on-surface-variant transition-colors hover:bg-surface-container hover:text-on-surface"
            onClick={onMoveUp}
            type="button"
          >
            <ArrowUp aria-hidden className="size-4" />
          </button>
        ) : null}
        {canMoveDown ? (
          <button
            aria-label={`Bajar sección ${label}`}
            className="inline-flex size-8 items-center justify-center rounded-lg text-on-surface-variant transition-colors hover:bg-surface-container hover:text-on-surface"
            onClick={onMoveDown}
            type="button"
          >
            <ArrowDown aria-hidden className="size-4" />
          </button>
        ) : null}
        <button
          className="ml-1 rounded-lg border border-outline-variant px-3 py-1.5 font-label text-label-md text-on-surface-variant transition-colors hover:bg-surface-container"
          onClick={onHide}
          type="button"
        >
          Ocultar
        </button>
      </div>
    </div>
  );
}
