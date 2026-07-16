export type ImportProspectStepId = "validate" | "user" | "landing";

export type ImportProspectStepState = "pending" | "active" | "done" | "error";

export type ImportProspectStep = {
  id: ImportProspectStepId;
  label: string;
  state: ImportProspectStepState;
};
