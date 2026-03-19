import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import db from "@/src/db"; 

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "sqlite", 
  }),
  // You must add this block to enable /api/auth/sign-up/email
  emailAndPassword: {
    enabled: true,
  },
});
