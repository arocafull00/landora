import { Check, Circle, LoaderCircle, X } from "lucide-react";
import type {
  ImportProspectStep,
  ImportProspectStepState,
} from "@/components/admin/import-prospect/import-prospect-types";

const TONE_BY_STATE: Record<ImportProspectStepState, string> = {
  done: "text-success",
  error: "text-danger",
  active: "text-primary",
  pending: "text-on-surface-variant/50",
};

export function ImportProspectStepItem({
  step,
}: {
  step: ImportProspectStep;
}) {
  const icon =
    step.state === "done" ? (
      <Check aria-hidden className="size-4" />
    ) : step.state === "error" ? (
      <X aria-hidden className="size-4" />
    ) : step.state === "active" ? (
      <LoaderCircle aria-hidden className="size-4 animate-spin" />
    ) : (
      <Circle aria-hidden className="size-4" />
    );

  return (
    <li
      className={`flex items-center gap-2 font-body text-body-sm ${TONE_BY_STATE[step.state]}`}
    >
      {icon}
      <span>{step.label}</span>
    </li>
  );
}
