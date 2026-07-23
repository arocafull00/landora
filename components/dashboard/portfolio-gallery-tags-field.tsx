"use client";

import { useId, useState } from "react";
import { Plus, X } from "lucide-react";

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
        className="mb-2 block font-label text-label-md text-on-surface-variant"
        htmlFor={inputId}
      >
        Etiquetas
      </label>
      {value.length > 0 ? (
        <ul className="mb-3 flex flex-wrap gap-2" aria-label="Etiquetas añadidas">
          {value.map((tag, index) => (
            <li
              className="inline-flex items-center gap-1 rounded-full bg-primary-fixed px-3 py-1 font-label text-label-sm text-primary-fixed-variant"
              key={`${tag}-${index}`}
            >
              <span>{tag}</span>
              <button
                aria-label={`Eliminar etiqueta ${tag}`}
                className="rounded-full p-0.5 transition-colors hover:bg-primary-fixed-dim focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                onClick={() => onChange(value.filter((item) => item !== tag))}
                type="button"
              >
                <X aria-hidden="true" className="size-3.5" />
              </button>
            </li>
          ))}
        </ul>
      ) : null}
      <div className="flex gap-2">
        <input
          className="min-w-0 flex-1 rounded-lg border border-outline-variant bg-surface px-3 py-2 text-body-md text-on-surface outline-none transition-shadow placeholder:text-on-surface-variant focus:border-primary focus:ring-1 focus:ring-primary"
          id={inputId}
          onChange={(event) => setDraft(event.target.value)}
          onKeyDown={(event) => {
            if (event.key !== "Enter") return;

            event.preventDefault();
            addTag();
          }}
          placeholder="Escribe una etiqueta"
          maxLength={40}
          type="text"
          value={draft}
        />
        <button
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-primary px-3 py-2 font-label text-label-md text-on-primary transition-colors hover:bg-primary-container disabled:cursor-not-allowed disabled:opacity-50"
          disabled={!canAdd}
          onClick={addTag}
          type="button"
        >
          <Plus aria-hidden="true" className="size-4" />
          Añadir
        </button>
      </div>
      {isAtLimit ? (
        <p className="mt-1.5 text-body-sm text-danger">
          Puedes añadir hasta {maxItems} etiquetas.
        </p>
      ) : isDuplicate && trimmedDraft ? (
        <p className="mt-1.5 text-body-sm text-danger">
          Esta etiqueta ya está añadida.
        </p>
      ) : (
        <p className="mt-1.5 text-body-sm text-on-surface-variant">
          Pulsa Enter o usa el botón para añadirla.
        </p>
      )}
    </div>
  );
}
