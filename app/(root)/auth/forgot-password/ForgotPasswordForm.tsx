"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { checkEmailRequest } from "@/lib/api/auth/checkEmail";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const { toast } = useToast();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { ok, result } = await checkEmailRequest(email);

    if (!ok) {
      toast({
        title: "Error",
        description: result.message,
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Email Verified",
      description: "Redirecting to Reset Password...",
    });

    router.push(`/auth/reset-password?token=${result.token}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 flex flex-col items-center">
      {/* Logo */}
      <div className="flex justify-center mt-10 mb-6">
        <Image
          src="/assets/images/logo-black.png"
          alt="Logo"
          width={110}
          height={110}
          className="drop-shadow-lg"
        />
      </div>

      <Card className="w-full max-w-lg p-6 shadow-xl border border-gray-200 rounded-2xl bg-white">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold text-gray-800">
            Forgot Password
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              type="email"
              placeholder="Enter Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="h-12 text-base"
            />

            <Button
              type="submit"
              className="w-full h-12 text-base font-semibold rounded-xl"
            >
              Verify Email
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
