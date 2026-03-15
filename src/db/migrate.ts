import "dotenv/config";
import { migrate } from "drizzle-orm/sqlite-cloud/migrator";
import { drizzle } from "drizzle-orm/sqlite-cloud";
import { Database } from "@sqlitecloud/drivers";

async function main() {
  const connectionString = process.env.SQLITE_CLOUD_CONNECTION_STRING;
  if (!connectionString) {
    throw new Error(
      "SQLITE_CLOUD_CONNECTION_STRING environment variable is not set.",
    );
  }

  const client = new Database(connectionString);
  const db = drizzle({ client });

  console.log("Running migrations...");

  await migrate(db, { migrationsFolder: "drizzle" });

  console.log("Migrations completed!");
  process.exit(0);
}

main().catch((err) => {
  console.error("Migration failed", err);
  process.exit(1);
});
