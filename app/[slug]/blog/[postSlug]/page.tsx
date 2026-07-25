import { Suspense } from "react";
import type { Metadata } from "next";
import { BlogPostPageContent } from "@/components/blog/blog-post-page-content";
import { PublicLandingSkeleton } from "@/components/templates/public-landing-skeleton";
import { getBlogPostBySlug } from "@/data/blog";
import { getPublishedLandingBySlug } from "@/data/landing-publications";
import { createPublishedSiteMetadata } from "@/lib/public-site-metadata";

type BlogPostPageProps = {
  params: Promise<{ slug: string; postSlug: string }>;
};

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

export default function PublicBlogPostRoute({ params }: BlogPostPageProps) {
  return (
    <Suspense fallback={<PublicLandingSkeleton />}>
      {params.then(({ slug, postSlug }) => (
        <BlogPostPageContent postSlug={postSlug} slug={slug} />
      ))}
    </Suspense>
  );
}
