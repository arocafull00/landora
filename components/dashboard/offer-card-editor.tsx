"use client";

import type { OfferCard } from "@/lib/dashboard-data";

type OfferCardEditorProps = {
  index: number;
  card: OfferCard;
  onChange: (patch: Partial<OfferCard>) => void;
  onRemove: () => void;
};

function toDateInputValue(date?: Date) {
  if (!date) return "";
  const pad = (value: number) => String(value).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

function fromDateInputValue(value: string) {
  if (!value) return undefined;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return undefined;
  return date;
}

export function OfferCardEditor({ index, card, onChange, onRemove }: OfferCardEditorProps) {
  return (
    <div className="space-y-3 rounded-lg border border-outline-variant bg-surface-container-lowest p-4">
      <div className="flex items-center justify-between gap-3">
        <p className="font-label text-label-md text-on-surface-variant">Tarjeta {index + 1}</p>
        <button
          className="font-label text-label-md text-error transition-colors hover:text-error/80"
          onClick={onRemove}
          type="button"
        >
          Eliminar
        </button>
      </div>
      <EditorField
        label="Título"
        onChange={(value) => onChange({ title: value })}
        value={card.title}
      />
      <EditorField
        label="Descripción"
        onChange={(value) => onChange({ description: value })}
        value={card.description}
      />
      <EditorField
        label="Badge"
        onChange={(value) => onChange({ badge: value || undefined })}
        value={card.badge ?? ""}
      />
      <EditorField
        label="Texto del CTA"
        onChange={(value) => onChange({ ctaText: value || undefined })}
        value={card.ctaText ?? ""}
      />
      <label className="block">
        <span className="mb-2 block font-label text-label-md text-on-surface-variant">
          Fecha de expiración
        </span>
        <input
          className="w-full rounded-lg border border-outline-variant bg-surface px-3 py-2 text-body-md text-on-surface outline-none transition-shadow focus:border-primary focus:ring-1 focus:ring-primary"
          onChange={(event) => onChange({ expiresAt: fromDateInputValue(event.target.value) })}
          type="datetime-local"
          value={toDateInputValue(card.expiresAt)}
        />
      </label>
    </div>
  );
}

function EditorField({
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
      <span className="mb-2 block font-label text-label-md text-on-surface-variant">{label}</span>
      <input
        className="w-full rounded-lg border border-outline-variant bg-surface px-3 py-2 text-body-md text-on-surface outline-none transition-shadow focus:border-primary focus:ring-1 focus:ring-primary"
        onChange={(event) => onChange(event.target.value)}
        type="text"
        value={value}
      />
    </label>
  );
}
