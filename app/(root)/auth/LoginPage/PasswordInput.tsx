"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";

interface PasswordInputProps {
  value?: string;
  placeholder?: string;
  error?: string;
  onChange?: (value: string) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register?: any; // for react-hook-form
}

export const PasswordInput: React.FC<PasswordInputProps> = ({ register, placeholder, error }) => {
  const [show, setShow] = useState(false);

  return (
    <div className="relative">
      <Label className="my-2">Password</Label>
      <Input
        {...(register && register("password"))}
        type={show ? "text" : "password"}
        placeholder={placeholder || "••••••"}
      />
      <button
        type="button"
        onClick={() => setShow(!show)}
        className="absolute right-3 top-9 text-gray-500"
      >
        {show ? <EyeOff size={18} /> : <Eye size={18} />}
      </button>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};
