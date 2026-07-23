import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const neonUrl = process.env.NEON_DATABASE_URL;
const targetUrl =
  process.env.DIRECT_URL ??
  process.env.DATABASE_URL_DIRECT ??
  process.env.DATABASE_URL;

if (!neonUrl) {
  console.error("NEON_DATABASE_URL is required");
  process.exit(1);
}

if (!targetUrl) {
  console.error("DIRECT_URL or DATABASE_URL is required");
  process.exit(1);
}

const dumpDir = path.resolve(process.cwd(), ".migrate-tmp");
const dumpPath = path.join(dumpDir, "landora_data.dump");

function runDocker(args: string[]) {
  execFileSync("docker", ["run", "--rm", ...args], {
    stdio: "inherit",
    env: process.env,
  });
}

function cleanup() {
  if (fs.existsSync(dumpPath)) {
    fs.unlinkSync(dumpPath);
  }

  if (fs.existsSync(dumpDir)) {
    fs.rmdirSync(dumpDir);
  }
}

try {
  cleanup();
  fs.mkdirSync(dumpDir, { recursive: true });

  const mountArg = `${dumpDir}:/dump`;

  runDocker([
    "-v",
    mountArg,
    "postgres:17",
    "pg_dump",
    "--exclude-schema=drizzle",
    neonUrl,
    "--no-acl",
    "--no-owner",
    "--data-only",
    "-Fc",
    "-f",
    "/dump/landora_data.dump",
  ]);

  if (!fs.existsSync(dumpPath)) {
    console.error("Dump file was not created");
    process.exit(1);
  }

  runDocker([
    "-v",
    mountArg,
    "postgres:17",
    "pg_restore",
    "--no-acl",
    "--no-owner",
    "--data-only",
    "-d",
    targetUrl,
    "/dump/landora_data.dump",
  ]);

  cleanup();
  console.log("Data migration completed");
} catch {
  cleanup();
  process.exit(1);
}
