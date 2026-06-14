import { getAuthorizedLanding } from "@/lib/api/landing-auth";
import { replaceLandingWorkHistory } from "@/data/landing-sections";

function toMultilineList(value: unknown) {
  if (!Array.isArray(value)) return "";
  return value
    .flatMap((item) => {
      if (typeof item !== "string") return [];
      const trimmed = item.trim();
      return trimmed ? [trimmed] : [];
    })
    .join("\n");
}

function toCommaList(value: unknown) {
  if (!Array.isArray(value)) return "";
  return value
    .flatMap((item) => {
      if (typeof item !== "string") return [];
      const trimmed = item.trim();
      return trimmed ? [trimmed] : [];
    })
    .join(",");
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

    const body = await req.json();
    const items = Array.isArray(body.items) ? body.items : [];

    await replaceLandingWorkHistory(
      id,
      items.map((item: Record<string, unknown>) => ({
        dateRange: typeof item.dateRange === "string" ? item.dateRange : "",
        location: typeof item.location === "string" ? item.location : "",
        company: typeof item.company === "string" ? item.company : "",
        title: typeof item.title === "string" ? item.title : "",
        summary: typeof item.summary === "string" ? item.summary : "",
        highlights: toMultilineList(item.highlights),
        technologies: toCommaList(item.technologies),
      }))
    );

    return Response.json({ ok: true });
  } catch {
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
