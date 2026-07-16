import { assertLandingAccess } from "@/lib/api/landing-auth";
import { getBlogConfig, upsertBlogConfig } from "@/data/blog";
import { parseJsonBody } from "@/lib/api/parse-json";
import {
  resourceIdSchema,
  updateBlogConfigSchema,
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

    const config = await getBlogConfig(id);
    return Response.json(config ?? { title: "", description: "" });
  } catch {
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PATCH(
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

    const [parsed, existing] = await Promise.all([
      parseJsonBody(req, updateBlogConfigSchema),
      getBlogConfig(id),
    ]);
    if (!parsed.success) return parsed.response;
    const body = parsed.data;

    await upsertBlogConfig(id, {
      title: body.title ?? existing?.title ?? "",
      description: body.description ?? existing?.description ?? "",
    });

    return Response.json({ ok: true });
  } catch {
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
