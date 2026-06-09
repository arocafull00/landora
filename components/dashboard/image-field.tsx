"use client";

import { useRef, useState, useEffect } from "react";
import type { TemplateId } from "@/lib/dashboard-data";
import { useAssetsStore } from "@/stores/assets-store";
import { getTemplatePalette } from "@/lib/template-palettes";
import { isBackgroundPreset } from "@/lib/background-assets";
import { AssetImage } from "@/components/ui/asset-image";
import { ThemedLottieBackground } from "@/components/ui/themed-lottie-background";
import { uploadAsset } from "@/lib/upload-asset";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function ImageField({
  label,
  onChange,
  presets,
  templateId,
  value,
}: {
  label: string;
  onChange: (value: string) => void;
  presets?: readonly { value: string; label: string }[];
  templateId?: TemplateId;
  value: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const assets = useAssetsStore((state) => state.rows);
  const ensureLoaded = useAssetsStore((state) => state.ensureLoaded);
  const prepend = useAssetsStore((state) => state.prepend);

  useEffect(() => {
    ensureLoaded();
  }, [ensureLoaded]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);

    try {
      const row = await uploadAsset(file);
      prepend(row);
      onChange(row.url);
    } catch {
      /* noop */
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  const assetOptions = assets.map((a) => ({ value: a.url, label: a.name || a.url }));
  const allOptions = [...(presets ?? []), ...assetOptions];
  const activeAsset = assets.find((a) => a.url === value);
  const palette = templateId ? getTemplatePalette(templateId) : null;
  const showThemedPreview = Boolean(value && palette && isBackgroundPreset(value));

  return (
    <div className="space-y-2">
      <span className="block font-label text-label-md text-on-surface-variant">{label}</span>
      {value && (
        <div className="relative h-28 w-full overflow-hidden rounded-lg border border-outline-variant bg-surface-variant">
          {showThemedPreview && palette ? (
            <ThemedLottieBackground palette={palette} src={value} />
          ) : (
            <AssetImage
              alt={label}
              className="object-cover"
              fill
              mimeType={activeAsset?.mimeType}
              sizes="400px"
              src={value}
            />
          )}
        </div>
      )}
      <div className="flex gap-2">
        <Select value={value} onValueChange={onChange}>
          <SelectTrigger className="min-w-0 flex-1 border-outline-variant bg-surface text-body-md text-on-surface focus:ring-primary">
            <SelectValue placeholder="Selecciona una imagen…" />
          </SelectTrigger>
          <SelectContent className="bg-surface-container-lowest">
            {!allOptions.find((o) => o.value === value) && value && (
              <SelectItem value={value}>{value}</SelectItem>
            )}
            {presets && presets.length > 0 ? (
              <SelectGroup>
                <SelectLabel>Fondos</SelectLabel>
                {presets.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            ) : null}
            {assetOptions.length > 0 ? (
              <SelectGroup>
                <SelectLabel>Tus imágenes</SelectLabel>
                {assetOptions.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            ) : null}
          </SelectContent>
        </Select>
        <button
          className="shrink-0 rounded-lg border border-outline-variant bg-surface px-3 py-2 text-body-sm text-on-surface transition-colors hover:border-primary hover:text-primary disabled:opacity-50"
          disabled={uploading}
          onClick={() => inputRef.current?.click()}
          type="button"
        >
          {uploading ? "Subiendo…" : "Subir"}
        </button>
      </div>
      <input
        ref={inputRef}
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
        type="file"
      />
    </div>
  );
}
