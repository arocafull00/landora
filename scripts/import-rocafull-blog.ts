import fs from "node:fs";
import path from "node:path";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { and, eq, or } from "drizzle-orm";
import * as schema from "../db/schema";
import { OFICIO_PRO_ASSETS } from "../lib/oficio-pro-assets";

const BLOG_CONFIG = {
  title: "Blog Fontaneria Rocafull",
  description:
    "Resuelve todas tus dudas acerca de fontaneria, gas, griferia, calefaccion, tratamientos del agua, energias renovables, etc. en nuestro blog.",
};

const GAS_KEYWORDS = [
  "gas",
  "butano",
  "propano",
  "fugas",
  "calentador",
  "caldera",
  "vaillant",
  "baxi",
  "ariston",
];

const THERMAL_KEYWORDS = [
  "calefaccion",
  "radiador",
  "suelo-radiante",
  "termo",
  "aerotermia",
  "bomba-de-calor",
  "placa-solar",
  "osmosis",
  "descalcificador",
];

const PLUMBING_KEYWORDS = [
  "grifo",
  "ducha",
  "sanitario",
  "mampara",
  "bano",
  "columna",
  "contadores",
  "grupo-pres",
  "cuartos-de-bano",
];

const GAS_IMAGES = [OFICIO_PRO_ASSETS.gas1, OFICIO_PRO_ASSETS.gas2, OFICIO_PRO_ASSETS.gas3];
const THERMAL_IMAGES = [
  OFICIO_PRO_ASSETS.thermal1,
  OFICIO_PRO_ASSETS.thermal2,
  OFICIO_PRO_ASSETS.thermal3,
];

type ParsedPost = {
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  sortOrder: number;
};

function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function matchesKeywords(text: string, keywords: string[]): boolean {
  const normalized = normalizeText(text);
  return keywords.some((keyword) => normalized.includes(keyword));
}

function pickRotatedImage(images: readonly string[], seed: string): string {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash + seed.charCodeAt(i)) % images.length;
  }
  return images[hash] ?? images[0];
}

export function resolveHeroImage(slug: string, title: string): string {
  const combined = `${slug} ${title}`;

  if (matchesKeywords(combined, GAS_KEYWORDS)) {
    return pickRotatedImage(GAS_IMAGES, slug);
  }

  if (matchesKeywords(combined, THERMAL_KEYWORDS)) {
    return pickRotatedImage(THERMAL_IMAGES, slug);
  }

  if (matchesKeywords(combined, PLUMBING_KEYWORDS)) {
    return OFICIO_PRO_ASSETS.hero;
  }

  return OFICIO_PRO_ASSETS.hero;
}

function parseFrontmatter(raw: string): { data: Record<string, string>; body: string } {
  if (!raw.startsWith("---")) {
    return { data: {}, body: raw };
  }

  const end = raw.indexOf("---", 3);
  if (end === -1) {
    return { data: {}, body: raw };
  }

  const frontmatterBlock = raw.slice(3, end).trim();
  const body = raw.slice(end + 3).trim();
  const data: Record<string, string> = {};

  for (const line of frontmatterBlock.split("\n")) {
    const colonIndex = line.indexOf(":");
    if (colonIndex === -1) continue;

    const key = line.slice(0, colonIndex).trim();
    let value = line.slice(colonIndex + 1).trim();

    if (
      (value.startsWith("'") && value.endsWith("'")) ||
      (value.startsWith('"') && value.endsWith('"'))
    ) {
      value = value.slice(1, -1);
    }

    data[key] = value;
  }

  return { data, body };
}

function stripDuplicateHeading(body: string): string {
  return body.replace(/^#\s+.+\n+/, "").trim();
}

function replaceContactLink(body: string, landingSlug: string): string {
  return body.replace(
    /https:\/\/www\.fontaneriarocafull\.es\/#contacto/g,
    `/${landingSlug}#contacto`
  );
}

function parseMarkdownFile(filePath: string, landingSlug: string): ParsedPost {
  const raw = fs.readFileSync(filePath, "utf8");
  const filename = path.basename(filePath, ".md");
  const { data, body } = parseFrontmatter(raw);

  const title = data.title?.trim() || filename;
  const excerpt = data.description?.trim() || "";
  const sortOrder = Number.parseInt(data.id ?? "0", 10) || 0;

  const cleanedBody = replaceContactLink(stripDuplicateHeading(body), landingSlug);

  return {
    slug: filename,
    title,
    excerpt,
    body: cleanedBody,
    sortOrder,
  };
}

async function findLandingBySlug(db: ReturnType<typeof drizzle<typeof schema>>, slug: string) {
  const normalizedSlug = slug.replace(/^\//, "");

  return db.query.landingPages.findFirst({
    where: or(
      eq(schema.landingPages.slug, normalizedSlug),
      eq(schema.landingPages.slug, `/${normalizedSlug}`)
    ),
  });
}

async function main() {
  const slugArg = process.argv[2];

  if (!slugArg) {
    console.error("Usage: pnpm exec tsx scripts/import-rocafull-blog.ts <landing-slug>");
    process.exit(1);
  }

  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    console.error("DATABASE_URL environment variable is not set");
    process.exit(1);
  }

  const blogDir = path.resolve(__dirname, "../../rocafull-group/src/content/blog");

  if (!fs.existsSync(blogDir)) {
    console.error(`Blog directory not found: ${blogDir}`);
    process.exit(1);
  }

  const sql = neon(databaseUrl);
  const db = drizzle(sql, { schema });

  const landing = await findLandingBySlug(db, slugArg);

  if (!landing) {
    console.error(`Landing not found for slug: ${slugArg}`);
    process.exit(1);
  }

  const landingSlug = landing.slug.replace(/^\//, "");
  const files = fs
    .readdirSync(blogDir)
    .filter((file) => file.endsWith(".md"))
    .sort();

  let imported = 0;
  let skipped = 0;

  for (const file of files) {
    const post = parseMarkdownFile(path.join(blogDir, file), landingSlug);

    const existing = await db.query.blogPosts.findFirst({
      where: and(
        eq(schema.blogPosts.landingId, landing.id),
        eq(schema.blogPosts.slug, post.slug)
      ),
    });

    if (existing) {
      console.log(`Skip: ${post.slug} (already exists)`);
      skipped++;
      continue;
    }

    const heroImage = resolveHeroImage(post.slug, post.title);

    await db.insert(schema.blogPosts).values({
      landingId: landing.id,
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      body: post.body,
      heroImage,
      published: true,
      sortOrder: post.sortOrder,
    });

    console.log(`Imported: ${post.slug}`);
    imported++;
  }

  await db
    .insert(schema.blogConfig)
    .values({
      landingId: landing.id,
      title: BLOG_CONFIG.title,
      description: BLOG_CONFIG.description,
    })
    .onConflictDoUpdate({
      target: schema.blogConfig.landingId,
      set: {
        title: BLOG_CONFIG.title,
        description: BLOG_CONFIG.description,
      },
    });

  console.log(`\nDone. Imported: ${imported}, skipped: ${skipped}, total files: ${files.length}`);
  console.log(`Landing: ${landing.name} (${landing.id})`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
