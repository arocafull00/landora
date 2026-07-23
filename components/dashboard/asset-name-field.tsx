"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import { renameAssetAction } from "@/app/actions/assets";
import { useAssetsStore } from "@/stores/assets-store";

export function AssetNameField({
  assetId,
  name,
}: {
  assetId: string;
  name: string;
}) {
  const update = useAssetsStore((state) => state.update);
  const [draft, setDraft] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const value = draft ?? name;

  const save = async () => {
    const trimmed = value.trim();
    if (!trimmed || trimmed === name) {
      setDraft(null);
      return;
    }

    setSaving(true);

    try {
      const result = await renameAssetAction(assetId, trimmed);
      if ("error" in result) throw new Error(result.error);
      update(result.data);
      setDraft(null);
      toast.success("Nombre actualizado");
    } catch (err) {
      setDraft(null);
      toast.error(err instanceof Error ? err.message : "No se pudo renombrar la imagen");
    } finally {
      setSaving(false);
    }
  };

  return (
    <label className="block">
      <span className="mb-2 block font-label text-label-md text-on-surface-variant">Nombre</span>
      <input
        className="w-full rounded-lg border border-outline-variant bg-surface px-3 py-2 text-body-md text-on-surface outline-none transition-shadow focus:border-primary focus:ring-1 focus:ring-primary disabled:opacity-50"
        disabled={saving}
        onBlur={() => save()}
        onChange={(event) => setDraft(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            event.currentTarget.blur();
          }
        }}
        type="text"
        value={value}
      />
    </label>
  );
}
