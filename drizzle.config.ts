import { defineConfig } from "drizzle-kit";

const directUrl =
  process.env.DIRECT_URL ?? process.env.DATABASE_URL_DIRECT;

if (!directUrl) {
  throw new Error("DIRECT_URL is not configured");
}

export default defineConfig({
  schema: "./db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: directUrl,
  },
});
