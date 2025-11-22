"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";

interface PasswordInputProps {
  label: string;
  placeholder?: string;
  error?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: any;
}

export const PasswordInput: React.FC<PasswordInputProps> = ({
  label,
  placeholder = "••••••",
  error,
  register,
}) => {
  const [show, setShow] = useState(false);

  return (
    <div className="relative">
      <Label className="my-2">{label}</Label>
      <Input
        type={show ? "text" : "password"}
        placeholder={placeholder}
        {...register}
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
