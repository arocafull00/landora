"use client";

import type { Landing } from "@/lib/dashboard-data";
import { APPEARANCE_EDITOR_COPY } from "@/components/dashboard/appearance/appearance-editor-copy";
import { TypographyOptionCard } from "@/components/dashboard/appearance/components/typography-option-card";
import { RadioGroup } from "@/components/ui/radio-group";
import { TYPOGRAPHY_OPTIONS } from "@/lib/site-appearance";

export function AppearanceTypographyGroupContent({
  landing,
  onSelectTypography,
  paletteId,
  typographyId,
}: {
  landing: Landing;
  onSelectTypography: (typographyId: string) => void;
  paletteId: string;
  typographyId: string;
}) {
  return (
    <div className="border-t border-outline-variant px-4 py-5">
      <RadioGroup
        aria-label={APPEARANCE_EDITOR_COPY.typography}
        className="grid gap-2"
        onValueChange={onSelectTypography}
        value={typographyId}
      >
        {TYPOGRAPHY_OPTIONS.map((option) => (
          <TypographyOptionCard
            description={option.description}
            id={option.id}
            key={option.id}
            label={option.label}
            paletteId={paletteId}
            selected={typographyId === option.id}
            template={landing.template}
          />
        ))}
      </RadioGroup>
    </div>
  );
}
