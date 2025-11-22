"use client";

import Image from "next/image";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface AuthCardProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
}

export const AuthCard: React.FC<AuthCardProps> = ({ children, title = "Welcome Back", description = "Log in to continue" }) => {
  return (
    <Card className="rounded-2xl shadow-xl border border-gray-200">
      <CardHeader className="text-center space-y-2">
        <div className="flex justify-center mb-2">
          <Image src="/assets/images/logo-black.png" alt="Logo" width={120} height={120} className="rounded-full" />
        </div>
        <CardTitle className="text-2xl font-bold">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>

      <CardContent>{children}</CardContent>

      <CardFooter className="flex flex-col items-center space-y-3">
        <Separator />
        <p className="text-sm text-gray-600">
          No account? <Link href="/auth/Register" className="text-blue-600 font-medium">Sign Up</Link>
        </p>
      </CardFooter>
    </Card>
  );
};
