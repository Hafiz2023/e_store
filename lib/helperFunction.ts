/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";


/**
 * ✅ Standard API response helper
 */
export const response = (
  success: boolean,
  message: string | number,
  data: any = null,
  statusCode = 400
) => {
  return NextResponse.json(
    {
      success,
      message,
      data,
    },
    { status: success ? 200 : statusCode }
  );
};

/**
 * ✅ Centralized error handler
 */
export const catchError = (
  error: any,
  customMessage = "Something went wrong",
  statusCode = 500
) => {
  if (error?.code === 11000) {
    const field = Object.keys(error.keyPattern || {}).join(", ");
    error.message = `Duplicate key error: ${field} — These fields are already taken.`;
  }

  const payload =
    process.env.NODE_ENV === "development"
      ? {
          message: customMessage || error?.message,
          error,
        }
      : {
          message: customMessage || "Internal server error",
          error: error?.message || String(error),
        };

  console.error("catchError:", error);
  return NextResponse.json(payload, { status: statusCode });
};

/**
 * ✅ OTP Generator
 */
export const generateOTP = (): string =>
  Math.floor(100000 + Math.random() * 900000).toString();

/**
 * ✅ Auth response type
 */
export interface AuthResponse {
  isAuth: boolean;
  user?: {
    _id: string;
    email: string;
    role: string;
  };
}

/**
 * ✅ Authentication Middleware
 * Checks JWT from cookies or headers and optionally enforces role.
 */
export async function isAuthenticated(requiredRole?: string): Promise<AuthResponse> {
  try {
    // Check both cookies and headers for token
    const token =
      typeof window === "undefined"
        ? (await (await import("next/headers")).cookies()).get("token")?.value
        : null;

    // Optional fallback if header is used instead
    const authHeader =
      typeof window === "undefined"
        ? (await (await import("next/headers")).headers()).get("authorization")
        : null;

    const jwtToken =
      token ||
      (authHeader && authHeader.startsWith("Bearer ")
        ? authHeader.split(" ")[1]
        : null);

    if (!jwtToken) {
      return { isAuth: false };
    }

    const decoded = verify(jwtToken, process.env.JWT_SECRET_KEY as string) as any;

    // Role check
    if (requiredRole && decoded.role !== requiredRole) {
      return { isAuth: false };
    }

    return {
      isAuth: true,
      user: {
        _id: decoded._id,
        email: decoded.email,
        role: decoded.role,
      },
    };
  } catch (error) {
    console.error("isAuthenticated Error:", error);
    return { isAuth: false };
  }
}
function verify(jwtToken: string, arg1: string): any {
  throw new Error("Function not implemented.");
}

