"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

export default function LogoutPage() {
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    const logout = async () => {
      try {
        const res = await fetch("/api/auth/logout", { method: "POST" });
        const result = await res.json();

        if (!res.ok) {
          toast({
            title: "Logout Failed",
            description: result.message || "Unable to logout",
            variant: "destructive",
          });
          return;
        }

        toast({
          title: "Logged Out",
          description: "You have been successfully logged out",
        });

        // Redirect to login after 2 seconds
        setTimeout(() => router.push("/auth/LoginPage"), 2000);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        toast({
          title: "Network Error",
          description: "Please try again later.",
          variant: "destructive",
        });
      }
    };

    logout();
  }, [router, toast]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-lg text-gray-600">Logging out...</p>
    </div>
  );
}
