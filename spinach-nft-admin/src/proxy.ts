import {NextRequest, NextResponse} from "next/server";


export async function proxy(request: NextRequest) {
  // Protect /admin routes - check for session cookie presence
  // Full session validation is done in page components
  if (request.nextUrl.pathname.startsWith("/admin")) {
    const sessionCookie = request.cookies.get("better-auth.session_token");

    if (!sessionCookie) {
      return NextResponse.redirect(new URL("/signin", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
