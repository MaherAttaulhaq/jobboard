import { Database } from "@sqlitecloud/drivers";
import { drizzle } from 'drizzle-orm/sqlite-cloud';


const connectionString =
  process.env.DATABASE_URL || process.env.SQLITE_CLOUD_CONNECTION_STRING;

if (!connectionString) {
  throw new Error(
    "SQLite Cloud connection string is missing. Please set DATABASE_URL or SQLITE_CLOUD_CONNECTION_STRING in your environment variables.",
  );
}

// SQLite Cloud connection strings usually contain the apikey in the URL
const client = new Database(connectionString);

const db = drizzle({ client });
export default db;
