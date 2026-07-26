"use client";

import { useRef, useState } from "react";
import type { TemplateId } from "@/lib/dashboard-data";
import { isLottieAsset } from "@/lib/background-assets";
import { getTemplateImageOptions } from "@/lib/template-image-options";
import { uploadAsset } from "@/lib/upload-asset";
import { useAssetsStore } from "@/stores/assets-store";
import { IMAGE_FIELD_COPY } from "@/components/dashboard/image-field/image-field-copy";

export type ImageFieldOption = {
  value: string;
  label: string;
  mimeType?: string;
};

export type ImagePickerGroupData = {
  id: string;
  title: string;
  options: ImageFieldOption[];
};

export function useImageField({
  allowLottie = false,
  onChange,
  presets,
  templateId,
  value,
}: {
  allowLottie?: boolean;
  onChange: (value: string) => void;
  presets?: readonly { value: string; label: string }[];
  templateId?: TemplateId;
  value: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const assets = useAssetsStore((state) => state.rows);
  const prepend = useAssetsStore((state) => state.prepend);

  const assetOptions: ImageFieldOption[] = [];
  for (const asset of assets) {
    if (!allowLottie && isLottieAsset(asset.url, asset.mimeType)) continue;
    assetOptions.push({
      value: asset.url,
      label: asset.name || asset.url,
      mimeType: asset.mimeType,
    });
  }

  const templateImages = templateId ? getTemplateImageOptions(templateId) : [];
  const presetOptions = presets ? [...presets] : [];
  const allOptions = [...presetOptions, ...templateImages, ...assetOptions];
  const activeAsset = assets.find((asset) => asset.url === value);
  const showThemedPreview = Boolean(
    value && templateId && isLottieAsset(value, activeAsset?.mimeType),
  );

  const groups: ImagePickerGroupData[] = [];

  if (value && !allOptions.some((option) => option.value === value)) {
    groups.push({
      id: "current",
      title: IMAGE_FIELD_COPY.groups.current,
      options: [{ value, label: value, mimeType: activeAsset?.mimeType }],
    });
  }

  if (assetOptions.length > 0) {
    groups.push({
      id: "assets",
      title: IMAGE_FIELD_COPY.groups.assets,
      options: assetOptions,
    });
  }

  if (presetOptions.length > 0) {
    groups.push({
      id: "presets",
      title: IMAGE_FIELD_COPY.groups.presets,
      options: presetOptions,
    });
  }

  if (templateImages.length > 0) {
    groups.push({
      id: "template",
      title: IMAGE_FIELD_COPY.groups.template,
      options: [...templateImages],
    });
  }

  const handleSelect = (nextValue: string) => {
    onChange(nextValue);
    setOpen(false);
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
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

  const handleUploadClick = () => {
    inputRef.current?.click();
  };

  return {
    activeAsset,
    groups,
    handleFileChange,
    handleSelect,
    handleUploadClick,
    inputRef,
    open,
    setOpen,
    showThemedPreview,
    uploading,
  };
}
