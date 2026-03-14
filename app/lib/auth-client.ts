import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  // If your Next.js app is on a different domain, specify it here
  baseURL: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
});
