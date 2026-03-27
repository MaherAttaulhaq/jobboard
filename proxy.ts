import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const adminPath = "/admin";
  const indexPath = "/"; // The index page

  // Check if the request is for any path under /admin
  if (request.nextUrl.pathname.startsWith(adminPath)) {
    // Use fetch to check session status to avoid bundling DB drivers in Edge runtime
    const url = new URL("/api/auth/get-session", request.url);
    const sessionResponse = await fetch(url, {
      headers: {
        cookie: request.headers.get("cookie") || "",
      },
    }).catch(() => null);

    const sessionData =
      sessionResponse && sessionResponse.ok
        ? await sessionResponse.json()
        : null;
    const session = sessionData?.session;

    // If no session (user is not logged in), redirect to the index page
    if (!session) {
      return NextResponse.redirect(new URL(indexPath, request.url));
    }
  }

  // Allow the request to proceed if it's not an admin path or if the user is logged in
  return NextResponse.next();
}

// Configure which paths the middleware should run on
// This matcher will apply the middleware to all routes under /admin
export const config = {
  matcher: ["/admin/:path*"],
};
