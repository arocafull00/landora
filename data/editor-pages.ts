import "server-only";
import { cache } from "react";
import { and, asc, eq, ne } from "drizzle-orm";
import { db } from "@/db";
import { storeProducts } from "@/db/schema";

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
