import { NextResponse } from "next/server";
import OTPModel from "@/app/models/Otp.model";
import UserModel from "@/app/models/User.models";
import { connectDB } from "@/lib/databaseconnection";

export async function POST(req: Request) {
  await connectDB();
  const { email, otp } = await req.json();

  if (!email || !otp) return NextResponse.json({ success: false, message: "Email and OTP required" }, { status: 400 });

  try {
    const record = await OTPModel.findOne({ email, otp });
    if (!record) return NextResponse.json({ success: false, message: "Invalid OTP" }, { status: 400 });

    if (record.expiresAt < new Date()) {
      await OTPModel.deleteOne({ _id: record._id });
      return NextResponse.json({ success: false, message: "OTP expired" }, { status: 400 });
    }

    await UserModel.updateOne({ email }, { verified: true });
    await OTPModel.deleteOne({ _id: record._id });

    return NextResponse.json({ success: true, message: "Account verified successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}
