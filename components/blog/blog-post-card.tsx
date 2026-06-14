import Link from "next/link";
import { AssetImage } from "@/components/ui/asset-image";
import { formatBlogDate, normalizeLandingSlug } from "@/lib/blog-slug";

export type PublicBlogPostSummary = {
  slug: string;
  title: string;
  excerpt: string;
  heroImage: string;
  publishedAt: Date | string | null;
};

type BlogPostCardProps = {
  post: PublicBlogPostSummary;
  landingSlug: string;
};

export function BlogPostCard({ post, landingSlug }: BlogPostCardProps) {
  const slug = normalizeLandingSlug(landingSlug);
  const href = `/${slug}/blog/${post.slug}`;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-outline-variant bg-surface-container-lowest transition-shadow hover:shadow-md">
      <Link className="relative block aspect-[16/10] overflow-hidden bg-surface-container" href={href}>
        {post.heroImage ? (
          <AssetImage
            alt={post.title}
            className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            src={post.heroImage}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-on-surface-variant">
            Sin imagen
          </div>
        )}
      </Link>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <time className="text-body-sm text-on-surface-variant">
          {formatBlogDate(post.publishedAt)}
        </time>
        <h2 className="font-headline text-headline-sm text-on-surface">
          <Link className="transition-colors hover:text-primary" href={href}>
            {post.title}
          </Link>
        </h2>
        {post.excerpt ? (
          <p className="line-clamp-3 flex-1 text-body-md text-on-surface-variant">{post.excerpt}</p>
        ) : null}
        <Link className="text-body-sm font-medium text-primary" href={href}>
          Leer más
        </Link>
      </div>
    </article>
  );
}
