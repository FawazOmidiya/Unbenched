import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";

export async function middleware(request: NextRequest) {
  // Check if the request is for an admin route
  if (request.nextUrl.pathname.startsWith("/admin")) {
    // Skip authentication for login page
    if (request.nextUrl.pathname === "/admin/login") {
      return NextResponse.next();
    }

    try {
      // Create a Supabase client configured to use cookies
      const res = NextResponse.next();
      const supabase = createMiddlewareClient({ req: request, res });

      // Refresh session if expired - required for Server Components
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        // Redirect to login if not authenticated
        return NextResponse.redirect(new URL("/admin/login", request.url));
      }
    } catch (_error) {
      // If there's an error, redirect to login
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/admin/:path*",
};
