// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const accessToken = request.cookies.get("accessToken"); 
    // Protect specific routes like /profile
    if (!accessToken && request.nextUrl.pathname !== "/auth/login") {
        return NextResponse.redirect(new URL("/auth/login", request.url));
      }
    return NextResponse.next();
}

export const config = {
    matcher: ["/profile/:path*"]
    // Apply this middleware only to the /profile route
};
