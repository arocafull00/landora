import "server-only";

import { db } from "@/db";
import { landingNuvolets } from "@/db/schema";
import type { NuvoletsContent } from "@/lib/schemas/nuvolets";

export async function upsertLandingNuvolets(landingId: string, content: NuvoletsContent) {
  try {
    await db.insert(landingNuvolets).values({ landingId, content }).onConflictDoUpdate({
      target: landingNuvolets.landingId,
      set: { content },
    });
  } catch (error) {
    throw new Error("Failed to save Nuvolets content", { cause: error });
  }
}
