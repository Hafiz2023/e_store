import { NextResponse } from "next/server";
import { connectDB } from "@/lib/databaseconnection";
import MediaModel from "@/app/models/Media.model";

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();

    if (!Array.isArray(body) || body.length === 0) {
      return NextResponse.json({ success: false, message: "No media data provided" }, { status: 400 });
    }

    const savedMedia = await MediaModel.insertMany(body);

    return NextResponse.json({ success: true, message: "Media saved successfully", data: savedMedia });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Media Save Error:", error);
    return NextResponse.json({ success: false, message: error.message || "Server error" }, { status: 500 });
  }
}
