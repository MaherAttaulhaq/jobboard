import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL || "http://localhost:3000",
});

if (!process.env.NEXT_PUBLIC_BETTER_AUTH_URL) {
  console.warn(
    "[BetterAuth Client] NEXT_PUBLIC_BETTER_AUTH_URL is not set. Defaulting to localhost.",
  );
} else {
  console.log(
    `[BetterAuth Client] Initialized with baseURL: ${process.env.NEXT_PUBLIC_BETTER_AUTH_URL}`,
  );
}
