import { getAllLandingsAnalytics } from "@/data/analytics";
import { isAdmin } from "@/lib/is-admin";

function parseDateParam(value: string | null, fallback: Date): Date {
  if (!value) return fallback;

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return fallback;

  return parsed;
}

export async function GET(request: Request) {
  try {
    if (!(await isAdmin())) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const now = new Date();
    const defaultFrom = new Date(now);
    defaultFrom.setDate(defaultFrom.getDate() - 30);

    const from = parseDateParam(searchParams.get("from"), defaultFrom);
    const to = parseDateParam(searchParams.get("to"), now);
    to.setHours(23, 59, 59, 999);

    if (from > to) {
      return Response.json({ error: "Invalid date range" }, { status: 400 });
    }

    const landings = await getAllLandingsAnalytics(from, to);

    return Response.json({ landings });
  } catch {
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
