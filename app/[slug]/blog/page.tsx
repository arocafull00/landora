import { Suspense } from "react";
import type { Metadata } from "next";
import { BlogListPageContent } from "@/components/blog/blog-list-page-content";
import { PublicLandingSkeleton } from "@/components/templates/public-landing-skeleton";
import { getBlogConfig } from "@/data/blog";
import { getPublishedLandingBySlug } from "@/data/landing-publications";
import { createPublishedSiteMetadata } from "@/lib/public-site-metadata";

type BlogListPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: BlogListPageProps): Promise<Metadata> {
  const { slug } = await params;
  const landing = await getPublishedLandingBySlug(slug);

  if (!landing) return {};

  const config = await getBlogConfig(landing.id);
  const brand = landing.content.brand || landing.name;

  return createPublishedSiteMetadata({
    landing,
    title: config?.title || `${brand} Blog`,
    description: config?.description || landing.seo.description || "",
    pathname: "/blog",
  });
}

export default function PublicBlogListPage({ params }: BlogListPageProps) {
  return (
    <Suspense fallback={<PublicLandingSkeleton />}>
      {params.then(({ slug }) => (
        <BlogListPageContent slug={slug} />
      ))}
    </Suspense>
  );
}
