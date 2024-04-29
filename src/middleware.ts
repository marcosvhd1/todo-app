import { NextRequest, NextResponse } from "next/server";

function getUrl(path?: string) {
  const baseUrl = "http://localhost:3000";
  const normalizedPath =
    path && !path.startsWith("/") ? `/${path}` : path || "";
  return `${baseUrl}${normalizedPath}`;
}

export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  if (!pathname.startsWith("/todos")) {
    return NextResponse.redirect(new URL(getUrl("/todos?page=1")));
  } else if (pathname.startsWith("/todos") && !searchParams.has("page")) {
    return NextResponse.redirect(new URL(getUrl("?page=1")));
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
