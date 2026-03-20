import "dotenv/config";
import { drizzle } from "drizzle-orm/libsql";

const dbFileName = process.env.DB_FILE_NAME || "sqlite.db";
// LibSQL requires 'file:' protocol for local files
const url =
  dbFileName.includes("://") || dbFileName.startsWith("file:")
    ? dbFileName
    : `file:${dbFileName}`;

const db = drizzle(url);
export default db;
