"use client";

import { useRef, useState } from "react";
import type { TemplateId } from "@/lib/dashboard-data";
import { useAssetsStore } from "@/stores/assets-store";
import { isLottieAsset } from "@/lib/background-assets";
import { getTemplateImageOptions } from "@/lib/template-image-options";
import { AssetNameField } from "@/components/dashboard/asset-name-field";
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
  allowLottie = false,
  description,
  label,
  onChange,
  presets,
  templateId,
  value,
}: {
  allowLottie?: boolean;
  description?: string;
  label: string;
  onChange: (value: string) => void;
  presets?: readonly { value: string; label: string }[];
  templateId?: TemplateId;
  value: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const assets = useAssetsStore((state) => state.rows);
  const prepend = useAssetsStore((state) => state.prepend);

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

  const assetOptions: Array<{ value: string; label: string }> = [];
  for (const asset of assets) {
    if (!allowLottie && isLottieAsset(asset.url, asset.mimeType)) continue;
    assetOptions.push({ value: asset.url, label: asset.name || asset.url });
  }
  const templateImages = templateId ? getTemplateImageOptions(templateId) : [];
  const allOptions = [...(presets ?? []), ...templateImages, ...assetOptions];
  const activeAsset = assets.find((a) => a.url === value);
  const showThemedPreview = Boolean(
    value && templateId && isLottieAsset(value, activeAsset?.mimeType),
  );

  return (
    <div className="space-y-2">
      <span className="block font-label text-label-md text-on-surface-variant">{label}</span>
      {description ? (
        <p className="text-body-sm text-on-surface-variant">{description}</p>
      ) : null}
      {value && (
        <div
          className="relative h-28 w-full overflow-hidden rounded-lg border border-outline-variant bg-surface-variant"
          data-palette="default"
          data-site-theme={templateId ? "" : undefined}
          data-template={templateId}
          data-typography="default"
        >
          {showThemedPreview && templateId ? (
            <ThemedLottieBackground
              src={value}
              themeKey={`${templateId}:default`}
            />
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
            {templateImages.length > 0 ? (
              <SelectGroup>
                <SelectLabel>Plantilla</SelectLabel>
                {templateImages.map((opt) => (
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
        aria-label="Subir imagen"
        ref={inputRef}
        accept={allowLottie ? "image/*,.json,application/json" : "image/*"}
        className="hidden"
        onChange={handleFileChange}
        type="file"
      />
      {activeAsset ? (
        <AssetNameField assetId={activeAsset.id} name={activeAsset.name} />
      ) : null}
    </div>
  );
}
