import "dotenv/config";
import { migrate as migrateCloud } from "drizzle-orm/sqlite-proxy/migrator";
import { drizzle as drizzleLocal } from "drizzle-orm/better-sqlite3";
import { migrate as migrateLocal } from "drizzle-orm/better-sqlite3/migrator";
import DatabaseLocal from "better-sqlite3";
import fs from "fs";
import path from "path";
import {
  createSQLiteCloudConnection,
  createSQLiteCloudDrizzle,
} from "./sqlite-cloud";

async function main() {
  const args = process.argv.slice(2);
  const isCloud = args.includes("--cloud");

  if (isCloud) {
    const url =
      process.env.DATABASE_URL || process.env.SQLITE_CLOUD_CONNECTION_STRING;
    if (!url) throw new Error("DATABASE_URL is not set.");

    const { db, runQueries } = createSQLiteCloudConnection(url);

    console.log("Running cloud migrations...");
    try {
      await migrateCloud(db, runQueries, { migrationsFolder: "drizzle" });
      console.log("✅ Cloud migrations completed successfully!");
    } catch (err: any) {
      handleMigrationError(err);
      throw err;
    }
  } else {
    const connectionString = path.resolve(
      process.env.DB_FILE_NAME || "sqlite.db",
    );
    const dbFolder = path.dirname(connectionString);

    if (!fs.existsSync(dbFolder)) {
      fs.mkdirSync(dbFolder, { recursive: true });
    }

    const sqlite = new DatabaseLocal(connectionString);
    const db = drizzleLocal(sqlite);

    console.log("Running local migrations...");
    await migrateLocal(db, { migrationsFolder: "drizzle" });
    console.log("✅ Local migrations completed!");
  }

  process.exit(0);
}

function handleMigrationError(err: any) {
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
}

main().catch((err) => {
  console.error("Migration failed", err);
  process.exit(1);
});
