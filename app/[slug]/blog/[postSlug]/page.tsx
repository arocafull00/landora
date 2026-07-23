import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { BlogPostPage } from "@/components/blog/blog-post-page";
import { SiteThemeScope } from "@/components/templates/site-theme-scope";
import { getBlogPostBySlug } from "@/data/blog";
import { getPublishedLandingBySlug } from "@/data/landing-publications";
import { createPublishedSiteMetadata } from "@/lib/public-site-metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; postSlug: string }>;
}): Promise<Metadata> {
  const { slug, postSlug } = await params;
  const landing = await getPublishedLandingBySlug(slug);

  if (!landing) return {};

  const post = await getBlogPostBySlug(landing.id, postSlug);

  if (!post) return {};

  return createPublishedSiteMetadata({
    landing,
    title: post.title,
    description: post.excerpt || landing.seo.description || "",
    pathname: `/blog/${post.slug}`,
    image: post.heroImage,
    type: "article",
  });
}

export default async function PublicBlogPostRoute({
  params,
}: {
  params: Promise<{ slug: string; postSlug: string }>;
}) {
  const { slug, postSlug } = await params;
  const landing = await getPublishedLandingBySlug(slug);

  if (!landing) notFound();

  const post = await getBlogPostBySlug(landing.id, postSlug);

  if (!post) notFound();

  const content = landing.content;

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
