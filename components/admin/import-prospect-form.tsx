"use client";

import { useRef, useState, useTransition } from "react";
import { toast } from "react-toastify";
import { ActionButton } from "@/components/ui/primitives";
import {
  previewProspectImport,
  provisionProspectLanding,
  provisionProspectUser,
} from "@/app/actions/provision-prospect";
import type { TemplateId } from "@/lib/dashboard-data";
import { getAllTemplates } from "@/lib/template-registry";

const inputClass =
  "w-full rounded-md border border-outline-variant bg-surface-bg px-3 py-2 text-body-sm text-on-surface outline-none transition-colors placeholder:text-on-surface-variant/50 focus:border-primary focus:ring-1 focus:ring-primary";

const templates = getAllTemplates();

type StepId = "validate" | "user" | "landing";

type StepState = "pending" | "active" | "done" | "error";

type Step = {
  id: StepId;
  label: string;
  state: StepState;
};

type PreviewData = {
  name: string;
  email: string;
  password: string;
  slug: string;
  template: TemplateId | null;
  category: string | null;
  requiresTemplateSelection: boolean;
};

const initialSteps: Step[] = [
  { id: "validate", label: "Validando JSON", state: "pending" },
  { id: "user", label: "Creando usuario", state: "pending" },
  { id: "landing", label: "Creando landing", state: "pending" },
];

function updateStep(steps: Step[], id: StepId, state: StepState) {
  return steps.map((step) => (step.id === id ? { ...step, state } : step));
}

export function ImportProspectForm({ onSuccess }: { onSuccess: () => void }) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isPending, startTransition] = useTransition();
  const [jsonContent, setJsonContent] = useState<string | null>(null);
  const [preview, setPreview] = useState<PreviewData | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateId>("ristorante");
  const [error, setError] = useState<string | null>(null);
  const [steps, setSteps] = useState<Step[]>(initialSteps);
  const [isImporting, setIsImporting] = useState(false);

  const effectiveTemplate = preview?.template ?? selectedTemplate;
  const canImport =
    preview &&
    jsonContent &&
    effectiveTemplate &&
    (!preview.requiresTemplateSelection || selectedTemplate);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setError(null);
    setPreview(null);
    setJsonContent(null);
    setSteps(initialSteps);

    const text = await file.text();
    setJsonContent(text);

    const result = await previewProspectImport(text);
    if ("error" in result) {
      setError(result.error);
      return;
    }

    setPreview(result);
    if (result.template) {
      setSelectedTemplate(result.template);
    }
  };

  const handleImport = () => {
    if (!preview || !jsonContent || !effectiveTemplate) return;

    setError(null);
    setIsImporting(true);
    setSteps(updateStep(initialSteps, "validate", "done"));

    startTransition(async () => {
      setSteps((current) => updateStep(updateStep(current, "validate", "done"), "user", "active"));

      const userResult = await provisionProspectUser({
        name: preview.name,
        email: preview.email,
        password: preview.password,
      });

      if ("error" in userResult) {
        setSteps((current) => updateStep(current, "user", "error"));
        setError(userResult.error);
        toast.error(userResult.error);
        setIsImporting(false);
        return;
      }

      toast.success(`Usuario creado: ${preview.email}`);
      setSteps((current) =>
        updateStep(updateStep(current, "user", "done"), "landing", "active")
      );

      const landingResult = await provisionProspectLanding({
        userId: userResult.userId,
        clerkUserId: userResult.clerkUserId,
        name: preview.name,
        slug: preview.slug,
        template: effectiveTemplate,
        json: jsonContent,
      });

      if ("error" in landingResult) {
        setSteps((current) => updateStep(current, "landing", "error"));
        setError(landingResult.error);
        toast.error(landingResult.error);
        setIsImporting(false);
        return;
      }

      setSteps((current) => updateStep(current, "landing", "done"));
      toast.success(`Prospecto importado: ${preview.email}`);
      setIsImporting(false);
      onSuccess();
    });
  };

  const handleReset = () => {
    setJsonContent(null);
    setPreview(null);
    setError(null);
    setSteps(initialSteps);
    setIsImporting(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-4">
      <label className="block">
        <span className="mb-1.5 block font-label text-label-md text-on-surface-variant">
          Archivo JSON del prospecto
        </span>
        <input
          ref={fileInputRef}
          type="file"
          accept=".json,application/json"
          onChange={handleFileChange}
          disabled={isPending || isImporting}
          className={inputClass}
        />
      </label>

      {preview ? (
        <div className="space-y-3 rounded-md border border-outline-variant bg-surface-container-low p-4">
          <PreviewField label="Nombre" value={preview.name} />
          <PreviewField label="Email" value={preview.email} />
          <PreviewField label="Contraseña" value={preview.password} />
          <PreviewField label="Slug" value={preview.slug} />
          {preview.category ? (
            <PreviewField label="Categoría" value={preview.category} />
          ) : null}
          {preview.template ? (
            <PreviewField
              label="Plantilla"
              value={templates.find((item) => item.id === preview.template)?.label ?? preview.template}
            />
          ) : (
            <label className="block">
              <span className="mb-1.5 block font-label text-label-md text-on-surface-variant">
                Plantilla
              </span>
              <select
                value={selectedTemplate}
                onChange={(event) => setSelectedTemplate(event.target.value as TemplateId)}
                className={inputClass}
                disabled={isPending || isImporting}
              >
                {templates.map((template) => (
                  <option key={template.id} value={template.id}>
                    {template.label}
                  </option>
                ))}
              </select>
            </label>
          )}
        </div>
      ) : null}

      {isImporting ? (
        <ul className="space-y-2">
          {steps.map((step) => (
            <ImportProspectStepItem key={step.id} step={step} />
          ))}
        </ul>
      ) : null}

      {error ? <p className="font-body text-body-sm text-error">{error}</p> : null}

      <div className="flex justify-end gap-2">
        <ActionButton
          variant="secondary"
          type="button"
          onClick={preview || jsonContent ? handleReset : onSuccess}
          disabled={isPending || isImporting}
        >
          {preview || jsonContent ? "Limpiar" : "Cancelar"}
        </ActionButton>
        <ActionButton
          variant="primary"
          type="button"
          onClick={handleImport}
          disabled={!canImport || isPending || isImporting}
        >
          {isPending || isImporting ? "Importando…" : "Importar prospecto"}
        </ActionButton>
      </div>
    </div>
  );
}

function PreviewField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="font-label text-label-md text-on-surface-variant">{label}</p>
      <p className="font-body text-body-sm text-on-surface">{value}</p>
    </div>
  );
}

function ImportProspectStepItem({ step }: { step: Step }) {
  const icon =
    step.state === "done" ? "✓" : step.state === "error" ? "✕" : step.state === "active" ? "…" : "○";

  const tone =
    step.state === "done"
      ? "text-success"
      : step.state === "error"
        ? "text-error"
        : step.state === "active"
          ? "text-primary"
          : "text-on-surface-variant/50";

  return (
    <li className={`flex items-center gap-2 font-body text-body-sm ${tone}`}>
      <span>{icon}</span>
      <span>{step.label}</span>
    </li>
  );
}
