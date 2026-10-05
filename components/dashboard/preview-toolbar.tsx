import { Maximize2 } from "lucide-react";
import { EditorDeviceControls } from "./editor/components/editor-device-controls";
import { EDITOR_COPY } from "./editor/editor-copy";

export type PreviewDevice = "desktop" | "mobile";

export function PreviewToolbar({ device, onDeviceChange, scale, onFullscreen, showFullscreen = true }: {
  device: PreviewDevice; onDeviceChange: (device: PreviewDevice) => void; scale: number;
  onFullscreen?: () => void; showFullscreen?: boolean;
}) {
  return <div className="flex shrink-0 items-center justify-between border-b border-border bg-surface px-3 py-2">
    <EditorDeviceControls device={device} onChange={onDeviceChange} />
    <div className="flex items-center gap-2"><span className="text-xs text-ink-muted">{Math.round(scale * 100)}%</span>
      {showFullscreen && onFullscreen ? <button type="button" aria-label={EDITOR_COPY.fullscreen} onClick={onFullscreen} className="rounded-md p-2 text-ink-secondary hover:bg-muted focus-visible:ring-2 focus-visible:ring-primary"><Maximize2 aria-hidden className="size-4" /></button> : null}
    </div>
  </div>;
}
