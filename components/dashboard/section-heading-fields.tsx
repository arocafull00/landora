"use client";

import { useDashboardStore } from "@/stores/dashboard-store";
import type { Landing, SectionHeading } from "@/lib/dashboard-data";
import { getSectionHeading, hasSectionSubtitle } from "@/lib/section-headings";

type SectionHeadingFieldsProps = {
  activeLanding: Landing;
  anchor: string;
  fallback: SectionHeading;
};

export function SectionHeadingFields({
  activeLanding,
  anchor,
  fallback,
}: SectionHeadingFieldsProps) {
  const { updateSectionHeading } = useDashboardStore();
  const heading = getSectionHeading(activeLanding.content, anchor, fallback);
  const showSubtitle = hasSectionSubtitle(fallback);

  return (
    <div className="space-y-4 rounded-lg border border-outline-variant bg-surface-container-low px-unit-md py-unit-sm">
      <EditorTextField
        label="Título de sección"
        onChange={(value) => updateSectionHeading(activeLanding.id, anchor, { title: value })}
        value={heading.title}
      />
      {showSubtitle ? (
        <EditorTextArea
          label="Subtítulo"
          onChange={(value) => updateSectionHeading(activeLanding.id, anchor, { subtitle: value })}
          value={heading.subtitle}
        />
      ) : null}
    </div>
  );
}

function EditorTextField({
  label,
  onChange,
  value,
}: {
  label: string;
  onChange: (value: string) => void;
  value: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block font-label text-label-md text-on-surface-variant">
        {label}
      </span>
      <input
        className="w-full rounded-lg border border-outline-variant bg-surface px-3 py-2 text-body-md text-on-surface outline-none transition-shadow focus:border-primary focus:ring-1 focus:ring-primary"
        onChange={(event) => onChange(event.target.value)}
        type="text"
        value={value}
      />
    </label>
  );
}

function EditorTextArea({
  label,
  onChange,
  value,
}: {
  label: string;
  onChange: (value: string) => void;
  value: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block font-label text-label-md text-on-surface-variant">
        {label}
      </span>
      <textarea
        className="w-full resize-none rounded-lg border border-outline-variant bg-surface px-3 py-2 text-body-md text-on-surface outline-none transition-shadow focus:border-primary focus:ring-1 focus:ring-primary"
        onChange={(event) => onChange(event.target.value)}
        rows={3}
        value={value}
      />
    </label>
  );
}
