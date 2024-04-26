import { NextRequest, NextResponse } from "next/server";

function getUrl(path?: string) {
  const baseUrl = "http://localhost:3000" || "";
  const normalizedPath =
    path && !path.startsWith("/") ? `/${path}` : path || "";
  return `${baseUrl}${normalizedPath}`;
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (!pathname.includes("/todos")) {
    return NextResponse.redirect(new URL(getUrl("/todos")));
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
