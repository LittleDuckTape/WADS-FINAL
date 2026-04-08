import { NextRequest, NextResponse } from "next/server";
import { adminAuth } from "@/lib/firebase-admin";

export const runtime = 'nodejs';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  console.log(`Middleware triggered for: ${pathname}`);

  // Protect /dashboard and sub-routes
  if (pathname.startsWith("/dashboard")) {
    console.log("Checking authentication for dashboard access");

    const sessionCookie = request.cookies.get("session")?.value;

    if (!sessionCookie) {
      console.log("No session cookie found, redirecting to login");
      return NextResponse.redirect(new URL("/login", request.url));
    }

    try {
      await adminAuth.verifyIdToken(sessionCookie);
      console.log("Token verified successfully, allowing access to dashboard");
    } catch (error) {
      console.log("Token verification failed, redirecting to login:", error.message);
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};