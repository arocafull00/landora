"use client";

import { ArrowDown, ArrowUp } from "lucide-react";
import type { NavLink } from "@/lib/dashboard-data";
import type { NavScrollTarget } from "@/lib/template-sections";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type NavLinkEditorProps = {
  index: number;
  item: NavLink;
  canMoveUp: boolean;
  canMoveDown: boolean;
  onChange: (patch: Partial<Pick<NavLink, "label" | "href">>) => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onRemove: () => void;
  scrollTargets: NavScrollTarget[];
};

export function NavLinkEditor({
  index,
  item,
  canMoveUp,
  canMoveDown,
  onChange,
  onMoveUp,
  onMoveDown,
  onRemove,
  scrollTargets,
}: NavLinkEditorProps) {
  const hasCurrentTarget = scrollTargets.some((target) => target.href === item.href);
  const options =
    hasCurrentTarget || !item.href
      ? scrollTargets
      : [...scrollTargets, { anchor: "", href: item.href, label: item.href }];

  return (
    <div className="space-y-3 border-b border-outline-variant pb-5 last:border-0 last:pb-0">
      <div className="flex items-center justify-between gap-3">
        <p className="font-label text-label-md text-on-surface-variant">Enlace {index + 1}</p>
        <div className="flex items-center gap-1">
          {canMoveUp ? (
            <button
              aria-label={`Subir enlace ${index + 1}`}
              className="inline-flex size-8 items-center justify-center rounded-lg text-on-surface-variant transition-colors hover:bg-surface-container hover:text-on-surface"
              onClick={onMoveUp}
              type="button"
            >
              <ArrowUp aria-hidden className="size-4" />
            </button>
          ) : null}
          {canMoveDown ? (
            <button
              aria-label={`Bajar enlace ${index + 1}`}
              className="inline-flex size-8 items-center justify-center rounded-lg text-on-surface-variant transition-colors hover:bg-surface-container hover:text-on-surface"
              onClick={onMoveDown}
              type="button"
            >
              <ArrowDown aria-hidden className="size-4" />
            </button>
          ) : null}
          <button
            className="ml-1 font-label text-label-md text-error transition-colors hover:text-error/80"
            onClick={onRemove}
            type="button"
          >
            Eliminar
          </button>
        </div>
      </div>
      <label className="block">
        <span className="mb-2 block font-label text-label-md text-on-surface-variant">
          Sección de destino
        </span>
        <Select onValueChange={(value) => onChange({ href: value })} value={item.href}>
          <SelectTrigger className="w-full border-outline-variant bg-surface text-body-md text-on-surface focus:ring-primary">
            <SelectValue placeholder="Selecciona una sección…" />
          </SelectTrigger>
          <SelectContent className="bg-surface-container-lowest">
            {options.map((target) => (
              <SelectItem key={target.href} value={target.href}>
                {target.label} ({target.href})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </label>
      <label className="block">
        <span className="mb-2 block font-label text-label-md text-on-surface-variant">
          Etiqueta
        </span>
        <input
          className="w-full rounded-lg border border-outline-variant bg-surface px-3 py-2 text-body-md text-on-surface outline-none transition-shadow focus:border-primary focus:ring-1 focus:ring-primary"
          onChange={(event) => onChange({ label: event.target.value })}
          type="text"
          value={item.label}
        />
      </label>
    </div>
  );
}

