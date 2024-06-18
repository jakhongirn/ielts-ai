import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";


export function middleware(request: NextRequest) {
    const accessToken = request.cookies.get("accessToken");
    
    // Redirect to login if accessToken is not present and trying to access /dashboard
    if (!accessToken && request.nextUrl.pathname.startsWith("/dashboard")) {
        return NextResponse.redirect(new URL("/auth/login", request.url));
    }

    if (!accessToken && request.nextUrl.pathname.startsWith("/dashboard/mock-tests")) {
        return NextResponse.redirect(new URL("/auth/login", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/dashboard/:path*',
        '/dashboard/mock-tests/:path*'
    ]
};
