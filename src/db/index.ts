import "dotenv/config";
import * as schema from "./schema";

let db;

if (process.env.SQLITE_CLOUD_CONNECTION_STRING) {
  const { Database } = require("@sqlitecloud/drivers");
  const { drizzle } = require("drizzle-orm/sqlite-cloud");

  const connectionString = process.env.SQLITE_CLOUD_CONNECTION_STRING;
  const client = new Database(connectionString);
  db = drizzle({ client, schema });
} else {
  const Database = require("better-sqlite3");
  const { drizzle } = require("drizzle-orm/better-sqlite3");
  const path = require("path");

  const connectionString = path.resolve(
    process.env.DATABASE_URL || "sqlite.db",
  );
  const client = new Database(connectionString);
  db = drizzle(client, { schema });
}

export default db;
