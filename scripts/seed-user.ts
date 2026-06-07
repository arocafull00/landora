import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { eq } from "drizzle-orm";
import * as schema from "../db/schema";
import { getDefaultContent } from "../lib/default-content";


async function main() {
  const args = process.argv.slice(2);
  const isAdminFlag = args.includes("--admin");
  const filteredArgs = args.filter((a) => a !== "--admin");
  const [clerkUserId, name, landingName] = filteredArgs;

  if (!clerkUserId || !name) {
    console.error(
      "Usage: npx tsx scripts/seed-user.ts <clerkUserId> <name> [landingName]"
    );
    console.error(
      '       npx tsx scripts/seed-user.ts <clerkUserId> <name> --admin'
    );
    process.exit(1);
  }

  if (!isAdminFlag && !landingName) {
    console.error("landingName is required for user accounts");
    console.error(
      "Usage: npx tsx scripts/seed-user.ts <clerkUserId> <name> <landingName>"
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

  const existing = await db.query.users.findFirst({
    where: eq(schema.users.clerkUserId, clerkUserId),
  });

  if (existing) {
    console.error(`User with Clerk user ID "${clerkUserId}" already exists`);
    process.exit(1);
  }

  const type = isAdminFlag ? "admin" : "user";

  const [user] = await db
    .insert(schema.users)
    .values({ clerkUserId, name, type })
    .returning();

  console.log(`${type} created: ${user.id} (${user.name})`);

  if (isAdminFlag) return;

  const slug = landingName!
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");

  const [landing] = await db
    .insert(schema.landingPages)
    .values({
      userId: user.id,
      name: landingName!,
      slug,
      template: "velar",
      published: false,
      contentJson: getDefaultContent("velar"),
    })
    .returning();

  console.log(`Landing created: ${landing.id} (${landing.name}) → slug: ${landing.slug}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
