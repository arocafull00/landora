"use client";

import type { NuvoletsContent } from "@/lib/schemas/nuvolets";
import { NUVOLETS_EDITOR_COPY, NUVOLETS_EDITOR_FIELDS } from "../nuvolets-copy";
import { useNuvoletsSettings } from "../hooks/use-nuvolets-settings";
import { NuvoletsFormField } from "./nuvolets-form-field";
import { NuvoletsListEditor } from "./nuvolets-list-editor";

export function NuvoletsSettingsForm({ config, tab, onChange }: { config: NuvoletsContent; tab: string; onChange: (value: NuvoletsContent) => void }) {
  const { form, sync, submit } = useNuvoletsSettings(config, onChange);
  const definition = NUVOLETS_EDITOR_FIELDS[tab];
  if (!definition) return null;
  return <form onSubmit={submit} onChange={sync} className="space-y-6 py-6"><h2 className="text-xl font-semibold text-ink">{tab}</h2>{definition.fields.map((field) => <NuvoletsFormField key={field.name} definition={field} form={form} sync={sync} />)}{definition.lists.map((list) => <NuvoletsListEditor key={list.name} definition={list} form={form} sync={sync} />)}<button type="submit" disabled={form.formState.isSubmitting} className="rounded-lg bg-primary px-4 py-2 text-on-primary">{NUVOLETS_EDITOR_COPY.validate}</button></form>;
}
