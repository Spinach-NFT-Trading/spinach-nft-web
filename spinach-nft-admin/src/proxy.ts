import {getSessionCookie} from "better-auth/cookies";
import {NextRequest, NextResponse} from "next/server";


export async function proxy(request: NextRequest) {
  const sessionCookie = getSessionCookie(request);

  // Protect /admin routes - check for session cookie presence
  if (request.nextUrl.pathname.startsWith("/admin") && sessionCookie == null) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
