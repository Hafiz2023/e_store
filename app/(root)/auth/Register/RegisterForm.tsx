"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { TextInput } from "./TextInput";
import { PasswordInput } from "./PasswordInput";

const RegisterSchema = z
  .object({
    name: z.string().min(3, "Name must be at least 3 characters"),
    email: z.string().email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

type RegisterFormType = z.infer<typeof RegisterSchema>;

interface RegisterFormProps {
  redirectTo?: string;
  logoSrc?: string;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({
  redirectTo = "/auth/LoginPage",
  logoSrc = "/assets/images/logo-black.png",
}) => {
  const router = useRouter();
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormType>({
    resolver: zodResolver(RegisterSchema),
  });

  const onSubmit = async (data: RegisterFormType) => {
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password,
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        toast({
          title: "Registration Failed",
          description: result.message || "Unable to create account",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Account Created 🎉",
        description: "Please check your email to verify.",
      });
      setTimeout(() => router.push(redirectTo), 2000);
    } catch {
      toast({
        title: "Server Error",
        description: "Please try again later.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <Card className="rounded-2xl shadow-xl border border-gray-200">
          <CardHeader className="text-center space-y-2">
            <div className="flex justify-center mb-2">
              <Image
                src={logoSrc}
                alt="Logo"
                width={120}
                height={120}
                className="rounded-full"
              />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-800">
              Create Account
            </CardTitle>
            <CardDescription className="text-gray-500">
              Join us today by filling in the details below
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <TextInput
                id="name"
                label="Full Name"
                placeholder="John Doe"
                register={register("name")}
                error={errors.name?.message}
              />

              <TextInput
                id="email"
                label="Email"
                type="email"
                placeholder="example@mail.com"
                register={register("email")}
                error={errors.email?.message}
              />

              <PasswordInput
                label="Password"
                placeholder="Enter password"
                register={register("password")}
                error={errors.password?.message}
              />

              <PasswordInput
                label="Confirm Password"
                placeholder="Confirm password"
                register={register("confirmPassword")}
                error={errors.confirmPassword?.message}
              />

      
              <Button type="submit" disabled={isSubmitting} className="w-full">
                {isSubmitting ? "Creating Account..." : "Sign Up"}
              </Button>
            </form>
          </CardContent>

          <CardFooter className="flex flex-col items-center space-y-3">
            <Separator />
            <p className="text-gray-600 text-sm">
              Already have an account?{" "}
              <Link
                href="/auth/LoginPage"
                className="text-blue-600 font-medium"
              >
                Log In
              </Link>
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};
