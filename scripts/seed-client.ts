import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { eq } from "drizzle-orm";
import * as schema from "../db/schema";

const DEFAULT_CONTENT = {
  hero: {
    eyebrow: "BIENVENIDO",
    title: "",
    subtitle: "",
    description: "",
    image: "",
  },
  story: {
    statement: "",
  },
  stats: [],
  spaces: [],
  services: [],
  workflow: [],
  testimonials: [],
  contact: {
    phone: "",
    email: "",
    address: "",
  },
};

async function main() {
  const [clerkUserId, clientName, landingName] = process.argv.slice(2);

  if (!clerkUserId || !clientName || !landingName) {
    console.error(
      "Usage: npx tsx scripts/seed-client.ts <clerkUserId> <clientName> <landingName>"
    );
    console.error(
      'Example: npx tsx scripts/seed-client.ts user_2abc123 "Toll Story" "Toll Story Landing"'
    );
    process.exit(1);
  }

  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    console.error("DATABASE_URL environment variable is not set");
    process.exit(1);
  }

  const sql = neon(databaseUrl);
  const db = drizzle(sql, { schema });

  const existing = await db.query.clients.findFirst({
    where: eq(schema.clients.clerkUserId, clerkUserId),
  });

  if (existing) {
    console.error(`Client with Clerk user ID "${clerkUserId}" already exists`);
    process.exit(1);
  }

  const slug = landingName
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");

  const [client] = await db
    .insert(schema.clients)
    .values({ clerkUserId, name: clientName })
    .returning();

  const [landing] = await db
    .insert(schema.landingPages)
    .values({
      clientId: client.id,
      name: landingName,
      slug,
      published: false,
      contentJson: DEFAULT_CONTENT,
    })
    .returning();

  console.log(`Client created: ${client.id} (${client.name})`);
  console.log(`Landing created: ${landing.id} (${landing.name}) → slug: ${landing.slug}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
