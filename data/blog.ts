import "server-only";

import { cache } from "react";
import { and, asc, eq } from "drizzle-orm";
import { db } from "@/db";
import { blogPosts, blogConfig } from "@/db/schema";
import type { BlogPost } from "@/db/schema";

export const getBlogPostsByLandingId = cache(
  async (landingId: string, publishedOnly = false) => {
    try {
      const conditions = publishedOnly
        ? and(eq(blogPosts.landingId, landingId), eq(blogPosts.published, true))
        : eq(blogPosts.landingId, landingId);

      return await db.query.blogPosts.findMany({
        where: conditions,
        orderBy: [asc(blogPosts.sortOrder)],
      });
    } catch (error) {
      throw new Error("Failed to fetch blog posts", { cause: error });
    }
  }
);

export const getBlogPostById = cache(async (postId: string) => {
  try {
    return (
      (await db.query.blogPosts.findFirst({
        where: eq(blogPosts.id, postId),
      })) ?? null
    );
  } catch (error) {
    throw new Error("Failed to fetch blog post", { cause: error });
  }
});

export const getBlogPostBySlug = cache(
  async (landingId: string, postSlug: string) => {
    try {
      return (
        (await db.query.blogPosts.findFirst({
          where: and(
            eq(blogPosts.landingId, landingId),
            eq(blogPosts.slug, postSlug),
            eq(blogPosts.published, true)
          ),
        })) ?? null
      );
    } catch (error) {
      throw new Error("Failed to fetch blog post", { cause: error });
    }
  }
);

export async function createBlogPost(
  landingId: string,
  data: { title: string; slug: string; excerpt?: string; body?: string; heroImage?: string }
) {
  try {
    const existing = await db.query.blogPosts.findMany({
      where: eq(blogPosts.landingId, landingId),
    });
    const sortOrder =
      existing.reduce((max, post) => Math.max(max, post.sortOrder), -1) + 1;

    const [row] = await db
      .insert(blogPosts)
      .values({
        landingId,
        title: data.title,
        slug: data.slug,
        excerpt: data.excerpt ?? "",
        body: data.body ?? "",
        heroImage: data.heroImage ?? "",
        sortOrder,
      })
      .returning();

    return row;
  } catch (error) {
    throw new Error("Failed to create blog post", { cause: error });
  }
}

export async function updateBlogPost(
  postId: string,
  data: Partial<
    Pick<BlogPost, "title" | "slug" | "excerpt" | "body" | "heroImage" | "published">
  >
) {
  try {
    const [row] = await db
      .update(blogPosts)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(blogPosts.id, postId))
      .returning();

    return row;
  } catch (error) {
    throw new Error("Failed to update blog post", { cause: error });
  }
}

export async function deleteBlogPost(postId: string) {
  try {
    await db.delete(blogPosts).where(eq(blogPosts.id, postId));
  } catch (error) {
    throw new Error("Failed to delete blog post", { cause: error });
  }
}

export const getBlogConfig = cache(async (landingId: string) => {
  try {
    return (
      (await db.query.blogConfig.findFirst({
        where: eq(blogConfig.landingId, landingId),
      })) ?? null
    );
  } catch (error) {
    throw new Error("Failed to fetch blog config", { cause: error });
  }
});

export async function upsertBlogConfig(
  landingId: string,
  data: { title: string; description: string }
) {
  try {
    await db
      .insert(blogConfig)
      .values({ landingId, ...data })
      .onConflictDoUpdate({ target: blogConfig.landingId, set: data });
  } catch (error) {
    throw new Error("Failed to update blog config", { cause: error });
  }
}
