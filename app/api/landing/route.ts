import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { clients, landingPages } from "@/db/schema";

export async function GET() {
  const { userId } = await auth();

  if (!userId) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const client = await db.query.clients.findFirst({
    where: eq(clients.clerkUserId, userId),
  });

  if (!client) {
    return Response.json({ error: "Client not found" }, { status: 404 });
  }

  const landing = await db.query.landingPages.findFirst({
    where: eq(landingPages.clientId, client.id),
  });

  if (!landing) {
    return Response.json({ error: "Landing not found" }, { status: 404 });
  }

  return Response.json(landing);
}
