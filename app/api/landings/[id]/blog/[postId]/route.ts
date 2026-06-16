import { assertLandingAccess } from "@/lib/api/landing-auth";
import { getBlogPostById, updateBlogPost, deleteBlogPost } from "@/data/blog";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string; postId: string }> }
) {
  try {
    const { id, postId } = await params;
    const landing = await assertLandingAccess(id);

    if (!landing) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const post = await getBlogPostById(postId);
    if (!post || post.landingId !== id) {
      return Response.json({ error: "Not found" }, { status: 404 });
    }

    const body = await req.json();
    const patch: Record<string, unknown> = {};

    if (typeof body.title === "string") patch.title = body.title;
    if (typeof body.slug === "string") patch.slug = body.slug;
    if (typeof body.excerpt === "string") patch.excerpt = body.excerpt;
    if (typeof body.body === "string") patch.body = body.body;
    if (typeof body.heroImage === "string") patch.heroImage = body.heroImage;
    if (typeof body.published === "boolean") patch.published = body.published;

    const updated = await updateBlogPost(postId, patch);

    return Response.json(updated);
  } catch {
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string; postId: string }> }
) {
  try {
    const { id, postId } = await params;
    const landing = await assertLandingAccess(id);

    if (!landing) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const post = await getBlogPostById(postId);
    if (!post || post.landingId !== id) {
      return Response.json({ error: "Not found" }, { status: 404 });
    }

    await deleteBlogPost(postId);

    return Response.json({ ok: true });
  } catch {
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
