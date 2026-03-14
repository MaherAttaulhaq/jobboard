import "dotenv/config";
import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";

const dbUrl = process.env.DB_FILE_NAME!;
// Handle local file paths by prepending "file:" if a protocol is missing
const url =
  dbUrl.includes("://") || dbUrl.startsWith("file:") ? dbUrl : `file:${dbUrl}`;

const client = createClient({
  url,
  authToken: process.env.DB_AUTH_TOKEN, // only needed for remote Turso DB
});

const db = drizzle(client);
export default db;
