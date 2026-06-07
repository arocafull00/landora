import { getAuthorizedLanding } from "@/lib/api/landing-auth";
import { replaceLandingTestimonials } from "@/data/landing-sections";

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

    const body = await req.json();
    const items = Array.isArray(body.items) ? body.items : [];

    await replaceLandingTestimonials(
      id,
      items.map((item: Record<string, unknown>) => ({
        author: typeof item.author === "string" ? item.author : "",
        date: typeof item.date === "string" ? item.date : "",
        rating: typeof item.rating === "number" ? item.rating : 5,
        comment: typeof item.comment === "string" ? item.comment : "",
        verified: typeof item.verified === "boolean" ? item.verified : false,
      }))
    );

    return Response.json({ ok: true });
  } catch {
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
