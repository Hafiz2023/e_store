import { NextResponse } from "next/server";
import { checkEmail } from "@/lib/core/checkEmail";

export async function POST(req: Request) {
  const { email } = await req.json();
  const result = await checkEmail(email);

  if (!result.ok) return NextResponse.json(result, { status: 400 });
  return NextResponse.json(result, { status: 200 });
}
