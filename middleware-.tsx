import { NextRequest, NextResponse } from "next/server";

const PUBLIC_FILE = /\.(.*)$/;

export function middleware(request: NextRequest) {
  if(!request.nextUrl.pathname.includes("/api/"))
  {
  if (
    request.nextUrl.pathname === "/" &&
    request.nextUrl.locale === "default" &&
    request.cookies.get("LOCALE")
  ) {
    return NextResponse.redirect(new URL(`/${request.cookies.get("LOCALE")}`, request.url));
  }
  console.log(request.nextUrl.locale);
  if (
    request.nextUrl.pathname === "/" &&
    request.nextUrl.locale === "default"
  ) {
    return NextResponse.redirect(new URL("/country", request.url));
  }
  
  const shouldHandleLocale =
    !PUBLIC_FILE.test(request.nextUrl.pathname) &&
    !request.nextUrl.pathname.includes("/api/") &&
    request.nextUrl.locale === "default" &&
    !request.nextUrl.pathname.includes("/country") &&
    request.nextUrl.pathname !== "/";

  return shouldHandleLocale ? NextResponse.rewrite(new URL("/404", request.url)) : undefined;
}
return NextResponse.next();
}