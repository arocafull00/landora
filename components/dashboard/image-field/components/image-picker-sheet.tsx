"use client";

import { ImagePlus } from "lucide-react";
import type { TemplateId } from "@/lib/dashboard-data";
import { ImagePickerGroup } from "@/components/dashboard/image-field/components/image-picker-group";
import { IMAGE_FIELD_COPY } from "@/components/dashboard/image-field/image-field-copy";
import type { ImagePickerGroupData } from "@/components/dashboard/image-field/hooks/use-image-field";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

export function ImagePickerSheet({
  allowLottie,
  groups,
  inputRef,
  onFileChange,
  onOpenChange,
  onSelect,
  onUploadClick,
  open,
  selectedValue,
  templateId,
  uploading,
}: {
  allowLottie: boolean;
  groups: ImagePickerGroupData[];
  inputRef: React.RefObject<HTMLInputElement | null>;
  onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onOpenChange: (open: boolean) => void;
  onSelect: (value: string) => void;
  onUploadClick: () => void;
  open: boolean;
  selectedValue: string;
  templateId?: TemplateId;
  uploading: boolean;
}) {
  return (
    <Sheet onOpenChange={onOpenChange} open={open}>
      <SheetContent
        className="flex w-full flex-col gap-0 border-outline-variant bg-surface p-0 sm:max-w-md"
        side="right"
      >
        <SheetHeader className="border-b border-outline-variant px-4 py-4">
          <SheetTitle className="text-on-surface">{IMAGE_FIELD_COPY.pickerTitle}</SheetTitle>
        </SheetHeader>
        <div className="flex-1 space-y-6 overflow-y-auto px-4 py-4">
          {groups.map((group) => (
            <ImagePickerGroup
              key={group.id}
              group={group}
              onSelect={onSelect}
              selectedValue={selectedValue}
              templateId={templateId}
            />
          ))}
        </div>
        <SheetFooter className="border-t border-outline-variant px-4 py-4">
          <button
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-outline-variant bg-surface px-3 py-2 text-body-sm text-on-surface transition-colors hover:border-primary hover:text-primary disabled:opacity-50"
            disabled={uploading}
            onClick={onUploadClick}
            type="button"
          >
            <ImagePlus aria-hidden className="size-4 shrink-0" />
            {uploading ? IMAGE_FIELD_COPY.uploading : IMAGE_FIELD_COPY.upload}
          </button>
          <input
            aria-label={IMAGE_FIELD_COPY.uploadAriaLabel}
            ref={inputRef}
            accept={allowLottie ? "image/*,.json,application/json" : "image/*"}
            className="hidden"
            onChange={onFileChange}
            type="file"
          />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
