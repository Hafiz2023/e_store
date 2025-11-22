import { z } from "zod";

/* --------------------------------------------------------
   🔹 Reusable Schemas
-------------------------------------------------------- */

// 📌 Email Schema (reusable)
export const emailSchema = z
  .string()
  .trim()
  .toLowerCase()
  .email("Please enter a valid email address");

// 📌 Password Schema (reusable)
export const passwordSchema = z
  .string()
  .min(6, "Password must be at least 6 characters long")
  .max(64, "Password too long")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/\d/, "Password must contain at least one number")
  .regex(/[@$!%*?&]/, "Password must contain at least one special character");

// 📌 OTP Schema (6 digits)
export const otpSchema = z
  .string()
  .trim()
  .regex(/^\d{6}$/, { message: "OTP must be exactly 6 digits" });

/* --------------------------------------------------------
   🧾 REGISTER SCHEMA
-------------------------------------------------------- */
export const RegisterSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: emailSchema,
  password: passwordSchema,
});

/* --------------------------------------------------------
   🔐 LOGIN SCHEMA
-------------------------------------------------------- */
export const LoginSchema = z.object({
  email: emailSchema,
  password: z.string().min(6, "Password must be at least 6 characters"),
});

/* --------------------------------------------------------
   📩 SEND OTP SCHEMA
-------------------------------------------------------- */
export const SendOTPSchema = z.object({
  email: emailSchema,
});

/* --------------------------------------------------------
   🔁 RESEND OTP SCHEMA
-------------------------------------------------------- */
export const ResendOTPSchema = z.object({
  email: emailSchema,
});

/* --------------------------------------------------------
   ✅ VERIFY OTP SCHEMA
-------------------------------------------------------- */
export const VerifyOTPSchema = z.object({
  email: emailSchema,
  otp: otpSchema,
});

/* --------------------------------------------------------
   🚪 LOGOUT SCHEMA
-------------------------------------------------------- */
export const LogoutSchema = z.object({
  userId: z.string().min(1, "User ID is required"),
});

/* --------------------------------------------------------
   🔄 RESET PASSWORD SCHEMA
-------------------------------------------------------- */
export const ResetPasswordSchema = z
  .object({
    token: z.string().min(1, "Reset token is required"),
    newPassword: passwordSchema,
    confirmPassword: z.string().min(6, "Confirm password is required"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

/* --------------------------------------------------------
   📦 PRODUCT SCHEMA
-------------------------------------------------------- */
export const ProductSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  price: z.coerce.number().min(0, "Price must be a positive number"),
  category: z.string().min(1, "Category is required"),
  images: z.array(z.string().url("Invalid image URL")).min(1, "At least one image is required"),
  stock: z.coerce.number().min(0, "Stock cannot be negative"),
  tags: z.array(z.string()).optional(),
  variants: z
    .array(
      z.object({
        name: z.string(),
        options: z.array(z.string()),
      })
    )
    .optional(),
  isActive: z.boolean().optional(),
});
