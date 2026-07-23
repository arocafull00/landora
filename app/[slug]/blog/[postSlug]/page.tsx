import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { BlogPostPage } from "@/components/blog/blog-post-page";
import { SiteThemeScope } from "@/components/templates/site-theme-scope";
import { getBlogPostBySlug } from "@/data/blog";
import { getLandingPageBySlug } from "@/data/landing-pages";
import { toLandingContent } from "@/lib/landing-mapper";
import { getPublicLandingUrl } from "@/lib/public-site-url";

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
    alternates: {
      canonical: getPublicLandingUrl(landing, `/blog/${post.slug}`),
    },
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

  const content = toLandingContent(landing);

  return (
    <SiteThemeScope appearance={content.appearance} template={landing.template}>
      <BlogPostPage
        content={content}
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
