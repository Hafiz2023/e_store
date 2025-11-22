// app/api/auth/login/route.ts
import { NextResponse } from "next/server";
import { z } from "zod";
import { SignJWT } from "jose";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/databaseconnection";
import UserModel from "@/app/models/User.models";

const schema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password too short"),
});

export async function POST(req: Request) {
  try {
    console.log("Login API hit");

    await connectDB();

    // Safe JSON parse
    let body;
    try {
      body = await req.json();
    } catch (e) {
      console.error("Invalid JSON:", e);
      return NextResponse.json(
        { success: false, message: "Invalid request body" },
        { status: 400 }
      );
    }

    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, message: "Invalid credentials", errors: parsed.error.issues },
        { status: 400 }
      );
    }

    const { email, password } = parsed.data;

    // Find user
    const user = await UserModel.findOne({ email }).select("+password");
    if (!user) {
      console.log("User not found:", email);
      return NextResponse.json(
        { success: false, message: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Compare password
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      console.log("Password mismatch for:", email);
      return NextResponse.json(
        { success: false, message: "Invalid email or password" },
        { status: 401 }
      );
    }

    console.log("Login successful for:", email);

    // JWT Token
    const secret = new TextEncoder().encode(process.env.JWT_SECRET_KEY!);
    const token = await new SignJWT({
      userId: user._id,
      email: user.email,
      name: user.name,
      role: user.role,
    })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("7d")
      .sign(secret);

    const response = NextResponse.json(
      {
        success: true,
        message: "Login successful",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
      { status: 200 }
    );

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Login Error:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}