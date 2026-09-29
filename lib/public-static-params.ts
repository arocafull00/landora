import { getBlogPostsByLandingId } from "@/data/blog";
import {
  getPublishedLandingBySlug,
  getPublishedLandingSlugs,
} from "@/data/landing-publications";
import { logger } from "@/lib/logger";
import { resolveGalleryItems } from "@/lib/gallery-content";
import { resolveProjectLinkType } from "@/lib/portfolio-projects";
import { hasSignalCaseStudy } from "@/lib/signal-cases";

const STATIC_PARAM_PLACEHOLDERS = {
  landing: "__placeholder__",
  post: "__placeholder__",
  project: "__placeholder__",
} as const;

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
  if (slugs.length === 0) {
    return [{ slug: STATIC_PARAM_PLACEHOLDERS.landing }];
  }

  return slugs.map((slug) => ({ slug }));
}

export async function getPublishedPortfolioProjectParams(slug: string) {
  try {
    const landing = await getPublishedLandingBySlug(slug);
    if (!landing || landing.template !== "portfolio") {
      return [{ projectSlug: STATIC_PARAM_PLACEHOLDERS.project }];
    }

    const projects = (landing.content.gallery ?? []).flatMap((project) => {
      if (resolveProjectLinkType(project) !== "internal") return [];
      if (!project.projectSlug) return [];
      return { projectSlug: project.projectSlug };
    });
    if (projects.length === 0) {
      return [{ projectSlug: STATIC_PARAM_PLACEHOLDERS.project }];
    }

    return projects;
  } catch (error) {
    logger.captureException(error, {
      action: "static-params-projects",
    });
    return [{ projectSlug: STATIC_PARAM_PLACEHOLDERS.project }];
  }
}

export async function getPublishedSignalCaseParams(slug: string) {
  try {
    const landing = await getPublishedLandingBySlug(slug);
    if (!landing || landing.template !== "signal") {
      return [{ caseSlug: STATIC_PARAM_PLACEHOLDERS.project }];
    }

    const cases = resolveGalleryItems("signal", landing.content.gallery ?? []).flatMap(
      (item) => {
        if (!hasSignalCaseStudy(item) || !item.projectSlug) return [];
        return { caseSlug: item.projectSlug };
      },
    );
    if (cases.length === 0) {
      return [{ caseSlug: STATIC_PARAM_PLACEHOLDERS.project }];
    }

    return cases;
  } catch (error) {
    logger.captureException(error, {
      action: "static-params-signal-cases",
    });
    return [{ caseSlug: STATIC_PARAM_PLACEHOLDERS.project }];
  }
}

export async function getPublishedBlogPostParams(slug: string) {
  try {
    const landing = await getPublishedLandingBySlug(slug);
    if (!landing) {
      return [{ postSlug: STATIC_PARAM_PLACEHOLDERS.post }];
    }

    const posts = await getBlogPostsByLandingId(landing.id, true);
    const postParams = posts.flatMap((post) =>
      post.slug ? { postSlug: post.slug } : [],
    );
    if (postParams.length === 0) {
      return [{ postSlug: STATIC_PARAM_PLACEHOLDERS.post }];
    }

    return postParams;
  } catch (error) {
    logger.captureException(error, {
      action: "static-params-blog-posts",
    });
    return [{ postSlug: STATIC_PARAM_PLACEHOLDERS.post }];
  }
}
