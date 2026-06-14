import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { AssetImage } from "@/components/ui/asset-image";
import { BlogNavbar } from "@/components/blog/blog-navbar";
import { formatBlogDate, normalizeLandingSlug } from "@/lib/blog-slug";

export type PublicBlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  heroImage: string;
  publishedAt: Date | string | null;
};

type BlogPostPageProps = {
  brand: string;
  landingSlug: string;
  brandLogoType?: "text" | "image";
  brandLogoImage?: string;
  post: PublicBlogPost;
};

export function BlogPostPage({
  brand,
  landingSlug,
  brandLogoType,
  brandLogoImage,
  post,
}: BlogPostPageProps) {
  const slug = normalizeLandingSlug(landingSlug);
  const blogHref = `/${slug}/blog`;

  return (
    <div className="min-h-screen bg-surface-bg text-on-background">
      <BlogNavbar
        brand={brand}
        brandLogoImage={brandLogoImage}
        brandLogoType={brandLogoType}
        landingSlug={landingSlug}
      />
      <main>
        {post.heroImage ? (
          <div className="relative h-[42vh] min-h-[280px] w-full overflow-hidden bg-surface-container">
            <AssetImage
              alt={post.title}
              className="object-cover"
              fill
              priority
              sizes="100vw"
              src={post.heroImage}
            />
          </div>
        ) : null}
        <article className="mx-auto max-w-3xl px-5 py-10 md:py-14">
          <Link className="text-body-sm font-medium text-primary" href={blogHref}>
            Volver al blog
          </Link>
          <time className="mt-6 block text-body-sm text-on-surface-variant">
            {formatBlogDate(post.publishedAt)}
          </time>
          <h1 className="mt-3 font-headline text-headline-lg text-on-surface">{post.title}</h1>
          {post.excerpt ? (
            <p className="mt-4 text-body-lg text-on-surface-variant">{post.excerpt}</p>
          ) : null}
          <div className="prose prose-neutral mt-10 max-w-none text-on-surface prose-headings:font-headline prose-a:text-primary">
            <ReactMarkdown>{post.body}</ReactMarkdown>
          </div>
          <div className="mt-12 border-t border-outline-variant pt-6">
            <Link className="text-body-sm font-medium text-primary" href={blogHref}>
              Ver todos los posts
            </Link>
          </div>
        </article>
      </main>
    </div>
  );
}
