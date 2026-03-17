import type { Config } from "drizzle-kit";

export default {
  schema: "./src/db/schema.ts", // Adjust path to your schema file
  out: "./drizzle",
  dialect: "sqlite",
  dbCredentials: {
    url: "sqlite.db", // This will be the name of your local database file
  },
} as Config;
