import { getBlogPostsByLandingId } from "@/data/blog";
import {
  getPublishedLandingBySlug,
  getPublishedLandingSlugs,
} from "@/data/landing-publications";
import { logger } from "@/lib/logger";
import { resolveProjectLinkType } from "@/lib/portfolio-projects";

async function readPublishedSlugs(operation: string) {
  try {
    return await getPublishedLandingSlugs();
  } catch (error) {
    logger.captureException(error, { action: operation });
    return [];
  }
}

export async function getPublishedLandingParams() {
  const slugs = await readPublishedSlugs("static-params-landings");
  return slugs.map((slug) => ({ slug }));
}

export async function getPublishedPortfolioProjectParams() {
  const slugs = await readPublishedSlugs("static-params-projects");
  const params: { slug: string; projectSlug: string }[] = [];

  for (const slug of slugs) {
    try {
      const landing = await getPublishedLandingBySlug(slug);
      if (!landing || landing.template !== "portfolio") continue;

      for (const project of landing.content.gallery ?? []) {
        if (resolveProjectLinkType(project) !== "internal") continue;
        if (!project.projectSlug) continue;
        params.push({ slug, projectSlug: project.projectSlug });
      }
    } catch (error) {
      logger.captureException(error, {
        action: "static-params-projects",
      });
    }
  }

  return params;
}

export async function getPublishedBlogPostParams() {
  const slugs = await readPublishedSlugs("static-params-blog-posts");
  const params: { slug: string; postSlug: string }[] = [];

  for (const slug of slugs) {
    try {
      const landing = await getPublishedLandingBySlug(slug);
      if (!landing) continue;

      const posts = await getBlogPostsByLandingId(landing.id, true);
      for (const post of posts) {
        if (!post.slug) continue;
        params.push({ slug, postSlug: post.slug });
      }
    } catch (error) {
      logger.captureException(error, {
        action: "static-params-blog-posts",
      });
    }
  }

  return params;
}
