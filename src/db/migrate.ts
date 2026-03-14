import "dotenv/config";
import { migrate } from "drizzle-orm/libsql/migrator";
import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";

async function main() {
  const dbUrl = process.env.DB_FILE_NAME;
  if (!dbUrl) {
    throw new Error("DB_FILE_NAME environment variable is not set.");
  }

  // Handle local file paths by prepending "file:" if a protocol is missing
  const url =
    dbUrl.includes("://") || dbUrl.startsWith("file:")
      ? dbUrl
      : `file:${dbUrl}`;

  const client = createClient({
    url,
    authToken: process.env.DB_AUTH_TOKEN,
  });
  const db = drizzle(client);

  console.log("Running migrations...");

  await migrate(db, { migrationsFolder: "drizzle" });

  console.log("Migrations completed!");
  process.exit(0);
}

main().catch((err) => {
  console.error("Migration failed", err);
  process.exit(1);
});
