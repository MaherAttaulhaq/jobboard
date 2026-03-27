import { Database } from "@sqlitecloud/drivers";
import { drizzle } from "drizzle-orm/sqlite-cloud";

// SQLite Cloud connection strings usually contain the apikey in the URL
// e.g., sqlitecloud://host.sqlite.cloud:8860/db?apikey=your_key
const client = new Database(process.env.DATABASE_URL!);

const db = drizzle(client);
export default db;
