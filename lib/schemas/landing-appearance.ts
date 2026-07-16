import { z } from "zod";

export const landingAppearanceSchema = z.object({
  landingId: z.uuid(),
  paletteId: z.string().trim().min(1).max(40),
  typographyId: z.string().trim().min(1).max(40),
});

export type LandingAppearanceInput = z.infer<typeof landingAppearanceSchema>;
