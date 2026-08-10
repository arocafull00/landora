"use client";

import { useId, useState } from "react";
import { X } from "lucide-react";

type PortfolioGalleryTagsFieldProps = {
  maxItems?: number;
  onChange: (value: string[]) => void;
  value: string[];
};

export function PortfolioGalleryTagsField({
  maxItems,
  onChange,
  value,
}: PortfolioGalleryTagsFieldProps) {
  const inputId = useId();
  const [draft, setDraft] = useState("");
  const trimmedDraft = draft.trim();
  const isDuplicate = value.some(
    (tag) => tag.toLocaleLowerCase() === trimmedDraft.toLocaleLowerCase(),
  );
  const isAtLimit = maxItems !== undefined && value.length >= maxItems;
  const canAdd = trimmedDraft.length > 0 && !isDuplicate && !isAtLimit;

  const addTag = () => {
    if (!canAdd) return;

    onChange([...value, trimmedDraft]);
    setDraft("");
  };

  return (
    <div>
      <label
        className="mb-1.5 block font-label text-[0.6875rem] font-medium uppercase tracking-wide text-on-surface-variant"
        htmlFor={inputId}
      >
        Etiquetas
      </label>
      <div className="rounded-lg border border-outline-variant bg-surface p-2">
        {value.length > 0 ? (
          <ul
            aria-label="Etiquetas añadidas"
            className="mb-2 flex flex-wrap gap-1.5"
          >
            {value.map((tag) => (
              <li key={tag}>
                <button
                  aria-label={`Eliminar etiqueta ${tag}`}
                  className="inline-flex items-center gap-1 rounded-full bg-primary-fixed px-2 py-1 font-label text-[0.6875rem] font-medium text-primary-fixed-variant transition-colors hover:bg-primary-fixed-dim focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  onClick={() => onChange(value.filter((item) => item !== tag))}
                  type="button"
                >
                  <span>{tag}</span>
                  <X aria-hidden className="size-3 text-primary-fixed-variant/70" />
                </button>
              </li>
            ))}
          </ul>
        ) : null}
        <input
          className="h-7 w-full border-none bg-transparent px-1 text-body-md text-on-surface outline-none placeholder:text-on-surface-variant"
          disabled={isAtLimit}
          id={inputId}
          onChange={(event) => setDraft(event.target.value)}
          onKeyDown={(event) => {
            if (event.key !== "Enter") return;

            event.preventDefault();
            addTag();
          }}
          placeholder="Añadir etiqueta..."
          maxLength={40}
          type="text"
          value={draft}
        />
      </div>
      {isAtLimit ? (
        <p className="mt-1.5 text-body-sm text-danger">
          Puedes añadir hasta {maxItems} etiquetas.
        </p>
      ) : isDuplicate && trimmedDraft ? (
        <p className="mt-1.5 text-body-sm text-danger">
          Esta etiqueta ya está añadida.
        </p>
      ) : null}
    </div>
  );
}
