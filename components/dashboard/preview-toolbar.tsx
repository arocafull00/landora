"use client";

import { Maximize2, Monitor, Smartphone } from "lucide-react";
import { IconButton } from "@/components/ui/primitives";

export type PreviewDevice = "desktop" | "mobile";

export function PreviewToolbar({
  device,
  onDeviceChange,
  scale,
  onFullscreen,
  showFullscreen = true,
}: {
  device: PreviewDevice;
  onDeviceChange: (device: PreviewDevice) => void;
  scale: number;
  onFullscreen?: () => void;
  showFullscreen?: boolean;
}) {
  return (
    <div className="flex shrink-0 items-center justify-between border-b border-outline-variant bg-surface-container-lowest px-unit-md py-2">
      <div className="flex items-center gap-1">
        <button
          aria-label="Desktop preview"
          className={`inline-flex h-8 w-8 items-center justify-center rounded-md transition-colors ${
            device === "desktop"
              ? "bg-primary-container text-on-primary-container"
              : "text-on-surface-variant hover:bg-surface-variant"
          }`}
          onClick={() => onDeviceChange("desktop")}
          type="button"
        >
          <Monitor className="h-4 w-4" />
        </button>
        <button
          aria-label="Mobile preview"
          className={`inline-flex h-8 w-8 items-center justify-center rounded-md transition-colors ${
            device === "mobile"
              ? "bg-primary-container text-on-primary-container"
              : "text-on-surface-variant hover:bg-surface-variant"
          }`}
          onClick={() => onDeviceChange("mobile")}
          type="button"
        >
          <Smartphone className="h-4 w-4" />
        </button>
      </div>
      <div className="flex items-center gap-2">
        <span className="font-label text-label-md text-on-surface-variant">
          {Math.round(scale * 100)}%
        </span>
        {showFullscreen && onFullscreen ? (
          <button
            aria-label="Fullscreen preview"
            className="inline-flex h-8 w-8 items-center justify-center rounded-md text-on-surface-variant transition-colors hover:bg-surface-variant hover:text-primary"
            onClick={onFullscreen}
            type="button"
          >
            <Maximize2 className="h-4 w-4" />
          </button>
        ) : null}
      </div>
    </div>
  );
}
