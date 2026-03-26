import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import db from "@/src/db/index"; // Ensure this matches your actual db export
import * as schema from "@/auth-schema";

export const auth = betterAuth({
  // Better Auth configuration
  debug: true,
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
  database: drizzleAdapter(db, {
    provider: "sqlite",
    schema: {
      ...schema,
    },
  }),
  // You must add this block to enable /api/auth/sign-up/email
  emailAndPassword: {
    enabled: true,
  },
});

if (!db) {
  console.error(
    "[BetterAuth] ERROR: Database client (db) is undefined or null. Authentication routes will not function correctly.",
  );
}
if (!process.env.BETTER_AUTH_URL) {
  console.error(
    "[BetterAuth] ERROR: BETTER_AUTH_URL is not set in environment variables. This is required for Better Auth to function correctly.",
  );
}
if (!process.env.BETTER_AUTH_SECRET) {
  console.error(
    "[BetterAuth] ERROR: BETTER_AUTH_SECRET is not set in environment variables. This is required for Better Auth to function correctly.",
  );
}

console.log("[BetterAuth] Auth configuration setup complete.");
