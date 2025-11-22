import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { connectDB } from "@/lib/databaseconnection";
import { catchError } from "@/lib/helperFunction";

export async function POST() {
  try {
    await connectDB();

    const cookieStore = cookies();
    (await cookieStore).delete("access_token");

    return NextResponse.json({
      success: true,
      message: "You have been successfully logged out",
    });
  } catch (error) {
    return catchError(error);
  }
}
