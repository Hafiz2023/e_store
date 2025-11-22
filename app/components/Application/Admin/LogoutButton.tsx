"use client";

import React from "react";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { AiOutlineLogout } from "react-icons/ai";
import axios from "axios";
import { useRouter } from "next/navigation";

const LogoutButton: React.FC = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const { data } = await axios.post("/api/auth/Logout");

      if (!data.success) throw new Error(data.message || "Logout failed");

      // Show toast
      window.dispatchEvent(
        new CustomEvent("toast", {
          detail: {
            title: "Logged Out",
            description: data.message || "You have been logged out",
            variant: "default",
          },
        })
      );

      // Redirect after 2 seconds
      setTimeout(() => router.push("/auth/LoginPage"), 2000);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      window.dispatchEvent(
        new CustomEvent("toast", {
          detail: {
            title: "Error",
            description: error.message || "Something went wrong",
            variant: "destructive",
          },
        })
      );
    }
  };

  return (
    <DropdownMenuItem
      className="cursor-pointer flex items-center gap-2"
      onClick={handleLogout}
    >
      <AiOutlineLogout color="red" />
      <span>Logout</span>
    </DropdownMenuItem>
  );
};

export default LogoutButton;
