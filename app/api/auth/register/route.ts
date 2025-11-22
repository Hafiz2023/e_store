import { NextResponse } from "next/server";
import { z } from "zod";
import crypto from "crypto";
import { connectDB } from "@/lib/databaseconnection";
import UserModel from "@/app/models/User.models";  // FIXED IMPORT
import { sendVerificationEmail } from "@/lib/email";

const schema = z.object({
  name: z.string().min(2, "Name is too short"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();
    const parsed = schema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid data",
          errors: parsed.error.issues,
        },
        { status: 400 }
      );
    }

    const { name, email, password } = parsed.data;

    // Check existing
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { success: false, message: "User already exists" },
        { status: 400 }
      );
    }

    // Create verification token
    const verificationToken = crypto.randomBytes(32).toString("hex");
    const verificationExpires = new Date(Date.now() + 86400000); // 24 hours

    // Create new user
    const newUser = await UserModel.create({
      name,
      email,
      password,
      isEmailVerified: false,
      emailVerificationToken: verificationToken,
      emailVerificationExpires: verificationExpires,
    });

    console.log("User created:", newUser);

    // Build verification URL
    const verificationUrl = `${process.env.NEXT_PUBLIC_APP_URL}/verify-email?token=${verificationToken}`;

    try {
      await sendVerificationEmail(email, verificationUrl);
    } catch (emailErr) {
      console.error("Email sending failed:", emailErr);
      // Continue anyway – user is created
    }

    return NextResponse.json(
      { success: true, message: "Registered successfully! Check your email." },
      { status: 201 }
    );
  } catch (err) {
    console.error("Register Error:", err);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
