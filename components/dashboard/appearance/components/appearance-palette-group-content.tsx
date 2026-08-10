"use client";

import type { Landing } from "@/lib/dashboard-data";
import type { PaletteOption } from "@/lib/site-appearance";
import { APPEARANCE_EDITOR_COPY } from "@/components/dashboard/appearance/appearance-editor-copy";
import { PaletteOptionCard } from "@/components/dashboard/appearance/components/palette-option-card";
import { RadioGroup } from "@/components/ui/radio-group";

export function AppearancePaletteGroupContent({
  landing,
  onSelectPalette,
  paletteId,
  paletteOptions,
}: {
  landing: Landing;
  onSelectPalette: (paletteId: string) => void;
  paletteId: string;
  paletteOptions: readonly PaletteOption[];
}) {
  return (
    <div className="space-y-3 border-t border-outline-variant bg-surface-container-lowest p-4">
      <RadioGroup
        aria-label={APPEARANCE_EDITOR_COPY.palettes}
        className="grid gap-3"
        onValueChange={onSelectPalette}
        value={paletteId}
      >
        {paletteOptions.map((option) => (
          <PaletteOptionCard
            description={option.description}
            id={option.id}
            key={option.id}
            label={option.label}
            selected={paletteId === option.id}
            template={landing.template}
          />
        ))}
      </RadioGroup>
    </div>
  );
}
