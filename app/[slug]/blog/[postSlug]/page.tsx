import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { BlogPostPage } from "@/components/blog/blog-post-page";
import { getBlogPostBySlug } from "@/data/blog";
import { getLandingPageBySlug } from "@/data/landing-pages";
import { normalizeLandingSlug } from "@/lib/blog-slug";
import { resolveLandingAppearance } from "@/lib/site-appearance";
import { SiteThemeScope } from "@/components/templates/site-theme-scope";
import { isSitePageEnabled } from "@/lib/site-pages";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; postSlug: string }>;
}): Promise<Metadata> {
  const { slug, postSlug } = await params;
  const landing = await getLandingPageBySlug(slug);

  if (!landing) return {};

  const post = await getBlogPostBySlug(landing.id, postSlug);

  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt || landing.seo?.description || "",
    icons: landing.seo?.favicon ? { icon: landing.seo.favicon } : undefined,
  };
}

export default async function PublicBlogPostRoute({
  params,
}: {
  params: Promise<{ slug: string; postSlug: string }>;
}) {
  const { slug, postSlug } = await params;
  const landing = await getLandingPageBySlug(slug);

  if (!landing) notFound();

  const post = await getBlogPostBySlug(landing.id, postSlug);

  if (!post) notFound();

  const brand = landing.branding?.brand || landing.name;
  const appearance = resolveLandingAppearance(landing.template, {
    paletteId: landing.branding?.paletteId,
    typographyId: landing.branding?.typographyId,
  });

  return (
    <SiteThemeScope appearance={appearance} template={landing.template}>
      <BlogPostPage
        aboutEnabled={
          landing.template === "portfolio" &&
          isSitePageEnabled(landing.branding?.enabledPages, "about")
        }
        brand={brand}
        brandLogoImage={landing.branding?.brandLogoImage ?? ""}
        brandLogoType={landing.branding?.brandLogoType === "image" ? "image" : "text"}
        landingSlug={normalizeLandingSlug(landing.slug)}
        post={{
          slug: post.slug,
          title: post.title,
          excerpt: post.excerpt,
          body: post.body,
          heroImage: post.heroImage,
          publishedAt: post.updatedAt ?? post.createdAt,
        }}
      />
    </SiteThemeScope>
  );
}
