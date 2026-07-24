import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";
 
export default function middleware(request: NextRequest) {
  // This reads the session cookie directly — no network call, no
  // Cloudflare/self-fetch issues, and no risk of a false "no session"
  // redirect just because an internal HTTP request failed or got blocked.
  const sessionCookie = getSessionCookie(request);
 
  if (!sessionCookie) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }
 
  return NextResponse.next();
}
 
export const config = {
  matcher: ["/dashboard/:path*", "/workspace/:path*", "/profile/:path*", "/settings/:path*"],
};
 