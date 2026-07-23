import postgres from "postgres";
import { readFile } from "node:fs/promises";

async function main() {
  const sql = postgres(process.env.DATABASE_URL!, {
    prepare: false,
    max: 1,
  });

  const migration = await readFile(
    new URL("../drizzle/0027_manual_booking_access.sql", import.meta.url),
    "utf8",
  );

  await sql.begin(async (transaction) => {
    await transaction.unsafe(migration);
  });

  const columns = await sql`
    SELECT column_name
    FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name = 'user_addons'
    ORDER BY ordinal_position
  `;

  console.log(columns.map(({ column_name }) => column_name).join(","));

  await sql.end();
}

void main();
