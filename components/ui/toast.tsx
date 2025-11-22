"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function Toast({ title, description, variant }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 80, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 80, scale: 0.95 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={cn(
        "w-80 p-4 rounded-xl shadow-xl border bg-white/90 backdrop-blur-md",
        variant === "destructive"
          ? "border-red-400 bg-red-50/90"
          : "border-gray-300"
      )}
    >
      {title && <p className="font-semibold text-gray-900">{title}</p>}
      {description && <p className="text-sm mt-1 text-gray-700">{description}</p>}
    </motion.div>
  );
}
