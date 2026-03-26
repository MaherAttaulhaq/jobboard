import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";

// This catch-all route handles all /api/auth/* requests.
export const { GET, POST } = toNextJsHandler(auth);
