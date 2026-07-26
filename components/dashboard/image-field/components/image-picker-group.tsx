"use client";

import type { TemplateId } from "@/lib/dashboard-data";
import { ImagePickerOption } from "@/components/dashboard/image-field/components/image-picker-option";
import type { ImagePickerGroupData } from "@/components/dashboard/image-field/hooks/use-image-field";

export function ImagePickerGroup({
  group,
  onSelect,
  selectedValue,
  templateId,
}: {
  group: ImagePickerGroupData;
  onSelect: (value: string) => void;
  selectedValue: string;
  templateId?: TemplateId;
}) {
  return (
    <section className="space-y-3">
      <h3 className="font-label text-label-md text-on-surface-variant">{group.title}</h3>
      <div className="grid grid-cols-2 gap-3">
        {group.options.map((option) => (
          <ImagePickerOption
            key={option.value}
            onSelect={onSelect}
            option={option}
            selected={option.value === selectedValue}
            templateId={templateId}
          />
        ))}
      </div>
    </section>
  );
}
