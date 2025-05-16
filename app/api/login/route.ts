import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  // Тут — фейкова логіка, заміни на справжню
  if (email && password) {
    const investorId = "22de71c6-f032-484b-b429-b03bb387d1b2";

    const response = NextResponse.json({ success: true });

    response.cookies.set("investor_id", investorId, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24, // 1 день
    });

    return response;
  }

  return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
}
