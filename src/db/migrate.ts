import "dotenv/config";

async function main() {
  const args = process.argv.slice(2);
  const isCloud = args.includes("--cloud");

  if (isCloud) {
    const { migrate } = await import("drizzle-orm/sqlite-cloud/migrator");
    const { drizzle } = await import("drizzle-orm/sqlite-cloud");
    const { Database } = await import("@sqlitecloud/drivers");

    const url = process.env.DATABASE_URL;
    if (!url) throw new Error("DATABASE_URL is not set.");

    const client = new Database(url);
    const db = drizzle(client);

    console.log("Running cloud migrations...");
    try {
      await migrate(db, { migrationsFolder: "drizzle" });
      console.log("✅ Cloud migrations completed successfully!");
    } catch (err: any) {
      if (err.code === "ETIMEDOUT") {
        console.error(
          "❌ Connection timed out. Check your firewall and connection string.",
        );
      } else if (err.message?.includes("already exists")) {
        console.error(
          "❌ Migration Conflict: Tables already exist in the cloud but aren't tracked in __drizzle_migrations.",
        );
        console.error(
          "👉 Solution: Drop all tables in your SQLite Cloud dashboard and run this script again.",
        );
      } else {
        console.error("❌ Migration error:", err.message);
      }
      throw err;
    }
  } else {
    const { migrate } = await import("drizzle-orm/better-sqlite3/migrator");
    const { drizzle } = await import("drizzle-orm/better-sqlite3");
    const Database = (await import("better-sqlite3")).default;
    const fs = await import("fs");
    const path = await import("path");

    // Ensure absolute path to avoid directory resolution issues
    const connectionString = path.resolve(
      process.env.DB_FILE_NAME || "sqlite.db",
    );
    const dbFolder = path.dirname(connectionString);
    if (!fs.existsSync(dbFolder)) {
      fs.mkdirSync(dbFolder, { recursive: true });
    }
    const sqlite = new Database(connectionString);
    const db = drizzle(sqlite as any);

    console.log("Running local migrations...");
    await migrate(db, { migrationsFolder: "drizzle" });
    console.log("✅ Local migrations completed!");
  }

  process.exit(0);
}

main().catch((err) => {
  console.error("Migration failed", err);
  process.exit(1);
});
