import { NextResponse } from "next/server";

export function middleware(request) {
  const role = request.cookies.get("role")?.value;

  if (!role) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const roles = role.split(",");
  if (roles.includes("Freebies")) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/regional", "/brand-dashboard", "/view-skribe365"],
};
