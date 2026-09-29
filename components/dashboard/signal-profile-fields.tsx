"use client";

import type { TeamMember } from "@/lib/dashboard-data";
import { EditorTextField } from "@/components/dashboard/editor-text-field";
import { EditorTextArea } from "@/components/dashboard/editor-text-area";
import { ImageField } from "@/components/dashboard/image-field";

export function SignalProfileFields({ profile, onChange }: {
  profile: TeamMember;
  onChange: (patch: Partial<TeamMember>) => void;
}) {
  return (
    <div className="space-y-4 border-t border-outline-variant pt-5">
      <p className="font-label text-label-md text-on-surface-variant">Perfil</p>
      <EditorTextField label="Nombre" value={profile.name} onChange={(name) => onChange({ name })} />
      <EditorTextField label="Especialidad" value={profile.role} onChange={(role) => onChange({ role })} />
      <EditorTextArea label="Biografía" value={profile.bio} onChange={(bio) => onChange({ bio })} rows={4} />
      <ImageField label="Imagen de perfil" templateId="signal" value={profile.image} onChange={(image) => onChange({ image })} />
    </div>
  );
}
