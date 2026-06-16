import { assertLandingAccess } from "@/lib/api/landing-auth";
import { getBlogPostsByLandingId, createBlogPost } from "@/data/blog";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const landing = await assertLandingAccess(id);

    if (!landing) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const posts = await getBlogPostsByLandingId(id);
    return Response.json(posts);
  } catch {
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const landing = await assertLandingAccess(id);

    if (!landing) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const title = typeof body.title === "string" && body.title.trim() ? body.title.trim() : "Nuevo post";
    const slug = typeof body.slug === "string" && body.slug.trim() ? body.slug.trim() : slugify(title);

    const post = await createBlogPost(id, {
      title,
      slug,
      excerpt: typeof body.excerpt === "string" ? body.excerpt : "",
      body: typeof body.body === "string" ? body.body : "",
      heroImage: typeof body.heroImage === "string" ? body.heroImage : "",
    });

    return Response.json(post, { status: 201 });
  } catch {
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
