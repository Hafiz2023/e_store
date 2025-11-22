"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { PasswordInput } from "./PasswordInput";

const LoginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password too short"),
});

type LoginFormType = z.infer<typeof LoginSchema>;

export const LoginForm: React.FC = () => {
  const router = useRouter();
  const { toast } = useToast();

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginFormType>({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit = async (data: LoginFormType) => {
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        toast({ title: "Login Failed", description: result.message || "Invalid credentials", variant: "destructive" });
        return;
      }

      toast({ title: "Login Successful 🎉", description: "Redirecting to dashboard..." });

      setTimeout(() => router.push("/admin/Dashboard"), 5000);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      toast({ title: "Network Error", description: "Please try again later.", variant: "destructive" });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <Label className="my-2">Email</Label>
        <Input {...register("email")} type="email" placeholder="your@example.com" />
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
      </div>

      <PasswordInput register={register} error={errors.password?.message} />

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? "Logging in..." : "Log In"}
      </Button>
    </form>
  );
};
