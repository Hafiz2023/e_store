/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import Image from "next/image";

import { useSearchParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { showToast } from "@/lib/showToast";
import axios from "axios";

// ✅ Zod schema for OTP validation
const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  otp: z.string().regex(/^\d{6}$/, "OTP must be a 6-digit number"),
});

type FormSchema = z.infer<typeof formSchema>;

export default function OTPVerification() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const [isResendingOtp, setIsResendingOtp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  // ✅ useForm setup
  const {
    register,
    handleSubmit,
    formState: { errors },
    // ✅ Proper reset function (fix for form.reset error)
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email,
      otp: "",
    },
  });

  // ✅ Handle OTP Verification
  const handleOtpVerification = async (data: FormSchema) => {
    setLoading(true);
    setServerError(null);

    try {
      const res = await fetch("/api/auth/VerifyOtp",{
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const text = await res.text();
      let result: any;
      try {
        result = JSON.parse(text);
      } catch {
        throw new Error("Invalid server response (not JSON)");
      }

      if (res.ok) {
        showToast("success", result.message || "OTP verified successfully!");
        setTimeout(() => router.push("/dashboard"), 1500);
      } else {
        showToast("error", result.message || "OTP verification failed!");
        setServerError(result.message || "OTP verification failed!");
      }
    } catch (error: any) {
      console.error("OTP verification error:", error);
      showToast("error", "Something went wrong!");
      setServerError("Failed to verify OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Handle Resend OTP
  const handleResendOtp = async () => {
    try {
      if (!email) {
        showToast("error", "Email is missing!");
        return;
      }

      setIsResendingOtp(true);
      const { data: resendResponse } = await axios.post(
        "/api/auth/ResendOtp",
        { email }
      );

      if (!resendResponse.success) {
        throw new Error(resendResponse.message);
      }

      showToast("success", resendResponse.message);
    } catch (error: any) {
      showToast("error", error.message || "Failed to resend OTP");
    } finally {
      setIsResendingOtp(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <Card className="w-full max-w-md rounded-2xl shadow-xl border border-gray-200">
        <CardHeader className="text-center space-y-2">
          <div className="flex justify-center mb-2">
            <Image
              src="/assets/images/logo-black.png"
              alt="App Logo"
              width={120}
              height={120}
              className="rounded-full"
            />
          </div>

          <CardTitle className="text-2xl font-bold text-gray-800">
            Verify Your OTP 🔐
          </CardTitle>
          <CardDescription className="text-gray-500">
            Enter the 6-digit code sent to your email ({email})
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form
            onSubmit={handleSubmit(handleOtpVerification)}
            className="space-y-5"
          >
            <div className="space-y-1">
              <Label htmlFor="otp">OTP</Label>
              <Input
                id="otp"
                type="text"
                placeholder="Enter 6-digit OTP"
                {...register("otp")}
                maxLength={6}
              />
              {errors.otp && (
                <p className="text-sm text-red-500">{errors.otp.message}</p>
              )}
            </div>

            {serverError && (
              <p className="text-sm text-red-500 text-center">{serverError}</p>
            )}

            <Button
              type="submit"
              className="w-full font-semibold"
              disabled={loading}
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex flex-col items-center space-y-3">
          <Separator className="my-2" />
          <p className="text-sm text-gray-500">
            Didn’t receive the code?{" "}
            <button
              onClick={handleResendOtp}
              className="text-blue-600 hover:underline disabled:text-gray-400"
              disabled={isResendingOtp}
            >
              {isResendingOtp ? "Resending..." : "Resend OTP"}
            </button>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
