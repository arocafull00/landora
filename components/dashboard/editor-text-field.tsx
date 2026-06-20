"use client";

import { dispatchEditorFocusElement } from "@/lib/editor-element-focus";

export function EditorTextField({
  className = "",
  editorId,
  label,
  onChange,
  value,
}: {
  className?: string;
  editorId?: string;
  label: string;
  onChange: (value: string) => void;
  value: string;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-2 block font-label text-label-md text-on-surface-variant">
        {label}
      </span>
      <input
        className="w-full rounded-lg border border-outline-variant bg-surface px-3 py-2 text-body-md text-on-surface outline-none transition-shadow focus:border-primary focus:ring-1 focus:ring-primary"
        onBlur={editorId ? () => dispatchEditorFocusElement(null) : undefined}
        onChange={(event) => onChange(event.target.value)}
        onFocus={editorId ? () => dispatchEditorFocusElement(editorId) : undefined}
        type="text"
        value={value}
      />
    </label>
  );
}
