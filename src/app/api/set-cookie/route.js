import { NextResponse } from "next/server";

export async function POST(request) {
  const { role } = await request.json();

  const response = NextResponse.json({ success: true });
  response.cookies.set("role", role, {
    httpOnly: true,
    secure: true,
    path: "/",
    maxAge: 60 * 60 * 24,
  });

  return response;
}
