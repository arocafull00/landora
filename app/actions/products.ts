"use server";

import { revalidatePath } from "next/cache";
import { checkAuth } from "@/lib/auth";
import { logger } from "@/lib/logger";
import { requireProductsAccess } from "@/lib/require-products-access";
import { getUserByInternalId } from "@/data/users";
import { getLandingsByUserId, getLandingPageByIdAndUserId } from "@/data/landing-pages";
import { setProductsAccess } from "@/data/product-access";
import { saveProduct, commandProduct, batchCommandProducts, saveCatalogConfig, importNuvoletsProducts } from "@/data/products";
import { productSaveSchema, productCommandSchema, productBatchCommandSchema, catalogSaveSchema, productsAccessSchema } from "@/lib/schemas/products";
import { resourceIdSchema } from "@/lib/schemas/api";
import { revalidateProductRoutes } from "@/lib/products-revalidation";
import { toLandingContent } from "@/lib/landing-mapper";
import { nuvoletsContentSchema } from "@/lib/schemas/nuvolets";

type Result = { success: true; productId?: string; updated?: number; skipped?: number } | { error: string };
const ERRORS = { conflict: "Los datos han cambiado en otra sesión. Recarga antes de guardar.", not_found: "Producto no encontrado", denied: "El módulo de Productos no está habilitado", invalid: "Revisa el precio, las imágenes y las existencias antes de publicar", duplicate: "La URL, el SKU o la combinación de talla y color ya existen" } as const;

export async function saveProductAction(input: unknown): Promise<Result> {
  const parsed = productSaveSchema.safeParse(input);
  if (!parsed.success) return { error: "Datos del producto no válidos" };
  try {
    const { landingId, productId, version, product } = parsed.data;
    const access = await requireProductsAccess(landingId);
    if (!access) return { error: ERRORS.denied };
    const result = await saveProduct(landingId, access.userId, productId, version, product);
    if (result.status !== "saved") return { error: ERRORS[result.status] };
    revalidateProductRoutes(access.landing);
    return { success: true, productId: result.productId };
  } catch (error) { logger.captureException(error, { action: "save-product", landingId: parsed.data.landingId }); return { error: "No se pudo guardar el producto" }; }
}

export async function batchCommandProductsAction(input: unknown): Promise<Result> {
  const parsed = productBatchCommandSchema.safeParse(input);
  if (!parsed.success) return { error: "Operación no válida" };
  try {
    const { landingId, items, command } = parsed.data;
    const access = await requireProductsAccess(landingId);
    if (!access) return { error: ERRORS.denied };
    const result = await batchCommandProducts(landingId, access.userId, items, command);
    if (result.status !== "saved") return { error: ERRORS.denied };
    revalidateProductRoutes(access.landing);
    return { success: true, updated: result.updated, skipped: result.skipped };
  } catch (error) { logger.captureException(error, { action: "product-batch-command", landingId: parsed.data.landingId }); return { error: "No se pudo actualizar el catálogo" }; }
}

export async function commandProductAction(input: unknown): Promise<Result> {
  const parsed = productCommandSchema.safeParse(input);
  if (!parsed.success) return { error: "Operación no válida" };
  try {
    const { landingId, productId, version, command } = parsed.data;
    const access = await requireProductsAccess(landingId);
    if (!access) return { error: ERRORS.denied };
    const result = await commandProduct(landingId, access.userId, productId, version, command);
    if (result.status !== "saved") return { error: ERRORS[result.status] };
    revalidateProductRoutes(access.landing);
    return { success: true, productId: result.productId };
  } catch (error) { logger.captureException(error, { action: "product-command", landingId: parsed.data.landingId }); return { error: "No se pudo actualizar el producto" }; }
}

export async function saveCatalogAction(input: unknown): Promise<Result> {
  const parsed = catalogSaveSchema.safeParse(input);
  if (!parsed.success) return { error: "Configuración del catálogo no válida" };
  try {
    const access = await requireProductsAccess(parsed.data.landingId);
    if (!access) return { error: ERRORS.denied };
    const result = await saveCatalogConfig(parsed.data.landingId, access.userId, parsed.data.version, parsed.data.config);
    if (result.status !== "saved") return { error: ERRORS[result.status] };
    revalidateProductRoutes(access.landing);
    return { success: true };
  } catch (error) { logger.captureException(error, { action: "save-catalog", landingId: parsed.data.landingId }); return { error: "No se pudo guardar el catálogo" }; }
}

export async function importProductsAction(landingId: string): Promise<Result> {
  const parsed = resourceIdSchema.safeParse(landingId);
  if (!parsed.success) return { error: "Web no válida" };
  try {
    const access = await requireProductsAccess(parsed.data);
    if (!access) return { error: ERRORS.denied };
    const landing = await getLandingPageByIdAndUserId(parsed.data, access.userId);
    if (!landing || landing.template !== "nuvolets") return { error: "Esta web no tiene productos de Nuvolets" };
    const parsedConfig = nuvoletsContentSchema.safeParse(toLandingContent(landing).nuvolets);
    if (!parsedConfig.success) return { error: "Revisa los productos actuales de Nuvolets antes de importarlos" };
    const result = await importNuvoletsProducts(landing.id, access.userId, parsedConfig.data);
    if (result.status !== "saved") return { error: ERRORS[result.status] };
    revalidateProductRoutes(access.landing);
    return { success: true };
  } catch (error) { logger.captureException(error, { action: "import-products", landingId: parsed.data }); return { error: "No se pudieron importar los productos" }; }
}

export async function setProductsAccessAction(input: unknown): Promise<Result> {
  const authError = await checkAuth();
  if (authError) return authError;
  const parsed = productsAccessSchema.safeParse(input);
  if (!parsed.success) return { error: "Configuración de acceso no válida" };
  try {
    const user = await getUserByInternalId(parsed.data.userId);
    if (!user || user.type === "admin") return { error: "Usuario no válido" };
    await setProductsAccess(user.id, parsed.data.enabled);
    const landings = await getLandingsByUserId(user.id);
    for (const landing of landings) revalidateProductRoutes(landing);
    revalidatePath("/admin");
    revalidatePath("/", "layout");
    return { success: true };
  } catch (error) { logger.captureException(error, { action: "set-products-access", userId: parsed.data.userId }); return { error: "No se pudo cambiar el acceso a Productos" }; }
}
