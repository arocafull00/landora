"use client";

import { useTransition, useState } from "react";
import { toast } from "react-toastify";
import { ActionButton } from "@/components/ui/primitives";
import { createLandingForUser } from "@/app/actions/admin";

const inputClass =
  "w-full rounded-md border border-outline-variant bg-surface-bg px-3 py-2 text-body-sm text-on-surface outline-none transition-colors placeholder:text-on-surface-variant/50 focus:border-primary focus:ring-1 focus:ring-primary";

function toSlug(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

export function CreateLandingForm({
  userId,
  onSuccess,
}: {
  userId: string;
  onSuccess: () => void;
}) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [slug, setSlug] = useState("");
  const [slugTouched, setSlugTouched] = useState(false);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!slugTouched) {
      setSlug(toSlug(e.target.value));
    }
  };

  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSlugTouched(true);
    setSlug(toSlug(e.target.value));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    const formData = new FormData(e.currentTarget);
    formData.set("userId", userId);
    formData.set("slug", slug);

    startTransition(async () => {
      const result = await createLandingForUser(formData);
      if ("error" in result) {
        setError(result.error);
        return;
      }
      toast.success("Landing creada correctamente");
      onSuccess();
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block font-label text-label-md text-on-surface-variant">
            Nombre
          </span>
          <input
            name="name"
            type="text"
            required
            autoFocus
            autoComplete="off"
            placeholder="Clínica Ana García"
            className={inputClass}
            onChange={handleNameChange}
          />
        </label>
        <label className="block">
          <span className="mb-1.5 block font-label text-label-md text-on-surface-variant">
            Slug
          </span>
          <input
            name="slug"
            type="text"
            required
            autoComplete="off"
            placeholder="clinica-ana-garcia"
            value={slug}
            onChange={handleSlugChange}
            className={inputClass}
          />
          <p className="mt-1 font-body text-body-sm text-on-surface-variant/60">
            URL: <span className="font-mono">{slug || "…"}</span>
          </p>
        </label>
      </div>
      <label className="block">
        <span className="mb-1.5 block font-label text-label-md text-on-surface-variant">
          Plantilla
        </span>
        <select name="template" defaultValue="toll-story" className={inputClass}>
          <option value="toll-story">Toll Story — Espacios de eventos</option>
          <option value="velar">Velar — Real estate de lujo</option>
        </select>
      </label>
      {error && (
        <p className="font-body text-body-sm text-error">{error}</p>
      )}
      <div className="flex justify-end gap-2">
        <ActionButton
          variant="secondary"
          type="button"
          onClick={onSuccess}
          disabled={isPending}
        >
          Cancelar
        </ActionButton>
        <ActionButton
          variant="primary"
          type="submit"
          disabled={isPending || !slug}
        >
          {isPending ? "Creando…" : "Crear landing"}
        </ActionButton>
      </div>
    </form>
  );
}
