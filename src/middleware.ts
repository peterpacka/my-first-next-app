import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    if (pathname.startsWith("/video")) {
        const session = request.cookies.get("session");
        if (!session) {
            const callbackUrl = encodeURIComponent(request.nextUrl.pathname + request.nextUrl.search);
            return NextResponse.redirect(new URL("/sign-in?callbackUrl=" + callbackUrl, request.url));
        }

    }
    return NextResponse.next();
}

export const config = {
    matcher: ["/video/:path*", "/video"],
};