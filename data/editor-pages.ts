import "server-only";
import { cache } from "react";
import { and, asc, eq, ne, sql } from "drizzle-orm";
import { db } from "@/db";
import { storeProducts, storeProductCategories } from "@/db/schema";

export const getEditorProductCategories = cache(async (landingId: string): Promise<string[]> => {
  try {
    const [categories, products] = await Promise.all([
      db.select({ name: storeProductCategories.name }).from(storeProductCategories).where(eq(storeProductCategories.landingId, landingId)),
      db.selectDistinct({ name: sql<string>`coalesce(${storeProducts.draftContent}->>'category', ${storeProducts.category})` }).from(storeProducts)
        .where(and(eq(storeProducts.landingId, landingId), ne(storeProducts.status, "archived"))),
    ]);
    return Array.from(new Set([...categories, ...products].flatMap(({ name }) => name ? [name] : []))).sort();
  } catch (error) {
    throw new Error("Failed to fetch editor product categories", { cause: error });
  }
});

export const getEditorProductSlug = cache(async (landingId: string) => {
  try {
    const [product] = await db.select({ slug: storeProducts.slug }).from(storeProducts)
      .where(and(eq(storeProducts.landingId, landingId), ne(storeProducts.status, "archived")))
      .orderBy(asc(storeProducts.sortOrder), asc(storeProducts.id)).limit(1);
    return product?.slug ?? null;
  } catch (error) {
    throw new Error("Failed to fetch editor product page", { cause: error });
  }
});
