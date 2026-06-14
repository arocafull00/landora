"use client";

import type { ServiceMenuItem } from "@/lib/dashboard-data";

type StudioServiceMenuItemEditorProps = {
  index: number;
  item: ServiceMenuItem;
  onChange: (patch: Partial<ServiceMenuItem>) => void;
  onRemove: () => void;
};

export function StudioServiceMenuItemEditor({
  index,
  item,
  onChange,
  onRemove,
}: StudioServiceMenuItemEditorProps) {
  return (
    <div className="space-y-3 border-b border-outline-variant pb-6 last:border-0 last:pb-0">
      <div className="flex items-center justify-between gap-3">
        <p className="font-label text-label-md text-on-surface-variant">
          Servicio {index + 1}
        </p>
        <button
          className="font-label text-label-md text-error transition-colors hover:text-error/80"
          onClick={onRemove}
          type="button"
        >
          Eliminar
        </button>
      </div>
      <TextField
        label="Categoría"
        onChange={(value) => onChange({ category: value })}
        value={item.category}
      />
      <TextField
        label="Nombre"
        onChange={(value) => onChange({ name: value })}
        value={item.name}
      />
      <TextArea
        label="Descripción"
        onChange={(value) => onChange({ description: value })}
        value={item.description}
      />
      <div className="grid gap-3 md:grid-cols-2">
        <TextField
          label="Precio"
          onChange={(value) => onChange({ price: value })}
          value={item.price}
        />
        <TextField
          label="Duración"
          onChange={(value) => onChange({ duration: value })}
          value={item.duration ?? ""}
        />
      </div>
    </div>
  );
}

function TextField({
  label,
  onChange,
  value,
}: {
  label: string;
  onChange: (value: string) => void;
  value: string;
}) {
  return (
    <label className="block">
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

function TextArea({
  label,
  onChange,
  value,
}: {
  label: string;
  onChange: (value: string) => void;
  value: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block font-label text-label-md text-on-surface-variant">
        {label}
      </span>
      <textarea
        className="w-full resize-none rounded-lg border border-outline-variant bg-surface px-3 py-2 text-body-md text-on-surface outline-none transition-shadow focus:border-primary focus:ring-1 focus:ring-primary"
        onChange={(event) => onChange(event.target.value)}
        rows={3}
        value={value}
      />
    </label>
  );
}

