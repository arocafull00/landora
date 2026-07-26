import type { Metadata } from "next";
import { BlogPostPageContent } from "@/components/blog/blog-post-page-content";
import { getBlogPostBySlug } from "@/data/blog";
import { getPublishedLandingBySlug } from "@/data/landing-publications";
import { createPublishedSiteMetadata } from "@/lib/public-site-metadata";
import { getPublishedBlogPostParams } from "@/lib/public-static-params";

type BlogPostPageProps = {
  params: Promise<{ slug: string; postSlug: string }>;
};

export function generateStaticParams() {
  return getPublishedBlogPostParams();
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
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
}: BlogPostPageProps) {
  const { slug, postSlug } = await params;
  return <BlogPostPageContent postSlug={postSlug} slug={slug} />;
}
