import { db } from "@/db";
import { landingSectionSelections } from "@/db/schema";
import type { HeroVariantId, SectionKey } from "@/lib/dashboard-data";

export async function upsertLandingSectionSelection(
  landingId: string,
  sectionKey: SectionKey,
  variantId: HeroVariantId,
) {
  try {
    await db
      .insert(landingSectionSelections)
      .values({ landingId, sectionKey, variantId })
      .onConflictDoUpdate({
        target: [
          landingSectionSelections.landingId,
          landingSectionSelections.sectionKey,
        ],
        set: { variantId },
      });
  } catch (error) {
    throw new Error("Failed to update landing section selection", {
      cause: error,
    });
  }
}
