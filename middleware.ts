import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "@/lib/auth"; // Import your server-side auth instance

export async function middleware(request: NextRequest) {
  const adminPath = "/admin";
  const indexPath = "/"; // The index page

  const { pathname } = request.nextUrl;
  const isProtectedPath = pathname.startsWith(adminPath);
  const isAuthPath = pathname === "/login" || pathname === "/signup";

  if (isProtectedPath || isAuthPath) {
    // Better Auth's session check on the server requires passing the headers
    const session = await auth.api
      .getSession({
        headers: request.headers,
      })
      .catch(() => null);

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
