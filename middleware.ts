import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const investorId = request.cookies.get("investor_id")?.value;

  const isProtectedPath = request.nextUrl.pathname.startsWith("/dashboard");

  if (isProtectedPath && !investorId) {
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}
