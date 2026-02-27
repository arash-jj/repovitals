import { NextRequest, NextResponse } from "next/server";
import { getSession } from "./lib/auth/auth";

export async function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const session = await getSession();
    const isAuthenticated = !!session?.user;
    if (pathname === "/") {
        if (isAuthenticated) {
            return NextResponse.redirect(new URL("/dashboard", request.url));
        } else {
            return NextResponse.redirect(new URL("/sign-in", request.url));
        }
    }
    const isAuthPage = pathname.startsWith("/sign-in") || pathname.startsWith("/sign-up");
    if (isAuthPage) {
        if (isAuthenticated) {
            return NextResponse.redirect(new URL("/dashboard", request.url));
        }
        return NextResponse.next();
    }
    const isProtectedRoute = pathname.startsWith("/dashboard") || pathname.startsWith("/api/private");
    if (isProtectedRoute && !isAuthenticated) {
        const signInUrl = new URL("/sign-in", request.url);
        signInUrl.searchParams.set("callbackUrl", pathname);
        return NextResponse.redirect(signInUrl);
    }
    return NextResponse.next();
}

export const config = {
    matcher: [
        "/((?!_next/static|_next/image|favicon.ico|public).*)",
    ],
};