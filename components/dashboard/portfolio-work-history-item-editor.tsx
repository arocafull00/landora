"use client";

import type { WorkExperienceItem } from "@/lib/dashboard-data";

type PortfolioWorkHistoryItemEditorProps = {
  index: number;
  item: WorkExperienceItem;
  onChange: (patch: Partial<WorkExperienceItem>) => void;
  onRemove: () => void;
};

export function PortfolioWorkHistoryItemEditor({
  index,
  item,
  onChange,
  onRemove,
}: PortfolioWorkHistoryItemEditorProps) {
  return (
    <div className="space-y-3 border-b border-outline-variant pb-6 last:border-0 last:pb-0">
      <div className="flex items-center justify-between gap-3">
        <p className="font-label text-label-md text-on-surface-variant">
          Experiencia {index + 1}
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
        label="Fechas"
        onChange={(value) => onChange({ dateRange: value })}
        value={item.dateRange}
      />
      <TextField
        label="Ubicación"
        onChange={(value) => onChange({ location: value })}
        value={item.location}
      />
      <TextField
        label="Empresa"
        onChange={(value) => onChange({ company: value })}
        value={item.company}
      />
      <TextField
        label="Puesto"
        onChange={(value) => onChange({ title: value })}
        value={item.title}
      />
      <TextArea
        label="Resumen de la empresa"
        onChange={(value) => onChange({ summary: value })}
        value={item.summary}
      />
      <TextArea
        label="Logros (uno por línea)"
        onChange={(value) =>
          onChange({
            highlights: value.split("\n").flatMap((line) => {
              const trimmed = line.trim();
              return trimmed ? [trimmed] : [];
            }),
          })
        }
        rows={5}
        value={item.highlights.join("\n")}
      />
      <TextField
        label="Tecnologías (separadas por coma)"
        onChange={(value) =>
          onChange({
            technologies: value.split(",").flatMap((tech) => {
              const trimmed = tech.trim();
              return trimmed ? [trimmed] : [];
            }),
          })
        }
        value={item.technologies.join(", ")}
      />
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
  rows = 3,
  value,
}: {
  label: string;
  onChange: (value: string) => void;
  rows?: number;
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
        rows={rows}
        value={value}
      />
    </label>
  );
}

