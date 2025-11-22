import { NextResponse } from "next/server";
import { updatePassword } from "@/lib/core/updatePassword";

export async function POST(req: Request) {
  const { token, password } = await req.json();

  const result = await updatePassword(token, password);

  if (!result.ok) {
    return NextResponse.json(result, { status: 400 });
  }

  return NextResponse.json(result, { status: 200 });
}
