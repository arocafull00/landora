import { BlogNavbar } from "@/components/blog/blog-navbar";
import { BlogPostCard, type PublicBlogPostSummary } from "@/components/blog/blog-post-card";

type BlogListPageProps = {
  aboutEnabled?: boolean;
  brand: string;
  landingSlug: string;
  brandLogoType?: "text" | "image";
  brandLogoImage?: string;
  title: string;
  description: string;
  posts: PublicBlogPostSummary[];
};

export function BlogListPage({
  aboutEnabled,
  brand,
  landingSlug,
  brandLogoType,
  brandLogoImage,
  title,
  description,
  posts,
}: BlogListPageProps) {
  return (
    <div className="min-h-screen bg-surface-bg text-on-background">
      <BlogNavbar
        aboutEnabled={aboutEnabled}
        brand={brand}
        brandLogoImage={brandLogoImage}
        brandLogoType={brandLogoType}
        landingSlug={landingSlug}
      />
      <main className="mx-auto max-w-6xl px-5 py-10 md:py-14">
        <section className="grid gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <h1 className="font-headline text-headline-lg text-on-surface">{title}</h1>
            {description ? (
              <p className="mt-4 max-w-2xl text-body-lg text-on-surface-variant">{description}</p>
            ) : null}
          </div>
        </section>
        {posts.length === 0 ? (
          <p className="mt-12 text-body-md text-on-surface-variant">
            Todavía no hay posts publicados.
          </p>
        ) : (
          <section className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {posts.map((post) => (
              <BlogPostCard key={post.slug} landingSlug={landingSlug} post={post} />
            ))}
          </section>
        )}
      </main>
    </div>
  );
}
