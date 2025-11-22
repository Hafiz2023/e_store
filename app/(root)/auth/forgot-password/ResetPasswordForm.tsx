"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { getResetToken } from "@/lib/api/auth/token";
import { updatePasswordRequest } from "@/lib/api/auth/updatePassword";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export function ResetPasswordForm() {
  const [password, setPassword] = useState("");
  const { toast } = useToast();
  const router = useRouter();


  const token = getResetToken();


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();


    if (!token) {
      toast({ title: "Invalid Link", description: "Token missing", variant: "destructive" });
      return;
    }


    const { ok, result } = await updatePasswordRequest(token, password);


    if (!ok) {
      toast({ title: "Error", description: result.message, variant: "destructive" });
      return;
    }


    toast({ title: "Success", description: "Password updated successfully!" });
    setTimeout(() => router.push("/auth/LoginPage"), 1500);
  };


  return (
    <div className="min-h-screen bg-gray-100 p-4 flex flex-col items-center">
      {/* Logo */}
      <div className="flex justify-center mt-10 mb-6">
        <Image src="/logo.png" alt="Logo" width={110} height={110} className="drop-shadow-lg" />
      </div>


      <Card className="w-full max-w-lg p-6 shadow-xl border border-gray-200 rounded-2xl bg-white">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold text-gray-800">
            Reset Password
          </CardTitle>
        </CardHeader>


        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              type="password"
              placeholder="Enter New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="h-12 text-base"
            />


            <Button type="submit" className="w-full h-12 text-base font-semibold rounded-xl">
              Save New Password
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
