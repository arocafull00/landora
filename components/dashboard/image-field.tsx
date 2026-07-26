"use client";

import { ImageFieldPreviewButton } from "@/components/dashboard/image-field/components/image-field-preview-button";
import { ImagePickerSheet } from "@/components/dashboard/image-field/components/image-picker-sheet";
import { useImageField } from "@/components/dashboard/image-field/hooks/use-image-field";
import { AssetNameField } from "@/components/dashboard/asset-name-field";
import type { TemplateId } from "@/lib/dashboard-data";

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
  const {
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
  } = useImageField({
    allowLottie,
    onChange,
    presets,
    templateId,
    value,
  });

  return (
    <div className="space-y-2">
      <span className="block font-label text-label-md text-on-surface-variant">{label}</span>
      {description ? (
        <p className="text-body-sm text-on-surface-variant">{description}</p>
      ) : null}
      <ImageFieldPreviewButton
        activeAssetMimeType={activeAsset?.mimeType}
        label={label}
        onOpen={() => setOpen(true)}
        showThemedPreview={showThemedPreview}
        templateId={templateId}
        value={value}
      />
      <ImagePickerSheet
        allowLottie={allowLottie}
        groups={groups}
        inputRef={inputRef}
        onFileChange={handleFileChange}
        onOpenChange={setOpen}
        onSelect={handleSelect}
        onUploadClick={handleUploadClick}
        open={open}
        selectedValue={value}
        templateId={templateId}
        uploading={uploading}
      />
      {activeAsset ? (
        <AssetNameField assetId={activeAsset.id} name={activeAsset.name} />
      ) : null}
    </div>
  );
}
