"use client";

import { useState } from "react";
import { getAllTemplates } from "@/lib/template-registry";
import { TemplateCard } from "@/components/admin/template-card";
import { Icon } from "@/components/ui/icon";

const templates = getAllTemplates();

export function TemplatesSection() {
  const [selectedId, setSelectedId] = useState(templates[0]?.id ?? null);
  const selected = templates.find((t) => t.id === selectedId);

  return (
    <div className="flex flex-1 flex-col">
      <header className="flex items-center justify-between border-b border-outline-variant bg-surface-container-lowest px-6 py-4">
        <div>
          <h2 className="font-headline text-headline-sm font-bold text-on-surface">
            Plantillas
          </h2>
          <p className="mt-0.5 font-body text-body-sm text-on-surface-variant">
            {templates.length} {templates.length === 1 ? "plantilla disponible" : "plantillas disponibles"}
          </p>
        </div>
      </header>

      <div className="flex min-h-0 flex-1">
        <aside className="w-[280px] shrink-0 overflow-y-auto border-r border-outline-variant p-4">
          <div className="flex flex-col gap-2">
            {templates.map((t) => (
              <TemplateCard
                isActive={t.id === selectedId}
                key={t.id}
                onClick={() => setSelectedId(t.id)}
                template={t}
              />
            ))}
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col p-6">
          {selected ? (
            <>
              <div className="mb-3 flex items-center justify-between">
                <p className="font-body text-body-sm font-medium text-on-surface-variant">
                  Vista previa · {selected.label}
                </p>
                <a
                  className="inline-flex h-8 items-center gap-1.5 rounded-md border border-outline-variant px-3 font-label text-label-md text-on-surface transition-colors hover:bg-surface-variant"
                  href={`/admin/templates/${selected.id}`}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <Icon className="h-3.5 w-3.5" name="link" />
                  Pantalla completa
                </a>
              </div>
              <div className="min-h-0 flex-1 overflow-hidden rounded-lg border border-outline-variant shadow-sm">
                <iframe
                  className="h-full w-full"
                  src={`/admin/templates/${selected.id}?embed=1`}
                  title={`Demo: ${selected.label}`}
                />
              </div>
            </>
          ) : (
            <div className="flex h-full flex-col items-center justify-center text-on-surface-variant">
              <Icon className="mb-3 h-10 w-10 opacity-30" name="grid" />
              <p className="font-body text-body-md">Selecciona una plantilla</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
