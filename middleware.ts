import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const adminPath = "/admin";
  const indexPath = "/"; // The index page

  const { pathname } = request.nextUrl;
  const isProtectedPath = pathname.startsWith(adminPath);
  const isAuthPath = pathname === "/login" || pathname === "/signup";

  if (isProtectedPath || isAuthPath) {
    // Check session via internal fetch call instead of importing 'auth' instance.
    // This prevents the database driver (SQLite Cloud) from being bundled into
    // the Edge Runtime, which causes Dynamic Code Evaluation errors.
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

    // Redirect to index (or login) if accessing admin without a session
    if (isProtectedPath && !session) {
      return NextResponse.redirect(new URL(indexPath, request.url));
    }

    // Redirect to admin if already logged in and trying to access login/signup
    if (isAuthPath && session) {
      return NextResponse.redirect(new URL(adminPath, request.url));
    }
  }

  // Allow the request to proceed if it's not an admin path or if the user is logged in
  return NextResponse.next();
}

// Configure which paths the middleware should run on
// This matcher will apply the middleware to all routes under /admin
export const config = {
  matcher: ["/admin/:path*", "/login", "/signup"],
};
