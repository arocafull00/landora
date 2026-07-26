"use client";

import type { TemplateId } from "@/lib/dashboard-data";
import { isLottieAsset } from "@/lib/background-assets";
import { AssetImage } from "@/components/ui/asset-image";
import { ThemedLottieBackground } from "@/components/ui/themed-lottie-background";
import { cn } from "@/lib/utils";
import type { ImageFieldOption } from "@/components/dashboard/image-field/hooks/use-image-field";

export function ImagePickerOption({
  onSelect,
  option,
  selected,
  templateId,
}: {
  onSelect: (value: string) => void;
  option: ImageFieldOption;
  selected: boolean;
  templateId?: TemplateId;
}) {
  const showThemedPreview = Boolean(
    templateId && isLottieAsset(option.value, option.mimeType),
  );

  return (
    <button
      aria-current={selected ? "true" : undefined}
      className={cn(
        "flex flex-col gap-1.5 rounded-lg border border-outline-variant bg-surface p-1.5 text-left transition-[border-color,box-shadow] hover:border-primary",
        selected && "border-primary ring-2 ring-primary",
      )}
      onClick={() => onSelect(option.value)}
      type="button"
    >
      <div
        className="relative aspect-4/3 w-full overflow-hidden rounded-md border border-outline-variant bg-surface-variant"
        data-palette="default"
        data-site-theme={templateId ? "" : undefined}
        data-template={templateId}
        data-typography="default"
      >
        {showThemedPreview && templateId ? (
          <ThemedLottieBackground
            src={option.value}
            themeKey={`${templateId}:default`}
          />
        ) : (
          <AssetImage
            alt={option.label}
            className="object-cover"
            fill
            mimeType={option.mimeType}
            sizes="160px"
            src={option.value}
          />
        )}
      </div>
      <span className="line-clamp-2 px-0.5 text-body-sm text-on-surface">{option.label}</span>
    </button>
  );
}
