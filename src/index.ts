import "dotenv/config";
import { Database } from "@sqlitecloud/drivers";
import { drizzle } from "drizzle-orm/sqlite-cloud";

const connectionString = process.env.SQLITE_CLOUD_CONNECTION_STRING;

if (!connectionString) {
  throw new Error(
    "SQLITE_CLOUD_CONNECTION_STRING environment variable is not set.",
  );
}

const client = new Database(connectionString);
const db = drizzle({ client });
export default db;
