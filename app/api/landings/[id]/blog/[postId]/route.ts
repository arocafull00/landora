import { assertLandingAccess } from "@/lib/api/landing-auth";
import { getBlogPostById, updateBlogPost, deleteBlogPost } from "@/data/blog";
import { parseJsonBody } from "@/lib/api/parse-json";
import {
  resourceIdSchema,
  updateBlogPostSchema,
} from "@/lib/schemas/api";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string; postId: string }> }
) {
  try {
    const routeParams = await params;
    const parsedIds = resourceIdSchema.array().safeParse([
      routeParams.id,
      routeParams.postId,
    ]);
    if (!parsedIds.success) {
      return Response.json({ error: "Invalid resource id" }, { status: 400 });
    }
    const [id, postId] = parsedIds.data;
    const landing = await assertLandingAccess(id);

    if (!landing) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const post = await getBlogPostById(postId);
    if (!post || post.landingId !== id) {
      return Response.json({ error: "Not found" }, { status: 404 });
    }

    const parsed = await parseJsonBody(req, updateBlogPostSchema);
    if (!parsed.success) return parsed.response;

    const updated = await updateBlogPost(postId, parsed.data);

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
    const routeParams = await params;
    const parsedIds = resourceIdSchema.array().safeParse([
      routeParams.id,
      routeParams.postId,
    ]);
    if (!parsedIds.success) {
      return Response.json({ error: "Invalid resource id" }, { status: 400 });
    }
    const [id, postId] = parsedIds.data;
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
