"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface TextInputProps {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  error?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: any;
}

export const TextInput: React.FC<TextInputProps> = ({
  id,
  label,
  type = "text",
  placeholder = "",
  error,
  register,
}) => (
  <div>
    <Label htmlFor={id} className="my-2">{label}</Label>
    <Input id={id} type={type} placeholder={placeholder} {...register} />
    {error && <p className="text-red-500 text-sm">{error}</p>}
  </div>
);
