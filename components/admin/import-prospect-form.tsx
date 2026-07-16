"use client";

import { useReducer, useRef, useTransition } from "react";
import { toast } from "react-toastify";
import { ActionButton } from "@/components/ui/primitives";
import {
  previewProspectImport,
  provisionProspectLanding,
  provisionProspectUser,
} from "@/app/actions/provision-prospect";
import type { TemplateId } from "@/lib/dashboard-data";
import { getAllTemplates } from "@/lib/template-registry";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PreviewField } from "@/components/admin/import-prospect/preview-field";
import { ImportProspectStepItem } from "@/components/admin/import-prospect/import-prospect-step-item";
import type {
  ImportProspectStep as Step,
  ImportProspectStepId as StepId,
  ImportProspectStepState as StepState,
} from "@/components/admin/import-prospect/import-prospect-types";

const inputClass =
  "w-full rounded-md border border-outline-variant bg-surface-bg px-3 py-2 text-body-sm text-on-surface outline-none transition-colors placeholder:text-on-surface-variant/50 focus:border-primary focus:ring-1 focus:ring-primary";

const templates = getAllTemplates();

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

type FormState = {
  jsonContent: string | null;
  preview: PreviewData | null;
  selectedTemplate: TemplateId;
  error: string | null;
  steps: Step[];
  isImporting: boolean;
};

type FormAction =
  | { type: "reset" }
  | { type: "setJson"; content: string }
  | { type: "setPreview"; preview: PreviewData }
  | { type: "setError"; error: string }
  | { type: "setSelectedTemplate"; template: TemplateId }
  | { type: "setSteps"; steps: Step[] }
  | { type: "startImport" }
  | { type: "finishImport" };

const initialFormState: FormState = {
  jsonContent: null,
  preview: null,
  selectedTemplate: "ristorante",
  error: null,
  steps: initialSteps,
  isImporting: false,
};

function updateStep(steps: Step[], id: StepId, state: StepState) {
  return steps.map((step) => (step.id === id ? { ...step, state } : step));
}

function formReducer(state: FormState, action: FormAction): FormState {
  switch (action.type) {
    case "reset":
      return initialFormState;
    case "setJson":
      return {
        ...state,
        jsonContent: action.content,
        preview: null,
        error: null,
        steps: initialSteps,
      };
    case "setPreview":
      return {
        ...state,
        preview: action.preview,
        selectedTemplate: action.preview.template ?? state.selectedTemplate,
      };
    case "setError":
      return { ...state, error: action.error };
    case "setSelectedTemplate":
      return { ...state, selectedTemplate: action.template };
    case "setSteps":
      return { ...state, steps: action.steps };
    case "startImport":
      return {
        ...state,
        error: null,
        isImporting: true,
        steps: updateStep(initialSteps, "validate", "done"),
      };
    case "finishImport":
      return { ...state, isImporting: false };
    default:
      return state;
  }
}

export function ImportProspectForm({ onSuccess }: { onSuccess: () => void }) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isPending, startTransition] = useTransition();
  const [state, dispatch] = useReducer(formReducer, initialFormState);

  const effectiveTemplate = state.preview?.template ?? state.selectedTemplate;
  const canImport =
    state.preview &&
    state.jsonContent &&
    effectiveTemplate &&
    (!state.preview.requiresTemplateSelection || state.selectedTemplate);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const text = await file.text();
    dispatch({ type: "setJson", content: text });

    const result = await previewProspectImport(text);
    if ("error" in result) {
      dispatch({ type: "setError", error: result.error });
      return;
    }

    dispatch({ type: "setPreview", preview: result });
  };

  const handleImport = () => {
    if (!state.preview || !state.jsonContent || !effectiveTemplate) return;

    dispatch({ type: "startImport" });

    startTransition(async () => {
      let steps = updateStep(updateStep(initialSteps, "validate", "done"), "user", "active");
      dispatch({ type: "setSteps", steps });

      const userResult = await provisionProspectUser({
        name: state.preview!.name,
        email: state.preview!.email,
        password: state.preview!.password,
      });

      if ("error" in userResult) {
        steps = updateStep(steps, "user", "error");
        dispatch({ type: "setSteps", steps });
        dispatch({ type: "setError", error: userResult.error });
        toast.error(userResult.error);
        dispatch({ type: "finishImport" });
        return;
      }

      toast.success(`Usuario creado: ${state.preview!.email}`);
      steps = updateStep(updateStep(steps, "user", "done"), "landing", "active");
      dispatch({ type: "setSteps", steps });

      const landingResult = await provisionProspectLanding({
        userId: userResult.userId,
        clerkUserId: userResult.clerkUserId,
        name: state.preview!.name,
        slug: state.preview!.slug,
        template: effectiveTemplate,
        json: state.jsonContent!,
      });

      if ("error" in landingResult) {
        steps = updateStep(steps, "landing", "error");
        dispatch({ type: "setSteps", steps });
        dispatch({ type: "setError", error: landingResult.error });
        toast.error(landingResult.error);
        dispatch({ type: "finishImport" });
        return;
      }

      steps = updateStep(steps, "landing", "done");
      dispatch({ type: "setSteps", steps });
      toast.success(`Prospecto importado: ${state.preview!.email}`);
      dispatch({ type: "finishImport" });
      onSuccess();
    });
  };

  const handleReset = () => {
    dispatch({ type: "reset" });
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
          disabled={isPending || state.isImporting}
          className={inputClass}
        />
      </label>

      {state.preview ? (
        <div className="space-y-3 rounded-md border border-outline-variant bg-surface-container-low p-4">
          <PreviewField label="Nombre" value={state.preview.name} />
          <PreviewField label="Email" value={state.preview.email} />
          <PreviewField label="Contraseña" value={state.preview.password} />
          <PreviewField label="Slug" value={state.preview.slug} />
          {state.preview.category ? (
            <PreviewField label="Categoría" value={state.preview.category} />
          ) : null}
          {state.preview.template ? (
            <PreviewField
              label="Plantilla"
              value={templates.find((item) => item.id === state.preview!.template)?.label ?? state.preview.template}
            />
          ) : (
            <div className="block">
              <span
                id="prospect-template-label"
                className="mb-1.5 block font-label text-label-md text-on-surface-variant"
              >
                Plantilla
              </span>
              <Select
                value={state.selectedTemplate}
                onValueChange={(value) =>
                  dispatch({
                    type: "setSelectedTemplate",
                    template: value as TemplateId,
                  })
                }
                disabled={isPending || state.isImporting}
              >
                <SelectTrigger
                  aria-labelledby="prospect-template-label"
                  className="w-full border-outline-variant bg-surface-bg"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {templates.map((template) => (
                    <SelectItem key={template.id} value={template.id}>
                      {template.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </div>
      ) : null}

      {state.isImporting ? (
        <ul className="space-y-2">
          {state.steps.map((step) => (
            <ImportProspectStepItem key={step.id} step={step} />
          ))}
        </ul>
      ) : null}

      {state.error ? <p className="font-body text-body-sm text-danger">{state.error}</p> : null}

      <div className="flex justify-end gap-2">
        <ActionButton
          variant="secondary"
          type="button"
          onClick={state.preview || state.jsonContent ? handleReset : onSuccess}
          disabled={isPending || state.isImporting}
        >
          {state.preview || state.jsonContent ? "Limpiar" : "Cancelar"}
        </ActionButton>
        <ActionButton
          variant="primary"
          type="button"
          onClick={handleImport}
          disabled={!canImport || isPending || state.isImporting}
        >
          {isPending || state.isImporting ? "Importando…" : "Importar prospecto"}
        </ActionButton>
      </div>
    </div>
  );
}
