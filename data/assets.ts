import "server-only";

import { and, desc, eq } from "drizzle-orm";
import { db } from "@/db";
import { assets } from "@/db/schema";
import type { AssetRow } from "@/db/schema";

export async function getAssetsByUserId(userId: string) {
  try {
    return await db.query.assets.findMany({
      where: eq(assets.userId, userId),
      orderBy: [desc(assets.createdAt)],
    });
  } catch {
    throw new Error("Failed to fetch assets");
  }
}

export async function insertAsset(data: {
  userId: string;
  publicId: string;
  url: string;
  name: string;
  mimeType: string;
  width: number | null;
  height: number | null;
}) {
  try {
    const [row] = await db.insert(assets).values(data).returning();
    return row;
  } catch {
    throw new Error("Failed to insert asset");
  }
}

export async function getAssetByIdAndUserId(id: string, userId: string) {
  try {
    const [row] = await db
      .select()
      .from(assets)
      .where(and(eq(assets.id, id), eq(assets.userId, userId)));
    return row ?? null;
  } catch {
    throw new Error("Failed to fetch asset");
  }
}

export async function updateAssetName(id: string, userId: string, name: string) {
  try {
    const [updated] = await db
      .update(assets)
      .set({ name })
      .where(and(eq(assets.id, id), eq(assets.userId, userId)))
      .returning();
    return (updated as AssetRow | undefined) ?? null;
  } catch {
    throw new Error("Failed to update asset");
  }
}

export async function deleteAssetById(id: string, userId: string) {
  try {
    await db
      .delete(assets)
      .where(and(eq(assets.id, id), eq(assets.userId, userId)));
  } catch {
    throw new Error("Failed to delete asset");
  }
}
