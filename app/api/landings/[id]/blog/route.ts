import { assertLandingAccess } from "@/lib/api/landing-auth";
import { getBlogPostsByLandingId, createBlogPost } from "@/data/blog";
import { parseJsonBody } from "@/lib/api/parse-json";
import {
  createBlogPostSchema,
  resourceIdSchema,
} from "@/lib/schemas/api";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const parsedId = resourceIdSchema.safeParse((await params).id);
    if (!parsedId.success) {
      return Response.json({ error: "Invalid landing id" }, { status: 400 });
    }
    const id = parsedId.data;
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
    const parsedId = resourceIdSchema.safeParse((await params).id);
    if (!parsedId.success) {
      return Response.json({ error: "Invalid landing id" }, { status: 400 });
    }
    const id = parsedId.data;
    const landing = await assertLandingAccess(id);

    if (!landing) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const parsed = await parseJsonBody(req, createBlogPostSchema);
    if (!parsed.success) return parsed.response;
    const body = parsed.data;
    const title = body.title;
    const slug = body.slug ?? slugify(title);

    const post = await createBlogPost(id, {
      title,
      slug,
      excerpt: body.excerpt,
      body: body.body,
      heroImage: body.heroImage,
    });

    return Response.json(post, { status: 201 });
  } catch {
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
