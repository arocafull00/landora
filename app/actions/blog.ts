"use server";

import { revalidatePath } from "next/cache";
import {
  createBlogPost,
  deleteBlogPost,
  getBlogConfig,
  getBlogPostById,
  updateBlogPost,
  upsertBlogConfig,
} from "@/data/blog";
import { assertLandingAccess } from "@/lib/api/landing-auth";
import type { BlogPostDto } from "@/lib/domain/dtos";
import { toBlogPostDto } from "@/lib/domain/mappers";
import { logger } from "@/lib/logger";
import {
  createBlogPostSchema,
  resourceIdSchema,
  updateBlogConfigSchema,
  updateBlogPostSchema,
} from "@/lib/schemas/api";

type BlogPostResult =
  | { success: true; data: BlogPostDto }
  | { error: string };

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

function revalidateBlogRoutes(landing: { id: string; slug: string }) {
  const slugValue = landing.slug.replace(/^\//, "");
  revalidatePath("/blog");
  revalidatePath("/editor");
  revalidatePath(`/${slugValue}/blog`);
  revalidatePath(`/preview/${landing.id}`);
}

export async function createBlogPostAction(
  landingId: string,
  input: unknown,
): Promise<BlogPostResult> {
  const parsedId = resourceIdSchema.safeParse(landingId);
  const parsed = createBlogPostSchema.safeParse(input);
  if (!parsedId.success || !parsed.success) {
    return { error: "Datos del post no válidos" };
  }

  const landing = await assertLandingAccess(parsedId.data);
  if (!landing) return { error: "No autorizado" };

  try {
    const row = await createBlogPost(landing.id, {
      title: parsed.data.title,
      slug: parsed.data.slug ?? slugify(parsed.data.title),
      excerpt: parsed.data.excerpt,
      body: parsed.data.body,
      heroImage: parsed.data.heroImage,
    });
    revalidateBlogRoutes(landing);
    return { success: true, data: toBlogPostDto(row) };
  } catch (error) {
    logger.captureException(error, {
      action: "create-blog-post",
      landingId: landing.id,
      tenantId: landing.userId,
    });
    return { error: "No se pudo crear el post" };
  }
}

export async function updateBlogPostAction(
  landingId: string,
  postId: string,
  input: unknown,
): Promise<BlogPostResult> {
  const parsedIds = resourceIdSchema.array().safeParse([landingId, postId]);
  const parsed = updateBlogPostSchema.safeParse(input);
  if (!parsedIds.success || !parsed.success) {
    return { error: "Datos del post no válidos" };
  }

  const [validLandingId, validPostId] = parsedIds.data;
  const landing = await assertLandingAccess(validLandingId);
  if (!landing) return { error: "No autorizado" };

  try {
    const post = await getBlogPostById(validPostId);
    if (!post || post.landingId !== validLandingId) {
      return { error: "Post no encontrado" };
    }

    const row = await updateBlogPost(validPostId, parsed.data);
    revalidateBlogRoutes(landing);
    return { success: true, data: toBlogPostDto(row) };
  } catch (error) {
    logger.captureException(error, {
      action: "update-blog-post",
      landingId: landing.id,
      tenantId: landing.userId,
    });
    return { error: "No se pudo guardar el post" };
  }
}

export async function deleteBlogPostAction(
  landingId: string,
  postId: string,
): Promise<{ success: true } | { error: string }> {
  const parsedIds = resourceIdSchema.array().safeParse([landingId, postId]);
  if (!parsedIds.success) return { error: "Post no válido" };

  const [validLandingId, validPostId] = parsedIds.data;
  const landing = await assertLandingAccess(validLandingId);
  if (!landing) return { error: "No autorizado" };

  try {
    const post = await getBlogPostById(validPostId);
    if (!post || post.landingId !== validLandingId) {
      return { error: "Post no encontrado" };
    }

    await deleteBlogPost(validPostId);
    revalidateBlogRoutes(landing);
    return { success: true };
  } catch (error) {
    logger.captureException(error, {
      action: "delete-blog-post",
      landingId: landing.id,
      tenantId: landing.userId,
    });
    return { error: "No se pudo eliminar el post" };
  }
}

export async function updateBlogConfigAction(
  landingId: string,
  input: unknown,
): Promise<{ success: true } | { error: string }> {
  const parsedId = resourceIdSchema.safeParse(landingId);
  const parsed = updateBlogConfigSchema.safeParse(input);
  if (!parsedId.success || !parsed.success) {
    return { error: "Configuración del blog no válida" };
  }

  const landing = await assertLandingAccess(parsedId.data);
  if (!landing) return { error: "No autorizado" };

  try {
    const existing = await getBlogConfig(landing.id);
    await upsertBlogConfig(landing.id, {
      title: parsed.data.title ?? existing?.title ?? "",
      description: parsed.data.description ?? existing?.description ?? "",
    });
    revalidateBlogRoutes(landing);
    return { success: true };
  } catch (error) {
    logger.captureException(error, {
      action: "update-blog-config",
      landingId: landing.id,
      tenantId: landing.userId,
    });
    return { error: "No se pudo guardar la configuración del blog" };
  }
}
