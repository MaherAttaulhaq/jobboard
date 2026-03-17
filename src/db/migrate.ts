import "dotenv/config";

async function main() {
  const args = process.argv.slice(2);
  const isCloud = args.includes("--cloud");

  if (isCloud) {
    const { migrate } = await import("drizzle-orm/sqlite-cloud/migrator");
    const { drizzle } = await import("drizzle-orm/sqlite-cloud");
    const { Database } = await import("@sqlitecloud/drivers");

    const connectionString = process.env.SQLITE_CLOUD_CONNECTION_STRING;
    if (!connectionString) {
      throw new Error(
        "SQLITE_CLOUD_CONNECTION_STRING environment variable is not set.",
      );
    }

    const client = new Database(connectionString);
    const db = drizzle({ client });

    console.log("Running cloud migrations...");
    await migrate(db, { migrationsFolder: "drizzle" });
  } else {
    const { migrate } = await import("drizzle-orm/better-sqlite3/migrator");
    const { drizzle } = await import("drizzle-orm/better-sqlite3");
    const Database = (await import("better-sqlite3")).default;

    const connectionString = process.env.DATABASE_URL || "sqlite.db";
    const sqlite = new Database(connectionString);
    const db = drizzle(sqlite as any);

    console.log("Running local migrations...");
    await migrate(db, { migrationsFolder: "drizzle" });
  }

  console.log("Migrations completed!");
  process.exit(0);
}

main().catch((err) => {
  console.error("Migration failed", err);
  process.exit(1);
});
