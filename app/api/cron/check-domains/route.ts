import { checkAllDomains } from "@/lib/monitoring/check-domain";

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;

  if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    const results = await checkAllDomains();
    const failed = results.filter((result) => result.status !== "ok");

    if (failed.length > 0) {
      return Response.json({ failed }, { status: 500 });
    }

    return Response.json({ ok: true, checked: results.length });
  } catch {
    return new Response("Internal Server Error", { status: 500 });
  }
}
