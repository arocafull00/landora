import { getAuthorizedLanding } from "@/lib/api/landing-auth";
import { getBlogConfig, upsertBlogConfig } from "@/data/blog";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const landing = await getAuthorizedLanding(id);

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
    const { id } = await params;
    const landing = await getAuthorizedLanding(id);

    if (!landing) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const [body, existing] = await Promise.all([
      req.json(),
      getBlogConfig(id),
    ]);

    await upsertBlogConfig(id, {
      title: typeof body.title === "string" ? body.title : (existing?.title ?? ""),
      description: typeof body.description === "string" ? body.description : (existing?.description ?? ""),
    });

    return Response.json({ ok: true });
  } catch {
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
