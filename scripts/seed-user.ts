import { eq } from "drizzle-orm";
import { db } from "../db";
import * as schema from "../db/schema";
import { VELAR_DEFAULT_CONTENT } from "../lib/default-content";

type Db = typeof db;

async function seedSections(db: Db, landingId: string) {
  const c = VELAR_DEFAULT_CONTENT;

  await db.insert(schema.landingSeo).values({ landingId, title: c.hero.title, description: c.hero.subtitle });
  await db.insert(schema.landingBranding).values({ landingId, brand: c.brand });
  await db.insert(schema.landingHero).values({
    landingId,
    eyebrow: c.hero.eyebrow,
    title: c.hero.title,
    subtitle: c.hero.subtitle,
    description: c.hero.description,
    image: c.hero.image,
    houseImage: c.hero.houseImage,
    fanImages: c.hero.fanImages ?? [],
    ctaLabel: c.hero.ctaLabel ?? "",
  });
  await db.insert(schema.landingStory).values({ landingId, statement: c.story.statement });
  await db.insert(schema.landingCta).values({
    landingId,
    phone: c.contact.phone,
    email: c.contact.email,
    address: c.contact.address,
  });

  if (c.stats.length > 0) {
    await db.insert(schema.landingStats).values(
      c.stats.map((s, i) => ({
        landingId,
        sortOrder: i,
        value: s.value,
        label: s.label,
        countTo: s.countTo ?? null,
        suffix: s.suffix ?? "",
      }))
    );
  }

  if (c.gallery.length > 0) {
    await db.delete(schema.landingGallery).where(eq(schema.landingGallery.landingId, landingId));
    await db.insert(schema.landingGallery).values(
      c.gallery.map((g, i) => ({
        landingId,
        sortOrder: i,
        image: g.image ?? "",
        video: g.video ?? "",
      }))
    );
  }

  if (c.nav.length > 0) {
    await db.delete(schema.landingNav).where(eq(schema.landingNav.landingId, landingId));
    await db.insert(schema.landingNav).values(
      c.nav.map((n, i) => ({ landingId, sortOrder: i, label: n.label, href: n.href }))
    );
  }

  if (c.spaces.length > 0) {
    await db.insert(schema.landingSpaces).values(
      c.spaces.map((s, i) => ({
        landingId,
        sortOrder: i,
        name: s.name,
        description: s.description,
        image: s.image,
      }))
    );
  }

  if (c.services.length > 0) {
    await db.insert(schema.landingServices).values(
      c.services.map((s, i) => ({
        landingId,
        sortOrder: i,
        title: s.title,
        subtitle: s.subtitle,
        label: s.label,
        image: s.image,
      }))
    );
  }

  if (c.workflow.length > 0) {
    await db.insert(schema.landingWorkflow).values(
      c.workflow.map((w, i) => ({
        landingId,
        sortOrder: i,
        number: w.number,
        title: w.title,
        description: w.description,
      }))
    );
  }

  if (c.testimonials.length > 0) {
    await db.insert(schema.landingTestimonials).values(
      c.testimonials.map((t, i) => ({
        landingId,
        sortOrder: i,
        author: t.author,
        date: t.date,
        rating: t.rating,
        comment: t.comment,
        verified: t.verified,
      }))
    );
  }
}

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

  if (!process.env.DATABASE_URL) {
    console.error("DATABASE_URL environment variable is not set");
    process.exit(1);
  }

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
    .values({ userId: user.id, name: landingName!, slug, template: "velar", published: false })
    .returning();

  console.log(`Landing created: ${landing.id} (${landing.name}) → slug: ${landing.slug}`);

  await seedSections(db, landing.id);

  console.log(`Sections seeded for landing ${landing.id}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
