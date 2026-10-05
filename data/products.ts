import "server-only";
import { cache } from "react";
import { and, asc, desc, eq, inArray, ne, or, sql } from "drizzle-orm";
import { db } from "@/db";
import { storeProducts, storeProductVariants, storeCatalogConfig } from "@/db/schema";
import type { CatalogConfigDto, ProductDto, ProductPageDto } from "@/lib/domain/dtos";
import { PRODUCT_PAGE_SIZE, parseLegacyPrice, productSlug, toPublicProduct } from "@/lib/products";
import { productSchema, type CatalogConfigValues, type CatalogQuery, type ProductValues } from "@/lib/schemas/products";
import type { NuvoletsContent } from "@/lib/schemas/nuvolets";

type ProductRow = typeof storeProducts.$inferSelect;
type VariantRow = typeof storeProductVariants.$inferSelect;
type Transaction = Parameters<Parameters<typeof db.transaction>[0]>[0];
type WriteResult = { status: "saved"; productId?: string } | { status: "conflict" | "not_found" | "denied" | "invalid" | "duplicate" };
type BatchWriteResult = { status: "saved"; updated: number; skipped: number } | { status: "denied" };
type StatusCommand = "archive" | "restore" | "unpublish" | "publish";

function dto(row: ProductRow, variants: VariantRow[]): ProductDto {
  const { legacyId, legacyAppearance, sortOrder, favoriteOrder, createdAt, updatedAt, ...product } = row;
  void legacyId; void legacyAppearance; void sortOrder; void favoriteOrder;
  return { ...product, createdAt: createdAt.toISOString(), updatedAt: updatedAt.toISOString(), variants: variants.map(({ productId, landingId, sortOrder: order, sku, ...variant }) => { void productId; void landingId; void order; return { ...variant, sku: sku ?? "" }; }) };
}

function knownError(error: unknown): WriteResult | null {
  if (!(error instanceof Error)) return null;
  const details = error as Error & { code?: string; cause?: unknown };
  if (details.code === "23505") return { status: "duplicate" };
  if (details.code === "23514") return { status: "invalid" };
  if (details.cause) return knownError(details.cause);
  return null;
}

async function lockAccess(tx: Transaction, landingId: string, userId: string) {
  const rows = await tx.execute<{ id: string }>(sql`
    SELECT a.id FROM user_addons a JOIN users u ON u.id = a.user_id JOIN landing_pages l ON l.user_id = u.id
    WHERE l.id = ${landingId} AND u.id = ${userId} AND a.addon_type = 'products' AND a.manual_access = true AND u.suspended = false
    AND (u.type = 'admin' OR u.access_type = 'manual' OR u.subscription_status IN ('active', 'trialing'))
    FOR UPDATE OF a, u
  `);
  return rows.length > 0;
}

export const getCatalogConfig = cache(async (landingId: string): Promise<CatalogConfigDto> => {
  try {
    const [row] = await db.select().from(storeCatalogConfig).where(eq(storeCatalogConfig.landingId, landingId));
    if (!row) return { enabled: false, adopted: false, title: "Productos", description: "", whatsappPhone: "", version: 0 };
    return { enabled: row.enabled, adopted: row.adopted, title: row.title, description: row.description, whatsappPhone: row.whatsappPhone, version: row.version };
  } catch (error) { throw new Error("Failed to fetch catalog config", { cause: error }); }
});

export const getProductById = cache(async (landingId: string, productId: string) => {
  try {
    const [row] = await db.select().from(storeProducts).where(and(eq(storeProducts.landingId, landingId), eq(storeProducts.id, productId)));
    if (!row) return null;
    const variants = await db.select().from(storeProductVariants).where(eq(storeProductVariants.productId, productId)).orderBy(asc(storeProductVariants.sortOrder));
    return dto(row, variants);
  } catch (error) { throw new Error("Failed to fetch product", { cause: error }); }
});

export const getProductBySlug = cache(async (landingId: string, slug: string, preview: boolean) => {
  try {
    const [row] = await db.select().from(storeProducts).where(and(eq(storeProducts.landingId, landingId), eq(storeProducts.slug, slug), preview ? ne(storeProducts.status, "archived") : eq(storeProducts.status, "published")));
    if (!row) return null;
    const variants = await db.select().from(storeProductVariants).where(eq(storeProductVariants.productId, row.id)).orderBy(asc(storeProductVariants.sortOrder));
    return toPublicProduct(dto(row, variants));
  } catch (error) { throw new Error("Failed to fetch product slug", { cause: error }); }
});

export const getProductPage = cache(async (landingId: string, query: CatalogQuery, publicOnly: boolean, preview = false): Promise<ProductPageDto<ProductDto>> => {
  try {
    const scope = and(eq(storeProducts.landingId, landingId), publicOnly ? eq(storeProducts.status, "published") : preview ? ne(storeProducts.status, "archived") : undefined);
    const variantSize = query.size ? sql`and v.size = ${query.size}` : sql``;
    const available = sql`exists (select 1 from store_product_variants v where v.product_id = ${storeProducts.id} and v.stock > 0 ${variantSize})`;
    const filters = and(scope,
      !publicOnly && query.status !== "all" ? eq(storeProducts.status, query.status) : undefined,
      query.category ? eq(storeProducts.category, query.category) : undefined, query.brand ? eq(storeProducts.brand, query.brand) : undefined,
      query.size ? sql`exists (select 1 from store_product_variants v where v.product_id = ${storeProducts.id} and v.size = ${query.size})` : undefined,
      query.q ? or(sql`position(lower(${query.q}) in lower(${storeProducts.title})) > 0`, sql`exists (select 1 from store_product_variants v where v.product_id = ${storeProducts.id} and position(lower(${query.q}) in lower(coalesce(v.sku, ''))) > 0)`) : undefined,
      query.availability === "available" ? available : query.availability === "out" ? sql`not ${available} and not exists (select 1 from store_product_variants v where v.product_id = ${storeProducts.id} and v.stock is null ${variantSize})` : query.availability === "pending" ? sql`exists (select 1 from store_product_variants v where v.product_id = ${storeProducts.id} and v.stock is null ${variantSize})` : undefined,
    );
    const price = sql`(select min(coalesce(v.price_cents, ${storeProducts.priceCents})) from store_product_variants v where v.product_id = ${storeProducts.id})`;
    const [{ total }] = await db.select({ total: sql<number>`count(*)::int` }).from(storeProducts).where(filters);
    const page = Math.min(query.page, Math.max(1, Math.ceil(total / PRODUCT_PAGE_SIZE)));
    const [rows, facets, sizes] = await Promise.all([
      db.select().from(storeProducts).where(filters).orderBy(query.sort === "price-asc" ? asc(price) : query.sort === "price-desc" ? desc(price) : desc(storeProducts.createdAt), asc(storeProducts.id)).limit(PRODUCT_PAGE_SIZE).offset((page - 1) * PRODUCT_PAGE_SIZE),
      db.selectDistinct({ category: storeProducts.category, brand: storeProducts.brand }).from(storeProducts).where(scope),
      db.selectDistinct({ size: storeProductVariants.size }).from(storeProductVariants).innerJoin(storeProducts, eq(storeProductVariants.productId, storeProducts.id)).where(scope),
    ]);
    const variants = rows.length ? await db.select().from(storeProductVariants).where(inArray(storeProductVariants.productId, rows.map((row) => row.id))).orderBy(asc(storeProductVariants.sortOrder)) : [];
    return { products: rows.map((row) => dto(row, variants.filter((variant) => variant.productId === row.id))), total, page, categories: Array.from(new Set(facets.flatMap((f) => f.category ? [f.category] : []))).sort(), brands: Array.from(new Set(facets.flatMap((f) => f.brand ? [f.brand] : []))).sort(), sizes: sizes.flatMap((f) => f.size ? [f.size] : []).sort() };
  } catch (error) { throw new Error("Failed to fetch product page", { cause: error }); }
});

export async function saveProduct(landingId: string, userId: string, productId: string | null, version: number, product: ProductValues): Promise<WriteResult> {
  try {
    return await db.transaction(async (tx): Promise<WriteResult> => {
      if (!await lockAccess(tx, landingId, userId)) return { status: "denied" };
      const { variants, ...fields } = product;
      if (productId) {
        const [row] = await tx.update(storeProducts).set({ ...fields, version: version + 1, updatedAt: new Date() }).where(and(eq(storeProducts.id, productId), eq(storeProducts.landingId, landingId), eq(storeProducts.version, version))).returning({ id: storeProducts.id });
        if (!row) return { status: "conflict" };
        await tx.delete(storeProductVariants).where(eq(storeProductVariants.productId, productId));
      }
      const id = productId ?? crypto.randomUUID();
      if (!productId) await tx.insert(storeProducts).values({ ...fields, id, landingId });
      await tx.insert(storeProductVariants).values(variants.map((variant, sortOrder) => ({ ...variant, productId: id, landingId, sortOrder, sku: variant.sku.trim() || null })));
      return { status: "saved", productId: id };
    });
  } catch (error) { const known = knownError(error); if (known) return known; throw new Error("Failed to save product", { cause: error }); }
}

async function applyProductStatus(tx: Transaction, row: ProductRow, version: number, command: StatusCommand): Promise<WriteResult> {
  if (row.version !== version) return { status: "conflict" };
  const status = command === "archive" ? "archived" : command === "publish" ? "published" : "draft";
  if (status === "published") {
    const variants = await tx.select().from(storeProductVariants).where(eq(storeProductVariants.productId, row.id));
    const product = dto(row, variants);
    const { id, landingId: parentId, version: revision, createdAt, updatedAt, ...values } = product;
    void id; void parentId; void revision; void createdAt; void updatedAt;
    if (!productSchema.safeParse({ ...values, status }).success) return { status: "invalid" };
  }
  await tx.update(storeProducts).set({ status, version: version + 1, updatedAt: new Date() }).where(eq(storeProducts.id, row.id));
  return { status: "saved", productId: row.id };
}

export async function commandProduct(landingId: string, userId: string, productId: string, version: number, command: "duplicate" | "archive" | "restore" | "unpublish" | "publish"): Promise<WriteResult> {
  try {
    return await db.transaction(async (tx): Promise<WriteResult> => {
      if (!await lockAccess(tx, landingId, userId)) return { status: "denied" };
      const [row] = await tx.select().from(storeProducts).where(and(eq(storeProducts.id, productId), eq(storeProducts.landingId, landingId))).for("update");
      if (!row) return { status: "not_found" };
      if (command === "duplicate") {
        const variants = await tx.select().from(storeProductVariants).where(eq(storeProductVariants.productId, productId)).orderBy(asc(storeProductVariants.sortOrder));
        const id = crypto.randomUUID();
        const { createdAt, updatedAt, ...fields } = row;
        void createdAt; void updatedAt;
        await tx.insert(storeProducts).values({ ...fields, id, slug: `${row.slug.slice(0, 145)}-${id.slice(0, 8)}`, title: `${row.title.slice(0, 152)} (copia)`, version: 1, status: "draft", legacyId: null });
        await tx.insert(storeProductVariants).values(variants.map((variant) => ({ ...variant, id: crypto.randomUUID(), productId: id, sku: null })));
        return { status: "saved", productId: id };
      }
      return applyProductStatus(tx, row, version, command);
    });
  } catch (error) { const known = knownError(error); if (known) return known; throw new Error("Failed to change product", { cause: error }); }
}

export async function batchCommandProducts(landingId: string, userId: string, items: { productId: string; version: number }[], command: "publish" | "archive"): Promise<BatchWriteResult> {
  try {
    return await db.transaction(async (tx): Promise<BatchWriteResult> => {
      if (!await lockAccess(tx, landingId, userId)) return { status: "denied" };
      let updated = 0;
      let skipped = 0;
      for (const item of items) {
        const [row] = await tx.select().from(storeProducts).where(and(eq(storeProducts.id, item.productId), eq(storeProducts.landingId, landingId))).for("update");
        if (!row) { skipped += 1; continue; }
        const result = await applyProductStatus(tx, row, item.version, command);
        if (result.status === "saved") { updated += 1; continue; }
        skipped += 1;
      }
      return { status: "saved", updated, skipped };
    });
  } catch (error) { throw new Error("Failed to batch change products", { cause: error }); }
}

export async function saveCatalogConfig(landingId: string, userId: string, version: number, config: CatalogConfigValues): Promise<WriteResult> {
  try {
    return await db.transaction(async (tx): Promise<WriteResult> => {
      if (!await lockAccess(tx, landingId, userId)) return { status: "denied" };
      if (version === 0) {
        const rows = await tx.insert(storeCatalogConfig).values({ ...config, landingId, adopted: config.enabled }).onConflictDoNothing().returning();
        return { status: rows.length ? "saved" : "conflict" };
      }
      const rows = await tx.update(storeCatalogConfig).set({ ...config, version: version + 1, adopted: config.enabled ? true : sql`${storeCatalogConfig.adopted}` }).where(and(eq(storeCatalogConfig.landingId, landingId), eq(storeCatalogConfig.version, version))).returning();
      return { status: rows.length ? "saved" : "conflict" };
    });
  } catch (error) { throw new Error("Failed to save catalog config", { cause: error }); }
}

export async function importNuvoletsProducts(landingId: string, userId: string, config: NuvoletsContent): Promise<WriteResult> {
  try {
    return await db.transaction(async (tx): Promise<WriteResult> => {
      if (!await lockAccess(tx, landingId, userId)) return { status: "denied" };
      if (!config.products.length) return { status: "saved" };
      const favorites = new Map(config.favorites.productIds.map((id, index) => [id, index]));
      const products = config.products.map((product, sortOrder) => {
        const id = crypto.randomUUID();
        return { id, landingId, title: product.name, slug: `${productSlug(product.name)}-${id.slice(0, 8)}`, priceCents: parseLegacyPrice(product.price), images: product.image ? [{ url: product.image, alt: product.alt }] : [], legacyId: product.id, legacyAppearance: { badge: product.badge, tone: product.tone, colors: product.colors }, featured: favorites.has(product.id), favoriteOrder: favorites.get(product.id) ?? 0, sortOrder };
      });
      const rows = await tx.insert(storeProducts).values(products).onConflictDoNothing({ target: [storeProducts.landingId, storeProducts.legacyId] }).returning({ id: storeProducts.id });
      if (rows.length) await tx.insert(storeProductVariants).values(rows.map((row) => ({ id: crypto.randomUUID(), landingId, productId: row.id })));
      return { status: "saved" };
    });
  } catch (error) { throw new Error("Failed to import Nuvolets products", { cause: error }); }
}

export const getCatalogHighlights = cache(async (landingId: string, preview: boolean) => {
  try {
    const rows = await db.select().from(storeProducts).where(and(eq(storeProducts.landingId, landingId), preview ? ne(storeProducts.status, "archived") : eq(storeProducts.status, "published")))
      .orderBy(asc(storeProducts.sortOrder), desc(storeProducts.createdAt)).limit(200);
    const variants = rows.length ? await db.select().from(storeProductVariants).where(inArray(storeProductVariants.productId, rows.map((row) => row.id))).orderBy(asc(storeProductVariants.sortOrder)) : [];
    return rows.map((row) => ({ product: toPublicProduct(dto(row, variants.filter((variant) => variant.productId === row.id))), legacyId: row.legacyId, appearance: row.legacyAppearance, featured: row.featured, favoriteOrder: row.favoriteOrder }));
  } catch (error) { throw new Error("Failed to fetch catalog highlights", { cause: error }); }
});

export const getPublishedProductSitemap = cache(async (landingId: string) => {
  try {
    return await db.select({ slug: storeProducts.slug, updatedAt: storeProducts.updatedAt }).from(storeProducts).where(and(eq(storeProducts.landingId, landingId), eq(storeProducts.status, "published")));
  } catch (error) { throw new Error("Failed to fetch product sitemap", { cause: error }); }
});
