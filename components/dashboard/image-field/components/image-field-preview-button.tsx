"use client";

import type { TemplateId } from "@/lib/dashboard-data";
import { IMAGE_FIELD_COPY } from "@/components/dashboard/image-field/image-field-copy";
import { AssetImage } from "@/components/ui/asset-image";
import { ThemedLottieBackground } from "@/components/ui/themed-lottie-background";
import { cn } from "@/lib/utils";

export function ImageFieldPreviewButton({
  activeAssetMimeType,
  label,
  onOpen,
  showThemedPreview,
  templateId,
  value,
}: {
  activeAssetMimeType?: string;
  label: string;
  onOpen: () => void;
  showThemedPreview: boolean;
  templateId?: TemplateId;
  value: string;
}) {
  return (
    <button
      aria-label={IMAGE_FIELD_COPY.previewAriaLabel}
      className={cn(
        "group relative h-28 w-full overflow-hidden rounded-lg border border-outline-variant bg-surface-variant transition-[border-color,box-shadow] hover:border-primary focus:ring-2 focus:ring-primary focus:outline-none",
        !value && "border-dashed",
      )}
      data-palette="default"
      data-site-theme={templateId ? "" : undefined}
      data-template={templateId}
      data-typography="default"
      onClick={onOpen}
      type="button"
    >
      {value ? (
        showThemedPreview && templateId ? (
          <ThemedLottieBackground
            src={value}
            themeKey={`${templateId}:default`}
          />
        ) : (
          <AssetImage
            alt={label}
            className="object-cover"
            fill
            mimeType={activeAssetMimeType}
            sizes="400px"
            src={value}
          />
        )
      ) : (
        <span className="flex h-full w-full items-center justify-center px-4 text-body-sm text-on-surface-variant">
          {IMAGE_FIELD_COPY.placeholder}
        </span>
      )}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 flex items-center justify-center bg-inverse-surface/60 px-4 text-body-sm font-medium text-inverse-on-surface opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
      >
        {value ? IMAGE_FIELD_COPY.changeImage : IMAGE_FIELD_COPY.placeholder}
      </span>
    </button>
  );
}
