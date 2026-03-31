import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextRequest, NextResponse } from "next/server";

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;
  const session = request.cookies.get("CHAT_SESSION_ID")?.value;
  const isReauth = searchParams.get("reauth") === "true";

  // Regex for pages that should only be accessible to guests (redirect to home if logged in)
  const isGuestOnlyPage = /^\/(?:en|vi)?\/?(login)$/.test(pathname);

  // Detect if it's the home page
  const isHomePage = /^\/(?:en|vi)?\/?$/.test(pathname);

  const localeMatch = pathname.match(/^\/(en|vi)/);
  const locale = localeMatch ? `/${localeMatch[1]}` : "";

  // 1. If user is logged in and tries to access a guest-only page -> Redirect to home
  // Skip this if reauth=true is present
  if (session && isGuestOnlyPage && !isReauth) {
    return NextResponse.redirect(new URL(`${locale}/`, request.url));
  }

  // 2. If user is NOT logged in and tries to access the home page -> Redirect to login
  if (!session && isHomePage) {
    return NextResponse.redirect(new URL(`${locale}/login`, request.url));
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
