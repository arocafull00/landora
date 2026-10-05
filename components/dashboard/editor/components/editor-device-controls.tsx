import { Monitor, Smartphone } from "lucide-react";
import type { PreviewDevice } from "@/components/dashboard/preview-toolbar";
import { EDITOR_COPY } from "../editor-copy";
import { cn } from "@/lib/utils";

export function EditorDeviceControls({ device, onChange }: { device: PreviewDevice; onChange: (device: PreviewDevice) => void }) {
  return <div role="group" aria-label={EDITOR_COPY.preview} className="flex shrink-0 gap-1 rounded-lg bg-muted p-1">
    <button type="button" aria-label={EDITOR_COPY.desktop} aria-pressed={device === "desktop"} onClick={() => onChange("desktop")} className={cn("rounded-md p-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary", device === "desktop" ? "bg-surface text-ink" : "text-ink-muted hover:text-ink")}><Monitor aria-hidden className="size-4" /></button>
    <button type="button" aria-label={EDITOR_COPY.mobile} aria-pressed={device === "mobile"} onClick={() => onChange("mobile")} className={cn("rounded-md p-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary", device === "mobile" ? "bg-surface text-ink" : "text-ink-muted hover:text-ink")}><Smartphone aria-hidden className="size-4" /></button>
  </div>;
}
