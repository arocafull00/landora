"use client";

import type { GalleryItem } from "@/lib/dashboard-data";
import { EditorTextField } from "@/components/dashboard/editor-text-field";
import { EditorTextArea } from "@/components/dashboard/editor-text-area";
import { ImageField } from "@/components/dashboard/image-field";

function patchWithSlug(
  item: GalleryItem,
  projectSlug: string,
): Partial<GalleryItem> {
  const trimmed = projectSlug.trim();
  if (!trimmed) {
    return { projectSlug: "", linkType: "none" };
  }
  return { projectSlug: trimmed, linkType: "internal" };
}

export function SignalCaseItemEditor({ item, index, onChange, onRemove }: {
  item: GalleryItem;
  index: number;
  onChange: (patch: Partial<GalleryItem>) => void;
  onRemove: () => void;
}) {
  return (
    <div className="space-y-4 border-b border-outline-variant pb-6 last:border-0">
      <div className="flex items-center justify-between">
        <p className="font-label text-label-md text-on-surface-variant">Caso {index + 1}</p>
        <button className="font-label text-label-md text-danger transition-colors hover:text-danger/80" onClick={onRemove} type="button">Eliminar</button>
      </div>
      <EditorTextField label="Empresa" value={item.title ?? ""} onChange={(title) => onChange({ title })} />
      <EditorTextArea label="Título del proyecto (tarjeta)" value={item.description ?? ""} onChange={(description) => onChange({ description })} rows={2} />
      <EditorTextField
        label="URL del caso"
        value={item.projectSlug ?? ""}
        onChange={(projectSlug) => onChange(patchWithSlug(item, projectSlug))}
      />
      <EditorTextArea label="Problema" value={item.caseProblem ?? ""} onChange={(caseProblem) => onChange({ caseProblem })} rows={4} />
      <EditorTextArea label="Solución" value={item.projectBody ?? ""} onChange={(projectBody) => onChange({ projectBody })} rows={4} />
      <EditorTextArea label="Impacto" value={item.caseImpact ?? ""} onChange={(caseImpact) => onChange({ caseImpact })} rows={3} />
      <EditorTextArea label="Cómo se hizo" value={item.caseMethod ?? ""} onChange={(caseMethod) => onChange({ caseMethod })} rows={3} />
      <EditorTextField label="Ámbitos" value={item.tags?.[0] ?? ""} onChange={(category) => onChange({ tags: [category, item.tags?.[1] ?? ""] })} />
      <EditorTextField label="Dato destacado (opcional)" value={item.tags?.[1] ?? ""} onChange={(highlight) => onChange({ tags: [item.tags?.[0] ?? "", highlight] })} />
      <ImageField label="Imagen del caso" templateId="signal" value={item.image ?? ""} onChange={(image) => onChange({ image })} />
    </div>
  );
}
